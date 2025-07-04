import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/Card.module.css";
import RelatedProducts from "../Products/components/RelatedProducts/RelatedProducts";
import Breadcrumbs from "../Products/components/Breadcrumbs/Breadcrumbs";
import DescriptionBlock from "./DescriptionBlock";
import ProjectFiles from "./ProjectFiles";
import CardDetails from "./CardDetails";
import CardMaterial from "./CardMaterial";
import GroupSection from "./GroupSection";
import ColorSwitcher from "./ColorSwitcher";
import ImageCarousel from "./ImageCarousel";
import ExtraInfo from "./ExtraInfo";
import qs from "qs";
import CardTitle from "./CardTitle";
import PriceLink from "./PriceLink";
import LoaderRound from "../../components/Loader/LoaderRound";
import { useMediaQuery } from "react-responsive";
import CodeSize from "./CodeSize";
import LightboxModal from "../../components/Lightbox/LightboxModal";
import ProductGallery from "./ProductGallery";

const Card = () => {
  const { id, slug } = useParams();
  const cardId = id;

  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMaterialIndex, setSelectedMaterialIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [groupProducts, setGroupProducts] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const groupedImages =
    Array.isArray(card?.groupImage) && card.groupImage.length > 0
      ? card.groupImage.map((group) => ({
          colorImage: group.group_color?.image
            ? `https://admin.ludno.ru${
                group.group_color.image.formats?.thumbnail?.url ||
                group.group_color.image.formats?.medium?.url ||
                group.group_color.image.url
              }`
            : null,
          images: group.image.map((img) => ({
            url: `https://admin.ludno.ru${
              img.formats?.large?.url || img.formats?.thumbnail?.url || img.url
            }`,
            alternativeText: img.alternativeText || "Group Image",
          })),
        }))
      : [];

  const images =
    Array.isArray(card?.productImage) && card.productImage.length > 0
      ? card.productImage.map((img) => ({
          url: `https://admin.ludno.ru${
            img.formats?.large?.url || img.formats?.thumbnail?.url || img.url
          }`,
          alternativeText: img.alternativeText || "Product Image",
        }))
      : groupedImages.length > 0
      ? groupedImages[selectedColorIndex]?.images || []
      : [];

  const galleryImages =
    Array.isArray(card?.gallery) && card.gallery.length > 0
      ? card.gallery.map((img) =>
          img.formats?.large
            ? `https://admin.ludno.ru${img.formats.large.url}`
            : `https://admin.ludno.ru${img.url}`
        )
      : [];

  useEffect(() => {
    if (images.length > 0) {
      const preloadedImages = new Set();
      images.forEach((img) => {
        const imageUrl = img.url;
        if (!preloadedImages.has(imageUrl)) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = imageUrl;
          link.as = "image";
          document.head.appendChild(link);
          preloadedImages.add(imageUrl);
        }
      });
    }

    if (groupedImages.length > 0) {
      const preloadedImages = new Set();
      groupedImages.forEach((group) => {
        group.images.forEach((img) => {
          const imageUrl = img.url;
          if (!preloadedImages.has(imageUrl)) {
            const link = document.createElement("link");
            link.rel = "preload";
            link.href = imageUrl;
            link.as = "image";
            document.head.appendChild(link);
            preloadedImages.add(imageUrl);
          }
        });
      });
    }
  }, [images, groupedImages]);

  const fetchCardData = async () => {
    setLoading(true);
    try {
      const query = qs.stringify(
        {
          filters: {
            id: {
              $eq: cardId,
            },
          },
          populate: {
            product: {
              populate: {
                brand: true,
                category: true,
                groups: {
                  populate: {
                    products: {
                      populate: {
                        card: {
                          populate: {
                            product: { fields: ["title"] },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            materials: {
              populate: ["image"],
            },
            gallery: true,
            productImage: true,
            groupImage: {
              populate: {
                image: true,
                group_color: {
                  populate: ["image"],
                },
              },
            },
          },
        },
        { encodeValuesOnly: true }
      );

      const response = await fetch(`https://admin.ludno.ru/api/cards?${query}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка запроса:", errorData);
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const cardData = await response.json();

      if (cardData.data && cardData.data.length > 0) {
        const cardItem = cardData.data[0];
        setCard(cardItem);

        setMaterials(cardItem.materials || []);

        const allGroupProducts = (cardItem.product.groups || []).flatMap(
          (grp) => {
            return grp.products || [];
          }
        );

        const groupProductsWithCardId = allGroupProducts.map((p) => ({
          ...p,
          cardId: p.card?.id,
          productName: p.card?.product?.title || "без-названия",
          isCurrent: p.id == cardItem.product.id,
        }));

        setGroupProducts(groupProductsWithCardId);
      } else {
        setError("Карточка не найдена");
      }
    } catch (err) {
      console.error("Ошибка:", err.message);
      setError("Ошибка при загрузке данных: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [cardId]);

  if (loading) return <LoaderRound show={true} />;
  if (error) return <p>{error}</p>;
  if (!card) return <p>Карточка не загружена</p>;

  return isMobile ? (
    // Мобильная разметка
    <div className={styles.fullCard}>
      <div className={styles.cardContainer}>
        <div className={styles.offset}>
          <Breadcrumbs
            brand={card?.product?.brand}
            category={card?.product?.category}
            productName={card?.product?.name}
          />
          <CardTitle title={card?.product?.title} />
          <section className={styles.mainInfo}>
            <ImageCarousel
              images={images}
              selectedImage={selectedImage}
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
              setSelectedImage={setSelectedImage}
              showArrows={showArrows}
              setShowArrows={setShowArrows}
            />
            <section className={styles.articleWrapper}>
              {groupProducts.length > 0 ? (
                <GroupSection
                  groupProducts={groupProducts}
                  groupName={groupName}
                  navigate={navigate}
                />
              ) : (
                <CodeSize size={card?.size} />
              )}
            </section>
            <section className={styles.cardDetails}>
              <PriceLink />
              <ExtraInfo card={card} />
              <ProjectFiles card={card} />
              <ColorSwitcher
                groupedImages={groupedImages}
                selectedColorIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
                setSelectedImage={setSelectedImage}
                setCarouselIndex={setCarouselIndex}
              />
            </section>
          </section>

          <section className={styles.cardDetails}>
            <DescriptionBlock card={card} />
            <CardDetails card={card} />
          </section>
        </div>
        <CardMaterial
          materials={materials}
          selectedMaterialIndex={selectedMaterialIndex}
          setSelectedMaterialIndex={setSelectedMaterialIndex}
        />
        <ProductGallery
          images={galleryImages}
          isLightboxOpen={isLightboxOpen}
          setIsLightboxOpen={setIsLightboxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      </div>
      <RelatedProducts
        currentProductId={card.product?.id || null}
        categoryId={card.product?.category?.id || null}
        brandId={card.product?.brand?.id || null}
      />
    </div>
  ) : (
    // Десктопная разметка
    <div className={styles.fullCard}>
      <div className={styles.cardContainer}>
        <div className={styles.offset}>
          <Breadcrumbs
            brand={card?.product?.brand}
            category={card?.product?.category}
            productName={card?.product?.name}
          />
          <CardTitle title={card?.product?.title} />
          <section className={styles.mainInfo}>
            <ImageCarousel
              images={images}
              selectedImage={selectedImage}
              carouselIndex={carouselIndex}
              setCarouselIndex={setCarouselIndex}
              setSelectedImage={setSelectedImage}
              showArrows={showArrows}
              setShowArrows={setShowArrows}
            />
            <section className={styles.cardDetails}>
              <section>
                <ExtraInfo card={card} />
                <ProjectFiles card={card} />
                <ColorSwitcher
                  groupedImages={groupedImages}
                  selectedColorIndex={selectedColorIndex}
                  setSelectedColorIndex={setSelectedColorIndex}
                  setSelectedImage={setSelectedImage}
                  setCarouselIndex={setCarouselIndex}
                />
                <PriceLink />
              </section>
              <section>
                <CardDetails card={card} />
                {groupProducts.length > 0 ? (
                  <GroupSection
                    groupProducts={groupProducts}
                    groupName={groupName}
                    navigate={navigate}
                  />
                ) : (
                  <CodeSize size={card?.size} />
                )}
              </section>
            </section>
          </section>
          <section>
            <DescriptionBlock card={card} />
          </section>
        </div>
        <CardMaterial
          materials={materials}
          selectedMaterialIndex={selectedMaterialIndex}
          setSelectedMaterialIndex={setSelectedMaterialIndex}
        />
        <ProductGallery
          images={galleryImages}
          isLightboxOpen={isLightboxOpen}
          setIsLightboxOpen={setIsLightboxOpen}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      </div>
      <RelatedProducts
        currentProductId={card.product?.id || null}
        categoryId={card.product?.category?.id || null}
        brandId={card.product?.brand?.id || null}
      />
    </div>
  );
};

export default Card;
