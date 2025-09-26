import React, { useEffect, useState } from "react";
import qs from "qs";
import styles from "./styles/Members.module.css";

const API_HOST = "https://admin.ludno.ru";

const query = qs.stringify(
  {
    fields: ["name", "position", "quote", "order"],
    populate: {
      staffImage: { fields: ["url", "formats"] },
      bossImage: { fields: ["url", "formats"] },
    },
    pagination: { pageSize: 100 },
    sort: ["order:asc", "createdAt:desc"],
  },
  { encodeValuesOnly: true }
);

const withHost = (u) => (u?.startsWith?.("http") ? u : `${API_HOST}${u}`);

const Members = () => {
  const [boss, setBoss] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_HOST}/api/staff-members?${query}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const rows = json?.data ?? [];

        const norm = rows.map((r) => {
          const staffArr = (r.staffImage || [])
            .map((img) => img?.formats?.small?.url || img?.url || null)
            .filter(Boolean)
            .map(withHost);

          const bossArr = (r.bossImage || [])
            .map((img) => img?.formats?.small?.url || img?.url || null)
            .filter(Boolean)
            .map(withHost);

          return {
            id: r.id,
            name: r.name,
            position: r.position,
            quote: r.quote,
            order: typeof r.order === "number" ? r.order : null,
            staff: staffArr,
            bossImgs: bossArr,
          };
        });

        const bossItem = norm.find((i) => i.bossImgs.length) || null;

        const others = norm
          .filter((i) => i.staff.length && i !== bossItem)
          .sort((a, b) => {
            const A = a.order ?? Number.POSITIVE_INFINITY;
            const B = b.order ?? Number.POSITIVE_INFINITY;
            return A - B;
          });

        const withDisplayOrder = others.map((m, idx) => ({
          ...m,
          displayOrder: idx + 1,
        }));

        setBoss(bossItem);
        setMembers(withDisplayOrder);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить данные о команде");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className={styles.loading}>Загрузка…</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.wrapper} aria-labelledby="team-title">
      <div className={styles.inner}>
        <h2 id="team-title" className={styles.title}>Команда</h2>

        {boss && (
          <div className={styles.bossRow}>
            <article className={styles.bossCard}>
              <div className={styles.photo}>
                {boss.bossImgs[0] && (
                  <img
                    className={`${styles.img} ${styles.primary}`}
                    src={boss.bossImgs[0]}
                    alt={boss.name}
                    loading="eager"
                    decoding="sync"
                  />
                )}
                {boss.bossImgs[1] && (
                  <img
                    className={`${styles.img} ${styles.hover}`}
                    src={boss.bossImgs[1]}
                    alt={`${boss.name} photo 2`}
                  />
                )}
              </div>
              <h3 className={styles.name}>{boss.name}</h3>
              <p className={styles.position}>{boss.position}</p>
            </article>

            {boss.quote && <p className={styles.quote}>{boss.quote}</p>}
          </div>
        )}

        <hr className={styles.divider} />

        <div className={styles.grid}>
          {members.map((m) => (
            <article key={m.id} className={styles.card}>
              <div className={styles.photo}>
                {m.staff[0] && (
                  <img
                    className={`${styles.img} ${styles.primary}`}
                    src={m.staff[0]}
                    alt={m.name}
                    // loading="eager"
                    decoding="sync"
                  />
                )}
                {m.staff[1] && (
                  <img
                    className={`${styles.img} ${styles.hover}`}
                    src={m.staff[1]}
                    alt={`${m.name} photo 2`}
                  />
                )}
              </div>
              <h4 className={styles.name}>{m.name}</h4>
              <p className={styles.position}>{m.position}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
