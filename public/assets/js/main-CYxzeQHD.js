/**
 * @vue/shared v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function nt(t, e) {
  const s = new Set(t.split(","));
  return e ? (n) => s.has(n.toLowerCase()) : (n) => s.has(n);
}
const ae = {},
  Is = [],
  Ae = () => {},
  ti = () => !1,
  Ss = (t) =>
    t.charCodeAt(0) === 111 &&
    t.charCodeAt(1) === 110 &&
    (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
  Go = (t) => t.startsWith("onUpdate:"),
  le = Object.assign,
  Yo = (t, e) => {
    const s = t.indexOf(e);
    s > -1 && t.splice(s, 1);
  },
  ou = Object.prototype.hasOwnProperty,
  oe = (t, e) => ou.call(t, e),
  z = Array.isArray,
  Ms = (t) => Zs(t) === "[object Map]",
  Cs = (t) => Zs(t) === "[object Set]",
  Gr = (t) => Zs(t) === "[object Date]",
  ru = (t) => Zs(t) === "[object RegExp]",
  G = (t) => typeof t == "function",
  Z = (t) => typeof t == "string",
  gt = (t) => typeof t == "symbol",
  de = (t) => t !== null && typeof t == "object",
  Jo = (t) => (de(t) || G(t)) && G(t.then) && G(t.catch),
  ca = Object.prototype.toString,
  Zs = (t) => ca.call(t),
  lu = (t) => Zs(t).slice(8, -1),
  ha = (t) => Zs(t) === "[object Object]",
  Zo = (t) => Z(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
  Kt = nt(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  au = nt(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  ),
  Li = (t) => {
    const e = Object.create(null);
    return (s) => e[s] || (e[s] = t(s));
  },
  cu = /-(\w)/g,
  be = Li((t) => t.replace(cu, (e, s) => (s ? s.toUpperCase() : ""))),
  hu = /\B([A-Z])/g,
  tt = Li((t) => t.replace(hu, "-$1").toLowerCase()),
  Es = Li((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  Rs = Li((t) => (t ? `on${Es(t)}` : "")),
  yt = (t, e) => !Object.is(t, e),
  Fs = (t, e) => {
    for (let s = 0; s < t.length; s++) t[s](e);
  },
  ci = (t, e, s) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: s });
  },
  mn = (t) => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e;
  },
  hi = (t) => {
    const e = Z(t) ? Number(t) : NaN;
    return isNaN(e) ? t : e;
  };
let Yr;
const ua = () =>
    Yr ||
    (Yr =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {}),
  uu =
    "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error",
  fu = nt(uu);
function gs(t) {
  if (z(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++) {
      const n = t[s],
        i = Z(n) ? fa(n) : gs(n);
      if (i) for (const o in i) e[o] = i[o];
    }
    return e;
  } else if (Z(t) || de(t)) return t;
}
const du = /;(?![^(]*\))/g,
  pu = /:([^]+)/,
  mu = /\/\*[^]*?\*\//g;
function fa(t) {
  const e = {};
  return (
    t
      .replace(mu, "")
      .split(du)
      .forEach((s) => {
        if (s) {
          const n = s.split(pu);
          n.length > 1 && (e[n[0].trim()] = n[1].trim());
        }
      }),
    e
  );
}
function me(t) {
  let e = "";
  if (Z(t)) e = t;
  else if (z(t))
    for (let s = 0; s < t.length; s++) {
      const n = me(t[s]);
      n && (e += n + " ");
    }
  else if (de(t)) for (const s in t) t[s] && (e += s + " ");
  return e.trim();
}
function gu(t) {
  if (!t) return null;
  let { class: e, style: s } = t;
  return e && !Z(e) && (t.class = me(e)), s && (t.style = gs(s)), t;
}
const yu =
    "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",
  bu =
    "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",
  vu =
    "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",
  _u = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",
  xu = nt(yu),
  wu = nt(bu),
  Su = nt(vu),
  Cu = nt(_u),
  Eu =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Tu = nt(Eu);
function da(t) {
  return !!t || t === "";
}
function ku(t, e) {
  if (t.length !== e.length) return !1;
  let s = !0;
  for (let n = 0; s && n < t.length; n++) s = Yt(t[n], e[n]);
  return s;
}
function Yt(t, e) {
  if (t === e) return !0;
  let s = Gr(t),
    n = Gr(e);
  if (s || n) return s && n ? t.getTime() === e.getTime() : !1;
  if (((s = gt(t)), (n = gt(e)), s || n)) return t === e;
  if (((s = z(t)), (n = z(e)), s || n)) return s && n ? ku(t, e) : !1;
  if (((s = de(t)), (n = de(e)), s || n)) {
    if (!s || !n) return !1;
    const i = Object.keys(t).length,
      o = Object.keys(e).length;
    if (i !== o) return !1;
    for (const r in t) {
      const l = t.hasOwnProperty(r),
        a = e.hasOwnProperty(r);
      if ((l && !a) || (!l && a) || !Yt(t[r], e[r])) return !1;
    }
  }
  return String(t) === String(e);
}
function Oi(t, e) {
  return t.findIndex((s) => Yt(s, e));
}
const we = (t) =>
    Z(t)
      ? t
      : t == null
      ? ""
      : z(t) || (de(t) && (t.toString === ca || !G(t.toString)))
      ? JSON.stringify(t, pa, 2)
      : String(t),
  pa = (t, e) =>
    e && e.__v_isRef
      ? pa(t, e.value)
      : Ms(e)
      ? {
          [`Map(${e.size})`]: [...e.entries()].reduce(
            (s, [n, i], o) => ((s[oo(n, o) + " =>"] = i), s),
            {}
          ),
        }
      : Cs(e)
      ? { [`Set(${e.size})`]: [...e.values()].map((s) => oo(s)) }
      : gt(e)
      ? oo(e)
      : de(e) && !z(e) && !ha(e)
      ? String(e)
      : e,
  oo = (t, e = "") => {
    var s;
    return gt(t) ? `Symbol(${(s = t.description) != null ? s : e})` : t;
  };
/**
 * @vue/reactivity v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Je;
class Qo {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Je),
      !e && Je && (this.index = (Je.scopes || (Je.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const s = Je;
      try {
        return (Je = this), e();
      } finally {
        Je = s;
      }
    }
  }
  on() {
    Je = this;
  }
  off() {
    Je = this.parent;
  }
  stop(e) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !e) {
        const i = this.parent.scopes.pop();
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Au(t) {
  return new Qo(t);
}
function ma(t, e = Je) {
  e && e.active && e.effects.push(t);
}
function ga() {
  return Je;
}
function $u(t) {
  Je && Je.cleanups.push(t);
}
let cs;
class zs {
  constructor(e, s, n, i) {
    (this.fn = e),
      (this.trigger = s),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      ma(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      (this._dirtyLevel = 1), Ts();
      for (let e = 0; e < this._depsLength; e++) {
        const s = this.deps[e];
        if (s.computed && (Nu(s.computed), this._dirtyLevel >= 4)) break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), ks();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let e = Xt,
      s = cs;
    try {
      return (Xt = !0), (cs = this), this._runnings++, Jr(this), this.fn();
    } finally {
      Zr(this), this._runnings--, (cs = s), (Xt = e);
    }
  }
  stop() {
    var e;
    this.active &&
      (Jr(this),
      Zr(this),
      (e = this.onStop) == null || e.call(this),
      (this.active = !1));
  }
}
function Nu(t) {
  return t.value;
}
function Jr(t) {
  t._trackId++, (t._depsLength = 0);
}
function Zr(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++) ya(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function ya(t, e) {
  const s = t.get(e);
  s !== void 0 &&
    e._trackId !== s &&
    (t.delete(e), t.size === 0 && t.cleanup());
}
function Pu(t, e) {
  t.effect instanceof zs && (t = t.effect.fn);
  const s = new zs(t, Ae, () => {
    s.dirty && s.run();
  });
  e && (le(s, e), e.scope && ma(s, e.scope)), (!e || !e.lazy) && s.run();
  const n = s.run.bind(s);
  return (n.effect = s), n;
}
function Lu(t) {
  t.effect.stop();
}
let Xt = !0,
  _o = 0;
const ba = [];
function Ts() {
  ba.push(Xt), (Xt = !1);
}
function ks() {
  const t = ba.pop();
  Xt = t === void 0 ? !0 : t;
}
function er() {
  _o++;
}
function tr() {
  for (_o--; !_o && xo.length; ) xo.shift()();
}
function va(t, e, s) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const n = t.deps[t._depsLength];
    n !== e ? (n && ya(n, t), (t.deps[t._depsLength++] = e)) : t._depsLength++;
  }
}
const xo = [];
function _a(t, e, s) {
  er();
  for (const n of t.keys()) {
    let i;
    n._dirtyLevel < e &&
      (i ?? (i = t.get(n) === n._trackId)) &&
      (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0),
      (n._dirtyLevel = e)),
      n._shouldSchedule &&
        (i ?? (i = t.get(n) === n._trackId)) &&
        (n.trigger(),
        (!n._runnings || n.allowRecurse) &&
          n._dirtyLevel !== 2 &&
          ((n._shouldSchedule = !1), n.scheduler && xo.push(n.scheduler)));
  }
  tr();
}
const xa = (t, e) => {
    const s = new Map();
    return (s.cleanup = t), (s.computed = e), s;
  },
  ui = new WeakMap(),
  hs = Symbol(""),
  wo = Symbol("");
function Ge(t, e, s) {
  if (Xt && cs) {
    let n = ui.get(t);
    n || ui.set(t, (n = new Map()));
    let i = n.get(s);
    i || n.set(s, (i = xa(() => n.delete(s)))), va(cs, i);
  }
}
function Nt(t, e, s, n, i, o) {
  const r = ui.get(t);
  if (!r) return;
  let l = [];
  if (e === "clear") l = [...r.values()];
  else if (s === "length" && z(t)) {
    const a = Number(n);
    r.forEach((c, h) => {
      (h === "length" || (!gt(h) && h >= a)) && l.push(c);
    });
  } else
    switch ((s !== void 0 && l.push(r.get(s)), e)) {
      case "add":
        z(t)
          ? Zo(s) && l.push(r.get("length"))
          : (l.push(r.get(hs)), Ms(t) && l.push(r.get(wo)));
        break;
      case "delete":
        z(t) || (l.push(r.get(hs)), Ms(t) && l.push(r.get(wo)));
        break;
      case "set":
        Ms(t) && l.push(r.get(hs));
        break;
    }
  er();
  for (const a of l) a && _a(a, 4);
  tr();
}
function Ou(t, e) {
  var s;
  return (s = ui.get(t)) == null ? void 0 : s.get(e);
}
const Iu = nt("__proto__,__v_isRef,__isVue"),
  wa = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((t) => t !== "arguments" && t !== "caller")
      .map((t) => Symbol[t])
      .filter(gt)
  ),
  Qr = Mu();
function Mu() {
  const t = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
      t[e] = function (...s) {
        const n = ne(this);
        for (let o = 0, r = this.length; o < r; o++) Ge(n, "get", o + "");
        const i = n[e](...s);
        return i === -1 || i === !1 ? n[e](...s.map(ne)) : i;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      t[e] = function (...s) {
        Ts(), er();
        const n = ne(this)[e].apply(this, s);
        return tr(), ks(), n;
      };
    }),
    t
  );
}
function Ru(t) {
  const e = ne(this);
  return Ge(e, "has", t), e.hasOwnProperty(t);
}
class Sa {
  constructor(e = !1, s = !1) {
    (this._isReadonly = e), (this._isShallow = s);
  }
  get(e, s, n) {
    const i = this._isReadonly,
      o = this._isShallow;
    if (s === "__v_isReactive") return !i;
    if (s === "__v_isReadonly") return i;
    if (s === "__v_isShallow") return o;
    if (s === "__v_raw")
      return n === (i ? (o ? $a : Aa) : o ? ka : Ta).get(e) ||
        Object.getPrototypeOf(e) === Object.getPrototypeOf(n)
        ? e
        : void 0;
    const r = z(e);
    if (!i) {
      if (r && oe(Qr, s)) return Reflect.get(Qr, s, n);
      if (s === "hasOwnProperty") return Ru;
    }
    const l = Reflect.get(e, s, n);
    return (gt(s) ? wa.has(s) : Iu(s)) || (i || Ge(e, "get", s), o)
      ? l
      : Me(l)
      ? r && Zo(s)
        ? l
        : l.value
      : de(l)
      ? i
        ? nr(l)
        : Ri(l)
      : l;
  }
}
class Ca extends Sa {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, s, n, i) {
    let o = e[s];
    if (!this._isShallow) {
      const a = ys(o);
      if (
        (!gn(n) && !ys(n) && ((o = ne(o)), (n = ne(n))),
        !z(e) && Me(o) && !Me(n))
      )
        return a ? !1 : ((o.value = n), !0);
    }
    const r = z(e) && Zo(s) ? Number(s) < e.length : oe(e, s),
      l = Reflect.set(e, s, n, i);
    return (
      e === ne(i) && (r ? yt(n, o) && Nt(e, "set", s, n) : Nt(e, "add", s, n)),
      l
    );
  }
  deleteProperty(e, s) {
    const n = oe(e, s);
    e[s];
    const i = Reflect.deleteProperty(e, s);
    return i && n && Nt(e, "delete", s, void 0), i;
  }
  has(e, s) {
    const n = Reflect.has(e, s);
    return (!gt(s) || !wa.has(s)) && Ge(e, "has", s), n;
  }
  ownKeys(e) {
    return Ge(e, "iterate", z(e) ? "length" : hs), Reflect.ownKeys(e);
  }
}
class Ea extends Sa {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, s) {
    return !0;
  }
  deleteProperty(e, s) {
    return !0;
  }
}
const Fu = new Ca(),
  Du = new Ea(),
  Bu = new Ca(!0),
  Hu = new Ea(!0),
  sr = (t) => t,
  Ii = (t) => Reflect.getPrototypeOf(t);
function Hn(t, e, s = !1, n = !1) {
  t = t.__v_raw;
  const i = ne(t),
    o = ne(e);
  s || (yt(e, o) && Ge(i, "get", e), Ge(i, "get", o));
  const { has: r } = Ii(i),
    l = n ? sr : s ? rr : yn;
  if (r.call(i, e)) return l(t.get(e));
  if (r.call(i, o)) return l(t.get(o));
  t !== i && t.get(e);
}
function Vn(t, e = !1) {
  const s = this.__v_raw,
    n = ne(s),
    i = ne(t);
  return (
    e || (yt(t, i) && Ge(n, "has", t), Ge(n, "has", i)),
    t === i ? s.has(t) : s.has(t) || s.has(i)
  );
}
function qn(t, e = !1) {
  return (
    (t = t.__v_raw), !e && Ge(ne(t), "iterate", hs), Reflect.get(t, "size", t)
  );
}
function el(t) {
  t = ne(t);
  const e = ne(this);
  return Ii(e).has.call(e, t) || (e.add(t), Nt(e, "add", t, t)), this;
}
function tl(t, e) {
  e = ne(e);
  const s = ne(this),
    { has: n, get: i } = Ii(s);
  let o = n.call(s, t);
  o || ((t = ne(t)), (o = n.call(s, t)));
  const r = i.call(s, t);
  return (
    s.set(t, e), o ? yt(e, r) && Nt(s, "set", t, e) : Nt(s, "add", t, e), this
  );
}
function sl(t) {
  const e = ne(this),
    { has: s, get: n } = Ii(e);
  let i = s.call(e, t);
  i || ((t = ne(t)), (i = s.call(e, t))), n && n.call(e, t);
  const o = e.delete(t);
  return i && Nt(e, "delete", t, void 0), o;
}
function nl() {
  const t = ne(this),
    e = t.size !== 0,
    s = t.clear();
  return e && Nt(t, "clear", void 0, void 0), s;
}
function zn(t, e) {
  return function (n, i) {
    const o = this,
      r = o.__v_raw,
      l = ne(r),
      a = e ? sr : t ? rr : yn;
    return (
      !t && Ge(l, "iterate", hs), r.forEach((c, h) => n.call(i, a(c), a(h), o))
    );
  };
}
function jn(t, e, s) {
  return function (...n) {
    const i = this.__v_raw,
      o = ne(i),
      r = Ms(o),
      l = t === "entries" || (t === Symbol.iterator && r),
      a = t === "keys" && r,
      c = i[t](...n),
      h = s ? sr : e ? rr : yn;
    return (
      !e && Ge(o, "iterate", a ? wo : hs),
      {
        next() {
          const { value: u, done: f } = c.next();
          return f
            ? { value: u, done: f }
            : { value: l ? [h(u[0]), h(u[1])] : h(u), done: f };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ft(t) {
  return function (...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Vu() {
  const t = {
      get(o) {
        return Hn(this, o);
      },
      get size() {
        return qn(this);
      },
      has: Vn,
      add: el,
      set: tl,
      delete: sl,
      clear: nl,
      forEach: zn(!1, !1),
    },
    e = {
      get(o) {
        return Hn(this, o, !1, !0);
      },
      get size() {
        return qn(this);
      },
      has: Vn,
      add: el,
      set: tl,
      delete: sl,
      clear: nl,
      forEach: zn(!1, !0),
    },
    s = {
      get(o) {
        return Hn(this, o, !0);
      },
      get size() {
        return qn(this, !0);
      },
      has(o) {
        return Vn.call(this, o, !0);
      },
      add: Ft("add"),
      set: Ft("set"),
      delete: Ft("delete"),
      clear: Ft("clear"),
      forEach: zn(!0, !1),
    },
    n = {
      get(o) {
        return Hn(this, o, !0, !0);
      },
      get size() {
        return qn(this, !0);
      },
      has(o) {
        return Vn.call(this, o, !0);
      },
      add: Ft("add"),
      set: Ft("set"),
      delete: Ft("delete"),
      clear: Ft("clear"),
      forEach: zn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (t[o] = jn(o, !1, !1)),
        (s[o] = jn(o, !0, !1)),
        (e[o] = jn(o, !1, !0)),
        (n[o] = jn(o, !0, !0));
    }),
    [t, s, e, n]
  );
}
const [qu, zu, ju, Uu] = Vu();
function Mi(t, e) {
  const s = e ? (t ? Uu : ju) : t ? zu : qu;
  return (n, i, o) =>
    i === "__v_isReactive"
      ? !t
      : i === "__v_isReadonly"
      ? t
      : i === "__v_raw"
      ? n
      : Reflect.get(oe(s, i) && i in n ? s : n, i, o);
}
const Wu = { get: Mi(!1, !1) },
  Ku = { get: Mi(!1, !0) },
  Xu = { get: Mi(!0, !1) },
  Gu = { get: Mi(!0, !0) },
  Ta = new WeakMap(),
  ka = new WeakMap(),
  Aa = new WeakMap(),
  $a = new WeakMap();
function Yu(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ju(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Yu(lu(t));
}
function Ri(t) {
  return ys(t) ? t : Fi(t, !1, Fu, Wu, Ta);
}
function Na(t) {
  return Fi(t, !1, Bu, Ku, ka);
}
function nr(t) {
  return Fi(t, !0, Du, Xu, Aa);
}
function Zu(t) {
  return Fi(t, !0, Hu, Gu, $a);
}
function Fi(t, e, s, n, i) {
  if (!de(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t;
  const o = i.get(t);
  if (o) return o;
  const r = Ju(t);
  if (r === 0) return t;
  const l = new Proxy(t, r === 2 ? n : s);
  return i.set(t, l), l;
}
function us(t) {
  return ys(t) ? us(t.__v_raw) : !!(t && t.__v_isReactive);
}
function ys(t) {
  return !!(t && t.__v_isReadonly);
}
function gn(t) {
  return !!(t && t.__v_isShallow);
}
function ir(t) {
  return us(t) || ys(t);
}
function ne(t) {
  const e = t && t.__v_raw;
  return e ? ne(e) : t;
}
function or(t) {
  return Object.isExtensible(t) && ci(t, "__v_skip", !0), t;
}
const yn = (t) => (de(t) ? Ri(t) : t),
  rr = (t) => (de(t) ? nr(t) : t);
class Pa {
  constructor(e, s, n, i) {
    (this.getter = e),
      (this._setter = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new zs(
        () => e(this._value),
        () => Ds(this, this.effect._dirtyLevel === 2 ? 2 : 3)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = n);
  }
  get value() {
    const e = ne(this);
    return (
      (!e._cacheable || e.effect.dirty) &&
        yt(e._value, (e._value = e.effect.run())) &&
        Ds(e, 4),
      lr(e),
      e.effect._dirtyLevel >= 2 && Ds(e, 2),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
}
function Qu(t, e, s = !1) {
  let n, i;
  const o = G(t);
  return (
    o ? ((n = t), (i = Ae)) : ((n = t.get), (i = t.set)),
    new Pa(n, i, o || !i, s)
  );
}
function lr(t) {
  var e;
  Xt &&
    cs &&
    ((t = ne(t)),
    va(
      cs,
      (e = t.dep) != null
        ? e
        : (t.dep = xa(() => (t.dep = void 0), t instanceof Pa ? t : void 0))
    ));
}
function Ds(t, e = 4, s) {
  t = ne(t);
  const n = t.dep;
  n && _a(n, e);
}
function Me(t) {
  return !!(t && t.__v_isRef === !0);
}
function ln(t) {
  return La(t, !1);
}
function ef(t) {
  return La(t, !0);
}
function La(t, e) {
  return Me(t) ? t : new tf(t, e);
}
class tf {
  constructor(e, s) {
    (this.__v_isShallow = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = s ? e : ne(e)),
      (this._value = s ? e : yn(e));
  }
  get value() {
    return lr(this), this._value;
  }
  set value(e) {
    const s = this.__v_isShallow || gn(e) || ys(e);
    (e = s ? e : ne(e)),
      yt(e, this._rawValue) &&
        ((this._rawValue = e), (this._value = s ? e : yn(e)), Ds(this, 4));
  }
}
function sf(t) {
  Ds(t, 4);
}
function ar(t) {
  return Me(t) ? t.value : t;
}
function nf(t) {
  return G(t) ? t() : ar(t);
}
const of = {
  get: (t, e, s) => ar(Reflect.get(t, e, s)),
  set: (t, e, s, n) => {
    const i = t[e];
    return Me(i) && !Me(s) ? ((i.value = s), !0) : Reflect.set(t, e, s, n);
  },
};
function cr(t) {
  return us(t) ? t : new Proxy(t, of);
}
class rf {
  constructor(e) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: s, set: n } = e(
      () => lr(this),
      () => Ds(this)
    );
    (this._get = s), (this._set = n);
  }
  get value() {
    return this._get();
  }
  set value(e) {
    this._set(e);
  }
}
function Oa(t) {
  return new rf(t);
}
function lf(t) {
  const e = z(t) ? new Array(t.length) : {};
  for (const s in t) e[s] = Ia(t, s);
  return e;
}
class af {
  constructor(e, s, n) {
    (this._object = e),
      (this._key = s),
      (this._defaultValue = n),
      (this.__v_isRef = !0);
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return Ou(ne(this._object), this._key);
  }
}
class cf {
  constructor(e) {
    (this._getter = e), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function hf(t, e, s) {
  return Me(t)
    ? t
    : G(t)
    ? new cf(t)
    : de(t) && arguments.length > 1
    ? Ia(t, e, s)
    : ln(t);
}
function Ia(t, e, s) {
  const n = t[e];
  return Me(n) ? n : new af(t, e, s);
}
const uf = { GET: "get", HAS: "has", ITERATE: "iterate" },
  ff = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" };
/**
 * @vue/runtime-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function df(t, e) {}
const pf = {
    SETUP_FUNCTION: 0,
    0: "SETUP_FUNCTION",
    RENDER_FUNCTION: 1,
    1: "RENDER_FUNCTION",
    WATCH_GETTER: 2,
    2: "WATCH_GETTER",
    WATCH_CALLBACK: 3,
    3: "WATCH_CALLBACK",
    WATCH_CLEANUP: 4,
    4: "WATCH_CLEANUP",
    NATIVE_EVENT_HANDLER: 5,
    5: "NATIVE_EVENT_HANDLER",
    COMPONENT_EVENT_HANDLER: 6,
    6: "COMPONENT_EVENT_HANDLER",
    VNODE_HOOK: 7,
    7: "VNODE_HOOK",
    DIRECTIVE_HOOK: 8,
    8: "DIRECTIVE_HOOK",
    TRANSITION_HOOK: 9,
    9: "TRANSITION_HOOK",
    APP_ERROR_HANDLER: 10,
    10: "APP_ERROR_HANDLER",
    APP_WARN_HANDLER: 11,
    11: "APP_WARN_HANDLER",
    FUNCTION_REF: 12,
    12: "FUNCTION_REF",
    ASYNC_COMPONENT_LOADER: 13,
    13: "ASYNC_COMPONENT_LOADER",
    SCHEDULER: 14,
    14: "SCHEDULER",
  },
  mf = {
    sp: "serverPrefetch hook",
    bc: "beforeCreate hook",
    c: "created hook",
    bm: "beforeMount hook",
    m: "mounted hook",
    bu: "beforeUpdate hook",
    u: "updated",
    bum: "beforeUnmount hook",
    um: "unmounted hook",
    a: "activated hook",
    da: "deactivated hook",
    ec: "errorCaptured hook",
    rtc: "renderTracked hook",
    rtg: "renderTriggered hook",
    0: "setup function",
    1: "render function",
    2: "watcher getter",
    3: "watcher callback",
    4: "watcher cleanup function",
    5: "native event handler",
    6: "component event handler",
    7: "vnode hook",
    8: "directive hook",
    9: "transition hook",
    10: "app errorHandler",
    11: "app warnHandler",
    12: "ref function",
    13: "async component loader",
    14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core .",
  };
function Pt(t, e, s, n) {
  try {
    return n ? t(...n) : t();
  } catch (i) {
    As(i, e, s);
  }
}
function st(t, e, s, n) {
  if (G(t)) {
    const o = Pt(t, e, s, n);
    return (
      o &&
        Jo(o) &&
        o.catch((r) => {
          As(r, e, s);
        }),
      o
    );
  }
  const i = [];
  for (let o = 0; o < t.length; o++) i.push(st(t[o], e, s, n));
  return i;
}
function As(t, e, s, n = !0) {
  const i = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const r = e.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](t, r, l) === !1) return;
      }
      o = o.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      Pt(a, null, 10, [t, r, l]);
      return;
    }
  }
  gf(t, s, i, n);
}
function gf(t, e, s, n = !0) {
  console.error(t);
}
let bn = !1,
  So = !1;
const De = [];
let xt = 0;
const Bs = [];
let qt = null,
  os = 0;
const Ma = Promise.resolve();
let hr = null;
function Di(t) {
  const e = hr || Ma;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function yf(t) {
  let e = xt + 1,
    s = De.length;
  for (; e < s; ) {
    const n = (e + s) >>> 1,
      i = De[n],
      o = vn(i);
    o < t || (o === t && i.pre) ? (e = n + 1) : (s = n);
  }
  return e;
}
function Bi(t) {
  (!De.length || !De.includes(t, bn && t.allowRecurse ? xt + 1 : xt)) &&
    (t.id == null ? De.push(t) : De.splice(yf(t.id), 0, t), Ra());
}
function Ra() {
  !bn && !So && ((So = !0), (hr = Ma.then(Fa)));
}
function bf(t) {
  const e = De.indexOf(t);
  e > xt && De.splice(e, 1);
}
function fi(t) {
  z(t)
    ? Bs.push(...t)
    : (!qt || !qt.includes(t, t.allowRecurse ? os + 1 : os)) && Bs.push(t),
    Ra();
}
function il(t, e, s = bn ? xt + 1 : 0) {
  for (; s < De.length; s++) {
    const n = De[s];
    if (n && n.pre) {
      if (t && n.id !== t.uid) continue;
      De.splice(s, 1), s--, n();
    }
  }
}
function di(t) {
  if (Bs.length) {
    const e = [...new Set(Bs)].sort((s, n) => vn(s) - vn(n));
    if (((Bs.length = 0), qt)) {
      qt.push(...e);
      return;
    }
    for (qt = e, os = 0; os < qt.length; os++) qt[os]();
    (qt = null), (os = 0);
  }
}
const vn = (t) => (t.id == null ? 1 / 0 : t.id),
  vf = (t, e) => {
    const s = vn(t) - vn(e);
    if (s === 0) {
      if (t.pre && !e.pre) return -1;
      if (e.pre && !t.pre) return 1;
    }
    return s;
  };
function Fa(t) {
  (So = !1), (bn = !0), De.sort(vf);
  try {
    for (xt = 0; xt < De.length; xt++) {
      const e = De[xt];
      e && e.active !== !1 && Pt(e, null, 14);
    }
  } finally {
    (xt = 0),
      (De.length = 0),
      di(),
      (bn = !1),
      (hr = null),
      (De.length || Bs.length) && Fa();
  }
}
let Os,
  Un = [];
function Da(t, e) {
  var s, n;
  (Os = t),
    Os
      ? ((Os.enabled = !0),
        Un.forEach(({ event: i, args: o }) => Os.emit(i, ...o)),
        (Un = []))
      : typeof window < "u" &&
        window.HTMLElement &&
        !(
          (n = (s = window.navigator) == null ? void 0 : s.userAgent) != null &&
          n.includes("jsdom")
        )
      ? ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ =
          e.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
          Da(o, e);
        }),
        setTimeout(() => {
          Os || ((e.__VUE_DEVTOOLS_HOOK_REPLAY__ = null), (Un = []));
        }, 3e3))
      : (Un = []);
}
function _f(t, e, ...s) {
  if (t.isUnmounted) return;
  const n = t.vnode.props || ae;
  let i = s;
  const o = e.startsWith("update:"),
    r = o && e.slice(7);
  if (r && r in n) {
    const h = `${r === "modelValue" ? "model" : r}Modifiers`,
      { number: u, trim: f } = n[h] || ae;
    f && (i = s.map((d) => (Z(d) ? d.trim() : d))), u && (i = s.map(mn));
  }
  let l,
    a = n[(l = Rs(e))] || n[(l = Rs(be(e)))];
  !a && o && (a = n[(l = Rs(tt(e)))]), a && st(a, t, 6, i);
  const c = n[l + "Once"];
  if (c) {
    if (!t.emitted) t.emitted = {};
    else if (t.emitted[l]) return;
    (t.emitted[l] = !0), st(c, t, 6, i);
  }
}
function Ba(t, e, s = !1) {
  const n = e.emitsCache,
    i = n.get(t);
  if (i !== void 0) return i;
  const o = t.emits;
  let r = {},
    l = !1;
  if (!G(t)) {
    const a = (c) => {
      const h = Ba(c, e, !0);
      h && ((l = !0), le(r, h));
    };
    !s && e.mixins.length && e.mixins.forEach(a),
      t.extends && a(t.extends),
      t.mixins && t.mixins.forEach(a);
  }
  return !o && !l
    ? (de(t) && n.set(t, null), null)
    : (z(o) ? o.forEach((a) => (r[a] = null)) : le(r, o),
      de(t) && n.set(t, r),
      r);
}
function Hi(t, e) {
  return !t || !Ss(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, "")),
      oe(t, e[0].toLowerCase() + e.slice(1)) || oe(t, tt(e)) || oe(t, e));
}
let Ce = null,
  Vi = null;
function _n(t) {
  const e = Ce;
  return (Ce = t), (Vi = (t && t.type.__scopeId) || null), e;
}
function xf(t) {
  Vi = t;
}
function wf() {
  Vi = null;
}
const Sf = (t) => pt;
function pt(t, e = Ce, s) {
  if (!e || t._n) return t;
  const n = (...i) => {
    n._d && Lo(-1);
    const o = _n(e);
    let r;
    try {
      r = t(...i);
    } finally {
      _n(o), n._d && Lo(1);
    }
    return r;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function si(t) {
  const {
    type: e,
    vnode: s,
    proxy: n,
    withProxy: i,
    props: o,
    propsOptions: [r],
    slots: l,
    attrs: a,
    emit: c,
    render: h,
    renderCache: u,
    data: f,
    setupState: d,
    ctx: m,
    inheritAttrs: w,
  } = t;
  let $, O;
  const T = _n(t);
  try {
    if (s.shapeFlag & 4) {
      const _ = i || n,
        S = _;
      ($ = et(h.call(S, _, u, o, d, f, m))), (O = a);
    } else {
      const _ = e;
      ($ = et(
        _.length > 1 ? _(o, { attrs: a, slots: l, emit: c }) : _(o, null)
      )),
        (O = e.props ? a : Ef(a));
    }
  } catch (_) {
    (fn.length = 0), As(_, t, 1), ($ = re(Be));
  }
  let y = $;
  if (O && w !== !1) {
    const _ = Object.keys(O),
      { shapeFlag: S } = y;
    _.length && S & 7 && (r && _.some(Go) && (O = Tf(O, r)), (y = St(y, O)));
  }
  return (
    s.dirs && ((y = St(y)), (y.dirs = y.dirs ? y.dirs.concat(s.dirs) : s.dirs)),
    s.transition && (y.transition = s.transition),
    ($ = y),
    _n(T),
    $
  );
}
function Cf(t, e = !0) {
  let s;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (Jt(i)) {
      if (i.type !== Be || i.children === "v-if") {
        if (s) return;
        s = i;
      }
    } else return;
  }
  return s;
}
const Ef = (t) => {
    let e;
    for (const s in t)
      (s === "class" || s === "style" || Ss(s)) && ((e || (e = {}))[s] = t[s]);
    return e;
  },
  Tf = (t, e) => {
    const s = {};
    for (const n in t) (!Go(n) || !(n.slice(9) in e)) && (s[n] = t[n]);
    return s;
  };
function kf(t, e, s) {
  const { props: n, children: i, component: o } = t,
    { props: r, children: l, patchFlag: a } = e,
    c = o.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (s && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return n ? ol(n, r, c) : !!r;
    if (a & 8) {
      const h = e.dynamicProps;
      for (let u = 0; u < h.length; u++) {
        const f = h[u];
        if (r[f] !== n[f] && !Hi(c, f)) return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable)
      ? !0
      : n === r
      ? !1
      : n
      ? r
        ? ol(n, r, c)
        : !0
      : !!r;
  return !1;
}
function ol(t, e, s) {
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length) return !0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (e[o] !== t[o] && !Hi(s, o)) return !0;
  }
  return !1;
}
function ur({ vnode: t, parent: e }, s) {
  for (; e; ) {
    const n = e.subTree;
    if ((n.suspense && n.suspense.activeBranch === t && (n.el = t.el), n === t))
      ((t = e.vnode).el = s), (e = e.parent);
    else break;
  }
}
const fr = "components",
  Af = "directives";
function $n(t, e) {
  return dr(fr, t, !0, e) || t;
}
const Ha = Symbol.for("v-ndc");
function $f(t) {
  return Z(t) ? dr(fr, t, !1) || t : t || Ha;
}
function Va(t) {
  return dr(Af, t);
}
function dr(t, e, s = !0, n = !1) {
  const i = Ce || ke;
  if (i) {
    const o = i.type;
    if (t === fr) {
      const l = Fo(o, !1);
      if (l && (l === e || l === be(e) || l === Es(be(e)))) return o;
    }
    const r = rl(i[t] || o[t], e) || rl(i.appContext[t], e);
    return !r && n ? o : r;
  }
}
function rl(t, e) {
  return t && (t[e] || t[be(e)] || t[Es(be(e))]);
}
const qa = (t) => t.__isSuspense;
let Co = 0;
const Nf = {
    name: "Suspense",
    __isSuspense: !0,
    process(t, e, s, n, i, o, r, l, a, c) {
      if (t == null) Lf(e, s, n, i, o, r, l, a, c);
      else {
        if (o && o.deps > 0 && !t.suspense.isInFallback) {
          (e.suspense = t.suspense), (e.suspense.vnode = e), (e.el = t.el);
          return;
        }
        Of(t, e, s, n, i, r, l, a, c);
      }
    },
    hydrate: If,
    create: pr,
    normalize: Mf,
  },
  Pf = Nf;
function xn(t, e) {
  const s = t.props && t.props[e];
  G(s) && s();
}
function Lf(t, e, s, n, i, o, r, l, a) {
  const {
      p: c,
      o: { createElement: h },
    } = a,
    u = h("div"),
    f = (t.suspense = pr(t, i, n, e, u, s, o, r, l, a));
  c(null, (f.pendingBranch = t.ssContent), u, null, n, f, o, r),
    f.deps > 0
      ? (xn(t, "onPending"),
        xn(t, "onFallback"),
        c(null, t.ssFallback, e, s, n, null, o, r),
        Hs(f, t.ssFallback))
      : f.resolve(!1, !0);
}
function Of(t, e, s, n, i, o, r, l, { p: a, um: c, o: { createElement: h } }) {
  const u = (e.suspense = t.suspense);
  (u.vnode = e), (e.el = t.el);
  const f = e.ssContent,
    d = e.ssFallback,
    { activeBranch: m, pendingBranch: w, isInFallback: $, isHydrating: O } = u;
  if (w)
    (u.pendingBranch = f),
      dt(f, w)
        ? (a(w, f, u.hiddenContainer, null, i, u, o, r, l),
          u.deps <= 0
            ? u.resolve()
            : $ && (O || (a(m, d, s, n, i, null, o, r, l), Hs(u, d))))
        : ((u.pendingId = Co++),
          O ? ((u.isHydrating = !1), (u.activeBranch = w)) : c(w, i, u),
          (u.deps = 0),
          (u.effects.length = 0),
          (u.hiddenContainer = h("div")),
          $
            ? (a(null, f, u.hiddenContainer, null, i, u, o, r, l),
              u.deps <= 0
                ? u.resolve()
                : (a(m, d, s, n, i, null, o, r, l), Hs(u, d)))
            : m && dt(f, m)
            ? (a(m, f, s, n, i, u, o, r, l), u.resolve(!0))
            : (a(null, f, u.hiddenContainer, null, i, u, o, r, l),
              u.deps <= 0 && u.resolve()));
  else if (m && dt(f, m)) a(m, f, s, n, i, u, o, r, l), Hs(u, f);
  else if (
    (xn(e, "onPending"),
    (u.pendingBranch = f),
    f.shapeFlag & 512
      ? (u.pendingId = f.component.suspenseId)
      : (u.pendingId = Co++),
    a(null, f, u.hiddenContainer, null, i, u, o, r, l),
    u.deps <= 0)
  )
    u.resolve();
  else {
    const { timeout: T, pendingId: y } = u;
    T > 0
      ? setTimeout(() => {
          u.pendingId === y && u.fallback(d);
        }, T)
      : T === 0 && u.fallback(d);
  }
}
function pr(t, e, s, n, i, o, r, l, a, c, h = !1) {
  const {
    p: u,
    m: f,
    um: d,
    n: m,
    o: { parentNode: w, remove: $ },
  } = c;
  let O;
  const T = Rf(t);
  T && e != null && e.pendingBranch && ((O = e.pendingId), e.deps++);
  const y = t.props ? hi(t.props.timeout) : void 0,
    _ = o,
    S = {
      vnode: t,
      parent: e,
      parentComponent: s,
      namespace: r,
      container: n,
      hiddenContainer: i,
      deps: 0,
      pendingId: Co++,
      timeout: typeof y == "number" ? y : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !h,
      isHydrating: h,
      isUnmounted: !1,
      effects: [],
      resolve(k = !1, M = !1) {
        const {
          vnode: v,
          activeBranch: E,
          pendingBranch: x,
          pendingId: N,
          effects: C,
          parentComponent: R,
          container: V,
        } = S;
        let Y = !1;
        S.isHydrating
          ? (S.isHydrating = !1)
          : k ||
            ((Y = E && x.transition && x.transition.mode === "out-in"),
            Y &&
              (E.transition.afterLeave = () => {
                N === S.pendingId && (f(x, V, o === _ ? m(E) : o, 0), fi(C));
              }),
            E && (w(E.el) !== S.hiddenContainer && (o = m(E)), d(E, R, S, !0)),
            Y || f(x, V, o, 0)),
          Hs(S, x),
          (S.pendingBranch = null),
          (S.isInFallback = !1);
        let H = S.parent,
          K = !1;
        for (; H; ) {
          if (H.pendingBranch) {
            H.effects.push(...C), (K = !0);
            break;
          }
          H = H.parent;
        }
        !K && !Y && fi(C),
          (S.effects = []),
          T &&
            e &&
            e.pendingBranch &&
            O === e.pendingId &&
            (e.deps--, e.deps === 0 && !M && e.resolve()),
          xn(v, "onResolve");
      },
      fallback(k) {
        if (!S.pendingBranch) return;
        const {
          vnode: M,
          activeBranch: v,
          parentComponent: E,
          container: x,
          namespace: N,
        } = S;
        xn(M, "onFallback");
        const C = m(v),
          R = () => {
            S.isInFallback && (u(null, k, x, C, E, null, N, l, a), Hs(S, k));
          },
          V = k.transition && k.transition.mode === "out-in";
        V && (v.transition.afterLeave = R),
          (S.isInFallback = !0),
          d(v, E, null, !0),
          V || R();
      },
      move(k, M, v) {
        S.activeBranch && f(S.activeBranch, k, M, v), (S.container = k);
      },
      next() {
        return S.activeBranch && m(S.activeBranch);
      },
      registerDep(k, M) {
        const v = !!S.pendingBranch;
        v && S.deps++;
        const E = k.vnode.el;
        k.asyncDep
          .catch((x) => {
            As(x, k, 0);
          })
          .then((x) => {
            if (k.isUnmounted || S.isUnmounted || S.pendingId !== k.suspenseId)
              return;
            k.asyncResolved = !0;
            const { vnode: N } = k;
            Mo(k, x, !1), E && (N.el = E);
            const C = !E && k.subTree.el;
            M(k, N, w(E || k.subTree.el), E ? null : m(k.subTree), S, r, a),
              C && $(C),
              ur(k, N.el),
              v && --S.deps === 0 && S.resolve();
          });
      },
      unmount(k, M) {
        (S.isUnmounted = !0),
          S.activeBranch && d(S.activeBranch, s, k, M),
          S.pendingBranch && d(S.pendingBranch, s, k, M);
      },
    };
  return S;
}
function If(t, e, s, n, i, o, r, l, a) {
  const c = (e.suspense = pr(
      e,
      n,
      s,
      t.parentNode,
      document.createElement("div"),
      null,
      i,
      o,
      r,
      l,
      !0
    )),
    h = a(t, (c.pendingBranch = e.ssContent), s, c, o, r);
  return c.deps === 0 && c.resolve(!1, !0), h;
}
function Mf(t) {
  const { shapeFlag: e, children: s } = t,
    n = e & 32;
  (t.ssContent = ll(n ? s.default : s)),
    (t.ssFallback = n ? ll(s.fallback) : re(Be));
}
function ll(t) {
  let e;
  if (G(t)) {
    const s = _s && t._c;
    s && ((t._d = !1), se()), (t = t()), s && ((t._d = !0), (e = We), wc());
  }
  return (
    z(t) && (t = Cf(t)),
    (t = et(t)),
    e && !t.dynamicChildren && (t.dynamicChildren = e.filter((s) => s !== t)),
    t
  );
}
function za(t, e) {
  e && e.pendingBranch
    ? z(t)
      ? e.effects.push(...t)
      : e.effects.push(t)
    : fi(t);
}
function Hs(t, e) {
  t.activeBranch = e;
  const { vnode: s, parentComponent: n } = t;
  let i = e.el;
  for (; !i && e.component; ) (e = e.component.subTree), (i = e.el);
  (s.el = i), n && n.subTree === s && ((n.vnode.el = i), ur(n, i));
}
function Rf(t) {
  var e;
  return (
    ((e = t.props) == null ? void 0 : e.suspensible) != null &&
    t.props.suspensible !== !1
  );
}
const ja = Symbol.for("v-scx"),
  Ua = () => hn(ja);
function Ff(t, e) {
  return Nn(t, null, e);
}
function Wa(t, e) {
  return Nn(t, null, { flush: "post" });
}
function Ka(t, e) {
  return Nn(t, null, { flush: "sync" });
}
const Wn = {};
function an(t, e, s) {
  return Nn(t, e, s);
}
function Nn(
  t,
  e,
  { immediate: s, deep: n, flush: i, once: o, onTrack: r, onTrigger: l } = ae
) {
  if (e && o) {
    const k = e;
    e = (...M) => {
      k(...M), S();
    };
  }
  const a = ke,
    c = (k) => (n === !0 ? k : rs(k, n === !1 ? 1 : void 0));
  let h,
    u = !1,
    f = !1;
  if (
    (Me(t)
      ? ((h = () => t.value), (u = gn(t)))
      : us(t)
      ? ((h = () => c(t)), (u = !0))
      : z(t)
      ? ((f = !0),
        (u = t.some((k) => us(k) || gn(k))),
        (h = () =>
          t.map((k) => {
            if (Me(k)) return k.value;
            if (us(k)) return c(k);
            if (G(k)) return Pt(k, a, 2);
          })))
      : G(t)
      ? e
        ? (h = () => Pt(t, a, 2))
        : (h = () => (d && d(), st(t, a, 3, [m])))
      : (h = Ae),
    e && n)
  ) {
    const k = h;
    h = () => rs(k());
  }
  let d,
    m = (k) => {
      d = y.onStop = () => {
        Pt(k, a, 4), (d = y.onStop = void 0);
      };
    },
    w;
  if (On)
    if (
      ((m = Ae),
      e ? s && st(e, a, 3, [h(), f ? [] : void 0, m]) : h(),
      i === "sync")
    ) {
      const k = Ua();
      w = k.__watcherHandles || (k.__watcherHandles = []);
    } else return Ae;
  let $ = f ? new Array(t.length).fill(Wn) : Wn;
  const O = () => {
    if (!(!y.active || !y.dirty))
      if (e) {
        const k = y.run();
        (n || u || (f ? k.some((M, v) => yt(M, $[v])) : yt(k, $))) &&
          (d && d(),
          st(e, a, 3, [k, $ === Wn ? void 0 : f && $[0] === Wn ? [] : $, m]),
          ($ = k));
      } else y.run();
  };
  O.allowRecurse = !!e;
  let T;
  i === "sync"
    ? (T = O)
    : i === "post"
    ? (T = () => Oe(O, a && a.suspense))
    : ((O.pre = !0), a && (O.id = a.uid), (T = () => Bi(O)));
  const y = new zs(h, Ae, T),
    _ = ga(),
    S = () => {
      y.stop(), _ && Yo(_.effects, y);
    };
  return (
    e
      ? s
        ? O()
        : ($ = y.run())
      : i === "post"
      ? Oe(y.run.bind(y), a && a.suspense)
      : y.run(),
    w && w.push(S),
    S
  );
}
function Df(t, e, s) {
  const n = this.proxy,
    i = Z(t) ? (t.includes(".") ? Xa(n, t) : () => n[t]) : t.bind(n, n);
  let o;
  G(e) ? (o = e) : ((o = e.handler), (s = e));
  const r = xs(this),
    l = Nn(i, o.bind(n), s);
  return r(), l;
}
function Xa(t, e) {
  const s = e.split(".");
  return () => {
    let n = t;
    for (let i = 0; i < s.length && n; i++) n = n[s[i]];
    return n;
  };
}
function rs(t, e, s = 0, n) {
  if (!de(t) || t.__v_skip) return t;
  if (e && e > 0) {
    if (s >= e) return t;
    s++;
  }
  if (((n = n || new Set()), n.has(t))) return t;
  if ((n.add(t), Me(t))) rs(t.value, e, s, n);
  else if (z(t)) for (let i = 0; i < t.length; i++) rs(t[i], e, s, n);
  else if (Cs(t) || Ms(t))
    t.forEach((i) => {
      rs(i, e, s, n);
    });
  else if (ha(t)) for (const i in t) rs(t[i], e, s, n);
  return t;
}
function ce(t, e) {
  if (Ce === null) return t;
  const s = Gi(Ce) || Ce.proxy,
    n = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [o, r, l, a = ae] = e[i];
    o &&
      (G(o) && (o = { mounted: o, updated: o }),
      o.deep && rs(r),
      n.push({
        dir: o,
        instance: s,
        value: r,
        oldValue: void 0,
        arg: l,
        modifiers: a,
      }));
  }
  return t;
}
function _t(t, e, s, n) {
  const i = t.dirs,
    o = e && e.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[n];
    a && (Ts(), st(a, s, 8, [t.el, l, t, e]), ks());
  }
}
const zt = Symbol("_leaveCb"),
  Kn = Symbol("_enterCb");
function mr() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Ln(() => {
      t.isMounted = !0;
    }),
    Ui(() => {
      t.isUnmounting = !0;
    }),
    t
  );
}
const ot = [Function, Array],
  gr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: ot,
    onEnter: ot,
    onAfterEnter: ot,
    onEnterCancelled: ot,
    onBeforeLeave: ot,
    onLeave: ot,
    onAfterLeave: ot,
    onLeaveCancelled: ot,
    onBeforeAppear: ot,
    onAppear: ot,
    onAfterAppear: ot,
    onAppearCancelled: ot,
  },
  Bf = {
    name: "BaseTransition",
    props: gr,
    setup(t, { slots: e }) {
      const s = It(),
        n = mr();
      return () => {
        const i = e.default && qi(e.default(), !0);
        if (!i || !i.length) return;
        let o = i[0];
        if (i.length > 1) {
          for (const f of i)
            if (f.type !== Be) {
              o = f;
              break;
            }
        }
        const r = ne(t),
          { mode: l } = r;
        if (n.isLeaving) return ro(o);
        const a = al(o);
        if (!a) return ro(o);
        const c = js(a, r, n, s);
        bs(a, c);
        const h = s.subTree,
          u = h && al(h);
        if (u && u.type !== Be && !dt(a, u)) {
          const f = js(u, r, n, s);
          if ((bs(u, f), l === "out-in"))
            return (
              (n.isLeaving = !0),
              (f.afterLeave = () => {
                (n.isLeaving = !1),
                  s.update.active !== !1 && ((s.effect.dirty = !0), s.update());
              }),
              ro(o)
            );
          l === "in-out" &&
            a.type !== Be &&
            (f.delayLeave = (d, m, w) => {
              const $ = Ya(n, u);
              ($[String(u.key)] = u),
                (d[zt] = () => {
                  m(), (d[zt] = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = w);
            });
        }
        return o;
      };
    },
  },
  Ga = Bf;
function Ya(t, e) {
  const { leavingVNodes: s } = t;
  let n = s.get(e.type);
  return n || ((n = Object.create(null)), s.set(e.type, n)), n;
}
function js(t, e, s, n) {
  const {
      appear: i,
      mode: o,
      persisted: r = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: h,
      onBeforeLeave: u,
      onLeave: f,
      onAfterLeave: d,
      onLeaveCancelled: m,
      onBeforeAppear: w,
      onAppear: $,
      onAfterAppear: O,
      onAppearCancelled: T,
    } = e,
    y = String(t.key),
    _ = Ya(s, t),
    S = (v, E) => {
      v && st(v, n, 9, E);
    },
    k = (v, E) => {
      const x = E[1];
      S(v, E),
        z(v) ? v.every((N) => N.length <= 1) && x() : v.length <= 1 && x();
    },
    M = {
      mode: o,
      persisted: r,
      beforeEnter(v) {
        let E = l;
        if (!s.isMounted)
          if (i) E = w || l;
          else return;
        v[zt] && v[zt](!0);
        const x = _[y];
        x && dt(t, x) && x.el[zt] && x.el[zt](), S(E, [v]);
      },
      enter(v) {
        let E = a,
          x = c,
          N = h;
        if (!s.isMounted)
          if (i) (E = $ || a), (x = O || c), (N = T || h);
          else return;
        let C = !1;
        const R = (v[Kn] = (V) => {
          C ||
            ((C = !0),
            V ? S(N, [v]) : S(x, [v]),
            M.delayedLeave && M.delayedLeave(),
            (v[Kn] = void 0));
        });
        E ? k(E, [v, R]) : R();
      },
      leave(v, E) {
        const x = String(t.key);
        if ((v[Kn] && v[Kn](!0), s.isUnmounting)) return E();
        S(u, [v]);
        let N = !1;
        const C = (v[zt] = (R) => {
          N ||
            ((N = !0),
            E(),
            R ? S(m, [v]) : S(d, [v]),
            (v[zt] = void 0),
            _[x] === t && delete _[x]);
        });
        (_[x] = t), f ? k(f, [v, C]) : C();
      },
      clone(v) {
        return js(v, e, s, n);
      },
    };
  return M;
}
function ro(t) {
  if (Pn(t)) return (t = St(t)), (t.children = null), t;
}
function al(t) {
  return Pn(t) ? (t.children ? t.children[0] : void 0) : t;
}
function bs(t, e) {
  t.shapeFlag & 6 && t.component
    ? bs(t.component.subTree, e)
    : t.shapeFlag & 128
    ? ((t.ssContent.transition = e.clone(t.ssContent)),
      (t.ssFallback.transition = e.clone(t.ssFallback)))
    : (t.transition = e);
}
function qi(t, e = !1, s) {
  let n = [],
    i = 0;
  for (let o = 0; o < t.length; o++) {
    let r = t[o];
    const l = s == null ? r.key : String(s) + String(r.key != null ? r.key : o);
    r.type === fe
      ? (r.patchFlag & 128 && i++, (n = n.concat(qi(r.children, e, l))))
      : (e || r.type !== Be) && n.push(l != null ? St(r, { key: l }) : r);
  }
  if (i > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
  return n;
}
/*! #__NO_SIDE_EFFECTS__ */ function yr(t, e) {
  return G(t) ? le({ name: t.name }, e, { setup: t }) : t;
}
const fs = (t) => !!t.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */ function Hf(t) {
  G(t) && (t = { loader: t });
  const {
    loader: e,
    loadingComponent: s,
    errorComponent: n,
    delay: i = 200,
    timeout: o,
    suspensible: r = !0,
    onError: l,
  } = t;
  let a = null,
    c,
    h = 0;
  const u = () => (h++, (a = null), f()),
    f = () => {
      let d;
      return (
        a ||
        (d = a =
          e()
            .catch((m) => {
              if (((m = m instanceof Error ? m : new Error(String(m))), l))
                return new Promise((w, $) => {
                  l(
                    m,
                    () => w(u()),
                    () => $(m),
                    h + 1
                  );
                });
              throw m;
            })
            .then((m) =>
              d !== a && a
                ? a
                : (m &&
                    (m.__esModule || m[Symbol.toStringTag] === "Module") &&
                    (m = m.default),
                  (c = m),
                  m)
            ))
      );
    };
  return yr({
    name: "AsyncComponentWrapper",
    __asyncLoader: f,
    get __asyncResolved() {
      return c;
    },
    setup() {
      const d = ke;
      if (c) return () => lo(c, d);
      const m = (T) => {
        (a = null), As(T, d, 13, !n);
      };
      if ((r && d.suspense) || On)
        return f()
          .then((T) => () => lo(T, d))
          .catch((T) => (m(T), () => (n ? re(n, { error: T }) : null)));
      const w = ln(!1),
        $ = ln(),
        O = ln(!!i);
      return (
        i &&
          setTimeout(() => {
            O.value = !1;
          }, i),
        o != null &&
          setTimeout(() => {
            if (!w.value && !$.value) {
              const T = new Error(`Async component timed out after ${o}ms.`);
              m(T), ($.value = T);
            }
          }, o),
        f()
          .then(() => {
            (w.value = !0),
              d.parent &&
                Pn(d.parent.vnode) &&
                ((d.parent.effect.dirty = !0), Bi(d.parent.update));
          })
          .catch((T) => {
            m(T), ($.value = T);
          }),
        () => {
          if (w.value && c) return lo(c, d);
          if ($.value && n) return re(n, { error: $.value });
          if (s && !O.value) return re(s);
        }
      );
    },
  });
}
function lo(t, e) {
  const { ref: s, props: n, children: i, ce: o } = e.vnode,
    r = re(t, n, i);
  return (r.ref = s), (r.ce = o), delete e.vnode.ce, r;
}
const Pn = (t) => t.type.__isKeepAlive,
  Vf = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(t, { slots: e }) {
      const s = It(),
        n = s.ctx;
      if (!n.renderer)
        return () => {
          const T = e.default && e.default();
          return T && T.length === 1 ? T[0] : T;
        };
      const i = new Map(),
        o = new Set();
      let r = null;
      const l = s.suspense,
        {
          renderer: {
            p: a,
            m: c,
            um: h,
            o: { createElement: u },
          },
        } = n,
        f = u("div");
      (n.activate = (T, y, _, S, k) => {
        const M = T.component;
        c(T, y, _, 0, l),
          a(M.vnode, T, y, _, M, l, S, T.slotScopeIds, k),
          Oe(() => {
            (M.isDeactivated = !1), M.a && Fs(M.a);
            const v = T.props && T.props.onVnodeMounted;
            v && Ue(v, M.parent, T);
          }, l);
      }),
        (n.deactivate = (T) => {
          const y = T.component;
          c(T, f, null, 1, l),
            Oe(() => {
              y.da && Fs(y.da);
              const _ = T.props && T.props.onVnodeUnmounted;
              _ && Ue(_, y.parent, T), (y.isDeactivated = !0);
            }, l);
        });
      function d(T) {
        ao(T), h(T, s, l, !0);
      }
      function m(T) {
        i.forEach((y, _) => {
          const S = Fo(y.type);
          S && (!T || !T(S)) && w(_);
        });
      }
      function w(T) {
        const y = i.get(T);
        !r || !dt(y, r) ? d(y) : r && ao(r), i.delete(T), o.delete(T);
      }
      an(
        () => [t.include, t.exclude],
        ([T, y]) => {
          T && m((_) => on(T, _)), y && m((_) => !on(y, _));
        },
        { flush: "post", deep: !0 }
      );
      let $ = null;
      const O = () => {
        $ != null && i.set($, co(s.subTree));
      };
      return (
        Ln(O),
        ji(O),
        Ui(() => {
          i.forEach((T) => {
            const { subTree: y, suspense: _ } = s,
              S = co(y);
            if (T.type === S.type && T.key === S.key) {
              ao(S);
              const k = S.component.da;
              k && Oe(k, _);
              return;
            }
            d(T);
          });
        }),
        () => {
          if ((($ = null), !e.default)) return null;
          const T = e.default(),
            y = T[0];
          if (T.length > 1) return (r = null), T;
          if (!Jt(y) || (!(y.shapeFlag & 4) && !(y.shapeFlag & 128)))
            return (r = null), y;
          let _ = co(y);
          const S = _.type,
            k = Fo(fs(_) ? _.type.__asyncResolved || {} : S),
            { include: M, exclude: v, max: E } = t;
          if ((M && (!k || !on(M, k))) || (v && k && on(v, k)))
            return (r = _), y;
          const x = _.key == null ? S : _.key,
            N = i.get(x);
          return (
            _.el && ((_ = St(_)), y.shapeFlag & 128 && (y.ssContent = _)),
            ($ = x),
            N
              ? ((_.el = N.el),
                (_.component = N.component),
                _.transition && bs(_, _.transition),
                (_.shapeFlag |= 512),
                o.delete(x),
                o.add(x))
              : (o.add(x),
                E && o.size > parseInt(E, 10) && w(o.values().next().value)),
            (_.shapeFlag |= 256),
            (r = _),
            qa(y.type) ? y : _
          );
        }
      );
    },
  },
  qf = Vf;
function on(t, e) {
  return z(t)
    ? t.some((s) => on(s, e))
    : Z(t)
    ? t.split(",").includes(e)
    : ru(t)
    ? t.test(e)
    : !1;
}
function Ja(t, e) {
  Qa(t, "a", e);
}
function Za(t, e) {
  Qa(t, "da", e);
}
function Qa(t, e, s = ke) {
  const n =
    t.__wdc ||
    (t.__wdc = () => {
      let i = s;
      for (; i; ) {
        if (i.isDeactivated) return;
        i = i.parent;
      }
      return t();
    });
  if ((zi(e, n, s), s)) {
    let i = s.parent;
    for (; i && i.parent; )
      Pn(i.parent.vnode) && zf(n, e, s, i), (i = i.parent);
  }
}
function zf(t, e, s, n) {
  const i = zi(e, t, n, !0);
  Wi(() => {
    Yo(n[e], i);
  }, s);
}
function ao(t) {
  (t.shapeFlag &= -257), (t.shapeFlag &= -513);
}
function co(t) {
  return t.shapeFlag & 128 ? t.ssContent : t;
}
function zi(t, e, s = ke, n = !1) {
  if (s) {
    const i = s[t] || (s[t] = []),
      o =
        e.__weh ||
        (e.__weh = (...r) => {
          if (s.isUnmounted) return;
          Ts();
          const l = xs(s),
            a = st(e, s, t, r);
          return l(), ks(), a;
        });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const Ot =
    (t) =>
    (e, s = ke) =>
      (!On || t === "sp") && zi(t, (...n) => e(...n), s),
  ec = Ot("bm"),
  Ln = Ot("m"),
  tc = Ot("bu"),
  ji = Ot("u"),
  Ui = Ot("bum"),
  Wi = Ot("um"),
  sc = Ot("sp"),
  nc = Ot("rtg"),
  ic = Ot("rtc");
function oc(t, e = ke) {
  zi("ec", t, e);
}
function Lt(t, e, s, n) {
  let i;
  const o = s && s[n];
  if (z(t) || Z(t)) {
    i = new Array(t.length);
    for (let r = 0, l = t.length; r < l; r++)
      i[r] = e(t[r], r, void 0, o && o[r]);
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let r = 0; r < t; r++) i[r] = e(r + 1, r, void 0, o && o[r]);
  } else if (de(t))
    if (t[Symbol.iterator])
      i = Array.from(t, (r, l) => e(r, l, void 0, o && o[l]));
    else {
      const r = Object.keys(t);
      i = new Array(r.length);
      for (let l = 0, a = r.length; l < a; l++) {
        const c = r[l];
        i[l] = e(t[c], c, l, o && o[l]);
      }
    }
  else i = [];
  return s && (s[n] = i), i;
}
function jf(t, e) {
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    if (z(n)) for (let i = 0; i < n.length; i++) t[n[i].name] = n[i].fn;
    else
      n &&
        (t[n.name] = n.key
          ? (...i) => {
              const o = n.fn(...i);
              return o && (o.key = n.key), o;
            }
          : n.fn);
  }
  return t;
}
function Eo(t, e, s = {}, n, i) {
  if (Ce.isCE || (Ce.parent && fs(Ce.parent) && Ce.parent.isCE))
    return e !== "default" && (s.name = e), re("slot", s, n && n());
  let o = t[e];
  o && o._c && (o._d = !1), se();
  const r = o && rc(o(s)),
    l = Ki(
      fe,
      { key: s.key || (r && r.key) || `_${e}` },
      r || (n ? n() : []),
      r && t._ === 1 ? 64 : -2
    );
  return (
    !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function rc(t) {
  return t.some((e) =>
    Jt(e) ? !(e.type === Be || (e.type === fe && !rc(e.children))) : !0
  )
    ? t
    : null;
}
function Uf(t, e) {
  const s = {};
  for (const n in t) s[e && /[A-Z]/.test(n) ? `on:${n}` : Rs(n)] = t[n];
  return s;
}
const To = (t) => (t ? (Ac(t) ? Gi(t) || t.proxy : To(t.parent)) : null),
  cn = le(Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => To(t.parent),
    $root: (t) => To(t.root),
    $emit: (t) => t.emit,
    $options: (t) => br(t),
    $forceUpdate: (t) =>
      t.f ||
      (t.f = () => {
        (t.effect.dirty = !0), Bi(t.update);
      }),
    $nextTick: (t) => t.n || (t.n = Di.bind(t.proxy)),
    $watch: (t) => Df.bind(t),
  }),
  ho = (t, e) => t !== ae && !t.__isScriptSetup && oe(t, e),
  ko = {
    get({ _: t }, e) {
      const {
        ctx: s,
        setupState: n,
        data: i,
        props: o,
        accessCache: r,
        type: l,
        appContext: a,
      } = t;
      let c;
      if (e[0] !== "$") {
        const d = r[e];
        if (d !== void 0)
          switch (d) {
            case 1:
              return n[e];
            case 2:
              return i[e];
            case 4:
              return s[e];
            case 3:
              return o[e];
          }
        else {
          if (ho(n, e)) return (r[e] = 1), n[e];
          if (i !== ae && oe(i, e)) return (r[e] = 2), i[e];
          if ((c = t.propsOptions[0]) && oe(c, e)) return (r[e] = 3), o[e];
          if (s !== ae && oe(s, e)) return (r[e] = 4), s[e];
          Ao && (r[e] = 0);
        }
      }
      const h = cn[e];
      let u, f;
      if (h) return e === "$attrs" && Ge(t, "get", e), h(t);
      if ((u = l.__cssModules) && (u = u[e])) return u;
      if (s !== ae && oe(s, e)) return (r[e] = 4), s[e];
      if (((f = a.config.globalProperties), oe(f, e))) return f[e];
    },
    set({ _: t }, e, s) {
      const { data: n, setupState: i, ctx: o } = t;
      return ho(i, e)
        ? ((i[e] = s), !0)
        : n !== ae && oe(n, e)
        ? ((n[e] = s), !0)
        : oe(t.props, e) || (e[0] === "$" && e.slice(1) in t)
        ? !1
        : ((o[e] = s), !0);
    },
    has(
      {
        _: {
          data: t,
          setupState: e,
          accessCache: s,
          ctx: n,
          appContext: i,
          propsOptions: o,
        },
      },
      r
    ) {
      let l;
      return (
        !!s[r] ||
        (t !== ae && oe(t, r)) ||
        ho(e, r) ||
        ((l = o[0]) && oe(l, r)) ||
        oe(n, r) ||
        oe(cn, r) ||
        oe(i.config.globalProperties, r)
      );
    },
    defineProperty(t, e, s) {
      return (
        s.get != null
          ? (t._.accessCache[e] = 0)
          : oe(s, "value") && this.set(t, e, s.value, null),
        Reflect.defineProperty(t, e, s)
      );
    },
  },
  Wf = le({}, ko, {
    get(t, e) {
      if (e !== Symbol.unscopables) return ko.get(t, e, t);
    },
    has(t, e) {
      return e[0] !== "_" && !fu(e);
    },
  });
function Kf() {
  return null;
}
function Xf() {
  return null;
}
function Gf(t) {}
function Yf(t) {}
function Jf() {
  return null;
}
function Zf() {}
function Qf(t, e) {
  return null;
}
function ed() {
  return lc().slots;
}
function td() {
  return lc().attrs;
}
function lc() {
  const t = It();
  return t.setupContext || (t.setupContext = Lc(t));
}
function wn(t) {
  return z(t) ? t.reduce((e, s) => ((e[s] = null), e), {}) : t;
}
function sd(t, e) {
  const s = wn(t);
  for (const n in e) {
    if (n.startsWith("__skip")) continue;
    let i = s[n];
    i
      ? z(i) || G(i)
        ? (i = s[n] = { type: i, default: e[n] })
        : (i.default = e[n])
      : i === null && (i = s[n] = { default: e[n] }),
      i && e[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return s;
}
function nd(t, e) {
  return !t || !e ? t || e : z(t) && z(e) ? t.concat(e) : le({}, wn(t), wn(e));
}
function id(t, e) {
  const s = {};
  for (const n in t)
    e.includes(n) ||
      Object.defineProperty(s, n, { enumerable: !0, get: () => t[n] });
  return s;
}
function od(t) {
  const e = It();
  let s = t();
  return (
    Io(),
    Jo(s) &&
      (s = s.catch((n) => {
        throw (xs(e), n);
      })),
    [s, () => xs(e)]
  );
}
let Ao = !0;
function rd(t) {
  const e = br(t),
    s = t.proxy,
    n = t.ctx;
  (Ao = !1), e.beforeCreate && cl(e.beforeCreate, t, "bc");
  const {
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: c,
    created: h,
    beforeMount: u,
    mounted: f,
    beforeUpdate: d,
    updated: m,
    activated: w,
    deactivated: $,
    beforeDestroy: O,
    beforeUnmount: T,
    destroyed: y,
    unmounted: _,
    render: S,
    renderTracked: k,
    renderTriggered: M,
    errorCaptured: v,
    serverPrefetch: E,
    expose: x,
    inheritAttrs: N,
    components: C,
    directives: R,
    filters: V,
  } = e;
  if ((c && ld(c, n, null), r))
    for (const K in r) {
      const U = r[K];
      G(U) && (n[K] = U.bind(s));
    }
  if (i) {
    const K = i.call(s, s);
    de(K) && (t.data = Ri(K));
  }
  if (((Ao = !0), o))
    for (const K in o) {
      const U = o[K],
        Ve = G(U) ? U.bind(s, s) : G(U.get) ? U.get.bind(s, s) : Ae,
        Rt = !G(U) && G(U.set) ? U.set.bind(s) : Ae,
        ts = Oc({ get: Ve, set: Rt });
      Object.defineProperty(n, K, {
        enumerable: !0,
        configurable: !0,
        get: () => ts.value,
        set: (bt) => (ts.value = bt),
      });
    }
  if (l) for (const K in l) ac(l[K], n, s, K);
  if (a) {
    const K = G(a) ? a.call(s) : a;
    Reflect.ownKeys(K).forEach((U) => {
      hc(U, K[U]);
    });
  }
  h && cl(h, t, "c");
  function H(K, U) {
    z(U) ? U.forEach((Ve) => K(Ve.bind(s))) : U && K(U.bind(s));
  }
  if (
    (H(ec, u),
    H(Ln, f),
    H(tc, d),
    H(ji, m),
    H(Ja, w),
    H(Za, $),
    H(oc, v),
    H(ic, k),
    H(nc, M),
    H(Ui, T),
    H(Wi, _),
    H(sc, E),
    z(x))
  )
    if (x.length) {
      const K = t.exposed || (t.exposed = {});
      x.forEach((U) => {
        Object.defineProperty(K, U, {
          get: () => s[U],
          set: (Ve) => (s[U] = Ve),
        });
      });
    } else t.exposed || (t.exposed = {});
  S && t.render === Ae && (t.render = S),
    N != null && (t.inheritAttrs = N),
    C && (t.components = C),
    R && (t.directives = R);
}
function ld(t, e, s = Ae) {
  z(t) && (t = $o(t));
  for (const n in t) {
    const i = t[n];
    let o;
    de(i)
      ? "default" in i
        ? (o = hn(i.from || n, i.default, !0))
        : (o = hn(i.from || n))
      : (o = hn(i)),
      Me(o)
        ? Object.defineProperty(e, n, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (r) => (o.value = r),
          })
        : (e[n] = o);
  }
}
function cl(t, e, s) {
  st(z(t) ? t.map((n) => n.bind(e.proxy)) : t.bind(e.proxy), e, s);
}
function ac(t, e, s, n) {
  const i = n.includes(".") ? Xa(s, n) : () => s[n];
  if (Z(t)) {
    const o = e[t];
    G(o) && an(i, o);
  } else if (G(t)) an(i, t.bind(s));
  else if (de(t))
    if (z(t)) t.forEach((o) => ac(o, e, s, n));
    else {
      const o = G(t.handler) ? t.handler.bind(s) : e[t.handler];
      G(o) && an(i, o, t);
    }
}
function br(t) {
  const e = t.type,
    { mixins: s, extends: n } = e,
    {
      mixins: i,
      optionsCache: o,
      config: { optionMergeStrategies: r },
    } = t.appContext,
    l = o.get(e);
  let a;
  return (
    l
      ? (a = l)
      : !i.length && !s && !n
      ? (a = e)
      : ((a = {}), i.length && i.forEach((c) => pi(a, c, r, !0)), pi(a, e, r)),
    de(e) && o.set(e, a),
    a
  );
}
function pi(t, e, s, n = !1) {
  const { mixins: i, extends: o } = e;
  o && pi(t, o, s, !0), i && i.forEach((r) => pi(t, r, s, !0));
  for (const r in e)
    if (!(n && r === "expose")) {
      const l = ad[r] || (s && s[r]);
      t[r] = l ? l(t[r], e[r]) : e[r];
    }
  return t;
}
const ad = {
  data: hl,
  props: ul,
  emits: ul,
  methods: rn,
  computed: rn,
  beforeCreate: qe,
  created: qe,
  beforeMount: qe,
  mounted: qe,
  beforeUpdate: qe,
  updated: qe,
  beforeDestroy: qe,
  beforeUnmount: qe,
  destroyed: qe,
  unmounted: qe,
  activated: qe,
  deactivated: qe,
  errorCaptured: qe,
  serverPrefetch: qe,
  components: rn,
  directives: rn,
  watch: hd,
  provide: hl,
  inject: cd,
};
function hl(t, e) {
  return e
    ? t
      ? function () {
          return le(
            G(t) ? t.call(this, this) : t,
            G(e) ? e.call(this, this) : e
          );
        }
      : e
    : t;
}
function cd(t, e) {
  return rn($o(t), $o(e));
}
function $o(t) {
  if (z(t)) {
    const e = {};
    for (let s = 0; s < t.length; s++) e[t[s]] = t[s];
    return e;
  }
  return t;
}
function qe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function rn(t, e) {
  return t ? le(Object.create(null), t, e) : e;
}
function ul(t, e) {
  return t
    ? z(t) && z(e)
      ? [...new Set([...t, ...e])]
      : le(Object.create(null), wn(t), wn(e ?? {}))
    : e;
}
function hd(t, e) {
  if (!t) return e;
  if (!e) return t;
  const s = le(Object.create(null), t);
  for (const n in e) s[n] = qe(t[n], e[n]);
  return s;
}
function cc() {
  return {
    app: null,
    config: {
      isNativeTag: ti,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let ud = 0;
function fd(t, e) {
  return function (n, i = null) {
    G(n) || (n = le({}, n)), i != null && !de(i) && (i = null);
    const o = cc(),
      r = new WeakSet();
    let l = !1;
    const a = (o.app = {
      _uid: ud++,
      _component: n,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Rc,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...h) {
        return (
          r.has(c) ||
            (c && G(c.install)
              ? (r.add(c), c.install(a, ...h))
              : G(c) && (r.add(c), c(a, ...h))),
          a
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), a;
      },
      component(c, h) {
        return h ? ((o.components[c] = h), a) : o.components[c];
      },
      directive(c, h) {
        return h ? ((o.directives[c] = h), a) : o.directives[c];
      },
      mount(c, h, u) {
        if (!l) {
          const f = re(n, i);
          return (
            (f.appContext = o),
            u === !0 ? (u = "svg") : u === !1 && (u = void 0),
            h && e ? e(f, c) : t(f, c, u),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            Gi(f.component) || f.component.proxy
          );
        }
      },
      unmount() {
        l && (t(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, h) {
        return (o.provides[c] = h), a;
      },
      runWithContext(c) {
        const h = Vs;
        Vs = a;
        try {
          return c();
        } finally {
          Vs = h;
        }
      },
    });
    return a;
  };
}
let Vs = null;
function hc(t, e) {
  if (ke) {
    let s = ke.provides;
    const n = ke.parent && ke.parent.provides;
    n === s && (s = ke.provides = Object.create(n)), (s[t] = e);
  }
}
function hn(t, e, s = !1) {
  const n = ke || Ce;
  if (n || Vs) {
    const i = n
      ? n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides
      : Vs._context.provides;
    if (i && t in i) return i[t];
    if (arguments.length > 1) return s && G(e) ? e.call(n && n.proxy) : e;
  }
}
function dd() {
  return !!(ke || Ce || Vs);
}
function pd(t, e, s, n = !1) {
  const i = {},
    o = {};
  ci(o, Xi, 1), (t.propsDefaults = Object.create(null)), uc(t, e, i, o);
  for (const r in t.propsOptions[0]) r in i || (i[r] = void 0);
  s ? (t.props = n ? i : Na(i)) : t.type.props ? (t.props = i) : (t.props = o),
    (t.attrs = o);
}
function md(t, e, s, n) {
  const {
      props: i,
      attrs: o,
      vnode: { patchFlag: r },
    } = t,
    l = ne(i),
    [a] = t.propsOptions;
  let c = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const h = t.vnode.dynamicProps;
      for (let u = 0; u < h.length; u++) {
        let f = h[u];
        if (Hi(t.emitsOptions, f)) continue;
        const d = e[f];
        if (a)
          if (oe(o, f)) d !== o[f] && ((o[f] = d), (c = !0));
          else {
            const m = be(f);
            i[m] = No(a, l, m, d, t, !1);
          }
        else d !== o[f] && ((o[f] = d), (c = !0));
      }
    }
  } else {
    uc(t, e, i, o) && (c = !0);
    let h;
    for (const u in l)
      (!e || (!oe(e, u) && ((h = tt(u)) === u || !oe(e, h)))) &&
        (a
          ? s &&
            (s[u] !== void 0 || s[h] !== void 0) &&
            (i[u] = No(a, l, u, void 0, t, !0))
          : delete i[u]);
    if (o !== l)
      for (const u in o) (!e || !oe(e, u)) && (delete o[u], (c = !0));
  }
  c && Nt(t, "set", "$attrs");
}
function uc(t, e, s, n) {
  const [i, o] = t.propsOptions;
  let r = !1,
    l;
  if (e)
    for (let a in e) {
      if (Kt(a)) continue;
      const c = e[a];
      let h;
      i && oe(i, (h = be(a)))
        ? !o || !o.includes(h)
          ? (s[h] = c)
          : ((l || (l = {}))[h] = c)
        : Hi(t.emitsOptions, a) ||
          ((!(a in n) || c !== n[a]) && ((n[a] = c), (r = !0)));
    }
  if (o) {
    const a = ne(s),
      c = l || ae;
    for (let h = 0; h < o.length; h++) {
      const u = o[h];
      s[u] = No(i, a, u, c[u], t, !oe(c, u));
    }
  }
  return r;
}
function No(t, e, s, n, i, o) {
  const r = t[s];
  if (r != null) {
    const l = oe(r, "default");
    if (l && n === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && G(a)) {
        const { propsDefaults: c } = i;
        if (s in c) n = c[s];
        else {
          const h = xs(i);
          (n = c[s] = a.call(null, e)), h();
        }
      } else n = a;
    }
    r[0] &&
      (o && !l ? (n = !1) : r[1] && (n === "" || n === tt(s)) && (n = !0));
  }
  return n;
}
function fc(t, e, s = !1) {
  const n = e.propsCache,
    i = n.get(t);
  if (i) return i;
  const o = t.props,
    r = {},
    l = [];
  let a = !1;
  if (!G(t)) {
    const h = (u) => {
      a = !0;
      const [f, d] = fc(u, e, !0);
      le(r, f), d && l.push(...d);
    };
    !s && e.mixins.length && e.mixins.forEach(h),
      t.extends && h(t.extends),
      t.mixins && t.mixins.forEach(h);
  }
  if (!o && !a) return de(t) && n.set(t, Is), Is;
  if (z(o))
    for (let h = 0; h < o.length; h++) {
      const u = be(o[h]);
      fl(u) && (r[u] = ae);
    }
  else if (o)
    for (const h in o) {
      const u = be(h);
      if (fl(u)) {
        const f = o[h],
          d = (r[u] = z(f) || G(f) ? { type: f } : le({}, f));
        if (d) {
          const m = ml(Boolean, d.type),
            w = ml(String, d.type);
          (d[0] = m > -1),
            (d[1] = w < 0 || m < w),
            (m > -1 || oe(d, "default")) && l.push(u);
        }
      }
    }
  const c = [r, l];
  return de(t) && n.set(t, c), c;
}
function fl(t) {
  return t[0] !== "$" && !Kt(t);
}
function dl(t) {
  return t === null
    ? "null"
    : typeof t == "function"
    ? t.name || ""
    : (typeof t == "object" && t.constructor && t.constructor.name) || "";
}
function pl(t, e) {
  return dl(t) === dl(e);
}
function ml(t, e) {
  return z(e) ? e.findIndex((s) => pl(s, t)) : G(e) && pl(e, t) ? 0 : -1;
}
const dc = (t) => t[0] === "_" || t === "$stable",
  vr = (t) => (z(t) ? t.map(et) : [et(t)]),
  gd = (t, e, s) => {
    if (e._n) return e;
    const n = pt((...i) => vr(e(...i)), s);
    return (n._c = !1), n;
  },
  pc = (t, e, s) => {
    const n = t._ctx;
    for (const i in t) {
      if (dc(i)) continue;
      const o = t[i];
      if (G(o)) e[i] = gd(i, o, n);
      else if (o != null) {
        const r = vr(o);
        e[i] = () => r;
      }
    }
  },
  mc = (t, e) => {
    const s = vr(e);
    t.slots.default = () => s;
  },
  yd = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const s = e._;
      s ? ((t.slots = ne(e)), ci(e, "_", s)) : pc(e, (t.slots = {}));
    } else (t.slots = {}), e && mc(t, e);
    ci(t.slots, Xi, 1);
  },
  bd = (t, e, s) => {
    const { vnode: n, slots: i } = t;
    let o = !0,
      r = ae;
    if (n.shapeFlag & 32) {
      const l = e._;
      l
        ? s && l === 1
          ? (o = !1)
          : (le(i, e), !s && l === 1 && delete i._)
        : ((o = !e.$stable), pc(e, i)),
        (r = e);
    } else e && (mc(t, e), (r = { default: 1 }));
    if (o) for (const l in i) !dc(l) && r[l] == null && delete i[l];
  };
function mi(t, e, s, n, i = !1) {
  if (z(t)) {
    t.forEach((f, d) => mi(f, e && (z(e) ? e[d] : e), s, n, i));
    return;
  }
  if (fs(n) && !i) return;
  const o = n.shapeFlag & 4 ? Gi(n.component) || n.component.proxy : n.el,
    r = i ? null : o,
    { i: l, r: a } = t,
    c = e && e.r,
    h = l.refs === ae ? (l.refs = {}) : l.refs,
    u = l.setupState;
  if (
    (c != null &&
      c !== a &&
      (Z(c)
        ? ((h[c] = null), oe(u, c) && (u[c] = null))
        : Me(c) && (c.value = null)),
    G(a))
  )
    Pt(a, l, 12, [r, h]);
  else {
    const f = Z(a),
      d = Me(a);
    if (f || d) {
      const m = () => {
        if (t.f) {
          const w = f ? (oe(u, a) ? u[a] : h[a]) : a.value;
          i
            ? z(w) && Yo(w, o)
            : z(w)
            ? w.includes(o) || w.push(o)
            : f
            ? ((h[a] = [o]), oe(u, a) && (u[a] = h[a]))
            : ((a.value = [o]), t.k && (h[t.k] = a.value));
        } else
          f
            ? ((h[a] = r), oe(u, a) && (u[a] = r))
            : d && ((a.value = r), t.k && (h[t.k] = r));
      };
      r ? ((m.id = -1), Oe(m, s)) : m();
    }
  }
}
let Dt = !1;
const vd = (t) =>
    t.namespaceURI.includes("svg") && t.tagName !== "foreignObject",
  _d = (t) => t.namespaceURI.includes("MathML"),
  Xn = (t) => {
    if (vd(t)) return "svg";
    if (_d(t)) return "mathml";
  },
  Gn = (t) => t.nodeType === 8;
function xd(t) {
  const {
      mt: e,
      p: s,
      o: {
        patchProp: n,
        createText: i,
        nextSibling: o,
        parentNode: r,
        remove: l,
        insert: a,
        createComment: c,
      },
    } = t,
    h = (y, _) => {
      if (!_.hasChildNodes()) {
        s(null, y, _), di(), (_._vnode = y);
        return;
      }
      (Dt = !1),
        u(_.firstChild, y, null, null, null),
        di(),
        (_._vnode = y),
        Dt && console.error("Hydration completed but contains mismatches.");
    },
    u = (y, _, S, k, M, v = !1) => {
      const E = Gn(y) && y.data === "[",
        x = () => w(y, _, S, k, M, E),
        { type: N, ref: C, shapeFlag: R, patchFlag: V } = _;
      let Y = y.nodeType;
      (_.el = y), V === -2 && ((v = !1), (_.dynamicChildren = null));
      let H = null;
      switch (N) {
        case vs:
          Y !== 3
            ? _.children === ""
              ? (a((_.el = i("")), r(y), y), (H = y))
              : (H = x())
            : (y.data !== _.children && ((Dt = !0), (y.data = _.children)),
              (H = o(y)));
          break;
        case Be:
          T(y)
            ? ((H = o(y)), O((_.el = y.content.firstChild), y, S))
            : Y !== 8 || E
            ? (H = x())
            : (H = o(y));
          break;
        case ds:
          if ((E && ((y = o(y)), (Y = y.nodeType)), Y === 1 || Y === 3)) {
            H = y;
            const K = !_.children.length;
            for (let U = 0; U < _.staticCount; U++)
              K && (_.children += H.nodeType === 1 ? H.outerHTML : H.data),
                U === _.staticCount - 1 && (_.anchor = H),
                (H = o(H));
            return E ? o(H) : H;
          } else x();
          break;
        case fe:
          E ? (H = m(y, _, S, k, M, v)) : (H = x());
          break;
        default:
          if (R & 1)
            (Y !== 1 || _.type.toLowerCase() !== y.tagName.toLowerCase()) &&
            !T(y)
              ? (H = x())
              : (H = f(y, _, S, k, M, v));
          else if (R & 6) {
            _.slotScopeIds = M;
            const K = r(y);
            if (
              (E
                ? (H = $(y))
                : Gn(y) && y.data === "teleport start"
                ? (H = $(y, y.data, "teleport end"))
                : (H = o(y)),
              e(_, K, null, S, k, Xn(K), v),
              fs(_))
            ) {
              let U;
              E
                ? ((U = re(fe)),
                  (U.anchor = H ? H.previousSibling : K.lastChild))
                : (U = y.nodeType === 3 ? Ie("") : re("div")),
                (U.el = y),
                (_.component.subTree = U);
            }
          } else
            R & 64
              ? Y !== 8
                ? (H = x())
                : (H = _.type.hydrate(y, _, S, k, M, v, t, d))
              : R & 128 &&
                (H = _.type.hydrate(y, _, S, k, Xn(r(y)), M, v, t, u));
      }
      return C != null && mi(C, null, k, _), H;
    },
    f = (y, _, S, k, M, v) => {
      v = v || !!_.dynamicChildren;
      const {
          type: E,
          props: x,
          patchFlag: N,
          shapeFlag: C,
          dirs: R,
          transition: V,
        } = _,
        Y = E === "input" || E === "option";
      if (Y || N !== -1) {
        R && _t(_, null, S, "created");
        let H = !1;
        if (T(y)) {
          H = vc(k, V) && S && S.vnode.props && S.vnode.props.appear;
          const U = y.content.firstChild;
          H && V.beforeEnter(U), O(U, y, S), (_.el = y = U);
        }
        if (C & 16 && !(x && (x.innerHTML || x.textContent))) {
          let U = d(y.firstChild, _, y, S, k, M, v);
          for (; U; ) {
            Dt = !0;
            const Ve = U;
            (U = U.nextSibling), l(Ve);
          }
        } else
          C & 8 &&
            y.textContent !== _.children &&
            ((Dt = !0), (y.textContent = _.children));
        if (x)
          if (Y || !v || N & 48)
            for (const U in x)
              ((Y && (U.endsWith("value") || U === "indeterminate")) ||
                (Ss(U) && !Kt(U)) ||
                U[0] === ".") &&
                n(y, U, null, x[U], void 0, void 0, S);
          else x.onClick && n(y, "onClick", null, x.onClick, void 0, void 0, S);
        let K;
        (K = x && x.onVnodeBeforeMount) && Ue(K, S, _),
          R && _t(_, null, S, "beforeMount"),
          ((K = x && x.onVnodeMounted) || R || H) &&
            za(() => {
              K && Ue(K, S, _), H && V.enter(y), R && _t(_, null, S, "mounted");
            }, k);
      }
      return y.nextSibling;
    },
    d = (y, _, S, k, M, v, E) => {
      E = E || !!_.dynamicChildren;
      const x = _.children,
        N = x.length;
      for (let C = 0; C < N; C++) {
        const R = E ? x[C] : (x[C] = et(x[C]));
        if (y) y = u(y, R, k, M, v, E);
        else {
          if (R.type === vs && !R.children) continue;
          (Dt = !0), s(null, R, S, null, k, M, Xn(S), v);
        }
      }
      return y;
    },
    m = (y, _, S, k, M, v) => {
      const { slotScopeIds: E } = _;
      E && (M = M ? M.concat(E) : E);
      const x = r(y),
        N = d(o(y), _, x, S, k, M, v);
      return N && Gn(N) && N.data === "]"
        ? o((_.anchor = N))
        : ((Dt = !0), a((_.anchor = c("]")), x, N), N);
    },
    w = (y, _, S, k, M, v) => {
      if (((Dt = !0), (_.el = null), v)) {
        const N = $(y);
        for (;;) {
          const C = o(y);
          if (C && C !== N) l(C);
          else break;
        }
      }
      const E = o(y),
        x = r(y);
      return l(y), s(null, _, x, E, S, k, Xn(x), M), E;
    },
    $ = (y, _ = "[", S = "]") => {
      let k = 0;
      for (; y; )
        if (((y = o(y)), y && Gn(y) && (y.data === _ && k++, y.data === S))) {
          if (k === 0) return o(y);
          k--;
        }
      return y;
    },
    O = (y, _, S) => {
      const k = _.parentNode;
      k && k.replaceChild(y, _);
      let M = S;
      for (; M; )
        M.vnode.el === _ && (M.vnode.el = M.subTree.el = y), (M = M.parent);
    },
    T = (y) => y.nodeType === 1 && y.tagName.toLowerCase() === "template";
  return [h, u];
}
const Oe = za;
function gc(t) {
  return bc(t);
}
function yc(t) {
  return bc(t, xd);
}
function bc(t, e) {
  const s = ua();
  s.__VUE__ = !0;
  const {
      insert: n,
      remove: i,
      patchProp: o,
      createElement: r,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: h,
      parentNode: u,
      nextSibling: f,
      setScopeId: d = Ae,
      insertStaticContent: m,
    } = t,
    w = (
      p,
      g,
      A,
      P = null,
      L = null,
      D = null,
      q = void 0,
      F = null,
      B = !!g.dynamicChildren
    ) => {
      if (p === g) return;
      p && !dt(p, g) && ((P = Bn(p)), bt(p, L, D, !0), (p = null)),
        g.patchFlag === -2 && ((B = !1), (g.dynamicChildren = null));
      const { type: I, ref: j, shapeFlag: X } = g;
      switch (I) {
        case vs:
          $(p, g, A, P);
          break;
        case Be:
          O(p, g, A, P);
          break;
        case ds:
          p == null && T(g, A, P, q);
          break;
        case fe:
          C(p, g, A, P, L, D, q, F, B);
          break;
        default:
          X & 1
            ? S(p, g, A, P, L, D, q, F, B)
            : X & 6
            ? R(p, g, A, P, L, D, q, F, B)
            : (X & 64 || X & 128) && I.process(p, g, A, P, L, D, q, F, B, $s);
      }
      j != null && L && mi(j, p && p.ref, D, g || p, !g);
    },
    $ = (p, g, A, P) => {
      if (p == null) n((g.el = l(g.children)), A, P);
      else {
        const L = (g.el = p.el);
        g.children !== p.children && c(L, g.children);
      }
    },
    O = (p, g, A, P) => {
      p == null ? n((g.el = a(g.children || "")), A, P) : (g.el = p.el);
    },
    T = (p, g, A, P) => {
      [p.el, p.anchor] = m(p.children, g, A, P, p.el, p.anchor);
    },
    y = ({ el: p, anchor: g }, A, P) => {
      let L;
      for (; p && p !== g; ) (L = f(p)), n(p, A, P), (p = L);
      n(g, A, P);
    },
    _ = ({ el: p, anchor: g }) => {
      let A;
      for (; p && p !== g; ) (A = f(p)), i(p), (p = A);
      i(g);
    },
    S = (p, g, A, P, L, D, q, F, B) => {
      g.type === "svg" ? (q = "svg") : g.type === "math" && (q = "mathml"),
        p == null ? k(g, A, P, L, D, q, F, B) : E(p, g, L, D, q, F, B);
    },
    k = (p, g, A, P, L, D, q, F) => {
      let B, I;
      const { props: j, shapeFlag: X, transition: W, dirs: J } = p;
      if (
        ((B = p.el = r(p.type, D, j && j.is, j)),
        X & 8
          ? h(B, p.children)
          : X & 16 && v(p.children, B, null, P, L, uo(p, D), q, F),
        J && _t(p, null, P, "created"),
        M(B, p, p.scopeId, q, P),
        j)
      ) {
        for (const pe in j)
          pe !== "value" &&
            !Kt(pe) &&
            o(B, pe, null, j[pe], D, p.children, P, L, Ct);
        "value" in j && o(B, "value", null, j.value, D),
          (I = j.onVnodeBeforeMount) && Ue(I, P, p);
      }
      J && _t(p, null, P, "beforeMount");
      const te = vc(L, W);
      te && W.beforeEnter(B),
        n(B, g, A),
        ((I = j && j.onVnodeMounted) || te || J) &&
          Oe(() => {
            I && Ue(I, P, p), te && W.enter(B), J && _t(p, null, P, "mounted");
          }, L);
    },
    M = (p, g, A, P, L) => {
      if ((A && d(p, A), P)) for (let D = 0; D < P.length; D++) d(p, P[D]);
      if (L) {
        let D = L.subTree;
        if (g === D) {
          const q = L.vnode;
          M(p, q, q.scopeId, q.slotScopeIds, L.parent);
        }
      }
    },
    v = (p, g, A, P, L, D, q, F, B = 0) => {
      for (let I = B; I < p.length; I++) {
        const j = (p[I] = F ? jt(p[I]) : et(p[I]));
        w(null, j, g, A, P, L, D, q, F);
      }
    },
    E = (p, g, A, P, L, D, q) => {
      const F = (g.el = p.el);
      let { patchFlag: B, dynamicChildren: I, dirs: j } = g;
      B |= p.patchFlag & 16;
      const X = p.props || ae,
        W = g.props || ae;
      let J;
      if (
        (A && ss(A, !1),
        (J = W.onVnodeBeforeUpdate) && Ue(J, A, g, p),
        j && _t(g, p, A, "beforeUpdate"),
        A && ss(A, !0),
        I
          ? x(p.dynamicChildren, I, F, A, P, uo(g, L), D)
          : q || U(p, g, F, null, A, P, uo(g, L), D, !1),
        B > 0)
      ) {
        if (B & 16) N(F, g, X, W, A, P, L);
        else if (
          (B & 2 && X.class !== W.class && o(F, "class", null, W.class, L),
          B & 4 && o(F, "style", X.style, W.style, L),
          B & 8)
        ) {
          const te = g.dynamicProps;
          for (let pe = 0; pe < te.length; pe++) {
            const ge = te[pe],
              $e = X[ge],
              ht = W[ge];
            (ht !== $e || ge === "value") &&
              o(F, ge, $e, ht, L, p.children, A, P, Ct);
          }
        }
        B & 1 && p.children !== g.children && h(F, g.children);
      } else !q && I == null && N(F, g, X, W, A, P, L);
      ((J = W.onVnodeUpdated) || j) &&
        Oe(() => {
          J && Ue(J, A, g, p), j && _t(g, p, A, "updated");
        }, P);
    },
    x = (p, g, A, P, L, D, q) => {
      for (let F = 0; F < g.length; F++) {
        const B = p[F],
          I = g[F],
          j =
            B.el && (B.type === fe || !dt(B, I) || B.shapeFlag & 70)
              ? u(B.el)
              : A;
        w(B, I, j, null, P, L, D, q, !0);
      }
    },
    N = (p, g, A, P, L, D, q) => {
      if (A !== P) {
        if (A !== ae)
          for (const F in A)
            !Kt(F) && !(F in P) && o(p, F, A[F], null, q, g.children, L, D, Ct);
        for (const F in P) {
          if (Kt(F)) continue;
          const B = P[F],
            I = A[F];
          B !== I && F !== "value" && o(p, F, I, B, q, g.children, L, D, Ct);
        }
        "value" in P && o(p, "value", A.value, P.value, q);
      }
    },
    C = (p, g, A, P, L, D, q, F, B) => {
      const I = (g.el = p ? p.el : l("")),
        j = (g.anchor = p ? p.anchor : l(""));
      let { patchFlag: X, dynamicChildren: W, slotScopeIds: J } = g;
      J && (F = F ? F.concat(J) : J),
        p == null
          ? (n(I, A, P), n(j, A, P), v(g.children || [], A, j, L, D, q, F, B))
          : X > 0 && X & 64 && W && p.dynamicChildren
          ? (x(p.dynamicChildren, W, A, L, D, q, F),
            (g.key != null || (L && g === L.subTree)) && _r(p, g, !0))
          : U(p, g, A, j, L, D, q, F, B);
    },
    R = (p, g, A, P, L, D, q, F, B) => {
      (g.slotScopeIds = F),
        p == null
          ? g.shapeFlag & 512
            ? L.ctx.activate(g, A, P, q, B)
            : V(g, A, P, L, D, q, B)
          : Y(p, g, B);
    },
    V = (p, g, A, P, L, D, q) => {
      const F = (p.component = kc(p, P, L));
      if ((Pn(p) && (F.ctx.renderer = $s), $c(F), F.asyncDep)) {
        if ((L && L.registerDep(F, H), !p.el)) {
          const B = (F.subTree = re(Be));
          O(null, B, g, A);
        }
      } else H(F, p, g, A, L, D, q);
    },
    Y = (p, g, A) => {
      const P = (g.component = p.component);
      if (kf(p, g, A))
        if (P.asyncDep && !P.asyncResolved) {
          K(P, g, A);
          return;
        } else (P.next = g), bf(P.update), (P.effect.dirty = !0), P.update();
      else (g.el = p.el), (P.vnode = g);
    },
    H = (p, g, A, P, L, D, q) => {
      const F = () => {
          if (p.isMounted) {
            let { next: j, bu: X, u: W, parent: J, vnode: te } = p;
            {
              const Ns = _c(p);
              if (Ns) {
                j && ((j.el = te.el), K(p, j, q)),
                  Ns.asyncDep.then(() => {
                    p.isUnmounted || F();
                  });
                return;
              }
            }
            let pe = j,
              ge;
            ss(p, !1),
              j ? ((j.el = te.el), K(p, j, q)) : (j = te),
              X && Fs(X),
              (ge = j.props && j.props.onVnodeBeforeUpdate) && Ue(ge, J, j, te),
              ss(p, !0);
            const $e = si(p),
              ht = p.subTree;
            (p.subTree = $e),
              w(ht, $e, u(ht.el), Bn(ht), p, L, D),
              (j.el = $e.el),
              pe === null && ur(p, $e.el),
              W && Oe(W, L),
              (ge = j.props && j.props.onVnodeUpdated) &&
                Oe(() => Ue(ge, J, j, te), L);
          } else {
            let j;
            const { el: X, props: W } = g,
              { bm: J, m: te, parent: pe } = p,
              ge = fs(g);
            if (
              (ss(p, !1),
              J && Fs(J),
              !ge && (j = W && W.onVnodeBeforeMount) && Ue(j, pe, g),
              ss(p, !0),
              X && io)
            ) {
              const $e = () => {
                (p.subTree = si(p)), io(X, p.subTree, p, L, null);
              };
              ge
                ? g.type.__asyncLoader().then(() => !p.isUnmounted && $e())
                : $e();
            } else {
              const $e = (p.subTree = si(p));
              w(null, $e, A, P, p, L, D), (g.el = $e.el);
            }
            if ((te && Oe(te, L), !ge && (j = W && W.onVnodeMounted))) {
              const $e = g;
              Oe(() => Ue(j, pe, $e), L);
            }
            (g.shapeFlag & 256 ||
              (pe && fs(pe.vnode) && pe.vnode.shapeFlag & 256)) &&
              p.a &&
              Oe(p.a, L),
              (p.isMounted = !0),
              (g = A = P = null);
          }
        },
        B = (p.effect = new zs(F, Ae, () => Bi(I), p.scope)),
        I = (p.update = () => {
          B.dirty && B.run();
        });
      (I.id = p.uid), ss(p, !0), I();
    },
    K = (p, g, A) => {
      g.component = p;
      const P = p.vnode.props;
      (p.vnode = g),
        (p.next = null),
        md(p, g.props, P, A),
        bd(p, g.children, A),
        Ts(),
        il(p),
        ks();
    },
    U = (p, g, A, P, L, D, q, F, B = !1) => {
      const I = p && p.children,
        j = p ? p.shapeFlag : 0,
        X = g.children,
        { patchFlag: W, shapeFlag: J } = g;
      if (W > 0) {
        if (W & 128) {
          Rt(I, X, A, P, L, D, q, F, B);
          return;
        } else if (W & 256) {
          Ve(I, X, A, P, L, D, q, F, B);
          return;
        }
      }
      J & 8
        ? (j & 16 && Ct(I, L, D), X !== I && h(A, X))
        : j & 16
        ? J & 16
          ? Rt(I, X, A, P, L, D, q, F, B)
          : Ct(I, L, D, !0)
        : (j & 8 && h(A, ""), J & 16 && v(X, A, P, L, D, q, F, B));
    },
    Ve = (p, g, A, P, L, D, q, F, B) => {
      (p = p || Is), (g = g || Is);
      const I = p.length,
        j = g.length,
        X = Math.min(I, j);
      let W;
      for (W = 0; W < X; W++) {
        const J = (g[W] = B ? jt(g[W]) : et(g[W]));
        w(p[W], J, A, null, L, D, q, F, B);
      }
      I > j ? Ct(p, L, D, !0, !1, X) : v(g, A, P, L, D, q, F, B, X);
    },
    Rt = (p, g, A, P, L, D, q, F, B) => {
      let I = 0;
      const j = g.length;
      let X = p.length - 1,
        W = j - 1;
      for (; I <= X && I <= W; ) {
        const J = p[I],
          te = (g[I] = B ? jt(g[I]) : et(g[I]));
        if (dt(J, te)) w(J, te, A, null, L, D, q, F, B);
        else break;
        I++;
      }
      for (; I <= X && I <= W; ) {
        const J = p[X],
          te = (g[W] = B ? jt(g[W]) : et(g[W]));
        if (dt(J, te)) w(J, te, A, null, L, D, q, F, B);
        else break;
        X--, W--;
      }
      if (I > X) {
        if (I <= W) {
          const J = W + 1,
            te = J < j ? g[J].el : P;
          for (; I <= W; )
            w(null, (g[I] = B ? jt(g[I]) : et(g[I])), A, te, L, D, q, F, B),
              I++;
        }
      } else if (I > W) for (; I <= X; ) bt(p[I], L, D, !0), I++;
      else {
        const J = I,
          te = I,
          pe = new Map();
        for (I = te; I <= W; I++) {
          const Ye = (g[I] = B ? jt(g[I]) : et(g[I]));
          Ye.key != null && pe.set(Ye.key, I);
        }
        let ge,
          $e = 0;
        const ht = W - te + 1;
        let Ns = !1,
          Wr = 0;
        const Qs = new Array(ht);
        for (I = 0; I < ht; I++) Qs[I] = 0;
        for (I = J; I <= X; I++) {
          const Ye = p[I];
          if ($e >= ht) {
            bt(Ye, L, D, !0);
            continue;
          }
          let vt;
          if (Ye.key != null) vt = pe.get(Ye.key);
          else
            for (ge = te; ge <= W; ge++)
              if (Qs[ge - te] === 0 && dt(Ye, g[ge])) {
                vt = ge;
                break;
              }
          vt === void 0
            ? bt(Ye, L, D, !0)
            : ((Qs[vt - te] = I + 1),
              vt >= Wr ? (Wr = vt) : (Ns = !0),
              w(Ye, g[vt], A, null, L, D, q, F, B),
              $e++);
        }
        const Kr = Ns ? wd(Qs) : Is;
        for (ge = Kr.length - 1, I = ht - 1; I >= 0; I--) {
          const Ye = te + I,
            vt = g[Ye],
            Xr = Ye + 1 < j ? g[Ye + 1].el : P;
          Qs[I] === 0
            ? w(null, vt, A, Xr, L, D, q, F, B)
            : Ns && (ge < 0 || I !== Kr[ge] ? ts(vt, A, Xr, 2) : ge--);
        }
      }
    },
    ts = (p, g, A, P, L = null) => {
      const { el: D, type: q, transition: F, children: B, shapeFlag: I } = p;
      if (I & 6) {
        ts(p.component.subTree, g, A, P);
        return;
      }
      if (I & 128) {
        p.suspense.move(g, A, P);
        return;
      }
      if (I & 64) {
        q.move(p, g, A, $s);
        return;
      }
      if (q === fe) {
        n(D, g, A);
        for (let X = 0; X < B.length; X++) ts(B[X], g, A, P);
        n(p.anchor, g, A);
        return;
      }
      if (q === ds) {
        y(p, g, A);
        return;
      }
      if (P !== 2 && I & 1 && F)
        if (P === 0) F.beforeEnter(D), n(D, g, A), Oe(() => F.enter(D), L);
        else {
          const { leave: X, delayLeave: W, afterLeave: J } = F,
            te = () => n(D, g, A),
            pe = () => {
              X(D, () => {
                te(), J && J();
              });
            };
          W ? W(D, te, pe) : pe();
        }
      else n(D, g, A);
    },
    bt = (p, g, A, P = !1, L = !1) => {
      const {
        type: D,
        props: q,
        ref: F,
        children: B,
        dynamicChildren: I,
        shapeFlag: j,
        patchFlag: X,
        dirs: W,
      } = p;
      if ((F != null && mi(F, null, A, p, !0), j & 256)) {
        g.ctx.deactivate(p);
        return;
      }
      const J = j & 1 && W,
        te = !fs(p);
      let pe;
      if ((te && (pe = q && q.onVnodeBeforeUnmount) && Ue(pe, g, p), j & 6))
        iu(p.component, A, P);
      else {
        if (j & 128) {
          p.suspense.unmount(A, P);
          return;
        }
        J && _t(p, null, g, "beforeUnmount"),
          j & 64
            ? p.type.remove(p, g, A, L, $s, P)
            : I && (D !== fe || (X > 0 && X & 64))
            ? Ct(I, g, A, !1, !0)
            : ((D === fe && X & 384) || (!L && j & 16)) && Ct(B, g, A),
          P && jr(p);
      }
      ((te && (pe = q && q.onVnodeUnmounted)) || J) &&
        Oe(() => {
          pe && Ue(pe, g, p), J && _t(p, null, g, "unmounted");
        }, A);
    },
    jr = (p) => {
      const { type: g, el: A, anchor: P, transition: L } = p;
      if (g === fe) {
        nu(A, P);
        return;
      }
      if (g === ds) {
        _(p);
        return;
      }
      const D = () => {
        i(A), L && !L.persisted && L.afterLeave && L.afterLeave();
      };
      if (p.shapeFlag & 1 && L && !L.persisted) {
        const { leave: q, delayLeave: F } = L,
          B = () => q(A, D);
        F ? F(p.el, D, B) : B();
      } else D();
    },
    nu = (p, g) => {
      let A;
      for (; p !== g; ) (A = f(p)), i(p), (p = A);
      i(g);
    },
    iu = (p, g, A) => {
      const { bum: P, scope: L, update: D, subTree: q, um: F } = p;
      P && Fs(P),
        L.stop(),
        D && ((D.active = !1), bt(q, p, g, A)),
        F && Oe(F, g),
        Oe(() => {
          p.isUnmounted = !0;
        }, g),
        g &&
          g.pendingBranch &&
          !g.isUnmounted &&
          p.asyncDep &&
          !p.asyncResolved &&
          p.suspenseId === g.pendingId &&
          (g.deps--, g.deps === 0 && g.resolve());
    },
    Ct = (p, g, A, P = !1, L = !1, D = 0) => {
      for (let q = D; q < p.length; q++) bt(p[q], g, A, P, L);
    },
    Bn = (p) =>
      p.shapeFlag & 6
        ? Bn(p.component.subTree)
        : p.shapeFlag & 128
        ? p.suspense.next()
        : f(p.anchor || p.el);
  let so = !1;
  const Ur = (p, g, A) => {
      p == null
        ? g._vnode && bt(g._vnode, null, null, !0)
        : w(g._vnode || null, p, g, null, null, null, A),
        so || ((so = !0), il(), di(), (so = !1)),
        (g._vnode = p);
    },
    $s = {
      p: w,
      um: bt,
      m: ts,
      r: jr,
      mt: V,
      mc: v,
      pc: U,
      pbc: x,
      n: Bn,
      o: t,
    };
  let no, io;
  return (
    e && ([no, io] = e($s)), { render: Ur, hydrate: no, createApp: fd(Ur, no) }
  );
}
function uo({ type: t, props: e }, s) {
  return (s === "svg" && t === "foreignObject") ||
    (s === "mathml" &&
      t === "annotation-xml" &&
      e &&
      e.encoding &&
      e.encoding.includes("html"))
    ? void 0
    : s;
}
function ss({ effect: t, update: e }, s) {
  t.allowRecurse = e.allowRecurse = s;
}
function vc(t, e) {
  return (!t || (t && !t.pendingBranch)) && e && !e.persisted;
}
function _r(t, e, s = !1) {
  const n = t.children,
    i = e.children;
  if (z(n) && z(i))
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      let l = i[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = i[o] = jt(i[o])), (l.el = r.el)),
        s || _r(r, l)),
        l.type === vs && (l.el = r.el);
    }
}
function wd(t) {
  const e = t.slice(),
    s = [0];
  let n, i, o, r, l;
  const a = t.length;
  for (n = 0; n < a; n++) {
    const c = t[n];
    if (c !== 0) {
      if (((i = s[s.length - 1]), t[i] < c)) {
        (e[n] = i), s.push(n);
        continue;
      }
      for (o = 0, r = s.length - 1; o < r; )
        (l = (o + r) >> 1), t[s[l]] < c ? (o = l + 1) : (r = l);
      c < t[s[o]] && (o > 0 && (e[n] = s[o - 1]), (s[o] = n));
    }
  }
  for (o = s.length, r = s[o - 1]; o-- > 0; ) (s[o] = r), (r = e[r]);
  return s;
}
function _c(t) {
  const e = t.subTree.component;
  if (e) return e.asyncDep && !e.asyncResolved ? e : _c(e);
}
const Sd = (t) => t.__isTeleport,
  un = (t) => t && (t.disabled || t.disabled === ""),
  gl = (t) => typeof SVGElement < "u" && t instanceof SVGElement,
  yl = (t) => typeof MathMLElement == "function" && t instanceof MathMLElement,
  Po = (t, e) => {
    const s = t && t.to;
    return Z(s) ? (e ? e(s) : null) : s;
  },
  Cd = {
    name: "Teleport",
    __isTeleport: !0,
    process(t, e, s, n, i, o, r, l, a, c) {
      const {
          mc: h,
          pc: u,
          pbc: f,
          o: { insert: d, querySelector: m, createText: w, createComment: $ },
        } = c,
        O = un(e.props);
      let { shapeFlag: T, children: y, dynamicChildren: _ } = e;
      if (t == null) {
        const S = (e.el = w("")),
          k = (e.anchor = w(""));
        d(S, s, n), d(k, s, n);
        const M = (e.target = Po(e.props, m)),
          v = (e.targetAnchor = w(""));
        M &&
          (d(v, M),
          r === "svg" || gl(M)
            ? (r = "svg")
            : (r === "mathml" || yl(M)) && (r = "mathml"));
        const E = (x, N) => {
          T & 16 && h(y, x, N, i, o, r, l, a);
        };
        O ? E(s, k) : M && E(M, v);
      } else {
        e.el = t.el;
        const S = (e.anchor = t.anchor),
          k = (e.target = t.target),
          M = (e.targetAnchor = t.targetAnchor),
          v = un(t.props),
          E = v ? s : k,
          x = v ? S : M;
        if (
          (r === "svg" || gl(k)
            ? (r = "svg")
            : (r === "mathml" || yl(k)) && (r = "mathml"),
          _
            ? (f(t.dynamicChildren, _, E, i, o, r, l), _r(t, e, !0))
            : a || u(t, e, E, x, i, o, r, l, !1),
          O)
        )
          v
            ? e.props &&
              t.props &&
              e.props.to !== t.props.to &&
              (e.props.to = t.props.to)
            : Yn(e, s, S, c, 1);
        else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
          const N = (e.target = Po(e.props, m));
          N && Yn(e, N, null, c, 0);
        } else v && Yn(e, k, M, c, 1);
      }
      xc(e);
    },
    remove(t, e, s, n, { um: i, o: { remove: o } }, r) {
      const {
        shapeFlag: l,
        children: a,
        anchor: c,
        targetAnchor: h,
        target: u,
        props: f,
      } = t;
      if ((u && o(h), r && o(c), l & 16)) {
        const d = r || !un(f);
        for (let m = 0; m < a.length; m++) {
          const w = a[m];
          i(w, e, s, d, !!w.dynamicChildren);
        }
      }
    },
    move: Yn,
    hydrate: Ed,
  };
function Yn(t, e, s, { o: { insert: n }, m: i }, o = 2) {
  o === 0 && n(t.targetAnchor, e, s);
  const { el: r, anchor: l, shapeFlag: a, children: c, props: h } = t,
    u = o === 2;
  if ((u && n(r, e, s), (!u || un(h)) && a & 16))
    for (let f = 0; f < c.length; f++) i(c[f], e, s, 2);
  u && n(l, e, s);
}
function Ed(
  t,
  e,
  s,
  n,
  i,
  o,
  { o: { nextSibling: r, parentNode: l, querySelector: a } },
  c
) {
  const h = (e.target = Po(e.props, a));
  if (h) {
    const u = h._lpa || h.firstChild;
    if (e.shapeFlag & 16)
      if (un(e.props))
        (e.anchor = c(r(t), e, l(t), s, n, i, o)), (e.targetAnchor = u);
      else {
        e.anchor = r(t);
        let f = u;
        for (; f; )
          if (
            ((f = r(f)), f && f.nodeType === 8 && f.data === "teleport anchor")
          ) {
            (e.targetAnchor = f),
              (h._lpa = e.targetAnchor && r(e.targetAnchor));
            break;
          }
        c(u, e, h, s, n, i, o);
      }
    xc(e);
  }
  return e.anchor && r(e.anchor);
}
const Td = Cd;
function xc(t) {
  const e = t.ctx;
  if (e && e.ut) {
    let s = t.children[0].el;
    for (; s && s !== t.targetAnchor; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", e.uid),
        (s = s.nextSibling);
    e.ut();
  }
}
const fe = Symbol.for("v-fgt"),
  vs = Symbol.for("v-txt"),
  Be = Symbol.for("v-cmt"),
  ds = Symbol.for("v-stc"),
  fn = [];
let We = null;
function se(t = !1) {
  fn.push((We = t ? null : []));
}
function wc() {
  fn.pop(), (We = fn[fn.length - 1] || null);
}
let _s = 1;
function Lo(t) {
  _s += t;
}
function Sc(t) {
  return (
    (t.dynamicChildren = _s > 0 ? We || Is : null),
    wc(),
    _s > 0 && We && We.push(t),
    t
  );
}
function he(t, e, s, n, i, o) {
  return Sc(b(t, e, s, n, i, o, !0));
}
function Ki(t, e, s, n, i) {
  return Sc(re(t, e, s, n, i, !0));
}
function Jt(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function dt(t, e) {
  return t.type === e.type && t.key === e.key;
}
function kd(t) {}
const Xi = "__vInternal",
  Cc = ({ key: t }) => t ?? null,
  ni = ({ ref: t, ref_key: e, ref_for: s }) => (
    typeof t == "number" && (t = "" + t),
    t != null
      ? Z(t) || Me(t) || G(t)
        ? { i: Ce, r: t, k: e, f: !!s }
        : t
      : null
  );
function b(
  t,
  e = null,
  s = null,
  n = 0,
  i = null,
  o = t === fe ? 0 : 1,
  r = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Cc(e),
    ref: e && ni(e),
    scopeId: Vi,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce,
  };
  return (
    l
      ? (xr(a, s), o & 128 && t.normalize(a))
      : s && (a.shapeFlag |= Z(s) ? 8 : 16),
    _s > 0 &&
      !r &&
      We &&
      (a.patchFlag > 0 || o & 6) &&
      a.patchFlag !== 32 &&
      We.push(a),
    a
  );
}
const re = Ad;
function Ad(t, e = null, s = null, n = 0, i = null, o = !1) {
  if (((!t || t === Ha) && (t = Be), Jt(t))) {
    const l = St(t, e, !0);
    return (
      s && xr(l, s),
      _s > 0 &&
        !o &&
        We &&
        (l.shapeFlag & 6 ? (We[We.indexOf(t)] = l) : We.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Md(t) && (t = t.__vccOpts), e)) {
    e = Ec(e);
    let { class: l, style: a } = e;
    l && !Z(l) && (e.class = me(l)),
      de(a) && (ir(a) && !z(a) && (a = le({}, a)), (e.style = gs(a)));
  }
  const r = Z(t) ? 1 : qa(t) ? 128 : Sd(t) ? 64 : de(t) ? 4 : G(t) ? 2 : 0;
  return b(t, e, s, n, i, r, o, !0);
}
function Ec(t) {
  return t ? (ir(t) || Xi in t ? le({}, t) : t) : null;
}
function St(t, e, s = !1) {
  const { props: n, ref: i, patchFlag: o, children: r } = t,
    l = e ? Tc(n || {}, e) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && Cc(l),
    ref:
      e && e.ref ? (s && i ? (z(i) ? i.concat(ni(e)) : [i, ni(e)]) : ni(e)) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: r,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== fe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && St(t.ssContent),
    ssFallback: t.ssFallback && St(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
  };
}
function Ie(t = " ", e = 0) {
  return re(vs, null, t, e);
}
function $d(t, e) {
  const s = re(ds, null, t);
  return (s.staticCount = e), s;
}
function Zt(t = "", e = !1) {
  return e ? (se(), Ki(Be, null, t)) : re(Be, null, t);
}
function et(t) {
  return t == null || typeof t == "boolean"
    ? re(Be)
    : z(t)
    ? re(fe, null, t.slice())
    : typeof t == "object"
    ? jt(t)
    : re(vs, null, String(t));
}
function jt(t) {
  return (t.el === null && t.patchFlag !== -1) || t.memo ? t : St(t);
}
function xr(t, e) {
  let s = 0;
  const { shapeFlag: n } = t;
  if (e == null) e = null;
  else if (z(e)) s = 16;
  else if (typeof e == "object")
    if (n & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), xr(t, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = e._;
      !i && !(Xi in e)
        ? (e._ctx = Ce)
        : i === 3 &&
          Ce &&
          (Ce.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)));
    }
  else
    G(e)
      ? ((e = { default: e, _ctx: Ce }), (s = 32))
      : ((e = String(e)), n & 64 ? ((s = 16), (e = [Ie(e)])) : (s = 8));
  (t.children = e), (t.shapeFlag |= s);
}
function Tc(...t) {
  const e = {};
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    for (const i in n)
      if (i === "class")
        e.class !== n.class && (e.class = me([e.class, n.class]));
      else if (i === "style") e.style = gs([e.style, n.style]);
      else if (Ss(i)) {
        const o = e[i],
          r = n[i];
        r &&
          o !== r &&
          !(z(o) && o.includes(r)) &&
          (e[i] = o ? [].concat(o, r) : r);
      } else i !== "" && (e[i] = n[i]);
  }
  return e;
}
function Ue(t, e, s, n = null) {
  st(t, e, 7, [s, n]);
}
const Nd = cc();
let Pd = 0;
function kc(t, e, s) {
  const n = t.type,
    i = (e ? e.appContext : t.appContext) || Nd,
    o = {
      uid: Pd++,
      vnode: t,
      type: n,
      parent: e,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Qo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: fc(n, i),
      emitsOptions: Ba(n, i),
      emit: null,
      emitted: null,
      propsDefaults: ae,
      inheritAttrs: n.inheritAttrs,
      ctx: ae,
      data: ae,
      props: ae,
      attrs: ae,
      slots: ae,
      refs: ae,
      setupState: ae,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = e ? e.root : o),
    (o.emit = _f.bind(null, o)),
    t.ce && t.ce(o),
    o
  );
}
let ke = null;
const It = () => ke || Ce;
let gi, Oo;
{
  const t = ua(),
    e = (s, n) => {
      let i;
      return (
        (i = t[s]) || (i = t[s] = []),
        i.push(n),
        (o) => {
          i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
        }
      );
    };
  (gi = e("__VUE_INSTANCE_SETTERS__", (s) => (ke = s))),
    (Oo = e("__VUE_SSR_SETTERS__", (s) => (On = s)));
}
const xs = (t) => {
    const e = ke;
    return (
      gi(t),
      t.scope.on(),
      () => {
        t.scope.off(), gi(e);
      }
    );
  },
  Io = () => {
    ke && ke.scope.off(), gi(null);
  };
function Ac(t) {
  return t.vnode.shapeFlag & 4;
}
let On = !1;
function $c(t, e = !1) {
  e && Oo(e);
  const { props: s, children: n } = t.vnode,
    i = Ac(t);
  pd(t, s, i, e), yd(t, n);
  const o = i ? Ld(t, e) : void 0;
  return e && Oo(!1), o;
}
function Ld(t, e) {
  const s = t.type;
  (t.accessCache = Object.create(null)), (t.proxy = or(new Proxy(t.ctx, ko)));
  const { setup: n } = s;
  if (n) {
    const i = (t.setupContext = n.length > 1 ? Lc(t) : null),
      o = xs(t);
    Ts();
    const r = Pt(n, t, 0, [t.props, i]);
    if ((ks(), o(), Jo(r))) {
      if ((r.then(Io, Io), e))
        return r
          .then((l) => {
            Mo(t, l, e);
          })
          .catch((l) => {
            As(l, t, 0);
          });
      t.asyncDep = r;
    } else Mo(t, r, e);
  } else Pc(t, e);
}
function Mo(t, e, s) {
  G(e)
    ? t.type.__ssrInlineRender
      ? (t.ssrRender = e)
      : (t.render = e)
    : de(e) && (t.setupState = cr(e)),
    Pc(t, s);
}
let yi, Ro;
function Nc(t) {
  (yi = t),
    (Ro = (e) => {
      e.render._rc && (e.withProxy = new Proxy(e.ctx, Wf));
    });
}
const Od = () => !yi;
function Pc(t, e, s) {
  const n = t.type;
  if (!t.render) {
    if (!e && yi && !n.render) {
      const i = n.template || br(t).template;
      if (i) {
        const { isCustomElement: o, compilerOptions: r } = t.appContext.config,
          { delimiters: l, compilerOptions: a } = n,
          c = le(le({ isCustomElement: o, delimiters: l }, r), a);
        n.render = yi(i, c);
      }
    }
    (t.render = n.render || Ae), Ro && Ro(t);
  }
  {
    const i = xs(t);
    Ts();
    try {
      rd(t);
    } finally {
      ks(), i();
    }
  }
}
function Id(t) {
  return (
    t.attrsProxy ||
    (t.attrsProxy = new Proxy(t.attrs, {
      get(e, s) {
        return Ge(t, "get", "$attrs"), e[s];
      },
    }))
  );
}
function Lc(t) {
  const e = (s) => {
    t.exposed = s || {};
  };
  return {
    get attrs() {
      return Id(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e,
  };
}
function Gi(t) {
  if (t.exposed)
    return (
      t.exposeProxy ||
      (t.exposeProxy = new Proxy(cr(or(t.exposed)), {
        get(e, s) {
          if (s in e) return e[s];
          if (s in cn) return cn[s](t);
        },
        has(e, s) {
          return s in e || s in cn;
        },
      }))
    );
}
function Fo(t, e = !0) {
  return G(t) ? t.displayName || t.name : t.name || (e && t.__name);
}
function Md(t) {
  return G(t) && "__vccOpts" in t;
}
const Oc = (t, e) => Qu(t, e, On);
function Rd(t, e, s = ae) {
  const n = It(),
    i = be(e),
    o = tt(e),
    r = Oa((a, c) => {
      let h;
      return (
        Ka(() => {
          const u = t[e];
          yt(h, u) && ((h = u), c());
        }),
        {
          get() {
            return a(), s.get ? s.get(h) : h;
          },
          set(u) {
            const f = n.vnode.props;
            !(
              f &&
              (e in f || i in f || o in f) &&
              (`onUpdate:${e}` in f ||
                `onUpdate:${i}` in f ||
                `onUpdate:${o}` in f)
            ) &&
              yt(u, h) &&
              ((h = u), c()),
              n.emit(`update:${e}`, s.set ? s.set(u) : u);
          },
        }
      );
    }),
    l = e === "modelValue" ? "modelModifiers" : `${e}Modifiers`;
  return (
    (r[Symbol.iterator] = () => {
      let a = 0;
      return {
        next() {
          return a < 2
            ? { value: a++ ? t[l] || {} : r, done: !1 }
            : { done: !0 };
        },
      };
    }),
    r
  );
}
function Ic(t, e, s) {
  const n = arguments.length;
  return n === 2
    ? de(e) && !z(e)
      ? Jt(e)
        ? re(t, null, [e])
        : re(t, e)
      : re(t, null, e)
    : (n > 3
        ? (s = Array.prototype.slice.call(arguments, 2))
        : n === 3 && Jt(s) && (s = [s]),
      re(t, e, s));
}
function Fd() {}
function Dd(t, e, s, n) {
  const i = s[n];
  if (i && Mc(i, t)) return i;
  const o = e();
  return (o.memo = t.slice()), (s[n] = o);
}
function Mc(t, e) {
  const s = t.memo;
  if (s.length != e.length) return !1;
  for (let n = 0; n < s.length; n++) if (yt(s[n], e[n])) return !1;
  return _s > 0 && We && We.push(t), !0;
}
const Rc = "3.4.21",
  Bd = Ae,
  Hd = mf,
  Vd = Os,
  qd = Da,
  zd = {
    createComponentInstance: kc,
    setupComponent: $c,
    renderComponentRoot: si,
    setCurrentRenderingInstance: _n,
    isVNode: Jt,
    normalizeVNode: et,
  },
  jd = zd,
  Ud = null,
  Wd = null,
  Kd = null;
/**
 * @vue/runtime-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Xd = "http://www.w3.org/2000/svg",
  Gd = "http://www.w3.org/1998/Math/MathML",
  Ut = typeof document < "u" ? document : null,
  bl = Ut && Ut.createElement("template"),
  Yd = {
    insert: (t, e, s) => {
      e.insertBefore(t, s || null);
    },
    remove: (t) => {
      const e = t.parentNode;
      e && e.removeChild(t);
    },
    createElement: (t, e, s, n) => {
      const i =
        e === "svg"
          ? Ut.createElementNS(Xd, t)
          : e === "mathml"
          ? Ut.createElementNS(Gd, t)
          : Ut.createElement(t, s ? { is: s } : void 0);
      return (
        t === "select" &&
          n &&
          n.multiple != null &&
          i.setAttribute("multiple", n.multiple),
        i
      );
    },
    createText: (t) => Ut.createTextNode(t),
    createComment: (t) => Ut.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e;
    },
    setElementText: (t, e) => {
      t.textContent = e;
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => Ut.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "");
    },
    insertStaticContent(t, e, s, n, i, o) {
      const r = s ? s.previousSibling : e.lastChild;
      if (i && (i === o || i.nextSibling))
        for (
          ;
          e.insertBefore(i.cloneNode(!0), s),
            !(i === o || !(i = i.nextSibling));

        );
      else {
        bl.innerHTML =
          n === "svg"
            ? `<svg>${t}</svg>`
            : n === "mathml"
            ? `<math>${t}</math>`
            : t;
        const l = bl.content;
        if (n === "svg" || n === "mathml") {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        e.insertBefore(l, s);
      }
      return [
        r ? r.nextSibling : e.firstChild,
        s ? s.previousSibling : e.lastChild,
      ];
    },
  },
  Bt = "transition",
  en = "animation",
  Us = Symbol("_vtc"),
  In = (t, { slots: e }) => Ic(Ga, Dc(t), e);
In.displayName = "Transition";
const Fc = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Jd = (In.props = le({}, gr, Fc)),
  ns = (t, e = []) => {
    z(t) ? t.forEach((s) => s(...e)) : t && t(...e);
  },
  vl = (t) => (t ? (z(t) ? t.some((e) => e.length > 1) : t.length > 1) : !1);
function Dc(t) {
  const e = {};
  for (const C in t) C in Fc || (e[C] = t[C]);
  if (t.css === !1) return e;
  const {
      name: s = "v",
      type: n,
      duration: i,
      enterFromClass: o = `${s}-enter-from`,
      enterActiveClass: r = `${s}-enter-active`,
      enterToClass: l = `${s}-enter-to`,
      appearFromClass: a = o,
      appearActiveClass: c = r,
      appearToClass: h = l,
      leaveFromClass: u = `${s}-leave-from`,
      leaveActiveClass: f = `${s}-leave-active`,
      leaveToClass: d = `${s}-leave-to`,
    } = t,
    m = Zd(i),
    w = m && m[0],
    $ = m && m[1],
    {
      onBeforeEnter: O,
      onEnter: T,
      onEnterCancelled: y,
      onLeave: _,
      onLeaveCancelled: S,
      onBeforeAppear: k = O,
      onAppear: M = T,
      onAppearCancelled: v = y,
    } = e,
    E = (C, R, V) => {
      Vt(C, R ? h : l), Vt(C, R ? c : r), V && V();
    },
    x = (C, R) => {
      (C._isLeaving = !1), Vt(C, u), Vt(C, d), Vt(C, f), R && R();
    },
    N = (C) => (R, V) => {
      const Y = C ? M : T,
        H = () => E(R, C, V);
      ns(Y, [R, H]),
        _l(() => {
          Vt(R, C ? a : o), Tt(R, C ? h : l), vl(Y) || xl(R, n, w, H);
        });
    };
  return le(e, {
    onBeforeEnter(C) {
      ns(O, [C]), Tt(C, o), Tt(C, r);
    },
    onBeforeAppear(C) {
      ns(k, [C]), Tt(C, a), Tt(C, c);
    },
    onEnter: N(!1),
    onAppear: N(!0),
    onLeave(C, R) {
      C._isLeaving = !0;
      const V = () => x(C, R);
      Tt(C, u),
        Hc(),
        Tt(C, f),
        _l(() => {
          C._isLeaving && (Vt(C, u), Tt(C, d), vl(_) || xl(C, n, $, V));
        }),
        ns(_, [C, V]);
    },
    onEnterCancelled(C) {
      E(C, !1), ns(y, [C]);
    },
    onAppearCancelled(C) {
      E(C, !0), ns(v, [C]);
    },
    onLeaveCancelled(C) {
      x(C), ns(S, [C]);
    },
  });
}
function Zd(t) {
  if (t == null) return null;
  if (de(t)) return [fo(t.enter), fo(t.leave)];
  {
    const e = fo(t);
    return [e, e];
  }
}
function fo(t) {
  return hi(t);
}
function Tt(t, e) {
  e.split(/\s+/).forEach((s) => s && t.classList.add(s)),
    (t[Us] || (t[Us] = new Set())).add(e);
}
function Vt(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.remove(n));
  const s = t[Us];
  s && (s.delete(e), s.size || (t[Us] = void 0));
}
function _l(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Qd = 0;
function xl(t, e, s, n) {
  const i = (t._endId = ++Qd),
    o = () => {
      i === t._endId && n();
    };
  if (s) return setTimeout(o, s);
  const { type: r, timeout: l, propCount: a } = Bc(t, e);
  if (!r) return n();
  const c = r + "end";
  let h = 0;
  const u = () => {
      t.removeEventListener(c, f), o();
    },
    f = (d) => {
      d.target === t && ++h >= a && u();
    };
  setTimeout(() => {
    h < a && u();
  }, l + 1),
    t.addEventListener(c, f);
}
function Bc(t, e) {
  const s = window.getComputedStyle(t),
    n = (m) => (s[m] || "").split(", "),
    i = n(`${Bt}Delay`),
    o = n(`${Bt}Duration`),
    r = wl(i, o),
    l = n(`${en}Delay`),
    a = n(`${en}Duration`),
    c = wl(l, a);
  let h = null,
    u = 0,
    f = 0;
  e === Bt
    ? r > 0 && ((h = Bt), (u = r), (f = o.length))
    : e === en
    ? c > 0 && ((h = en), (u = c), (f = a.length))
    : ((u = Math.max(r, c)),
      (h = u > 0 ? (r > c ? Bt : en) : null),
      (f = h ? (h === Bt ? o.length : a.length) : 0));
  const d =
    h === Bt && /\b(transform|all)(,|$)/.test(n(`${Bt}Property`).toString());
  return { type: h, timeout: u, propCount: f, hasTransform: d };
}
function wl(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((s, n) => Sl(s) + Sl(t[n])));
}
function Sl(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function Hc() {
  return document.body.offsetHeight;
}
function ep(t, e, s) {
  const n = t[Us];
  n && (e = (e ? [e, ...n] : [...n]).join(" ")),
    e == null
      ? t.removeAttribute("class")
      : s
      ? t.setAttribute("class", e)
      : (t.className = e);
}
const bi = Symbol("_vod"),
  Vc = Symbol("_vsh"),
  Ze = {
    beforeMount(t, { value: e }, { transition: s }) {
      (t[bi] = t.style.display === "none" ? "" : t.style.display),
        s && e ? s.beforeEnter(t) : tn(t, e);
    },
    mounted(t, { value: e }, { transition: s }) {
      s && e && s.enter(t);
    },
    updated(t, { value: e, oldValue: s }, { transition: n }) {
      !e != !s &&
        (n
          ? e
            ? (n.beforeEnter(t), tn(t, !0), n.enter(t))
            : n.leave(t, () => {
                tn(t, !1);
              })
          : tn(t, e));
    },
    beforeUnmount(t, { value: e }) {
      tn(t, e);
    },
  };
function tn(t, e) {
  (t.style.display = e ? t[bi] : "none"), (t[Vc] = !e);
}
function tp() {
  Ze.getSSRProps = ({ value: t }) => {
    if (!t) return { style: { display: "none" } };
  };
}
const qc = Symbol("");
function sp(t) {
  const e = It();
  if (!e) return;
  const s = (e.ut = (i = t(e.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${e.uid}"]`)
      ).forEach((o) => Bo(o, i));
    }),
    n = () => {
      const i = t(e.proxy);
      Do(e.subTree, i), s(i);
    };
  Wa(n),
    Ln(() => {
      const i = new MutationObserver(n);
      i.observe(e.subTree.el.parentNode, { childList: !0 }),
        Wi(() => i.disconnect());
    });
}
function Do(t, e) {
  if (t.shapeFlag & 128) {
    const s = t.suspense;
    (t = s.activeBranch),
      s.pendingBranch &&
        !s.isHydrating &&
        s.effects.push(() => {
          Do(s.activeBranch, e);
        });
  }
  for (; t.component; ) t = t.component.subTree;
  if (t.shapeFlag & 1 && t.el) Bo(t.el, e);
  else if (t.type === fe) t.children.forEach((s) => Do(s, e));
  else if (t.type === ds) {
    let { el: s, anchor: n } = t;
    for (; s && (Bo(s, e), s !== n); ) s = s.nextSibling;
  }
}
function Bo(t, e) {
  if (t.nodeType === 1) {
    const s = t.style;
    let n = "";
    for (const i in e) s.setProperty(`--${i}`, e[i]), (n += `--${i}: ${e[i]};`);
    s[qc] = n;
  }
}
const np = /(^|;)\s*display\s*:/;
function ip(t, e, s) {
  const n = t.style,
    i = Z(s);
  let o = !1;
  if (s && !i) {
    if (e)
      if (Z(e))
        for (const r of e.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && ii(n, l, "");
        }
      else for (const r in e) s[r] == null && ii(n, r, "");
    for (const r in s) r === "display" && (o = !0), ii(n, r, s[r]);
  } else if (i) {
    if (e !== s) {
      const r = n[qc];
      r && (s += ";" + r), (n.cssText = s), (o = np.test(s));
    }
  } else e && t.removeAttribute("style");
  bi in t && ((t[bi] = o ? n.display : ""), t[Vc] && (n.display = "none"));
}
const Cl = /\s*!important$/;
function ii(t, e, s) {
  if (z(s)) s.forEach((n) => ii(t, e, n));
  else if ((s == null && (s = ""), e.startsWith("--"))) t.setProperty(e, s);
  else {
    const n = op(t, e);
    Cl.test(s)
      ? t.setProperty(tt(n), s.replace(Cl, ""), "important")
      : (t[n] = s);
  }
}
const El = ["Webkit", "Moz", "ms"],
  po = {};
function op(t, e) {
  const s = po[e];
  if (s) return s;
  let n = be(e);
  if (n !== "filter" && n in t) return (po[e] = n);
  n = Es(n);
  for (let i = 0; i < El.length; i++) {
    const o = El[i] + n;
    if (o in t) return (po[e] = o);
  }
  return e;
}
const Tl = "http://www.w3.org/1999/xlink";
function rp(t, e, s, n, i) {
  if (n && e.startsWith("xlink:"))
    s == null
      ? t.removeAttributeNS(Tl, e.slice(6, e.length))
      : t.setAttributeNS(Tl, e, s);
  else {
    const o = Tu(e);
    s == null || (o && !da(s))
      ? t.removeAttribute(e)
      : t.setAttribute(e, o ? "" : s);
  }
}
function lp(t, e, s, n, i, o, r) {
  if (e === "innerHTML" || e === "textContent") {
    n && r(n, i, o), (t[e] = s ?? "");
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && !l.includes("-")) {
    const c = l === "OPTION" ? t.getAttribute("value") || "" : t.value,
      h = s ?? "";
    (c !== h || !("_value" in t)) && (t.value = h),
      s == null && t.removeAttribute(e),
      (t._value = s);
    return;
  }
  let a = !1;
  if (s === "" || s == null) {
    const c = typeof t[e];
    c === "boolean"
      ? (s = da(s))
      : s == null && c === "string"
      ? ((s = ""), (a = !0))
      : c === "number" && ((s = 0), (a = !0));
  }
  try {
    t[e] = s;
  } catch {}
  a && t.removeAttribute(e);
}
function At(t, e, s, n) {
  t.addEventListener(e, s, n);
}
function ap(t, e, s, n) {
  t.removeEventListener(e, s, n);
}
const kl = Symbol("_vei");
function cp(t, e, s, n, i = null) {
  const o = t[kl] || (t[kl] = {}),
    r = o[e];
  if (n && r) r.value = n;
  else {
    const [l, a] = hp(e);
    if (n) {
      const c = (o[e] = dp(n, i));
      At(t, l, c, a);
    } else r && (ap(t, l, r, a), (o[e] = void 0));
  }
}
const Al = /(?:Once|Passive|Capture)$/;
function hp(t) {
  let e;
  if (Al.test(t)) {
    e = {};
    let n;
    for (; (n = t.match(Al)); )
      (t = t.slice(0, t.length - n[0].length)), (e[n[0].toLowerCase()] = !0);
  }
  return [t[2] === ":" ? t.slice(3) : tt(t.slice(2)), e];
}
let mo = 0;
const up = Promise.resolve(),
  fp = () => mo || (up.then(() => (mo = 0)), (mo = Date.now()));
function dp(t, e) {
  const s = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= s.attached) return;
    st(pp(n, s.value), e, 5, [n]);
  };
  return (s.value = t), (s.attached = fp()), s;
}
function pp(t, e) {
  if (z(e)) {
    const s = t.stopImmediatePropagation;
    return (
      (t.stopImmediatePropagation = () => {
        s.call(t), (t._stopped = !0);
      }),
      e.map((n) => (i) => !i._stopped && n && n(i))
    );
  } else return e;
}
const $l = (t) =>
    t.charCodeAt(0) === 111 &&
    t.charCodeAt(1) === 110 &&
    t.charCodeAt(2) > 96 &&
    t.charCodeAt(2) < 123,
  mp = (t, e, s, n, i, o, r, l, a) => {
    const c = i === "svg";
    e === "class"
      ? ep(t, n, c)
      : e === "style"
      ? ip(t, s, n)
      : Ss(e)
      ? Go(e) || cp(t, e, s, n, r)
      : (
          e[0] === "."
            ? ((e = e.slice(1)), !0)
            : e[0] === "^"
            ? ((e = e.slice(1)), !1)
            : gp(t, e, n, c)
        )
      ? lp(t, e, n, o, r, l, a)
      : (e === "true-value"
          ? (t._trueValue = n)
          : e === "false-value" && (t._falseValue = n),
        rp(t, e, n, c));
  };
function gp(t, e, s, n) {
  if (n)
    return !!(
      e === "innerHTML" ||
      e === "textContent" ||
      (e in t && $l(e) && G(s))
    );
  if (
    e === "spellcheck" ||
    e === "draggable" ||
    e === "translate" ||
    e === "form" ||
    (e === "list" && t.tagName === "INPUT") ||
    (e === "type" && t.tagName === "TEXTAREA")
  )
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return $l(e) && Z(s) ? !1 : e in t;
}
/*! #__NO_SIDE_EFFECTS__ */ function zc(t, e) {
  const s = yr(t);
  class n extends Yi {
    constructor(o) {
      super(s, o, e);
    }
  }
  return (n.def = s), n;
}
/*! #__NO_SIDE_EFFECTS__ */ const yp = (t) => zc(t, Qc),
  bp = typeof HTMLElement < "u" ? HTMLElement : class {};
class Yi extends bp {
  constructor(e, s = {}, n) {
    super(),
      (this._def = e),
      (this._props = s),
      (this._instance = null),
      (this._connected = !1),
      (this._resolved = !1),
      (this._numberProps = null),
      (this._ob = null),
      this.shadowRoot && n
        ? n(this._createVNode(), this.shadowRoot)
        : (this.attachShadow({ mode: "open" }),
          this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    (this._connected = !0),
      this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    (this._connected = !1),
      this._ob && (this._ob.disconnect(), (this._ob = null)),
      Di(() => {
        this._connected || (Ho(null, this.shadowRoot), (this._instance = null));
      });
  }
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    (this._ob = new MutationObserver((n) => {
      for (const i of n) this._setAttr(i.attributeName);
    })),
      this._ob.observe(this, { attributes: !0 });
    const e = (n, i = !1) => {
        const { props: o, styles: r } = n;
        let l;
        if (o && !z(o))
          for (const a in o) {
            const c = o[a];
            (c === Number || (c && c.type === Number)) &&
              (a in this._props && (this._props[a] = hi(this._props[a])),
              ((l || (l = Object.create(null)))[be(a)] = !0));
          }
        (this._numberProps = l),
          i && this._resolveProps(n),
          this._applyStyles(r),
          this._update();
      },
      s = this._def.__asyncLoader;
    s ? s().then((n) => e(n, !0)) : e(this._def);
  }
  _resolveProps(e) {
    const { props: s } = e,
      n = z(s) ? s : Object.keys(s || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of n.map(be))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(o) {
          this._setProp(i, o);
        },
      });
  }
  _setAttr(e) {
    let s = this.getAttribute(e);
    const n = be(e);
    this._numberProps && this._numberProps[n] && (s = hi(s)),
      this._setProp(n, s, !1);
  }
  _getProp(e) {
    return this._props[e];
  }
  _setProp(e, s, n = !0, i = !0) {
    s !== this._props[e] &&
      ((this._props[e] = s),
      i && this._instance && this._update(),
      n &&
        (s === !0
          ? this.setAttribute(tt(e), "")
          : typeof s == "string" || typeof s == "number"
          ? this.setAttribute(tt(e), s + "")
          : s || this.removeAttribute(tt(e))));
  }
  _update() {
    Ho(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const e = re(this._def, le({}, this._props));
    return (
      this._instance ||
        (e.ce = (s) => {
          (this._instance = s), (s.isCE = !0);
          const n = (o, r) => {
            this.dispatchEvent(new CustomEvent(o, { detail: r }));
          };
          s.emit = (o, ...r) => {
            n(o, r), tt(o) !== o && n(tt(o), r);
          };
          let i = this;
          for (; (i = i && (i.parentNode || i.host)); )
            if (i instanceof Yi) {
              (s.parent = i._instance), (s.provides = i._instance.provides);
              break;
            }
        }),
      e
    );
  }
  _applyStyles(e) {
    e &&
      e.forEach((s) => {
        const n = document.createElement("style");
        (n.textContent = s), this.shadowRoot.appendChild(n);
      });
  }
}
function vp(t = "$style") {
  {
    const e = It();
    if (!e) return ae;
    const s = e.type.__cssModules;
    if (!s) return ae;
    const n = s[t];
    return n || ae;
  }
}
const jc = new WeakMap(),
  Uc = new WeakMap(),
  vi = Symbol("_moveCb"),
  Nl = Symbol("_enterCb"),
  Wc = {
    name: "TransitionGroup",
    props: le({}, Jd, { tag: String, moveClass: String }),
    setup(t, { slots: e }) {
      const s = It(),
        n = mr();
      let i, o;
      return (
        ji(() => {
          if (!i.length) return;
          const r = t.moveClass || `${t.name || "v"}-move`;
          if (!Ep(i[0].el, s.vnode.el, r)) return;
          i.forEach(wp), i.forEach(Sp);
          const l = i.filter(Cp);
          Hc(),
            l.forEach((a) => {
              const c = a.el,
                h = c.style;
              Tt(c, r),
                (h.transform = h.webkitTransform = h.transitionDuration = "");
              const u = (c[vi] = (f) => {
                (f && f.target !== c) ||
                  ((!f || /transform$/.test(f.propertyName)) &&
                    (c.removeEventListener("transitionend", u),
                    (c[vi] = null),
                    Vt(c, r)));
              });
              c.addEventListener("transitionend", u);
            });
        }),
        () => {
          const r = ne(t),
            l = Dc(r);
          let a = r.tag || fe;
          (i = o), (o = e.default ? qi(e.default()) : []);
          for (let c = 0; c < o.length; c++) {
            const h = o[c];
            h.key != null && bs(h, js(h, l, n, s));
          }
          if (i)
            for (let c = 0; c < i.length; c++) {
              const h = i[c];
              bs(h, js(h, l, n, s)), jc.set(h, h.el.getBoundingClientRect());
            }
          return re(a, null, o);
        }
      );
    },
  },
  _p = (t) => delete t.mode;
Wc.props;
const xp = Wc;
function wp(t) {
  const e = t.el;
  e[vi] && e[vi](), e[Nl] && e[Nl]();
}
function Sp(t) {
  Uc.set(t, t.el.getBoundingClientRect());
}
function Cp(t) {
  const e = jc.get(t),
    s = Uc.get(t),
    n = e.left - s.left,
    i = e.top - s.top;
  if (n || i) {
    const o = t.el.style;
    return (
      (o.transform = o.webkitTransform = `translate(${n}px,${i}px)`),
      (o.transitionDuration = "0s"),
      t
    );
  }
}
function Ep(t, e, s) {
  const n = t.cloneNode(),
    i = t[Us];
  i &&
    i.forEach((l) => {
      l.split(/\s+/).forEach((a) => a && n.classList.remove(a));
    }),
    s.split(/\s+/).forEach((l) => l && n.classList.add(l)),
    (n.style.display = "none");
  const o = e.nodeType === 1 ? e : e.parentNode;
  o.appendChild(n);
  const { hasTransform: r } = Bc(n);
  return o.removeChild(n), r;
}
const Qt = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return z(e) ? (s) => Fs(e, s) : e;
};
function Tp(t) {
  t.target.composing = !0;
}
function Pl(t) {
  const e = t.target;
  e.composing && ((e.composing = !1), e.dispatchEvent(new Event("input")));
}
const at = Symbol("_assign"),
  Ke = {
    created(t, { modifiers: { lazy: e, trim: s, number: n } }, i) {
      t[at] = Qt(i);
      const o = n || (i.props && i.props.type === "number");
      At(t, e ? "change" : "input", (r) => {
        if (r.target.composing) return;
        let l = t.value;
        s && (l = l.trim()), o && (l = mn(l)), t[at](l);
      }),
        s &&
          At(t, "change", () => {
            t.value = t.value.trim();
          }),
        e ||
          (At(t, "compositionstart", Tp),
          At(t, "compositionend", Pl),
          At(t, "change", Pl));
    },
    mounted(t, { value: e }) {
      t.value = e ?? "";
    },
    beforeUpdate(
      t,
      { value: e, modifiers: { lazy: s, trim: n, number: i } },
      o
    ) {
      if (((t[at] = Qt(o)), t.composing)) return;
      const r = i || t.type === "number" ? mn(t.value) : t.value,
        l = e ?? "";
      r !== l &&
        ((document.activeElement === t &&
          t.type !== "range" &&
          (s || (n && t.value.trim() === l))) ||
          (t.value = l));
    },
  },
  wt = {
    deep: !0,
    created(t, e, s) {
      (t[at] = Qt(s)),
        At(t, "change", () => {
          const n = t._modelValue,
            i = Ws(t),
            o = t.checked,
            r = t[at];
          if (z(n)) {
            const l = Oi(n, i),
              a = l !== -1;
            if (o && !a) r(n.concat(i));
            else if (!o && a) {
              const c = [...n];
              c.splice(l, 1), r(c);
            }
          } else if (Cs(n)) {
            const l = new Set(n);
            o ? l.add(i) : l.delete(i), r(l);
          } else r(Kc(t, o));
        });
    },
    mounted: Ll,
    beforeUpdate(t, e, s) {
      (t[at] = Qt(s)), Ll(t, e, s);
    },
  };
function Ll(t, { value: e, oldValue: s }, n) {
  (t._modelValue = e),
    z(e)
      ? (t.checked = Oi(e, n.props.value) > -1)
      : Cs(e)
      ? (t.checked = e.has(n.props.value))
      : e !== s && (t.checked = Yt(e, Kc(t, !0)));
}
const wr = {
    created(t, { value: e }, s) {
      (t.checked = Yt(e, s.props.value)),
        (t[at] = Qt(s)),
        At(t, "change", () => {
          t[at](Ws(t));
        });
    },
    beforeUpdate(t, { value: e, oldValue: s }, n) {
      (t[at] = Qt(n)), e !== s && (t.checked = Yt(e, n.props.value));
    },
  },
  Sr = {
    deep: !0,
    created(t, { value: e, modifiers: { number: s } }, n) {
      const i = Cs(e);
      At(t, "change", () => {
        const o = Array.prototype.filter
          .call(t.options, (r) => r.selected)
          .map((r) => (s ? mn(Ws(r)) : Ws(r)));
        t[at](t.multiple ? (i ? new Set(o) : o) : o[0]),
          (t._assigning = !0),
          Di(() => {
            t._assigning = !1;
          });
      }),
        (t[at] = Qt(n));
    },
    mounted(t, { value: e, modifiers: { number: s } }) {
      Ol(t, e, s);
    },
    beforeUpdate(t, e, s) {
      t[at] = Qt(s);
    },
    updated(t, { value: e, modifiers: { number: s } }) {
      t._assigning || Ol(t, e, s);
    },
  };
function Ol(t, e, s) {
  const n = t.multiple,
    i = z(e);
  if (!(n && !i && !Cs(e))) {
    for (let o = 0, r = t.options.length; o < r; o++) {
      const l = t.options[o],
        a = Ws(l);
      if (n)
        if (i) {
          const c = typeof a;
          c === "string" || c === "number"
            ? (l.selected = e.includes(s ? mn(a) : a))
            : (l.selected = Oi(e, a) > -1);
        } else l.selected = e.has(a);
      else if (Yt(Ws(l), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    !n && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function Ws(t) {
  return "_value" in t ? t._value : t.value;
}
function Kc(t, e) {
  const s = e ? "_trueValue" : "_falseValue";
  return s in t ? t[s] : e;
}
const Xc = {
  created(t, e, s) {
    Jn(t, e, s, null, "created");
  },
  mounted(t, e, s) {
    Jn(t, e, s, null, "mounted");
  },
  beforeUpdate(t, e, s, n) {
    Jn(t, e, s, n, "beforeUpdate");
  },
  updated(t, e, s, n) {
    Jn(t, e, s, n, "updated");
  },
};
function Gc(t, e) {
  switch (t) {
    case "SELECT":
      return Sr;
    case "TEXTAREA":
      return Ke;
    default:
      switch (e) {
        case "checkbox":
          return wt;
        case "radio":
          return wr;
        default:
          return Ke;
      }
  }
}
function Jn(t, e, s, n, i) {
  const r = Gc(t.tagName, s.props && s.props.type)[i];
  r && r(t, e, s, n);
}
function kp() {
  (Ke.getSSRProps = ({ value: t }) => ({ value: t })),
    (wr.getSSRProps = ({ value: t }, e) => {
      if (e.props && Yt(e.props.value, t)) return { checked: !0 };
    }),
    (wt.getSSRProps = ({ value: t }, e) => {
      if (z(t)) {
        if (e.props && Oi(t, e.props.value) > -1) return { checked: !0 };
      } else if (Cs(t)) {
        if (e.props && t.has(e.props.value)) return { checked: !0 };
      } else if (t) return { checked: !0 };
    }),
    (Xc.getSSRProps = (t, e) => {
      if (typeof e.type != "string") return;
      const s = Gc(e.type.toUpperCase(), e.props && e.props.type);
      if (s.getSSRProps) return s.getSSRProps(t, e);
    });
}
const Ap = ["ctrl", "shift", "alt", "meta"],
  $p = {
    stop: (t) => t.stopPropagation(),
    prevent: (t) => t.preventDefault(),
    self: (t) => t.target !== t.currentTarget,
    ctrl: (t) => !t.ctrlKey,
    shift: (t) => !t.shiftKey,
    alt: (t) => !t.altKey,
    meta: (t) => !t.metaKey,
    left: (t) => "button" in t && t.button !== 0,
    middle: (t) => "button" in t && t.button !== 1,
    right: (t) => "button" in t && t.button !== 2,
    exact: (t, e) => Ap.some((s) => t[`${s}Key`] && !e.includes(s)),
  },
  Ji = (t, e) => {
    const s = t._withMods || (t._withMods = {}),
      n = e.join(".");
    return (
      s[n] ||
      (s[n] = (i, ...o) => {
        for (let r = 0; r < e.length; r++) {
          const l = $p[e[r]];
          if (l && l(i, e)) return;
        }
        return t(i, ...o);
      })
    );
  },
  Np = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Pp = (t, e) => {
    const s = t._withKeys || (t._withKeys = {}),
      n = e.join(".");
    return (
      s[n] ||
      (s[n] = (i) => {
        if (!("key" in i)) return;
        const o = tt(i.key);
        if (e.some((r) => r === o || Np[r] === o)) return t(i);
      })
    );
  },
  Yc = le({ patchProp: mp }, Yd);
let dn,
  Il = !1;
function Jc() {
  return dn || (dn = gc(Yc));
}
function Zc() {
  return (dn = Il ? dn : yc(Yc)), (Il = !0), dn;
}
const Ho = (...t) => {
    Jc().render(...t);
  },
  Qc = (...t) => {
    Zc().hydrate(...t);
  },
  eh = (...t) => {
    const e = Jc().createApp(...t),
      { mount: s } = e;
    return (
      (e.mount = (n) => {
        const i = sh(n);
        if (!i) return;
        const o = e._component;
        !G(o) && !o.render && !o.template && (o.template = i.innerHTML),
          (i.innerHTML = "");
        const r = s(i, !1, th(i));
        return (
          i instanceof Element &&
            (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
          r
        );
      }),
      e
    );
  },
  Lp = (...t) => {
    const e = Zc().createApp(...t),
      { mount: s } = e;
    return (
      (e.mount = (n) => {
        const i = sh(n);
        if (i) return s(i, !0, th(i));
      }),
      e
    );
  };
function th(t) {
  if (t instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function sh(t) {
  return Z(t) ? document.querySelector(t) : t;
}
let Ml = !1;
const Op = () => {
    Ml || ((Ml = !0), kp(), tp());
  },
  Ip = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        BaseTransition: Ga,
        BaseTransitionPropsValidators: gr,
        Comment: Be,
        DeprecationTypes: Kd,
        EffectScope: Qo,
        ErrorCodes: pf,
        ErrorTypeStrings: Hd,
        Fragment: fe,
        KeepAlive: qf,
        ReactiveEffect: zs,
        Static: ds,
        Suspense: Pf,
        Teleport: Td,
        Text: vs,
        TrackOpTypes: uf,
        Transition: In,
        TransitionGroup: xp,
        TriggerOpTypes: ff,
        VueElement: Yi,
        assertNumber: df,
        callWithAsyncErrorHandling: st,
        callWithErrorHandling: Pt,
        camelize: be,
        capitalize: Es,
        cloneVNode: St,
        compatUtils: Wd,
        computed: Oc,
        createApp: eh,
        createBlock: Ki,
        createCommentVNode: Zt,
        createElementBlock: he,
        createElementVNode: b,
        createHydrationRenderer: yc,
        createPropsRestProxy: id,
        createRenderer: gc,
        createSSRApp: Lp,
        createSlots: jf,
        createStaticVNode: $d,
        createTextVNode: Ie,
        createVNode: re,
        customRef: Oa,
        defineAsyncComponent: Hf,
        defineComponent: yr,
        defineCustomElement: zc,
        defineEmits: Xf,
        defineExpose: Gf,
        defineModel: Zf,
        defineOptions: Yf,
        defineProps: Kf,
        defineSSRCustomElement: yp,
        defineSlots: Jf,
        devtools: Vd,
        effect: Pu,
        effectScope: Au,
        getCurrentInstance: It,
        getCurrentScope: ga,
        getTransitionRawChildren: qi,
        guardReactiveProps: Ec,
        h: Ic,
        handleError: As,
        hasInjectionContext: dd,
        hydrate: Qc,
        initCustomFormatter: Fd,
        initDirectivesForSSR: Op,
        inject: hn,
        isMemoSame: Mc,
        isProxy: ir,
        isReactive: us,
        isReadonly: ys,
        isRef: Me,
        isRuntimeOnly: Od,
        isShallow: gn,
        isVNode: Jt,
        markRaw: or,
        mergeDefaults: sd,
        mergeModels: nd,
        mergeProps: Tc,
        nextTick: Di,
        normalizeClass: me,
        normalizeProps: gu,
        normalizeStyle: gs,
        onActivated: Ja,
        onBeforeMount: ec,
        onBeforeUnmount: Ui,
        onBeforeUpdate: tc,
        onDeactivated: Za,
        onErrorCaptured: oc,
        onMounted: Ln,
        onRenderTracked: ic,
        onRenderTriggered: nc,
        onScopeDispose: $u,
        onServerPrefetch: sc,
        onUnmounted: Wi,
        onUpdated: ji,
        openBlock: se,
        popScopeId: wf,
        provide: hc,
        proxyRefs: cr,
        pushScopeId: xf,
        queuePostFlushCb: fi,
        reactive: Ri,
        readonly: nr,
        ref: ln,
        registerRuntimeCompiler: Nc,
        render: Ho,
        renderList: Lt,
        renderSlot: Eo,
        resolveComponent: $n,
        resolveDirective: Va,
        resolveDynamicComponent: $f,
        resolveFilter: Ud,
        resolveTransitionHooks: js,
        setBlockTracking: Lo,
        setDevtoolsHook: qd,
        setTransitionHooks: bs,
        shallowReactive: Na,
        shallowReadonly: Zu,
        shallowRef: ef,
        ssrContextKey: ja,
        ssrUtils: jd,
        stop: Lu,
        toDisplayString: we,
        toHandlerKey: Rs,
        toHandlers: Uf,
        toRaw: ne,
        toRef: hf,
        toRefs: lf,
        toValue: nf,
        transformVNodeArgs: kd,
        triggerRef: sf,
        unref: ar,
        useAttrs: td,
        useCssModule: vp,
        useCssVars: sp,
        useModel: Rd,
        useSSRContext: Ua,
        useSlots: ed,
        useTransitionState: mr,
        vModelCheckbox: wt,
        vModelDynamic: Xc,
        vModelRadio: wr,
        vModelSelect: Sr,
        vModelText: Ke,
        vShow: Ze,
        version: Rc,
        warn: Bd,
        watch: an,
        watchEffect: Ff,
        watchPostEffect: Wa,
        watchSyncEffect: Ka,
        withAsyncContext: od,
        withCtx: pt,
        withDefaults: Qf,
        withDirectives: ce,
        withKeys: Pp,
        withMemo: Dd,
        withModifiers: Ji,
        withScopeId: Sf,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
/**
 * @vue/compiler-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Sn = Symbol(""),
  pn = Symbol(""),
  Cr = Symbol(""),
  _i = Symbol(""),
  nh = Symbol(""),
  ws = Symbol(""),
  ih = Symbol(""),
  oh = Symbol(""),
  Er = Symbol(""),
  Tr = Symbol(""),
  Mn = Symbol(""),
  kr = Symbol(""),
  rh = Symbol(""),
  Ar = Symbol(""),
  $r = Symbol(""),
  Nr = Symbol(""),
  Pr = Symbol(""),
  Lr = Symbol(""),
  Or = Symbol(""),
  lh = Symbol(""),
  ah = Symbol(""),
  Zi = Symbol(""),
  xi = Symbol(""),
  Ir = Symbol(""),
  Mr = Symbol(""),
  Cn = Symbol(""),
  Rn = Symbol(""),
  Rr = Symbol(""),
  Vo = Symbol(""),
  Mp = Symbol(""),
  qo = Symbol(""),
  wi = Symbol(""),
  Rp = Symbol(""),
  Fp = Symbol(""),
  Fr = Symbol(""),
  Dp = Symbol(""),
  Bp = Symbol(""),
  Dr = Symbol(""),
  ch = Symbol(""),
  Ks = {
    [Sn]: "Fragment",
    [pn]: "Teleport",
    [Cr]: "Suspense",
    [_i]: "KeepAlive",
    [nh]: "BaseTransition",
    [ws]: "openBlock",
    [ih]: "createBlock",
    [oh]: "createElementBlock",
    [Er]: "createVNode",
    [Tr]: "createElementVNode",
    [Mn]: "createCommentVNode",
    [kr]: "createTextVNode",
    [rh]: "createStaticVNode",
    [Ar]: "resolveComponent",
    [$r]: "resolveDynamicComponent",
    [Nr]: "resolveDirective",
    [Pr]: "resolveFilter",
    [Lr]: "withDirectives",
    [Or]: "renderList",
    [lh]: "renderSlot",
    [ah]: "createSlots",
    [Zi]: "toDisplayString",
    [xi]: "mergeProps",
    [Ir]: "normalizeClass",
    [Mr]: "normalizeStyle",
    [Cn]: "normalizeProps",
    [Rn]: "guardReactiveProps",
    [Rr]: "toHandlers",
    [Vo]: "camelize",
    [Mp]: "capitalize",
    [qo]: "toHandlerKey",
    [wi]: "setBlockTracking",
    [Rp]: "pushScopeId",
    [Fp]: "popScopeId",
    [Fr]: "withCtx",
    [Dp]: "unref",
    [Bp]: "isRef",
    [Dr]: "withMemo",
    [ch]: "isMemoSame",
  };
function Hp(t) {
  Object.getOwnPropertySymbols(t).forEach((e) => {
    Ks[e] = t[e];
  });
}
const it = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: "",
};
function Vp(t, e = "") {
  return {
    type: 0,
    source: e,
    children: t,
    helpers: new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: void 0,
    loc: it,
  };
}
function En(t, e, s, n, i, o, r, l = !1, a = !1, c = !1, h = it) {
  return (
    t &&
      (l ? (t.helper(ws), t.helper(Ys(t.inSSR, c))) : t.helper(Gs(t.inSSR, c)),
      r && t.helper(Lr)),
    {
      type: 13,
      tag: e,
      props: s,
      children: n,
      patchFlag: i,
      dynamicProps: o,
      directives: r,
      isBlock: l,
      disableTracking: a,
      isComponent: c,
      loc: h,
    }
  );
}
function Fn(t, e = it) {
  return { type: 17, loc: e, elements: t };
}
function rt(t, e = it) {
  return { type: 15, loc: e, properties: t };
}
function xe(t, e) {
  return { type: 16, loc: it, key: Z(t) ? Q(t, !0) : t, value: e };
}
function Q(t, e = !1, s = it, n = 0) {
  return { type: 4, loc: s, content: t, isStatic: e, constType: e ? 3 : n };
}
function mt(t, e = it) {
  return { type: 8, loc: e, children: t };
}
function Te(t, e = [], s = it) {
  return { type: 14, loc: s, callee: t, arguments: e };
}
function Xs(t, e = void 0, s = !1, n = !1, i = it) {
  return { type: 18, params: t, returns: e, newline: s, isSlot: n, loc: i };
}
function zo(t, e, s, n = !0) {
  return {
    type: 19,
    test: t,
    consequent: e,
    alternate: s,
    newline: n,
    loc: it,
  };
}
function qp(t, e, s = !1) {
  return { type: 20, index: t, value: e, isVNode: s, loc: it };
}
function zp(t) {
  return { type: 21, body: t, loc: it };
}
function Gs(t, e) {
  return t || e ? Er : Tr;
}
function Ys(t, e) {
  return t || e ? ih : oh;
}
function Br(t, { helper: e, removeHelper: s, inSSR: n }) {
  t.isBlock ||
    ((t.isBlock = !0), s(Gs(n, t.isComponent)), e(ws), e(Ys(n, t.isComponent)));
}
const Rl = new Uint8Array([123, 123]),
  Fl = new Uint8Array([125, 125]);
function Dl(t) {
  return (t >= 97 && t <= 122) || (t >= 65 && t <= 90);
}
function Qe(t) {
  return t === 32 || t === 10 || t === 9 || t === 12 || t === 13;
}
function Ht(t) {
  return t === 47 || t === 62 || Qe(t);
}
function Si(t) {
  const e = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}
const Re = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]),
};
class jp {
  constructor(e, s) {
    (this.stack = e),
      (this.cbs = s),
      (this.state = 1),
      (this.buffer = ""),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.entityStart = 0),
      (this.baseState = 1),
      (this.inRCDATA = !1),
      (this.inXML = !1),
      (this.inVPre = !1),
      (this.newlines = []),
      (this.mode = 0),
      (this.delimiterOpen = Rl),
      (this.delimiterClose = Fl),
      (this.delimiterIndex = -1),
      (this.currentSequence = void 0),
      (this.sequenceIndex = 0);
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    (this.state = 1),
      (this.mode = 0),
      (this.buffer = ""),
      (this.sectionStart = 0),
      (this.index = 0),
      (this.baseState = 1),
      (this.inRCDATA = !1),
      (this.currentSequence = void 0),
      (this.newlines.length = 0),
      (this.delimiterOpen = Rl),
      (this.delimiterClose = Fl);
  }
  getPos(e) {
    let s = 1,
      n = e + 1;
    for (let i = this.newlines.length - 1; i >= 0; i--) {
      const o = this.newlines[i];
      if (e > o) {
        (s = i + 2), (n = e - o);
        break;
      }
    }
    return { column: n, line: s, offset: e };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(e) {
    e === 60
      ? (this.index > this.sectionStart &&
          this.cbs.ontext(this.sectionStart, this.index),
        (this.state = 5),
        (this.sectionStart = this.index))
      : !this.inVPre &&
        e === this.delimiterOpen[0] &&
        ((this.state = 2),
        (this.delimiterIndex = 0),
        this.stateInterpolationOpen(e));
  }
  stateInterpolationOpen(e) {
    if (e === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const s = this.index + 1 - this.delimiterOpen.length;
        s > this.sectionStart && this.cbs.ontext(this.sectionStart, s),
          (this.state = 3),
          (this.sectionStart = s);
      } else this.delimiterIndex++;
    else
      this.inRCDATA
        ? ((this.state = 32), this.stateInRCDATA(e))
        : ((this.state = 1), this.stateText(e));
  }
  stateInterpolation(e) {
    e === this.delimiterClose[0] &&
      ((this.state = 4),
      (this.delimiterIndex = 0),
      this.stateInterpolationClose(e));
  }
  stateInterpolationClose(e) {
    e === this.delimiterClose[this.delimiterIndex]
      ? this.delimiterIndex === this.delimiterClose.length - 1
        ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1),
          this.inRCDATA ? (this.state = 32) : (this.state = 1),
          (this.sectionStart = this.index + 1))
        : this.delimiterIndex++
      : ((this.state = 3), this.stateInterpolation(e));
  }
  stateSpecialStartSequence(e) {
    const s = this.sequenceIndex === this.currentSequence.length;
    if (!(s ? Ht(e) : (e | 32) === this.currentSequence[this.sequenceIndex]))
      this.inRCDATA = !1;
    else if (!s) {
      this.sequenceIndex++;
      return;
    }
    (this.sequenceIndex = 0), (this.state = 6), this.stateInTagName(e);
  }
  stateInRCDATA(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === 62 || Qe(e)) {
        const s = this.index - this.currentSequence.length;
        if (this.sectionStart < s) {
          const n = this.index;
          (this.index = s),
            this.cbs.ontext(this.sectionStart, s),
            (this.index = n);
        }
        (this.sectionStart = s + 2),
          this.stateInClosingTagName(e),
          (this.inRCDATA = !1);
        return;
      }
      this.sequenceIndex = 0;
    }
    (e | 32) === this.currentSequence[this.sequenceIndex]
      ? (this.sequenceIndex += 1)
      : this.sequenceIndex === 0
      ? this.currentSequence === Re.TitleEnd ||
        (this.currentSequence === Re.TextareaEnd && !this.inSFCRoot)
        ? e === this.delimiterOpen[0] &&
          ((this.state = 2),
          (this.delimiterIndex = 0),
          this.stateInterpolationOpen(e))
        : this.fastForwardTo(60) && (this.sequenceIndex = 1)
      : (this.sequenceIndex = +(e === 60));
  }
  stateCDATASequence(e) {
    e === Re.Cdata[this.sequenceIndex]
      ? ++this.sequenceIndex === Re.Cdata.length &&
        ((this.state = 28),
        (this.currentSequence = Re.CdataEnd),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1))
      : ((this.sequenceIndex = 0),
        (this.state = 23),
        this.stateInDeclaration(e));
  }
  fastForwardTo(e) {
    for (; ++this.index < this.buffer.length; ) {
      const s = this.buffer.charCodeAt(this.index);
      if ((s === 10 && this.newlines.push(this.index), s === e)) return !0;
    }
    return (this.index = this.buffer.length - 1), !1;
  }
  stateInCommentLike(e) {
    e === this.currentSequence[this.sequenceIndex]
      ? ++this.sequenceIndex === this.currentSequence.length &&
        (this.currentSequence === Re.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, this.index - 2)
          : this.cbs.oncomment(this.sectionStart, this.index - 2),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1),
        (this.state = 1))
      : this.sequenceIndex === 0
      ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1)
      : e !== this.currentSequence[this.sequenceIndex - 1] &&
        (this.sequenceIndex = 0);
  }
  startSpecial(e, s) {
    this.enterRCDATA(e, s), (this.state = 31);
  }
  enterRCDATA(e, s) {
    (this.inRCDATA = !0), (this.currentSequence = e), (this.sequenceIndex = s);
  }
  stateBeforeTagName(e) {
    e === 33
      ? ((this.state = 22), (this.sectionStart = this.index + 1))
      : e === 63
      ? ((this.state = 24), (this.sectionStart = this.index + 1))
      : Dl(e)
      ? ((this.sectionStart = this.index),
        this.mode === 0
          ? (this.state = 6)
          : this.inSFCRoot
          ? (this.state = 34)
          : this.inXML
          ? (this.state = 6)
          : e === 116
          ? (this.state = 30)
          : (this.state = e === 115 ? 29 : 6))
      : e === 47
      ? (this.state = 8)
      : ((this.state = 1), this.stateText(e));
  }
  stateInTagName(e) {
    Ht(e) && this.handleTagName(e);
  }
  stateInSFCRootTagName(e) {
    if (Ht(e)) {
      const s = this.buffer.slice(this.sectionStart, this.index);
      s !== "template" && this.enterRCDATA(Si("</" + s), 0),
        this.handleTagName(e);
    }
  }
  handleTagName(e) {
    this.cbs.onopentagname(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = 11),
      this.stateBeforeAttrName(e);
  }
  stateBeforeClosingTagName(e) {
    Qe(e) ||
      (e === 62
        ? ((this.state = 1), (this.sectionStart = this.index + 1))
        : ((this.state = Dl(e) ? 9 : 27), (this.sectionStart = this.index)));
  }
  stateInClosingTagName(e) {
    (e === 62 || Qe(e)) &&
      (this.cbs.onclosetag(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = 10),
      this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    e === 62 && ((this.state = 1), (this.sectionStart = this.index + 1));
  }
  stateBeforeAttrName(e) {
    e === 62
      ? (this.cbs.onopentagend(this.index),
        this.inRCDATA ? (this.state = 32) : (this.state = 1),
        (this.sectionStart = this.index + 1))
      : e === 47
      ? (this.state = 7)
      : e === 60 && this.peek() === 47
      ? (this.cbs.onopentagend(this.index),
        (this.state = 5),
        (this.sectionStart = this.index))
      : Qe(e) || this.handleAttrStart(e);
  }
  handleAttrStart(e) {
    e === 118 && this.peek() === 45
      ? ((this.state = 13), (this.sectionStart = this.index))
      : e === 46 || e === 58 || e === 64 || e === 35
      ? (this.cbs.ondirname(this.index, this.index + 1),
        (this.state = 14),
        (this.sectionStart = this.index + 1))
      : ((this.state = 12), (this.sectionStart = this.index));
  }
  stateInSelfClosingTag(e) {
    e === 62
      ? (this.cbs.onselfclosingtag(this.index),
        (this.state = 1),
        (this.sectionStart = this.index + 1),
        (this.inRCDATA = !1))
      : Qe(e) || ((this.state = 11), this.stateBeforeAttrName(e));
  }
  stateInAttrName(e) {
    (e === 61 || Ht(e)) &&
      (this.cbs.onattribname(this.sectionStart, this.index),
      this.handleAttrNameEnd(e));
  }
  stateInDirName(e) {
    e === 61 || Ht(e)
      ? (this.cbs.ondirname(this.sectionStart, this.index),
        this.handleAttrNameEnd(e))
      : e === 58
      ? (this.cbs.ondirname(this.sectionStart, this.index),
        (this.state = 14),
        (this.sectionStart = this.index + 1))
      : e === 46 &&
        (this.cbs.ondirname(this.sectionStart, this.index),
        (this.state = 16),
        (this.sectionStart = this.index + 1));
  }
  stateInDirArg(e) {
    e === 61 || Ht(e)
      ? (this.cbs.ondirarg(this.sectionStart, this.index),
        this.handleAttrNameEnd(e))
      : e === 91
      ? (this.state = 15)
      : e === 46 &&
        (this.cbs.ondirarg(this.sectionStart, this.index),
        (this.state = 16),
        (this.sectionStart = this.index + 1));
  }
  stateInDynamicDirArg(e) {
    e === 93
      ? (this.state = 14)
      : (e === 61 || Ht(e)) &&
        (this.cbs.ondirarg(this.sectionStart, this.index + 1),
        this.handleAttrNameEnd(e));
  }
  stateInDirModifier(e) {
    e === 61 || Ht(e)
      ? (this.cbs.ondirmodifier(this.sectionStart, this.index),
        this.handleAttrNameEnd(e))
      : e === 46 &&
        (this.cbs.ondirmodifier(this.sectionStart, this.index),
        (this.sectionStart = this.index + 1));
  }
  handleAttrNameEnd(e) {
    (this.sectionStart = this.index),
      (this.state = 17),
      this.cbs.onattribnameend(this.index),
      this.stateAfterAttrName(e);
  }
  stateAfterAttrName(e) {
    e === 61
      ? (this.state = 18)
      : e === 47 || e === 62
      ? (this.cbs.onattribend(0, this.sectionStart),
        (this.sectionStart = -1),
        (this.state = 11),
        this.stateBeforeAttrName(e))
      : Qe(e) ||
        (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(e));
  }
  stateBeforeAttrValue(e) {
    e === 34
      ? ((this.state = 19), (this.sectionStart = this.index + 1))
      : e === 39
      ? ((this.state = 20), (this.sectionStart = this.index + 1))
      : Qe(e) ||
        ((this.sectionStart = this.index),
        (this.state = 21),
        this.stateInAttrValueNoQuotes(e));
  }
  handleInAttrValue(e, s) {
    (e === s || this.fastForwardTo(s)) &&
      (this.cbs.onattribdata(this.sectionStart, this.index),
      (this.sectionStart = -1),
      this.cbs.onattribend(s === 34 ? 3 : 2, this.index + 1),
      (this.state = 11));
  }
  stateInAttrValueDoubleQuotes(e) {
    this.handleInAttrValue(e, 34);
  }
  stateInAttrValueSingleQuotes(e) {
    this.handleInAttrValue(e, 39);
  }
  stateInAttrValueNoQuotes(e) {
    Qe(e) || e === 62
      ? (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(1, this.index),
        (this.state = 11),
        this.stateBeforeAttrName(e))
      : (e === 39 || e === 60 || e === 61 || e === 96) &&
        this.cbs.onerr(18, this.index);
  }
  stateBeforeDeclaration(e) {
    e === 91
      ? ((this.state = 26), (this.sequenceIndex = 0))
      : (this.state = e === 45 ? 25 : 23);
  }
  stateInDeclaration(e) {
    (e === 62 || this.fastForwardTo(62)) &&
      ((this.state = 1), (this.sectionStart = this.index + 1));
  }
  stateInProcessingInstruction(e) {
    (e === 62 || this.fastForwardTo(62)) &&
      (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
      (this.state = 1),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeComment(e) {
    e === 45
      ? ((this.state = 28),
        (this.currentSequence = Re.CommentEnd),
        (this.sequenceIndex = 2),
        (this.sectionStart = this.index + 1))
      : (this.state = 23);
  }
  stateInSpecialComment(e) {
    (e === 62 || this.fastForwardTo(62)) &&
      (this.cbs.oncomment(this.sectionStart, this.index),
      (this.state = 1),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeSpecialS(e) {
    e === Re.ScriptEnd[3]
      ? this.startSpecial(Re.ScriptEnd, 4)
      : e === Re.StyleEnd[3]
      ? this.startSpecial(Re.StyleEnd, 4)
      : ((this.state = 6), this.stateInTagName(e));
  }
  stateBeforeSpecialT(e) {
    e === Re.TitleEnd[3]
      ? this.startSpecial(Re.TitleEnd, 4)
      : e === Re.TextareaEnd[3]
      ? this.startSpecial(Re.TextareaEnd, 4)
      : ((this.state = 6), this.stateInTagName(e));
  }
  startEntity() {}
  stateInEntity() {}
  parse(e) {
    for (this.buffer = e; this.index < this.buffer.length; ) {
      const s = this.buffer.charCodeAt(this.index);
      switch ((s === 10 && this.newlines.push(this.index), this.state)) {
        case 1: {
          this.stateText(s);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(s);
          break;
        }
        case 3: {
          this.stateInterpolation(s);
          break;
        }
        case 4: {
          this.stateInterpolationClose(s);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(s);
          break;
        }
        case 32: {
          this.stateInRCDATA(s);
          break;
        }
        case 26: {
          this.stateCDATASequence(s);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(s);
          break;
        }
        case 12: {
          this.stateInAttrName(s);
          break;
        }
        case 13: {
          this.stateInDirName(s);
          break;
        }
        case 14: {
          this.stateInDirArg(s);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(s);
          break;
        }
        case 16: {
          this.stateInDirModifier(s);
          break;
        }
        case 28: {
          this.stateInCommentLike(s);
          break;
        }
        case 27: {
          this.stateInSpecialComment(s);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(s);
          break;
        }
        case 6: {
          this.stateInTagName(s);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(s);
          break;
        }
        case 9: {
          this.stateInClosingTagName(s);
          break;
        }
        case 5: {
          this.stateBeforeTagName(s);
          break;
        }
        case 17: {
          this.stateAfterAttrName(s);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(s);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(s);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(s);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(s);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(s);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(s);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(s);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(s);
          break;
        }
        case 23: {
          this.stateInDeclaration(s);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(s);
          break;
        }
        case 25: {
          this.stateBeforeComment(s);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(s);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  cleanup() {
    this.sectionStart !== this.index &&
      (this.state === 1 || (this.state === 32 && this.sequenceIndex === 0)
        ? (this.cbs.ontext(this.sectionStart, this.index),
          (this.sectionStart = this.index))
        : (this.state === 19 || this.state === 20 || this.state === 21) &&
          (this.cbs.onattribdata(this.sectionStart, this.index),
          (this.sectionStart = this.index)));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  handleTrailingData() {
    const e = this.buffer.length;
    this.sectionStart >= e ||
      (this.state === 28
        ? this.currentSequence === Re.CdataEnd
          ? this.cbs.oncdata(this.sectionStart, e)
          : this.cbs.oncomment(this.sectionStart, e)
        : this.state === 6 ||
          this.state === 11 ||
          this.state === 18 ||
          this.state === 17 ||
          this.state === 12 ||
          this.state === 13 ||
          this.state === 14 ||
          this.state === 15 ||
          this.state === 16 ||
          this.state === 20 ||
          this.state === 19 ||
          this.state === 21 ||
          this.state === 9 ||
          this.cbs.ontext(this.sectionStart, e));
  }
  emitCodePoint(e, s) {}
}
function Bl(t, { compatConfig: e }) {
  const s = e && e[t];
  return t === "MODE" ? s || 3 : s;
}
function ps(t, e) {
  const s = Bl("MODE", e),
    n = Bl(t, e);
  return s === 3 ? n === !0 : n !== !1;
}
function Tn(t, e, s, ...n) {
  return ps(t, e);
}
function Hr(t) {
  throw t;
}
function hh(t) {}
function ye(t, e, s, n) {
  const i = `https://vuejs.org/error-reference/#compiler-${t}`,
    o = new SyntaxError(String(i));
  return (o.code = t), (o.loc = e), o;
}
const Xe = (t) => t.type === 4 && t.isStatic;
function uh(t) {
  switch (t) {
    case "Teleport":
    case "teleport":
      return pn;
    case "Suspense":
    case "suspense":
      return Cr;
    case "KeepAlive":
    case "keep-alive":
      return _i;
    case "BaseTransition":
    case "base-transition":
      return nh;
  }
}
const Up = /^\d|[^\$\w]/,
  Vr = (t) => !Up.test(t),
  Wp = /[A-Za-z_$\xA0-\uFFFF]/,
  Kp = /[\.\?\w$\xA0-\uFFFF]/,
  Xp = /\s+[.[]\s*|\s*[.[]\s+/g,
  Gp = (t) => {
    t = t.trim().replace(Xp, (r) => r.trim());
    let e = 0,
      s = [],
      n = 0,
      i = 0,
      o = null;
    for (let r = 0; r < t.length; r++) {
      const l = t.charAt(r);
      switch (e) {
        case 0:
          if (l === "[") s.push(e), (e = 1), n++;
          else if (l === "(") s.push(e), (e = 2), i++;
          else if (!(r === 0 ? Wp : Kp).test(l)) return !1;
          break;
        case 1:
          l === "'" || l === '"' || l === "`"
            ? (s.push(e), (e = 3), (o = l))
            : l === "["
            ? n++
            : l === "]" && (--n || (e = s.pop()));
          break;
        case 2:
          if (l === "'" || l === '"' || l === "`") s.push(e), (e = 3), (o = l);
          else if (l === "(") i++;
          else if (l === ")") {
            if (r === t.length - 1) return !1;
            --i || (e = s.pop());
          }
          break;
        case 3:
          l === o && ((e = s.pop()), (o = null));
          break;
      }
    }
    return !n && !i;
  },
  fh = Gp;
function ft(t, e, s = !1) {
  for (let n = 0; n < t.props.length; n++) {
    const i = t.props[n];
    if (i.type === 7 && (s || i.exp) && (Z(e) ? i.name === e : e.test(i.name)))
      return i;
  }
}
function Qi(t, e, s = !1, n = !1) {
  for (let i = 0; i < t.props.length; i++) {
    const o = t.props[i];
    if (o.type === 6) {
      if (s) continue;
      if (o.name === e && (o.value || n)) return o;
    } else if (o.name === "bind" && (o.exp || n) && ls(o.arg, e)) return o;
  }
}
function ls(t, e) {
  return !!(t && Xe(t) && t.content === e);
}
function Yp(t) {
  return t.props.some(
    (e) =>
      e.type === 7 &&
      e.name === "bind" &&
      (!e.arg || e.arg.type !== 4 || !e.arg.isStatic)
  );
}
function go(t) {
  return t.type === 5 || t.type === 2;
}
function Jp(t) {
  return t.type === 7 && t.name === "slot";
}
function Ci(t) {
  return t.type === 1 && t.tagType === 3;
}
function Ei(t) {
  return t.type === 1 && t.tagType === 2;
}
const Zp = new Set([Cn, Rn]);
function dh(t, e = []) {
  if (t && !Z(t) && t.type === 14) {
    const s = t.callee;
    if (!Z(s) && Zp.has(s)) return dh(t.arguments[0], e.concat(t));
  }
  return [t, e];
}
function Ti(t, e, s) {
  let n,
    i = t.type === 13 ? t.props : t.arguments[2],
    o = [],
    r;
  if (i && !Z(i) && i.type === 14) {
    const l = dh(i);
    (i = l[0]), (o = l[1]), (r = o[o.length - 1]);
  }
  if (i == null || Z(i)) n = rt([e]);
  else if (i.type === 14) {
    const l = i.arguments[0];
    !Z(l) && l.type === 15
      ? Hl(e, l) || l.properties.unshift(e)
      : i.callee === Rr
      ? (n = Te(s.helper(xi), [rt([e]), i]))
      : i.arguments.unshift(rt([e])),
      !n && (n = i);
  } else
    i.type === 15
      ? (Hl(e, i) || i.properties.unshift(e), (n = i))
      : ((n = Te(s.helper(xi), [rt([e]), i])),
        r && r.callee === Rn && (r = o[o.length - 2]));
  t.type === 13
    ? r
      ? (r.arguments[0] = n)
      : (t.props = n)
    : r
    ? (r.arguments[0] = n)
    : (t.arguments[2] = n);
}
function Hl(t, e) {
  let s = !1;
  if (t.key.type === 4) {
    const n = t.key.content;
    s = e.properties.some((i) => i.key.type === 4 && i.key.content === n);
  }
  return s;
}
function kn(t, e) {
  return `_${e}_${t.replace(/[^\w]/g, (s, n) =>
    s === "-" ? "_" : t.charCodeAt(n).toString()
  )}`;
}
function Qp(t) {
  return t.type === 14 && t.callee === Dr ? t.arguments[1].returns : t;
}
const em = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
  ph = {
    parseMode: "base",
    ns: 0,
    delimiters: ["{{", "}}"],
    getNamespace: () => 0,
    isVoidTag: ti,
    isPreTag: ti,
    isCustomElement: ti,
    onError: Hr,
    onWarn: hh,
    comments: !1,
    prefixIdentifiers: !1,
  };
let ue = ph,
  An = null,
  ms = "",
  Fe = null,
  ie = null,
  je = "",
  kt = -1,
  is = -1,
  ki = 0,
  Wt = !1,
  jo = null;
const ve = [],
  _e = new jp(ve, {
    onerr: Et,
    ontext(t, e) {
      Zn(Le(t, e), t, e);
    },
    ontextentity(t, e, s) {
      Zn(t, e, s);
    },
    oninterpolation(t, e) {
      if (Wt) return Zn(Le(t, e), t, e);
      let s = t + _e.delimiterOpen.length,
        n = e - _e.delimiterClose.length;
      for (; Qe(ms.charCodeAt(s)); ) s++;
      for (; Qe(ms.charCodeAt(n - 1)); ) n--;
      let i = Le(s, n);
      i.includes("&") && (i = ue.decodeEntities(i, !1)),
        Uo({ type: 5, content: ri(i, !1, Ee(s, n)), loc: Ee(t, e) });
    },
    onopentagname(t, e) {
      const s = Le(t, e);
      Fe = {
        type: 1,
        tag: s,
        ns: ue.getNamespace(s, ve[0], ue.ns),
        tagType: 0,
        props: [],
        children: [],
        loc: Ee(t - 1, e),
        codegenNode: void 0,
      };
    },
    onopentagend(t) {
      ql(t);
    },
    onclosetag(t, e) {
      const s = Le(t, e);
      if (!ue.isVoidTag(s)) {
        let n = !1;
        for (let i = 0; i < ve.length; i++)
          if (ve[i].tag.toLowerCase() === s.toLowerCase()) {
            (n = !0), i > 0 && Et(24, ve[0].loc.start.offset);
            for (let r = 0; r <= i; r++) {
              const l = ve.shift();
              oi(l, e, r < i);
            }
            break;
          }
        n || Et(23, mh(t, 60));
      }
    },
    onselfclosingtag(t) {
      var e;
      const s = Fe.tag;
      (Fe.isSelfClosing = !0),
        ql(t),
        ((e = ve[0]) == null ? void 0 : e.tag) === s && oi(ve.shift(), t);
    },
    onattribname(t, e) {
      ie = {
        type: 6,
        name: Le(t, e),
        nameLoc: Ee(t, e),
        value: void 0,
        loc: Ee(t),
      };
    },
    ondirname(t, e) {
      const s = Le(t, e),
        n =
          s === "." || s === ":"
            ? "bind"
            : s === "@"
            ? "on"
            : s === "#"
            ? "slot"
            : s.slice(2);
      if ((!Wt && n === "" && Et(26, t), Wt || n === ""))
        ie = { type: 6, name: s, nameLoc: Ee(t, e), value: void 0, loc: Ee(t) };
      else if (
        ((ie = {
          type: 7,
          name: n,
          rawName: s,
          exp: void 0,
          arg: void 0,
          modifiers: s === "." ? ["prop"] : [],
          loc: Ee(t),
        }),
        n === "pre")
      ) {
        (Wt = _e.inVPre = !0), (jo = Fe);
        const i = Fe.props;
        for (let o = 0; o < i.length; o++) i[o].type === 7 && (i[o] = cm(i[o]));
      }
    },
    ondirarg(t, e) {
      if (t === e) return;
      const s = Le(t, e);
      if (Wt) (ie.name += s), as(ie.nameLoc, e);
      else {
        const n = s[0] !== "[";
        ie.arg = ri(n ? s : s.slice(1, -1), n, Ee(t, e), n ? 3 : 0);
      }
    },
    ondirmodifier(t, e) {
      const s = Le(t, e);
      if (Wt) (ie.name += "." + s), as(ie.nameLoc, e);
      else if (ie.name === "slot") {
        const n = ie.arg;
        n && ((n.content += "." + s), as(n.loc, e));
      } else ie.modifiers.push(s);
    },
    onattribdata(t, e) {
      (je += Le(t, e)), kt < 0 && (kt = t), (is = e);
    },
    onattribentity(t, e, s) {
      (je += t), kt < 0 && (kt = e), (is = s);
    },
    onattribnameend(t) {
      const e = ie.loc.start.offset,
        s = Le(e, t);
      ie.type === 7 && (ie.rawName = s),
        Fe.props.some((n) => (n.type === 7 ? n.rawName : n.name) === s) &&
          Et(2, e);
    },
    onattribend(t, e) {
      if (Fe && ie) {
        if ((as(ie.loc, e), t !== 0))
          if (
            (je.includes("&") && (je = ue.decodeEntities(je, !0)),
            ie.type === 6)
          )
            ie.name === "class" && (je = yh(je).trim()),
              t === 1 && !je && Et(13, e),
              (ie.value = {
                type: 2,
                content: je,
                loc: t === 1 ? Ee(kt, is) : Ee(kt - 1, is + 1),
              }),
              _e.inSFCRoot &&
                Fe.tag === "template" &&
                ie.name === "lang" &&
                je &&
                je !== "html" &&
                _e.enterRCDATA(Si("</template"), 0);
          else {
            let s = 0;
            (ie.exp = ri(je, !1, Ee(kt, is), 0, s)),
              ie.name === "for" && (ie.forParseResult = sm(ie.exp));
            let n = -1;
            ie.name === "bind" &&
              (n = ie.modifiers.indexOf("sync")) > -1 &&
              Tn("COMPILER_V_BIND_SYNC", ue, ie.loc, ie.rawName) &&
              ((ie.name = "model"), ie.modifiers.splice(n, 1));
          }
        (ie.type !== 7 || ie.name !== "pre") && Fe.props.push(ie);
      }
      (je = ""), (kt = is = -1);
    },
    oncomment(t, e) {
      ue.comments && Uo({ type: 3, content: Le(t, e), loc: Ee(t - 4, e + 3) });
    },
    onend() {
      const t = ms.length;
      for (let e = 0; e < ve.length; e++)
        oi(ve[e], t - 1), Et(24, ve[e].loc.start.offset);
    },
    oncdata(t, e) {
      ve[0].ns !== 0 ? Zn(Le(t, e), t, e) : Et(1, t - 9);
    },
    onprocessinginstruction(t) {
      (ve[0] ? ve[0].ns : ue.ns) === 0 && Et(21, t - 1);
    },
  }),
  Vl = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
  tm = /^\(|\)$/g;
function sm(t) {
  const e = t.loc,
    s = t.content,
    n = s.match(em);
  if (!n) return;
  const [, i, o] = n,
    r = (u, f, d = !1) => {
      const m = e.start.offset + f,
        w = m + u.length;
      return ri(u, !1, Ee(m, w), 0, d ? 1 : 0);
    },
    l = {
      source: r(o.trim(), s.indexOf(o, i.length)),
      value: void 0,
      key: void 0,
      index: void 0,
      finalized: !1,
    };
  let a = i.trim().replace(tm, "").trim();
  const c = i.indexOf(a),
    h = a.match(Vl);
  if (h) {
    a = a.replace(Vl, "").trim();
    const u = h[1].trim();
    let f;
    if (
      (u && ((f = s.indexOf(u, c + a.length)), (l.key = r(u, f, !0))), h[2])
    ) {
      const d = h[2].trim();
      d &&
        (l.index = r(d, s.indexOf(d, l.key ? f + u.length : c + a.length), !0));
    }
  }
  return a && (l.value = r(a, c, !0)), l;
}
function Le(t, e) {
  return ms.slice(t, e);
}
function ql(t) {
  _e.inSFCRoot && (Fe.innerLoc = Ee(t + 1, t + 1)), Uo(Fe);
  const { tag: e, ns: s } = Fe;
  s === 0 && ue.isPreTag(e) && ki++,
    ue.isVoidTag(e)
      ? oi(Fe, t)
      : (ve.unshift(Fe), (s === 1 || s === 2) && (_e.inXML = !0)),
    (Fe = null);
}
function Zn(t, e, s) {
  var n;
  {
    const r = (n = ve[0]) == null ? void 0 : n.tag;
    r !== "script" &&
      r !== "style" &&
      t.includes("&") &&
      (t = ue.decodeEntities(t, !1));
  }
  const i = ve[0] || An,
    o = i.children[i.children.length - 1];
  (o == null ? void 0 : o.type) === 2
    ? ((o.content += t), as(o.loc, s))
    : i.children.push({ type: 2, content: t, loc: Ee(e, s) });
}
function oi(t, e, s = !1) {
  s ? as(t.loc, mh(e, 60)) : as(t.loc, e + 1),
    _e.inSFCRoot &&
      (t.children.length
        ? (t.innerLoc.end = le({}, t.children[t.children.length - 1].loc.end))
        : (t.innerLoc.end = le({}, t.innerLoc.start)),
      (t.innerLoc.source = Le(t.innerLoc.start.offset, t.innerLoc.end.offset)));
  const { tag: n, ns: i } = t;
  Wt ||
    (n === "slot"
      ? (t.tagType = 2)
      : zl(t)
      ? (t.tagType = 3)
      : im(t) && (t.tagType = 1)),
    _e.inRCDATA || (t.children = gh(t.children, t.tag)),
    i === 0 && ue.isPreTag(n) && ki--,
    jo === t && ((Wt = _e.inVPre = !1), (jo = null)),
    _e.inXML && (ve[0] ? ve[0].ns : ue.ns) === 0 && (_e.inXML = !1);
  {
    const o = t.props;
    if (
      !_e.inSFCRoot &&
      ps("COMPILER_NATIVE_TEMPLATE", ue) &&
      t.tag === "template" &&
      !zl(t)
    ) {
      const l = ve[0] || An,
        a = l.children.indexOf(t);
      l.children.splice(a, 1, ...t.children);
    }
    const r = o.find((l) => l.type === 6 && l.name === "inline-template");
    r &&
      Tn("COMPILER_INLINE_TEMPLATE", ue, r.loc) &&
      t.children.length &&
      (r.value = {
        type: 2,
        content: Le(
          t.children[0].loc.start.offset,
          t.children[t.children.length - 1].loc.end.offset
        ),
        loc: r.loc,
      });
  }
}
function mh(t, e) {
  let s = t;
  for (; ms.charCodeAt(s) !== e && s >= 0; ) s--;
  return s;
}
const nm = new Set(["if", "else", "else-if", "for", "slot"]);
function zl({ tag: t, props: e }) {
  if (t === "template") {
    for (let s = 0; s < e.length; s++)
      if (e[s].type === 7 && nm.has(e[s].name)) return !0;
  }
  return !1;
}
function im({ tag: t, props: e }) {
  var s;
  if (ue.isCustomElement(t)) return !1;
  if (
    t === "component" ||
    om(t.charCodeAt(0)) ||
    uh(t) ||
    ((s = ue.isBuiltInComponent) != null && s.call(ue, t)) ||
    (ue.isNativeTag && !ue.isNativeTag(t))
  )
    return !0;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (i.type === 6) {
      if (i.name === "is" && i.value) {
        if (i.value.content.startsWith("vue:")) return !0;
        if (Tn("COMPILER_IS_ON_ELEMENT", ue, i.loc)) return !0;
      }
    } else if (
      i.name === "bind" &&
      ls(i.arg, "is") &&
      Tn("COMPILER_IS_ON_ELEMENT", ue, i.loc)
    )
      return !0;
  }
  return !1;
}
function om(t) {
  return t > 64 && t < 91;
}
const rm = /\r\n/g;
function gh(t, e) {
  var s, n;
  const i = ue.whitespace !== "preserve";
  let o = !1;
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (l.type === 2)
      if (ki)
        l.content = l.content.replace(
          rm,
          `
`
        );
      else if (lm(l.content)) {
        const a = (s = t[r - 1]) == null ? void 0 : s.type,
          c = (n = t[r + 1]) == null ? void 0 : n.type;
        !a ||
        !c ||
        (i &&
          ((a === 3 && (c === 3 || c === 1)) ||
            (a === 1 && (c === 3 || (c === 1 && am(l.content))))))
          ? ((o = !0), (t[r] = null))
          : (l.content = " ");
      } else i && (l.content = yh(l.content));
  }
  if (ki && e && ue.isPreTag(e)) {
    const r = t[0];
    r && r.type === 2 && (r.content = r.content.replace(/^\r?\n/, ""));
  }
  return o ? t.filter(Boolean) : t;
}
function lm(t) {
  for (let e = 0; e < t.length; e++) if (!Qe(t.charCodeAt(e))) return !1;
  return !0;
}
function am(t) {
  for (let e = 0; e < t.length; e++) {
    const s = t.charCodeAt(e);
    if (s === 10 || s === 13) return !0;
  }
  return !1;
}
function yh(t) {
  let e = "",
    s = !1;
  for (let n = 0; n < t.length; n++)
    Qe(t.charCodeAt(n)) ? s || ((e += " "), (s = !0)) : ((e += t[n]), (s = !1));
  return e;
}
function Uo(t) {
  (ve[0] || An).children.push(t);
}
function Ee(t, e) {
  return {
    start: _e.getPos(t),
    end: e == null ? e : _e.getPos(e),
    source: e == null ? e : Le(t, e),
  };
}
function as(t, e) {
  (t.end = _e.getPos(e)), (t.source = Le(t.start.offset, e));
}
function cm(t) {
  const e = {
    type: 6,
    name: t.rawName,
    nameLoc: Ee(t.loc.start.offset, t.loc.start.offset + t.rawName.length),
    value: void 0,
    loc: t.loc,
  };
  if (t.exp) {
    const s = t.exp.loc;
    s.end.offset < t.loc.end.offset &&
      (s.start.offset--, s.start.column--, s.end.offset++, s.end.column++),
      (e.value = { type: 2, content: t.exp.content, loc: s });
  }
  return e;
}
function ri(t, e = !1, s, n = 0, i = 0) {
  return Q(t, e, s, n);
}
function Et(t, e, s) {
  ue.onError(ye(t, Ee(e, e)));
}
function hm() {
  _e.reset(),
    (Fe = null),
    (ie = null),
    (je = ""),
    (kt = -1),
    (is = -1),
    (ve.length = 0);
}
function um(t, e) {
  if ((hm(), (ms = t), (ue = le({}, ph)), e)) {
    let i;
    for (i in e) e[i] != null && (ue[i] = e[i]);
  }
  (_e.mode = ue.parseMode === "html" ? 1 : ue.parseMode === "sfc" ? 2 : 0),
    (_e.inXML = ue.ns === 1 || ue.ns === 2);
  const s = e == null ? void 0 : e.delimiters;
  s && ((_e.delimiterOpen = Si(s[0])), (_e.delimiterClose = Si(s[1])));
  const n = (An = Vp([], t));
  return (
    _e.parse(ms),
    (n.loc = Ee(0, t.length)),
    (n.children = gh(n.children)),
    (An = null),
    n
  );
}
function fm(t, e) {
  li(t, e, bh(t, t.children[0]));
}
function bh(t, e) {
  const { children: s } = t;
  return s.length === 1 && e.type === 1 && !Ei(e);
}
function li(t, e, s = !1) {
  const { children: n } = t,
    i = n.length;
  let o = 0;
  for (let r = 0; r < n.length; r++) {
    const l = n[r];
    if (l.type === 1 && l.tagType === 0) {
      const a = s ? 0 : lt(l, e);
      if (a > 0) {
        if (a >= 2) {
          (l.codegenNode.patchFlag = "-1"),
            (l.codegenNode = e.hoist(l.codegenNode)),
            o++;
          continue;
        }
      } else {
        const c = l.codegenNode;
        if (c.type === 13) {
          const h = wh(c);
          if ((!h || h === 512 || h === 1) && _h(l, e) >= 2) {
            const u = xh(l);
            u && (c.props = e.hoist(u));
          }
          c.dynamicProps && (c.dynamicProps = e.hoist(c.dynamicProps));
        }
      }
    }
    if (l.type === 1) {
      const a = l.tagType === 1;
      a && e.scopes.vSlot++, li(l, e), a && e.scopes.vSlot--;
    } else if (l.type === 11) li(l, e, l.children.length === 1);
    else if (l.type === 9)
      for (let a = 0; a < l.branches.length; a++)
        li(l.branches[a], e, l.branches[a].children.length === 1);
  }
  if (
    (o && e.transformHoist && e.transformHoist(n, e, t),
    o &&
      o === i &&
      t.type === 1 &&
      t.tagType === 0 &&
      t.codegenNode &&
      t.codegenNode.type === 13 &&
      z(t.codegenNode.children))
  ) {
    const r = e.hoist(Fn(t.codegenNode.children));
    e.hmr && (r.content = `[...${r.content}]`), (t.codegenNode.children = r);
  }
}
function lt(t, e) {
  const { constantCache: s } = e;
  switch (t.type) {
    case 1:
      if (t.tagType !== 0) return 0;
      const n = s.get(t);
      if (n !== void 0) return n;
      const i = t.codegenNode;
      if (
        i.type !== 13 ||
        (i.isBlock && t.tag !== "svg" && t.tag !== "foreignObject")
      )
        return 0;
      if (wh(i)) return s.set(t, 0), 0;
      {
        let l = 3;
        const a = _h(t, e);
        if (a === 0) return s.set(t, 0), 0;
        a < l && (l = a);
        for (let c = 0; c < t.children.length; c++) {
          const h = lt(t.children[c], e);
          if (h === 0) return s.set(t, 0), 0;
          h < l && (l = h);
        }
        if (l > 1)
          for (let c = 0; c < t.props.length; c++) {
            const h = t.props[c];
            if (h.type === 7 && h.name === "bind" && h.exp) {
              const u = lt(h.exp, e);
              if (u === 0) return s.set(t, 0), 0;
              u < l && (l = u);
            }
          }
        if (i.isBlock) {
          for (let c = 0; c < t.props.length; c++)
            if (t.props[c].type === 7) return s.set(t, 0), 0;
          e.removeHelper(ws),
            e.removeHelper(Ys(e.inSSR, i.isComponent)),
            (i.isBlock = !1),
            e.helper(Gs(e.inSSR, i.isComponent));
        }
        return s.set(t, l), l;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return lt(t.content, e);
    case 4:
      return t.constType;
    case 8:
      let r = 3;
      for (let l = 0; l < t.children.length; l++) {
        const a = t.children[l];
        if (Z(a) || gt(a)) continue;
        const c = lt(a, e);
        if (c === 0) return 0;
        c < r && (r = c);
      }
      return r;
    default:
      return 0;
  }
}
const dm = new Set([Ir, Mr, Cn, Rn]);
function vh(t, e) {
  if (t.type === 14 && !Z(t.callee) && dm.has(t.callee)) {
    const s = t.arguments[0];
    if (s.type === 4) return lt(s, e);
    if (s.type === 14) return vh(s, e);
  }
  return 0;
}
function _h(t, e) {
  let s = 3;
  const n = xh(t);
  if (n && n.type === 15) {
    const { properties: i } = n;
    for (let o = 0; o < i.length; o++) {
      const { key: r, value: l } = i[o],
        a = lt(r, e);
      if (a === 0) return a;
      a < s && (s = a);
      let c;
      if (
        (l.type === 4
          ? (c = lt(l, e))
          : l.type === 14
          ? (c = vh(l, e))
          : (c = 0),
        c === 0)
      )
        return c;
      c < s && (s = c);
    }
  }
  return s;
}
function xh(t) {
  const e = t.codegenNode;
  if (e.type === 13) return e.props;
}
function wh(t) {
  const e = t.patchFlag;
  return e ? parseInt(e, 10) : void 0;
}
function pm(
  t,
  {
    filename: e = "",
    prefixIdentifiers: s = !1,
    hoistStatic: n = !1,
    hmr: i = !1,
    cacheHandlers: o = !1,
    nodeTransforms: r = [],
    directiveTransforms: l = {},
    transformHoist: a = null,
    isBuiltInComponent: c = Ae,
    isCustomElement: h = Ae,
    expressionPlugins: u = [],
    scopeId: f = null,
    slotted: d = !0,
    ssr: m = !1,
    inSSR: w = !1,
    ssrCssVars: $ = "",
    bindingMetadata: O = ae,
    inline: T = !1,
    isTS: y = !1,
    onError: _ = Hr,
    onWarn: S = hh,
    compatConfig: k,
  }
) {
  const M = e.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/),
    v = {
      filename: e,
      selfName: M && Es(be(M[1])),
      prefixIdentifiers: s,
      hoistStatic: n,
      hmr: i,
      cacheHandlers: o,
      nodeTransforms: r,
      directiveTransforms: l,
      transformHoist: a,
      isBuiltInComponent: c,
      isCustomElement: h,
      expressionPlugins: u,
      scopeId: f,
      slotted: d,
      ssr: m,
      inSSR: w,
      ssrCssVars: $,
      bindingMetadata: O,
      inline: T,
      isTS: y,
      onError: _,
      onWarn: S,
      compatConfig: k,
      root: t,
      helpers: new Map(),
      components: new Set(),
      directives: new Set(),
      hoists: [],
      imports: [],
      constantCache: new WeakMap(),
      temps: 0,
      cached: 0,
      identifiers: Object.create(null),
      scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 },
      parent: null,
      currentNode: t,
      childIndex: 0,
      inVOnce: !1,
      helper(E) {
        const x = v.helpers.get(E) || 0;
        return v.helpers.set(E, x + 1), E;
      },
      removeHelper(E) {
        const x = v.helpers.get(E);
        if (x) {
          const N = x - 1;
          N ? v.helpers.set(E, N) : v.helpers.delete(E);
        }
      },
      helperString(E) {
        return `_${Ks[v.helper(E)]}`;
      },
      replaceNode(E) {
        v.parent.children[v.childIndex] = v.currentNode = E;
      },
      removeNode(E) {
        const x = v.parent.children,
          N = E ? x.indexOf(E) : v.currentNode ? v.childIndex : -1;
        !E || E === v.currentNode
          ? ((v.currentNode = null), v.onNodeRemoved())
          : v.childIndex > N && (v.childIndex--, v.onNodeRemoved()),
          v.parent.children.splice(N, 1);
      },
      onNodeRemoved: Ae,
      addIdentifiers(E) {},
      removeIdentifiers(E) {},
      hoist(E) {
        Z(E) && (E = Q(E)), v.hoists.push(E);
        const x = Q(`_hoisted_${v.hoists.length}`, !1, E.loc, 2);
        return (x.hoisted = E), x;
      },
      cache(E, x = !1) {
        return qp(v.cached++, E, x);
      },
    };
  return (v.filters = new Set()), v;
}
function mm(t, e) {
  const s = pm(t, e);
  eo(t, s),
    e.hoistStatic && fm(t, s),
    e.ssr || gm(t, s),
    (t.helpers = new Set([...s.helpers.keys()])),
    (t.components = [...s.components]),
    (t.directives = [...s.directives]),
    (t.imports = s.imports),
    (t.hoists = s.hoists),
    (t.temps = s.temps),
    (t.cached = s.cached),
    (t.transformed = !0),
    (t.filters = [...s.filters]);
}
function gm(t, e) {
  const { helper: s } = e,
    { children: n } = t;
  if (n.length === 1) {
    const i = n[0];
    if (bh(t, i) && i.codegenNode) {
      const o = i.codegenNode;
      o.type === 13 && Br(o, e), (t.codegenNode = o);
    } else t.codegenNode = i;
  } else if (n.length > 1) {
    let i = 64;
    t.codegenNode = En(
      e,
      s(Sn),
      void 0,
      t.children,
      i + "",
      void 0,
      void 0,
      !0,
      void 0,
      !1
    );
  }
}
function ym(t, e) {
  let s = 0;
  const n = () => {
    s--;
  };
  for (; s < t.children.length; s++) {
    const i = t.children[s];
    Z(i) ||
      ((e.parent = t), (e.childIndex = s), (e.onNodeRemoved = n), eo(i, e));
  }
}
function eo(t, e) {
  e.currentNode = t;
  const { nodeTransforms: s } = e,
    n = [];
  for (let o = 0; o < s.length; o++) {
    const r = s[o](t, e);
    if ((r && (z(r) ? n.push(...r) : n.push(r)), e.currentNode))
      t = e.currentNode;
    else return;
  }
  switch (t.type) {
    case 3:
      e.ssr || e.helper(Mn);
      break;
    case 5:
      e.ssr || e.helper(Zi);
      break;
    case 9:
      for (let o = 0; o < t.branches.length; o++) eo(t.branches[o], e);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      ym(t, e);
      break;
  }
  e.currentNode = t;
  let i = n.length;
  for (; i--; ) n[i]();
}
function Sh(t, e) {
  const s = Z(t) ? (n) => n === t : (n) => t.test(n);
  return (n, i) => {
    if (n.type === 1) {
      const { props: o } = n;
      if (n.tagType === 3 && o.some(Jp)) return;
      const r = [];
      for (let l = 0; l < o.length; l++) {
        const a = o[l];
        if (a.type === 7 && s(a.name)) {
          o.splice(l, 1), l--;
          const c = e(n, a, i);
          c && r.push(c);
        }
      }
      return r;
    }
  };
}
const to = "/*#__PURE__*/",
  Ch = (t) => `${Ks[t]}: _${Ks[t]}`;
function bm(
  t,
  {
    mode: e = "function",
    prefixIdentifiers: s = e === "module",
    sourceMap: n = !1,
    filename: i = "template.vue.html",
    scopeId: o = null,
    optimizeImports: r = !1,
    runtimeGlobalName: l = "Vue",
    runtimeModuleName: a = "vue",
    ssrRuntimeModuleName: c = "vue/server-renderer",
    ssr: h = !1,
    isTS: u = !1,
    inSSR: f = !1,
  }
) {
  const d = {
    mode: e,
    prefixIdentifiers: s,
    sourceMap: n,
    filename: i,
    scopeId: o,
    optimizeImports: r,
    runtimeGlobalName: l,
    runtimeModuleName: a,
    ssrRuntimeModuleName: c,
    ssr: h,
    isTS: u,
    inSSR: f,
    source: t.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(w) {
      return `_${Ks[w]}`;
    },
    push(w, $ = -2, O) {
      d.code += w;
    },
    indent() {
      m(++d.indentLevel);
    },
    deindent(w = !1) {
      w ? --d.indentLevel : m(--d.indentLevel);
    },
    newline() {
      m(d.indentLevel);
    },
  };
  function m(w) {
    d.push(
      `
` + "  ".repeat(w),
      0
    );
  }
  return d;
}
function vm(t, e = {}) {
  const s = bm(t, e);
  e.onContextCreated && e.onContextCreated(s);
  const {
      mode: n,
      push: i,
      prefixIdentifiers: o,
      indent: r,
      deindent: l,
      newline: a,
      scopeId: c,
      ssr: h,
    } = s,
    u = Array.from(t.helpers),
    f = u.length > 0,
    d = !o && n !== "module";
  _m(t, s);
  const w = h ? "ssrRender" : "render",
    O = (h ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(
      ", "
    );
  if (
    (i(`function ${w}(${O}) {`),
    r(),
    d &&
      (i("with (_ctx) {"),
      r(),
      f &&
        (i(
          `const { ${u.map(Ch).join(", ")} } = _Vue
`,
          -1
        ),
        a())),
    t.components.length &&
      (yo(t.components, "component", s),
      (t.directives.length || t.temps > 0) && a()),
    t.directives.length &&
      (yo(t.directives, "directive", s), t.temps > 0 && a()),
    t.filters && t.filters.length && (a(), yo(t.filters, "filter", s), a()),
    t.temps > 0)
  ) {
    i("let ");
    for (let T = 0; T < t.temps; T++) i(`${T > 0 ? ", " : ""}_temp${T}`);
  }
  return (
    (t.components.length || t.directives.length || t.temps) &&
      (i(
        `
`,
        0
      ),
      a()),
    h || i("return "),
    t.codegenNode ? He(t.codegenNode, s) : i("null"),
    d && (l(), i("}")),
    l(),
    i("}"),
    { ast: t, code: s.code, preamble: "", map: s.map ? s.map.toJSON() : void 0 }
  );
}
function _m(t, e) {
  const {
      ssr: s,
      prefixIdentifiers: n,
      push: i,
      newline: o,
      runtimeModuleName: r,
      runtimeGlobalName: l,
      ssrRuntimeModuleName: a,
    } = e,
    c = l,
    h = Array.from(t.helpers);
  if (
    h.length > 0 &&
    (i(
      `const _Vue = ${c}
`,
      -1
    ),
    t.hoists.length)
  ) {
    const u = [Er, Tr, Mn, kr, rh]
      .filter((f) => h.includes(f))
      .map(Ch)
      .join(", ");
    i(
      `const { ${u} } = _Vue
`,
      -1
    );
  }
  xm(t.hoists, e), o(), i("return ");
}
function yo(t, e, { helper: s, push: n, newline: i, isTS: o }) {
  const r = s(e === "filter" ? Pr : e === "component" ? Ar : Nr);
  for (let l = 0; l < t.length; l++) {
    let a = t[l];
    const c = a.endsWith("__self");
    c && (a = a.slice(0, -6)),
      n(
        `const ${kn(a, e)} = ${r}(${JSON.stringify(a)}${c ? ", true" : ""})${
          o ? "!" : ""
        }`
      ),
      l < t.length - 1 && i();
  }
}
function xm(t, e) {
  if (!t.length) return;
  e.pure = !0;
  const { push: s, newline: n, helper: i, scopeId: o, mode: r } = e;
  n();
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    a && (s(`const _hoisted_${l + 1} = `), He(a, e), n());
  }
  e.pure = !1;
}
function qr(t, e) {
  const s = t.length > 3 || !1;
  e.push("["), s && e.indent(), Dn(t, e, s), s && e.deindent(), e.push("]");
}
function Dn(t, e, s = !1, n = !0) {
  const { push: i, newline: o } = e;
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    Z(l) ? i(l, -3) : z(l) ? qr(l, e) : He(l, e),
      r < t.length - 1 && (s ? (n && i(","), o()) : n && i(", "));
  }
}
function He(t, e) {
  if (Z(t)) {
    e.push(t, -3);
    return;
  }
  if (gt(t)) {
    e.push(e.helper(t));
    return;
  }
  switch (t.type) {
    case 1:
    case 9:
    case 11:
      He(t.codegenNode, e);
      break;
    case 2:
      wm(t, e);
      break;
    case 4:
      Eh(t, e);
      break;
    case 5:
      Sm(t, e);
      break;
    case 12:
      He(t.codegenNode, e);
      break;
    case 8:
      Th(t, e);
      break;
    case 3:
      Em(t, e);
      break;
    case 13:
      Tm(t, e);
      break;
    case 14:
      Am(t, e);
      break;
    case 15:
      $m(t, e);
      break;
    case 17:
      Nm(t, e);
      break;
    case 18:
      Pm(t, e);
      break;
    case 19:
      Lm(t, e);
      break;
    case 20:
      Om(t, e);
      break;
    case 21:
      Dn(t.body, e, !0, !1);
      break;
  }
}
function wm(t, e) {
  e.push(JSON.stringify(t.content), -3, t);
}
function Eh(t, e) {
  const { content: s, isStatic: n } = t;
  e.push(n ? JSON.stringify(s) : s, -3, t);
}
function Sm(t, e) {
  const { push: s, helper: n, pure: i } = e;
  i && s(to), s(`${n(Zi)}(`), He(t.content, e), s(")");
}
function Th(t, e) {
  for (let s = 0; s < t.children.length; s++) {
    const n = t.children[s];
    Z(n) ? e.push(n, -3) : He(n, e);
  }
}
function Cm(t, e) {
  const { push: s } = e;
  if (t.type === 8) s("["), Th(t, e), s("]");
  else if (t.isStatic) {
    const n = Vr(t.content) ? t.content : JSON.stringify(t.content);
    s(n, -2, t);
  } else s(`[${t.content}]`, -3, t);
}
function Em(t, e) {
  const { push: s, helper: n, pure: i } = e;
  i && s(to), s(`${n(Mn)}(${JSON.stringify(t.content)})`, -3, t);
}
function Tm(t, e) {
  const { push: s, helper: n, pure: i } = e,
    {
      tag: o,
      props: r,
      children: l,
      patchFlag: a,
      dynamicProps: c,
      directives: h,
      isBlock: u,
      disableTracking: f,
      isComponent: d,
    } = t;
  h && s(n(Lr) + "("), u && s(`(${n(ws)}(${f ? "true" : ""}), `), i && s(to);
  const m = u ? Ys(e.inSSR, d) : Gs(e.inSSR, d);
  s(n(m) + "(", -2, t),
    Dn(km([o, r, l, a, c]), e),
    s(")"),
    u && s(")"),
    h && (s(", "), He(h, e), s(")"));
}
function km(t) {
  let e = t.length;
  for (; e-- && t[e] == null; );
  return t.slice(0, e + 1).map((s) => s || "null");
}
function Am(t, e) {
  const { push: s, helper: n, pure: i } = e,
    o = Z(t.callee) ? t.callee : n(t.callee);
  i && s(to), s(o + "(", -2, t), Dn(t.arguments, e), s(")");
}
function $m(t, e) {
  const { push: s, indent: n, deindent: i, newline: o } = e,
    { properties: r } = t;
  if (!r.length) {
    s("{}", -2, t);
    return;
  }
  const l = r.length > 1 || !1;
  s(l ? "{" : "{ "), l && n();
  for (let a = 0; a < r.length; a++) {
    const { key: c, value: h } = r[a];
    Cm(c, e), s(": "), He(h, e), a < r.length - 1 && (s(","), o());
  }
  l && i(), s(l ? "}" : " }");
}
function Nm(t, e) {
  qr(t.elements, e);
}
function Pm(t, e) {
  const { push: s, indent: n, deindent: i } = e,
    { params: o, returns: r, body: l, newline: a, isSlot: c } = t;
  c && s(`_${Ks[Fr]}(`),
    s("(", -2, t),
    z(o) ? Dn(o, e) : o && He(o, e),
    s(") => "),
    (a || l) && (s("{"), n()),
    r ? (a && s("return "), z(r) ? qr(r, e) : He(r, e)) : l && He(l, e),
    (a || l) && (i(), s("}")),
    c && (t.isNonScopedSlot && s(", undefined, true"), s(")"));
}
function Lm(t, e) {
  const { test: s, consequent: n, alternate: i, newline: o } = t,
    { push: r, indent: l, deindent: a, newline: c } = e;
  if (s.type === 4) {
    const u = !Vr(s.content);
    u && r("("), Eh(s, e), u && r(")");
  } else r("("), He(s, e), r(")");
  o && l(),
    e.indentLevel++,
    o || r(" "),
    r("? "),
    He(n, e),
    e.indentLevel--,
    o && c(),
    o || r(" "),
    r(": ");
  const h = i.type === 19;
  h || e.indentLevel++, He(i, e), h || e.indentLevel--, o && a(!0);
}
function Om(t, e) {
  const { push: s, helper: n, indent: i, deindent: o, newline: r } = e;
  s(`_cache[${t.index}] || (`),
    t.isVNode && (i(), s(`${n(wi)}(-1),`), r()),
    s(`_cache[${t.index}] = `),
    He(t.value, e),
    t.isVNode &&
      (s(","), r(), s(`${n(wi)}(1),`), r(), s(`_cache[${t.index}]`), o()),
    s(")");
}
new RegExp(
  "\\b" +
    "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield"
      .split(",")
      .join("\\b|\\b") +
    "\\b"
);
const Im = Sh(/^(if|else|else-if)$/, (t, e, s) =>
  Mm(t, e, s, (n, i, o) => {
    const r = s.parent.children;
    let l = r.indexOf(n),
      a = 0;
    for (; l-- >= 0; ) {
      const c = r[l];
      c && c.type === 9 && (a += c.branches.length);
    }
    return () => {
      if (o) n.codegenNode = Ul(i, a, s);
      else {
        const c = Rm(n.codegenNode);
        c.alternate = Ul(i, a + n.branches.length - 1, s);
      }
    };
  })
);
function Mm(t, e, s, n) {
  if (e.name !== "else" && (!e.exp || !e.exp.content.trim())) {
    const i = e.exp ? e.exp.loc : t.loc;
    s.onError(ye(28, e.loc)), (e.exp = Q("true", !1, i));
  }
  if (e.name === "if") {
    const i = jl(t, e),
      o = { type: 9, loc: t.loc, branches: [i] };
    if ((s.replaceNode(o), n)) return n(o, i, !0);
  } else {
    const i = s.parent.children;
    let o = i.indexOf(t);
    for (; o-- >= -1; ) {
      const r = i[o];
      if (r && r.type === 3) {
        s.removeNode(r);
        continue;
      }
      if (r && r.type === 2 && !r.content.trim().length) {
        s.removeNode(r);
        continue;
      }
      if (r && r.type === 9) {
        e.name === "else-if" &&
          r.branches[r.branches.length - 1].condition === void 0 &&
          s.onError(ye(30, t.loc)),
          s.removeNode();
        const l = jl(t, e);
        r.branches.push(l);
        const a = n && n(r, l, !1);
        eo(l, s), a && a(), (s.currentNode = null);
      } else s.onError(ye(30, t.loc));
      break;
    }
  }
}
function jl(t, e) {
  const s = t.tagType === 3;
  return {
    type: 10,
    loc: t.loc,
    condition: e.name === "else" ? void 0 : e.exp,
    children: s && !ft(t, "for") ? t.children : [t],
    userKey: Qi(t, "key"),
    isTemplateIf: s,
  };
}
function Ul(t, e, s) {
  return t.condition
    ? zo(t.condition, Wl(t, e, s), Te(s.helper(Mn), ['""', "true"]))
    : Wl(t, e, s);
}
function Wl(t, e, s) {
  const { helper: n } = s,
    i = xe("key", Q(`${e}`, !1, it, 2)),
    { children: o } = t,
    r = o[0];
  if (o.length !== 1 || r.type !== 1)
    if (o.length === 1 && r.type === 11) {
      const a = r.codegenNode;
      return Ti(a, i, s), a;
    } else
      return En(
        s,
        n(Sn),
        rt([i]),
        o,
        64 + "",
        void 0,
        void 0,
        !0,
        !1,
        !1,
        t.loc
      );
  else {
    const a = r.codegenNode,
      c = Qp(a);
    return c.type === 13 && Br(c, s), Ti(c, i, s), a;
  }
}
function Rm(t) {
  for (;;)
    if (t.type === 19)
      if (t.alternate.type === 19) t = t.alternate;
      else return t;
    else t.type === 20 && (t = t.value);
}
const Fm = Sh("for", (t, e, s) => {
  const { helper: n, removeHelper: i } = s;
  return Dm(t, e, s, (o) => {
    const r = Te(n(Or), [o.source]),
      l = Ci(t),
      a = ft(t, "memo"),
      c = Qi(t, "key"),
      h = c && (c.type === 6 ? Q(c.value.content, !0) : c.exp),
      u = c ? xe("key", h) : null,
      f = o.source.type === 4 && o.source.constType > 0,
      d = f ? 64 : c ? 128 : 256;
    return (
      (o.codegenNode = En(
        s,
        n(Sn),
        void 0,
        r,
        d + "",
        void 0,
        void 0,
        !0,
        !f,
        !1,
        t.loc
      )),
      () => {
        let m;
        const { children: w } = o,
          $ = w.length !== 1 || w[0].type !== 1,
          O = Ei(t)
            ? t
            : l && t.children.length === 1 && Ei(t.children[0])
            ? t.children[0]
            : null;
        if (
          (O
            ? ((m = O.codegenNode), l && u && Ti(m, u, s))
            : $
            ? (m = En(
                s,
                n(Sn),
                u ? rt([u]) : void 0,
                t.children,
                "64",
                void 0,
                void 0,
                !0,
                void 0,
                !1
              ))
            : ((m = w[0].codegenNode),
              l && u && Ti(m, u, s),
              m.isBlock !== !f &&
                (m.isBlock
                  ? (i(ws), i(Ys(s.inSSR, m.isComponent)))
                  : i(Gs(s.inSSR, m.isComponent))),
              (m.isBlock = !f),
              m.isBlock
                ? (n(ws), n(Ys(s.inSSR, m.isComponent)))
                : n(Gs(s.inSSR, m.isComponent))),
          a)
        ) {
          const T = Xs(Wo(o.parseResult, [Q("_cached")]));
          (T.body = zp([
            mt(["const _memo = (", a.exp, ")"]),
            mt([
              "if (_cached",
              ...(h ? [" && _cached.key === ", h] : []),
              ` && ${s.helperString(ch)}(_cached, _memo)) return _cached`,
            ]),
            mt(["const _item = ", m]),
            Q("_item.memo = _memo"),
            Q("return _item"),
          ])),
            r.arguments.push(T, Q("_cache"), Q(String(s.cached++)));
        } else r.arguments.push(Xs(Wo(o.parseResult), m, !0));
      }
    );
  });
});
function Dm(t, e, s, n) {
  if (!e.exp) {
    s.onError(ye(31, e.loc));
    return;
  }
  const i = e.forParseResult;
  if (!i) {
    s.onError(ye(32, e.loc));
    return;
  }
  kh(i);
  const { addIdentifiers: o, removeIdentifiers: r, scopes: l } = s,
    { source: a, value: c, key: h, index: u } = i,
    f = {
      type: 11,
      loc: e.loc,
      source: a,
      valueAlias: c,
      keyAlias: h,
      objectIndexAlias: u,
      parseResult: i,
      children: Ci(t) ? t.children : [t],
    };
  s.replaceNode(f), l.vFor++;
  const d = n && n(f);
  return () => {
    l.vFor--, d && d();
  };
}
function kh(t, e) {
  t.finalized || (t.finalized = !0);
}
function Wo({ value: t, key: e, index: s }, n = []) {
  return Bm([t, e, s, ...n]);
}
function Bm(t) {
  let e = t.length;
  for (; e-- && !t[e]; );
  return t.slice(0, e + 1).map((s, n) => s || Q("_".repeat(n + 1), !1));
}
const Kl = Q("undefined", !1),
  Hm = (t, e) => {
    if (t.type === 1 && (t.tagType === 1 || t.tagType === 3)) {
      const s = ft(t, "slot");
      if (s)
        return (
          s.exp,
          e.scopes.vSlot++,
          () => {
            e.scopes.vSlot--;
          }
        );
    }
  },
  Vm = (t, e, s, n) => Xs(t, s, !1, !0, s.length ? s[0].loc : n);
function qm(t, e, s = Vm) {
  e.helper(Fr);
  const { children: n, loc: i } = t,
    o = [],
    r = [];
  let l = e.scopes.vSlot > 0 || e.scopes.vFor > 0;
  const a = ft(t, "slot", !0);
  if (a) {
    const { arg: $, exp: O } = a;
    $ && !Xe($) && (l = !0),
      o.push(xe($ || Q("default", !0), s(O, void 0, n, i)));
  }
  let c = !1,
    h = !1;
  const u = [],
    f = new Set();
  let d = 0;
  for (let $ = 0; $ < n.length; $++) {
    const O = n[$];
    let T;
    if (!Ci(O) || !(T = ft(O, "slot", !0))) {
      O.type !== 3 && u.push(O);
      continue;
    }
    if (a) {
      e.onError(ye(37, T.loc));
      break;
    }
    c = !0;
    const { children: y, loc: _ } = O,
      { arg: S = Q("default", !0), exp: k, loc: M } = T;
    let v;
    Xe(S) ? (v = S ? S.content : "default") : (l = !0);
    const E = ft(O, "for"),
      x = s(k, E, y, _);
    let N, C;
    if ((N = ft(O, "if"))) (l = !0), r.push(zo(N.exp, Qn(S, x, d++), Kl));
    else if ((C = ft(O, /^else(-if)?$/, !0))) {
      let R = $,
        V;
      for (; R-- && ((V = n[R]), V.type === 3); );
      if (V && Ci(V) && ft(V, "if")) {
        n.splice($, 1), $--;
        let Y = r[r.length - 1];
        for (; Y.alternate.type === 19; ) Y = Y.alternate;
        Y.alternate = C.exp ? zo(C.exp, Qn(S, x, d++), Kl) : Qn(S, x, d++);
      } else e.onError(ye(30, C.loc));
    } else if (E) {
      l = !0;
      const R = E.forParseResult;
      R
        ? (kh(R), r.push(Te(e.helper(Or), [R.source, Xs(Wo(R), Qn(S, x), !0)])))
        : e.onError(ye(32, E.loc));
    } else {
      if (v) {
        if (f.has(v)) {
          e.onError(ye(38, M));
          continue;
        }
        f.add(v), v === "default" && (h = !0);
      }
      o.push(xe(S, x));
    }
  }
  if (!a) {
    const $ = (O, T) => {
      const y = s(O, void 0, T, i);
      return e.compatConfig && (y.isNonScopedSlot = !0), xe("default", y);
    };
    c
      ? u.length &&
        u.some((O) => Ah(O)) &&
        (h ? e.onError(ye(39, u[0].loc)) : o.push($(void 0, u)))
      : o.push($(void 0, n));
  }
  const m = l ? 2 : ai(t.children) ? 3 : 1;
  let w = rt(o.concat(xe("_", Q(m + "", !1))), i);
  return (
    r.length && (w = Te(e.helper(ah), [w, Fn(r)])),
    { slots: w, hasDynamicSlots: l }
  );
}
function Qn(t, e, s) {
  const n = [xe("name", t), xe("fn", e)];
  return s != null && n.push(xe("key", Q(String(s), !0))), rt(n);
}
function ai(t) {
  for (let e = 0; e < t.length; e++) {
    const s = t[e];
    switch (s.type) {
      case 1:
        if (s.tagType === 2 || ai(s.children)) return !0;
        break;
      case 9:
        if (ai(s.branches)) return !0;
        break;
      case 10:
      case 11:
        if (ai(s.children)) return !0;
        break;
    }
  }
  return !1;
}
function Ah(t) {
  return t.type !== 2 && t.type !== 12
    ? !0
    : t.type === 2
    ? !!t.content.trim()
    : Ah(t.content);
}
const $h = new WeakMap(),
  zm = (t, e) =>
    function () {
      if (
        ((t = e.currentNode),
        !(t.type === 1 && (t.tagType === 0 || t.tagType === 1)))
      )
        return;
      const { tag: n, props: i } = t,
        o = t.tagType === 1;
      let r = o ? jm(t, e) : `"${n}"`;
      const l = de(r) && r.callee === $r;
      let a,
        c,
        h,
        u = 0,
        f,
        d,
        m,
        w =
          l ||
          r === pn ||
          r === Cr ||
          (!o && (n === "svg" || n === "foreignObject"));
      if (i.length > 0) {
        const $ = Nh(t, e, void 0, o, l);
        (a = $.props), (u = $.patchFlag), (d = $.dynamicPropNames);
        const O = $.directives;
        (m = O && O.length ? Fn(O.map((T) => Wm(T, e))) : void 0),
          $.shouldUseBlock && (w = !0);
      }
      if (t.children.length > 0)
        if ((r === _i && ((w = !0), (u |= 1024)), o && r !== pn && r !== _i)) {
          const { slots: O, hasDynamicSlots: T } = qm(t, e);
          (c = O), T && (u |= 1024);
        } else if (t.children.length === 1 && r !== pn) {
          const O = t.children[0],
            T = O.type,
            y = T === 5 || T === 8;
          y && lt(O, e) === 0 && (u |= 1),
            y || T === 2 ? (c = O) : (c = t.children);
        } else c = t.children;
      u !== 0 && ((h = String(u)), d && d.length && (f = Km(d))),
        (t.codegenNode = En(e, r, a, c, h, f, m, !!w, !1, o, t.loc));
    };
function jm(t, e, s = !1) {
  let { tag: n } = t;
  const i = Ko(n),
    o = Qi(t, "is");
  if (o)
    if (i || ps("COMPILER_IS_ON_ELEMENT", e)) {
      const l = o.type === 6 ? o.value && Q(o.value.content, !0) : o.exp;
      if (l) return Te(e.helper($r), [l]);
    } else
      o.type === 6 &&
        o.value.content.startsWith("vue:") &&
        (n = o.value.content.slice(4));
  const r = uh(n) || e.isBuiltInComponent(n);
  return r
    ? (s || e.helper(r), r)
    : (e.helper(Ar), e.components.add(n), kn(n, "component"));
}
function Nh(t, e, s = t.props, n, i, o = !1) {
  const { tag: r, loc: l, children: a } = t;
  let c = [];
  const h = [],
    u = [],
    f = a.length > 0;
  let d = !1,
    m = 0,
    w = !1,
    $ = !1,
    O = !1,
    T = !1,
    y = !1,
    _ = !1;
  const S = [],
    k = (E) => {
      c.length && (h.push(rt(Xl(c), l)), (c = [])), E && h.push(E);
    },
    M = ({ key: E, value: x }) => {
      if (Xe(E)) {
        const N = E.content,
          C = Ss(N);
        if (
          (C &&
            (!n || i) &&
            N.toLowerCase() !== "onclick" &&
            N !== "onUpdate:modelValue" &&
            !Kt(N) &&
            (T = !0),
          C && Kt(N) && (_ = !0),
          C && x.type === 14 && (x = x.arguments[0]),
          x.type === 20 || ((x.type === 4 || x.type === 8) && lt(x, e) > 0))
        )
          return;
        N === "ref"
          ? (w = !0)
          : N === "class"
          ? ($ = !0)
          : N === "style"
          ? (O = !0)
          : N !== "key" && !S.includes(N) && S.push(N),
          n && (N === "class" || N === "style") && !S.includes(N) && S.push(N);
      } else y = !0;
    };
  for (let E = 0; E < s.length; E++) {
    const x = s[E];
    if (x.type === 6) {
      const { loc: N, name: C, nameLoc: R, value: V } = x;
      let Y = !0;
      if (
        (C === "ref" &&
          ((w = !0),
          e.scopes.vFor > 0 && c.push(xe(Q("ref_for", !0), Q("true")))),
        C === "is" &&
          (Ko(r) ||
            (V && V.content.startsWith("vue:")) ||
            ps("COMPILER_IS_ON_ELEMENT", e)))
      )
        continue;
      c.push(xe(Q(C, !0, R), Q(V ? V.content : "", Y, V ? V.loc : N)));
    } else {
      const { name: N, arg: C, exp: R, loc: V, modifiers: Y } = x,
        H = N === "bind",
        K = N === "on";
      if (N === "slot") {
        n || e.onError(ye(40, V));
        continue;
      }
      if (
        N === "once" ||
        N === "memo" ||
        N === "is" ||
        (H && ls(C, "is") && (Ko(r) || ps("COMPILER_IS_ON_ELEMENT", e))) ||
        (K && o)
      )
        continue;
      if (
        (((H && ls(C, "key")) || (K && f && ls(C, "vue:before-update"))) &&
          (d = !0),
        H &&
          ls(C, "ref") &&
          e.scopes.vFor > 0 &&
          c.push(xe(Q("ref_for", !0), Q("true"))),
        !C && (H || K))
      ) {
        if (((y = !0), R))
          if (H) {
            if ((k(), ps("COMPILER_V_BIND_OBJECT_ORDER", e))) {
              h.unshift(R);
              continue;
            }
            h.push(R);
          } else
            k({
              type: 14,
              loc: V,
              callee: e.helper(Rr),
              arguments: n ? [R] : [R, "true"],
            });
        else e.onError(ye(H ? 34 : 35, V));
        continue;
      }
      H && Y.includes("prop") && (m |= 32);
      const U = e.directiveTransforms[N];
      if (U) {
        const { props: Ve, needRuntime: Rt } = U(x, t, e);
        !o && Ve.forEach(M),
          K && C && !Xe(C) ? k(rt(Ve, l)) : c.push(...Ve),
          Rt && (u.push(x), gt(Rt) && $h.set(x, Rt));
      } else au(N) || (u.push(x), f && (d = !0));
    }
  }
  let v;
  if (
    (h.length
      ? (k(), h.length > 1 ? (v = Te(e.helper(xi), h, l)) : (v = h[0]))
      : c.length && (v = rt(Xl(c), l)),
    y
      ? (m |= 16)
      : ($ && !n && (m |= 2),
        O && !n && (m |= 4),
        S.length && (m |= 8),
        T && (m |= 32)),
    !d && (m === 0 || m === 32) && (w || _ || u.length > 0) && (m |= 512),
    !e.inSSR && v)
  )
    switch (v.type) {
      case 15:
        let E = -1,
          x = -1,
          N = !1;
        for (let V = 0; V < v.properties.length; V++) {
          const Y = v.properties[V].key;
          Xe(Y)
            ? Y.content === "class"
              ? (E = V)
              : Y.content === "style" && (x = V)
            : Y.isHandlerKey || (N = !0);
        }
        const C = v.properties[E],
          R = v.properties[x];
        N
          ? (v = Te(e.helper(Cn), [v]))
          : (C && !Xe(C.value) && (C.value = Te(e.helper(Ir), [C.value])),
            R &&
              (O ||
                (R.value.type === 4 && R.value.content.trim()[0] === "[") ||
                R.value.type === 17) &&
              (R.value = Te(e.helper(Mr), [R.value])));
        break;
      case 14:
        break;
      default:
        v = Te(e.helper(Cn), [Te(e.helper(Rn), [v])]);
        break;
    }
  return {
    props: v,
    directives: u,
    patchFlag: m,
    dynamicPropNames: S,
    shouldUseBlock: d,
  };
}
function Xl(t) {
  const e = new Map(),
    s = [];
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (i.key.type === 8 || !i.key.isStatic) {
      s.push(i);
      continue;
    }
    const o = i.key.content,
      r = e.get(o);
    r
      ? (o === "style" || o === "class" || Ss(o)) && Um(r, i)
      : (e.set(o, i), s.push(i));
  }
  return s;
}
function Um(t, e) {
  t.value.type === 17
    ? t.value.elements.push(e.value)
    : (t.value = Fn([t.value, e.value], t.loc));
}
function Wm(t, e) {
  const s = [],
    n = $h.get(t);
  n
    ? s.push(e.helperString(n))
    : (e.helper(Nr), e.directives.add(t.name), s.push(kn(t.name, "directive")));
  const { loc: i } = t;
  if (
    (t.exp && s.push(t.exp),
    t.arg && (t.exp || s.push("void 0"), s.push(t.arg)),
    Object.keys(t.modifiers).length)
  ) {
    t.arg || (t.exp || s.push("void 0"), s.push("void 0"));
    const o = Q("true", !1, i);
    s.push(
      rt(
        t.modifiers.map((r) => xe(r, o)),
        i
      )
    );
  }
  return Fn(s, t.loc);
}
function Km(t) {
  let e = "[";
  for (let s = 0, n = t.length; s < n; s++)
    (e += JSON.stringify(t[s])), s < n - 1 && (e += ", ");
  return e + "]";
}
function Ko(t) {
  return t === "component" || t === "Component";
}
const Xm = (t, e) => {
  if (Ei(t)) {
    const { children: s, loc: n } = t,
      { slotName: i, slotProps: o } = Gm(t, e),
      r = [
        e.prefixIdentifiers ? "_ctx.$slots" : "$slots",
        i,
        "{}",
        "undefined",
        "true",
      ];
    let l = 2;
    o && ((r[2] = o), (l = 3)),
      s.length && ((r[3] = Xs([], s, !1, !1, n)), (l = 4)),
      e.scopeId && !e.slotted && (l = 5),
      r.splice(l),
      (t.codegenNode = Te(e.helper(lh), r, n));
  }
};
function Gm(t, e) {
  let s = '"default"',
    n;
  const i = [];
  for (let o = 0; o < t.props.length; o++) {
    const r = t.props[o];
    if (r.type === 6)
      r.value &&
        (r.name === "name"
          ? (s = JSON.stringify(r.value.content))
          : ((r.name = be(r.name)), i.push(r)));
    else if (r.name === "bind" && ls(r.arg, "name")) {
      if (r.exp) s = r.exp;
      else if (r.arg && r.arg.type === 4) {
        const l = be(r.arg.content);
        s = r.exp = Q(l, !1, r.arg.loc);
      }
    } else
      r.name === "bind" &&
        r.arg &&
        Xe(r.arg) &&
        (r.arg.content = be(r.arg.content)),
        i.push(r);
  }
  if (i.length > 0) {
    const { props: o, directives: r } = Nh(t, e, i, !1, !1);
    (n = o), r.length && e.onError(ye(36, r[0].loc));
  }
  return { slotName: s, slotProps: n };
}
const Ym =
    /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/,
  Ph = (t, e, s, n) => {
    const { loc: i, modifiers: o, arg: r } = t;
    !t.exp && !o.length && s.onError(ye(35, i));
    let l;
    if (r.type === 4)
      if (r.isStatic) {
        let u = r.content;
        u.startsWith("vue:") && (u = `vnode-${u.slice(4)}`);
        const f =
          e.tagType !== 0 || u.startsWith("vnode") || !/[A-Z]/.test(u)
            ? Rs(be(u))
            : `on:${u}`;
        l = Q(f, !0, r.loc);
      } else l = mt([`${s.helperString(qo)}(`, r, ")"]);
    else
      (l = r),
        l.children.unshift(`${s.helperString(qo)}(`),
        l.children.push(")");
    let a = t.exp;
    a && !a.content.trim() && (a = void 0);
    let c = s.cacheHandlers && !a && !s.inVOnce;
    if (a) {
      const u = fh(a.content),
        f = !(u || Ym.test(a.content)),
        d = a.content.includes(";");
      (f || (c && u)) &&
        (a = mt([
          `${f ? "$event" : "(...args)"} => ${d ? "{" : "("}`,
          a,
          d ? "}" : ")",
        ]));
    }
    let h = { props: [xe(l, a || Q("() => {}", !1, i))] };
    return (
      n && (h = n(h)),
      c && (h.props[0].value = s.cache(h.props[0].value)),
      h.props.forEach((u) => (u.key.isHandlerKey = !0)),
      h
    );
  },
  Jm = (t, e, s) => {
    const { modifiers: n, loc: i } = t,
      o = t.arg;
    let { exp: r } = t;
    if ((r && r.type === 4 && !r.content.trim() && (r = void 0), !r)) {
      if (o.type !== 4 || !o.isStatic)
        return s.onError(ye(52, o.loc)), { props: [xe(o, Q("", !0, i))] };
      const l = be(o.content);
      r = t.exp = Q(l, !1, o.loc);
    }
    return (
      o.type !== 4
        ? (o.children.unshift("("), o.children.push(') || ""'))
        : o.isStatic || (o.content = `${o.content} || ""`),
      n.includes("camel") &&
        (o.type === 4
          ? o.isStatic
            ? (o.content = be(o.content))
            : (o.content = `${s.helperString(Vo)}(${o.content})`)
          : (o.children.unshift(`${s.helperString(Vo)}(`),
            o.children.push(")"))),
      s.inSSR ||
        (n.includes("prop") && Gl(o, "."), n.includes("attr") && Gl(o, "^")),
      { props: [xe(o, r)] }
    );
  },
  Gl = (t, e) => {
    t.type === 4
      ? t.isStatic
        ? (t.content = e + t.content)
        : (t.content = `\`${e}\${${t.content}}\``)
      : (t.children.unshift(`'${e}' + (`), t.children.push(")"));
  },
  Zm = (t, e) => {
    if (t.type === 0 || t.type === 1 || t.type === 11 || t.type === 10)
      return () => {
        const s = t.children;
        let n,
          i = !1;
        for (let o = 0; o < s.length; o++) {
          const r = s[o];
          if (go(r)) {
            i = !0;
            for (let l = o + 1; l < s.length; l++) {
              const a = s[l];
              if (go(a))
                n || (n = s[o] = mt([r], r.loc)),
                  n.children.push(" + ", a),
                  s.splice(l, 1),
                  l--;
              else {
                n = void 0;
                break;
              }
            }
          }
        }
        if (
          !(
            !i ||
            (s.length === 1 &&
              (t.type === 0 ||
                (t.type === 1 &&
                  t.tagType === 0 &&
                  !t.props.find(
                    (o) => o.type === 7 && !e.directiveTransforms[o.name]
                  ) &&
                  t.tag !== "template")))
          )
        )
          for (let o = 0; o < s.length; o++) {
            const r = s[o];
            if (go(r) || r.type === 8) {
              const l = [];
              (r.type !== 2 || r.content !== " ") && l.push(r),
                !e.ssr && lt(r, e) === 0 && l.push("1"),
                (s[o] = {
                  type: 12,
                  content: r,
                  loc: r.loc,
                  codegenNode: Te(e.helper(kr), l),
                });
            }
          }
      };
  },
  Yl = new WeakSet(),
  Qm = (t, e) => {
    if (t.type === 1 && ft(t, "once", !0))
      return Yl.has(t) || e.inVOnce || e.inSSR
        ? void 0
        : (Yl.add(t),
          (e.inVOnce = !0),
          e.helper(wi),
          () => {
            e.inVOnce = !1;
            const s = e.currentNode;
            s.codegenNode && (s.codegenNode = e.cache(s.codegenNode, !0));
          });
  },
  Lh = (t, e, s) => {
    const { exp: n, arg: i } = t;
    if (!n) return s.onError(ye(41, t.loc)), ei();
    const o = n.loc.source,
      r = n.type === 4 ? n.content : o,
      l = s.bindingMetadata[o];
    if (l === "props" || l === "props-aliased")
      return s.onError(ye(44, n.loc)), ei();
    if (!r.trim() || (!fh(r) && !!1)) return s.onError(ye(42, n.loc)), ei();
    const c = i || Q("modelValue", !0),
      h = i
        ? Xe(i)
          ? `onUpdate:${be(i.content)}`
          : mt(['"onUpdate:" + ', i])
        : "onUpdate:modelValue";
    let u;
    const f = s.isTS ? "($event: any)" : "$event";
    u = mt([`${f} => ((`, n, ") = $event)"]);
    const d = [xe(c, t.exp), xe(h, u)];
    if (t.modifiers.length && e.tagType === 1) {
      const m = t.modifiers
          .map(($) => (Vr($) ? $ : JSON.stringify($)) + ": true")
          .join(", "),
        w = i
          ? Xe(i)
            ? `${i.content}Modifiers`
            : mt([i, ' + "Modifiers"'])
          : "modelModifiers";
      d.push(xe(w, Q(`{ ${m} }`, !1, t.loc, 2)));
    }
    return ei(d);
  };
function ei(t = []) {
  return { props: t };
}
const eg = /[\w).+\-_$\]]/,
  tg = (t, e) => {
    ps("COMPILER_FILTERS", e) &&
      (t.type === 5 && Ai(t.content, e),
      t.type === 1 &&
        t.props.forEach((s) => {
          s.type === 7 && s.name !== "for" && s.exp && Ai(s.exp, e);
        }));
  };
function Ai(t, e) {
  if (t.type === 4) Jl(t, e);
  else
    for (let s = 0; s < t.children.length; s++) {
      const n = t.children[s];
      typeof n == "object" &&
        (n.type === 4
          ? Jl(n, e)
          : n.type === 8
          ? Ai(t, e)
          : n.type === 5 && Ai(n.content, e));
    }
}
function Jl(t, e) {
  const s = t.content;
  let n = !1,
    i = !1,
    o = !1,
    r = !1,
    l = 0,
    a = 0,
    c = 0,
    h = 0,
    u,
    f,
    d,
    m,
    w = [];
  for (d = 0; d < s.length; d++)
    if (((f = u), (u = s.charCodeAt(d)), n)) u === 39 && f !== 92 && (n = !1);
    else if (i) u === 34 && f !== 92 && (i = !1);
    else if (o) u === 96 && f !== 92 && (o = !1);
    else if (r) u === 47 && f !== 92 && (r = !1);
    else if (
      u === 124 &&
      s.charCodeAt(d + 1) !== 124 &&
      s.charCodeAt(d - 1) !== 124 &&
      !l &&
      !a &&
      !c
    )
      m === void 0 ? ((h = d + 1), (m = s.slice(0, d).trim())) : $();
    else {
      switch (u) {
        case 34:
          i = !0;
          break;
        case 39:
          n = !0;
          break;
        case 96:
          o = !0;
          break;
        case 40:
          c++;
          break;
        case 41:
          c--;
          break;
        case 91:
          a++;
          break;
        case 93:
          a--;
          break;
        case 123:
          l++;
          break;
        case 125:
          l--;
          break;
      }
      if (u === 47) {
        let O = d - 1,
          T;
        for (; O >= 0 && ((T = s.charAt(O)), T === " "); O--);
        (!T || !eg.test(T)) && (r = !0);
      }
    }
  m === void 0 ? (m = s.slice(0, d).trim()) : h !== 0 && $();
  function $() {
    w.push(s.slice(h, d).trim()), (h = d + 1);
  }
  if (w.length) {
    for (d = 0; d < w.length; d++) m = sg(m, w[d], e);
    t.content = m;
  }
}
function sg(t, e, s) {
  s.helper(Pr);
  const n = e.indexOf("(");
  if (n < 0) return s.filters.add(e), `${kn(e, "filter")}(${t})`;
  {
    const i = e.slice(0, n),
      o = e.slice(n + 1);
    return (
      s.filters.add(i), `${kn(i, "filter")}(${t}${o !== ")" ? "," + o : o}`
    );
  }
}
const Zl = new WeakSet(),
  ng = (t, e) => {
    if (t.type === 1) {
      const s = ft(t, "memo");
      return !s || Zl.has(t)
        ? void 0
        : (Zl.add(t),
          () => {
            const n = t.codegenNode || e.currentNode.codegenNode;
            n &&
              n.type === 13 &&
              (t.tagType !== 1 && Br(n, e),
              (t.codegenNode = Te(e.helper(Dr), [
                s.exp,
                Xs(void 0, n),
                "_cache",
                String(e.cached++),
              ])));
          });
    }
  };
function ig(t) {
  return [
    [Qm, Im, ng, Fm, tg, Xm, zm, Hm, Zm],
    { on: Ph, bind: Jm, model: Lh },
  ];
}
function og(t, e = {}) {
  const s = e.onError || Hr,
    n = e.mode === "module";
  e.prefixIdentifiers === !0 ? s(ye(47)) : n && s(ye(48));
  const i = !1;
  e.cacheHandlers && s(ye(49)), e.scopeId && !n && s(ye(50));
  const o = le({}, e, { prefixIdentifiers: i }),
    r = Z(t) ? um(t, o) : t,
    [l, a] = ig();
  return (
    mm(
      r,
      le({}, o, {
        nodeTransforms: [...l, ...(e.nodeTransforms || [])],
        directiveTransforms: le({}, a, e.directiveTransforms || {}),
      })
    ),
    vm(r, o)
  );
}
const rg = () => ({ props: [] });
/**
 * @vue/compiler-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Oh = Symbol(""),
  Ih = Symbol(""),
  Mh = Symbol(""),
  Rh = Symbol(""),
  Xo = Symbol(""),
  Fh = Symbol(""),
  Dh = Symbol(""),
  Bh = Symbol(""),
  Hh = Symbol(""),
  Vh = Symbol("");
Hp({
  [Oh]: "vModelRadio",
  [Ih]: "vModelCheckbox",
  [Mh]: "vModelText",
  [Rh]: "vModelSelect",
  [Xo]: "vModelDynamic",
  [Fh]: "withModifiers",
  [Dh]: "withKeys",
  [Bh]: "vShow",
  [Hh]: "Transition",
  [Vh]: "TransitionGroup",
});
let Ps;
function lg(t, e = !1) {
  return (
    Ps || (Ps = document.createElement("div")),
    e
      ? ((Ps.innerHTML = `<div foo="${t.replace(/"/g, "&quot;")}">`),
        Ps.children[0].getAttribute("foo"))
      : ((Ps.innerHTML = t), Ps.textContent)
  );
}
const ag = {
    parseMode: "html",
    isVoidTag: Cu,
    isNativeTag: (t) => xu(t) || wu(t) || Su(t),
    isPreTag: (t) => t === "pre",
    decodeEntities: lg,
    isBuiltInComponent: (t) => {
      if (t === "Transition" || t === "transition") return Hh;
      if (t === "TransitionGroup" || t === "transition-group") return Vh;
    },
    getNamespace(t, e, s) {
      let n = e ? e.ns : s;
      if (e && n === 2)
        if (e.tag === "annotation-xml") {
          if (t === "svg") return 1;
          e.props.some(
            (i) =>
              i.type === 6 &&
              i.name === "encoding" &&
              i.value != null &&
              (i.value.content === "text/html" ||
                i.value.content === "application/xhtml+xml")
          ) && (n = 0);
        } else
          /^m(?:[ions]|text)$/.test(e.tag) &&
            t !== "mglyph" &&
            t !== "malignmark" &&
            (n = 0);
      else
        e &&
          n === 1 &&
          (e.tag === "foreignObject" ||
            e.tag === "desc" ||
            e.tag === "title") &&
          (n = 0);
      if (n === 0) {
        if (t === "svg") return 1;
        if (t === "math") return 2;
      }
      return n;
    },
  },
  cg = (t) => {
    t.type === 1 &&
      t.props.forEach((e, s) => {
        e.type === 6 &&
          e.name === "style" &&
          e.value &&
          (t.props[s] = {
            type: 7,
            name: "bind",
            arg: Q("style", !0, e.loc),
            exp: hg(e.value.content, e.loc),
            modifiers: [],
            loc: e.loc,
          });
      });
  },
  hg = (t, e) => {
    const s = fa(t);
    return Q(JSON.stringify(s), !1, e, 3);
  };
function Gt(t, e) {
  return ye(t, e);
}
const ug = (t, e, s) => {
    const { exp: n, loc: i } = t;
    return (
      n || s.onError(Gt(53, i)),
      e.children.length && (s.onError(Gt(54, i)), (e.children.length = 0)),
      { props: [xe(Q("innerHTML", !0, i), n || Q("", !0))] }
    );
  },
  fg = (t, e, s) => {
    const { exp: n, loc: i } = t;
    return (
      n || s.onError(Gt(55, i)),
      e.children.length && (s.onError(Gt(56, i)), (e.children.length = 0)),
      {
        props: [
          xe(
            Q("textContent", !0),
            n ? (lt(n, s) > 0 ? n : Te(s.helperString(Zi), [n], i)) : Q("", !0)
          ),
        ],
      }
    );
  },
  dg = (t, e, s) => {
    const n = Lh(t, e, s);
    if (!n.props.length || e.tagType === 1) return n;
    t.arg && s.onError(Gt(58, t.arg.loc));
    const { tag: i } = e,
      o = s.isCustomElement(i);
    if (i === "input" || i === "textarea" || i === "select" || o) {
      let r = Mh,
        l = !1;
      if (i === "input" || o) {
        const a = Qi(e, "type");
        if (a) {
          if (a.type === 7) r = Xo;
          else if (a.value)
            switch (a.value.content) {
              case "radio":
                r = Oh;
                break;
              case "checkbox":
                r = Ih;
                break;
              case "file":
                (l = !0), s.onError(Gt(59, t.loc));
                break;
            }
        } else Yp(e) && (r = Xo);
      } else i === "select" && (r = Rh);
      l || (n.needRuntime = s.helper(r));
    } else s.onError(Gt(57, t.loc));
    return (
      (n.props = n.props.filter(
        (r) => !(r.key.type === 4 && r.key.content === "modelValue")
      )),
      n
    );
  },
  pg = nt("passive,once,capture"),
  mg = nt("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),
  gg = nt("left,right"),
  qh = nt("onkeyup,onkeydown,onkeypress", !0),
  yg = (t, e, s, n) => {
    const i = [],
      o = [],
      r = [];
    for (let l = 0; l < e.length; l++) {
      const a = e[l];
      (a === "native" && Tn("COMPILER_V_ON_NATIVE", s)) || pg(a)
        ? r.push(a)
        : gg(a)
        ? Xe(t)
          ? qh(t.content)
            ? i.push(a)
            : o.push(a)
          : (i.push(a), o.push(a))
        : mg(a)
        ? o.push(a)
        : i.push(a);
    }
    return { keyModifiers: i, nonKeyModifiers: o, eventOptionModifiers: r };
  },
  Ql = (t, e) =>
    Xe(t) && t.content.toLowerCase() === "onclick"
      ? Q(e, !0)
      : t.type !== 4
      ? mt(["(", t, `) === "onClick" ? "${e}" : (`, t, ")"])
      : t,
  bg = (t, e, s) =>
    Ph(t, e, s, (n) => {
      const { modifiers: i } = t;
      if (!i.length) return n;
      let { key: o, value: r } = n.props[0];
      const {
        keyModifiers: l,
        nonKeyModifiers: a,
        eventOptionModifiers: c,
      } = yg(o, i, s, t.loc);
      if (
        (a.includes("right") && (o = Ql(o, "onContextmenu")),
        a.includes("middle") && (o = Ql(o, "onMouseup")),
        a.length && (r = Te(s.helper(Fh), [r, JSON.stringify(a)])),
        l.length &&
          (!Xe(o) || qh(o.content)) &&
          (r = Te(s.helper(Dh), [r, JSON.stringify(l)])),
        c.length)
      ) {
        const h = c.map(Es).join("");
        o = Xe(o) ? Q(`${o.content}${h}`, !0) : mt(["(", o, `) + "${h}"`]);
      }
      return { props: [xe(o, r)] };
    }),
  vg = (t, e, s) => {
    const { exp: n, loc: i } = t;
    return n || s.onError(Gt(61, i)), { props: [], needRuntime: s.helper(Bh) };
  },
  _g = (t, e) => {
    t.type === 1 &&
      t.tagType === 0 &&
      (t.tag === "script" || t.tag === "style") &&
      e.removeNode();
  },
  xg = [cg],
  wg = { cloak: rg, html: ug, text: fg, model: dg, on: bg, show: vg };
function Sg(t, e = {}) {
  return og(
    t,
    le({}, ag, e, {
      nodeTransforms: [_g, ...xg, ...(e.nodeTransforms || [])],
      directiveTransforms: le({}, wg, e.directiveTransforms || {}),
      transformHoist: null,
    })
  );
}
/**
 * vue v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const ea = new WeakMap();
function Cg(t) {
  let e = ea.get(t ?? ae);
  return e || ((e = Object.create(null)), ea.set(t ?? ae, e)), e;
}
function Eg(t, e) {
  if (!Z(t))
    if (t.nodeType) t = t.innerHTML;
    else return Ae;
  const s = t,
    n = Cg(e),
    i = n[s];
  if (i) return i;
  if (t[0] === "#") {
    const a = document.querySelector(t);
    t = a ? a.innerHTML : "";
  }
  const o = le({ hoistStatic: !0, onError: void 0, onWarn: Ae }, e);
  !o.isCustomElement &&
    typeof customElements < "u" &&
    (o.isCustomElement = (a) => !!customElements.get(a));
  const { code: r } = Sg(t, o),
    l = new Function("Vue", r)(Ip);
  return (l._rc = !0), (n[s] = l);
}
Nc(Eg);
const Tg = {
    data() {
      return { show_mob_menu: !1 };
    },
    mounted() {},
    methods: {
      showDialog() {
        this.$refs.modal_form.formShow = !0;
      },
      showPopup() {
        this.$refs.popup_wnd.show = !0;
      },
    },
  },
  zh = function () {
    return document.ontouchstart !== null ? "click" : "touchstart";
  },
  $i = "__vue_click_away__",
  jh = function (t, e, s) {
    Uh(t);
    let n = s.context,
      i = e.value,
      o = !1;
    setTimeout(function () {
      o = !0;
    }, 0),
      (t[$i] = function (r) {
        if ((!t || !t.contains(r.target)) && i && o && typeof i == "function")
          return i.call(n, r);
      }),
      document.addEventListener(zh(), t[$i], !1);
  },
  Uh = function (t) {
    document.removeEventListener(zh(), t[$i], !1), delete t[$i];
  },
  kg = function (t, e, s) {
    e.value !== e.oldValue && jh(t, e, s);
  },
  Ag = {
    install: function (t) {
      t.directive("click-away", $g);
    },
  },
  $g = { mounted: jh, updated: kg, unmounted: Uh },
  qs = (t) =>
    typeof t == "object" &&
    t !== null &&
    t.constructor === Object &&
    Object.prototype.toString.call(t) === "[object Object]",
  ze = (...t) => {
    let e = !1;
    typeof t[0] == "boolean" && (e = t.shift());
    let s = t[0];
    if (!s || typeof s != "object")
      throw new Error("extendee must be an object");
    const n = t.slice(1),
      i = n.length;
    for (let o = 0; o < i; o++) {
      const r = n[o];
      for (let l in r)
        if (r.hasOwnProperty(l)) {
          const a = r[l];
          if (e && (Array.isArray(a) || qs(a))) {
            const c = Array.isArray(a) ? [] : {};
            s[l] = ze(!0, s.hasOwnProperty(l) ? s[l] : c, a);
          } else s[l] = a;
        }
    }
    return s;
  },
  Se = (t, e = 1e4) => (
    (t = parseFloat(t) || 0), Math.round((t + Number.EPSILON) * e) / e
  ),
  Ni = function (t) {
    return (
      !!(
        t &&
        typeof t == "object" &&
        t instanceof Element &&
        t !== document.body
      ) &&
      !t.__Panzoom &&
      ((function (e) {
        const s = getComputedStyle(e)["overflow-y"],
          n = getComputedStyle(e)["overflow-x"],
          i =
            (s === "scroll" || s === "auto") &&
            Math.abs(e.scrollHeight - e.clientHeight) > 1,
          o =
            (n === "scroll" || n === "auto") &&
            Math.abs(e.scrollWidth - e.clientWidth) > 1;
        return i || o;
      })(t)
        ? t
        : Ni(t.parentNode))
    );
  },
  Ng =
    (typeof window < "u" && window.ResizeObserver) ||
    class {
      constructor(t) {
        (this.observables = []),
          (this.boundCheck = this.check.bind(this)),
          this.boundCheck(),
          (this.callback = t);
      }
      observe(t) {
        if (this.observables.some((s) => s.el === t)) return;
        const e = {
          el: t,
          size: { height: t.clientHeight, width: t.clientWidth },
        };
        this.observables.push(e);
      }
      unobserve(t) {
        this.observables = this.observables.filter((e) => e.el !== t);
      }
      disconnect() {
        this.observables = [];
      }
      check() {
        const t = this.observables
          .filter((e) => {
            const s = e.el.clientHeight,
              n = e.el.clientWidth;
            if (e.size.height !== s || e.size.width !== n)
              return (e.size.height = s), (e.size.width = n), !0;
          })
          .map((e) => e.el);
        t.length > 0 && this.callback(t),
          window.requestAnimationFrame(this.boundCheck);
      }
    };
class Ls {
  constructor(e) {
    (this.id = self.Touch && e instanceof Touch ? e.identifier : -1),
      (this.pageX = e.pageX),
      (this.pageY = e.pageY),
      (this.clientX = e.clientX),
      (this.clientY = e.clientY);
  }
}
const ta = (t, e) =>
    e
      ? Math.sqrt((e.clientX - t.clientX) ** 2 + (e.clientY - t.clientY) ** 2)
      : 0,
  bo = (t, e) =>
    e
      ? {
          clientX: (t.clientX + e.clientX) / 2,
          clientY: (t.clientY + e.clientY) / 2,
        }
      : t;
class Pg {
  constructor(
    e,
    { start: s = () => !0, move: n = () => {}, end: i = () => {} } = {}
  ) {
    (this._element = e),
      (this.startPointers = []),
      (this.currentPointers = []),
      (this._pointerStart = (o) => {
        if (o.buttons > 0 && o.button !== 0) return;
        const r = new Ls(o);
        this.currentPointers.some((l) => l.id === r.id) ||
          (this._triggerPointerStart(r, o) &&
            (window.addEventListener("mousemove", this._move),
            window.addEventListener("mouseup", this._pointerEnd)));
      }),
      (this._touchStart = (o) => {
        for (const r of Array.from(o.changedTouches || []))
          this._triggerPointerStart(new Ls(r), o);
      }),
      (this._move = (o) => {
        const r = this.currentPointers.slice(),
          l = ((a) => "changedTouches" in a)(o)
            ? Array.from(o.changedTouches).map((a) => new Ls(a))
            : [new Ls(o)];
        for (const a of l) {
          const c = this.currentPointers.findIndex((h) => h.id === a.id);
          c < 0 || (this.currentPointers[c] = a);
        }
        this._moveCallback(r, this.currentPointers.slice(), o);
      }),
      (this._triggerPointerEnd = (o, r) => {
        const l = this.currentPointers.findIndex((a) => a.id === o.id);
        return (
          !(l < 0) &&
          (this.currentPointers.splice(l, 1),
          this.startPointers.splice(l, 1),
          this._endCallback(o, r),
          !0)
        );
      }),
      (this._pointerEnd = (o) => {
        (o.buttons > 0 && o.button !== 0) ||
          (this._triggerPointerEnd(new Ls(o), o) &&
            (window.removeEventListener("mousemove", this._move, {
              passive: !1,
            }),
            window.removeEventListener("mouseup", this._pointerEnd, {
              passive: !1,
            })));
      }),
      (this._touchEnd = (o) => {
        for (const r of Array.from(o.changedTouches || []))
          this._triggerPointerEnd(new Ls(r), o);
      }),
      (this._startCallback = s),
      (this._moveCallback = n),
      (this._endCallback = i),
      this._element.addEventListener("mousedown", this._pointerStart, {
        passive: !1,
      }),
      this._element.addEventListener("touchstart", this._touchStart, {
        passive: !1,
      }),
      this._element.addEventListener("touchmove", this._move, { passive: !1 }),
      this._element.addEventListener("touchend", this._touchEnd),
      this._element.addEventListener("touchcancel", this._touchEnd);
  }
  stop() {
    this._element.removeEventListener("mousedown", this._pointerStart, {
      passive: !1,
    }),
      this._element.removeEventListener("touchstart", this._touchStart, {
        passive: !1,
      }),
      this._element.removeEventListener("touchmove", this._move, {
        passive: !1,
      }),
      this._element.removeEventListener("touchend", this._touchEnd),
      this._element.removeEventListener("touchcancel", this._touchEnd),
      window.removeEventListener("mousemove", this._move),
      window.removeEventListener("mouseup", this._pointerEnd);
  }
  _triggerPointerStart(e, s) {
    return (
      !!this._startCallback(e, s) &&
      (this.currentPointers.push(e), this.startPointers.push(e), !0)
    );
  }
}
class zr {
  constructor(e = {}) {
    (this.options = ze(!0, {}, e)), (this.plugins = []), (this.events = {});
    for (const s of ["on", "once"])
      for (const n of Object.entries(this.options[s] || {})) this[s](...n);
  }
  option(e, s, ...n) {
    e = String(e);
    let i =
      ((o = e),
      (r = this.options),
      o.split(".").reduce(function (l, a) {
        return l && l[a];
      }, r));
    var o, r;
    return (
      typeof i == "function" && (i = i.call(this, this, ...n)),
      i === void 0 ? s : i
    );
  }
  localize(e, s = []) {
    return (e = (e = String(e).replace(/\{\{(\w+).?(\w+)?\}\}/g, (n, i, o) => {
      let r = "";
      o
        ? (r = this.option(`${i[0] + i.toLowerCase().substring(1)}.l10n.${o}`))
        : i && (r = this.option(`l10n.${i}`)),
        r || (r = n);
      for (let l = 0; l < s.length; l++) r = r.split(s[l][0]).join(s[l][1]);
      return r;
    })).replace(/\{\{(.*)\}\}/, (n, i) => i));
  }
  on(e, s) {
    if (qs(e)) {
      for (const n of Object.entries(e)) this.on(...n);
      return this;
    }
    return (
      String(e)
        .split(" ")
        .forEach((n) => {
          const i = (this.events[n] = this.events[n] || []);
          i.indexOf(s) == -1 && i.push(s);
        }),
      this
    );
  }
  once(e, s) {
    if (qs(e)) {
      for (const n of Object.entries(e)) this.once(...n);
      return this;
    }
    return (
      String(e)
        .split(" ")
        .forEach((n) => {
          const i = (...o) => {
            this.off(n, i), s.call(this, this, ...o);
          };
          (i._ = s), this.on(n, i);
        }),
      this
    );
  }
  off(e, s) {
    if (!qs(e))
      return (
        e.split(" ").forEach((n) => {
          const i = this.events[n];
          if (!i || !i.length) return this;
          let o = -1;
          for (let r = 0, l = i.length; r < l; r++) {
            const a = i[r];
            if (a && (a === s || a._ === s)) {
              o = r;
              break;
            }
          }
          o != -1 && i.splice(o, 1);
        }),
        this
      );
    for (const n of Object.entries(e)) this.off(...n);
  }
  trigger(e, ...s) {
    for (const n of [...(this.events[e] || [])].slice())
      if (n && n.call(this, this, ...s) === !1) return !1;
    for (const n of [...(this.events["*"] || [])].slice())
      if (n && n.call(this, e, this, ...s) === !1) return !1;
    return !0;
  }
  attachPlugins(e) {
    const s = {};
    for (const [n, i] of Object.entries(e || {}))
      this.options[n] === !1 ||
        this.plugins[n] ||
        ((this.options[n] = ze({}, i.defaults || {}, this.options[n])),
        (s[n] = new i(this)));
    for (const [n, i] of Object.entries(s)) i.attach(this);
    return (this.plugins = Object.assign({}, this.plugins, s)), this;
  }
  detachPlugins() {
    for (const e in this.plugins) {
      let s;
      (s = this.plugins[e]) && typeof s.detach == "function" && s.detach(this);
    }
    return (this.plugins = {}), this;
  }
}
const Lg = {
  touch: !0,
  zoom: !0,
  pinchToZoom: !0,
  panOnlyZoomed: !1,
  lockAxis: !1,
  friction: 0.64,
  decelFriction: 0.88,
  zoomFriction: 0.74,
  bounceForce: 0.2,
  baseScale: 1,
  minScale: 1,
  maxScale: 2,
  step: 0.5,
  textSelection: !1,
  click: "toggleZoom",
  wheel: "zoom",
  wheelFactor: 42,
  wheelLimit: 5,
  draggableClass: "is-draggable",
  draggingClass: "is-dragging",
  ratio: 1,
};
class Js extends zr {
  constructor(e, s = {}) {
    super(ze(!0, {}, Lg, s)), (this.state = "init"), (this.$container = e);
    for (const n of ["onLoad", "onWheel", "onClick"])
      this[n] = this[n].bind(this);
    this.initLayout(),
      this.resetValues(),
      this.attachPlugins(Js.Plugins),
      this.trigger("init"),
      this.updateMetrics(),
      this.attachEvents(),
      this.trigger("ready"),
      this.option("centerOnStart") === !1
        ? (this.state = "ready")
        : this.panTo({ friction: 0 }),
      (e.__Panzoom = this);
  }
  initLayout() {
    const e = this.$container;
    if (!(e instanceof HTMLElement))
      throw new Error("Panzoom: Container not found");
    const s = this.option("content") || e.querySelector(".panzoom__content");
    if (!s) throw new Error("Panzoom: Content not found");
    this.$content = s;
    let n = this.option("viewport") || e.querySelector(".panzoom__viewport");
    n ||
      this.option("wrapInner") === !1 ||
      ((n = document.createElement("div")),
      n.classList.add("panzoom__viewport"),
      n.append(...e.childNodes),
      e.appendChild(n)),
      (this.$viewport = n || s.parentNode);
  }
  resetValues() {
    (this.updateRate = this.option(
      "updateRate",
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 250 : 24
    )),
      (this.container = { width: 0, height: 0 }),
      (this.viewport = { width: 0, height: 0 }),
      (this.content = {
        origWidth: 0,
        origHeight: 0,
        width: 0,
        height: 0,
        x: this.option("x", 0),
        y: this.option("y", 0),
        scale: this.option("baseScale"),
      }),
      (this.transform = { x: 0, y: 0, scale: 1 }),
      this.resetDragPosition();
  }
  onLoad(e) {
    this.updateMetrics(),
      this.panTo({ scale: this.option("baseScale"), friction: 0 }),
      this.trigger("load", e);
  }
  onClick(e) {
    if (
      e.defaultPrevented ||
      (document.activeElement &&
        document.activeElement.closest("[contenteditable]"))
    )
      return;
    if (
      this.option("textSelection") &&
      window.getSelection().toString().length &&
      (!e.target || !e.target.hasAttribute("data-fancybox-close"))
    )
      return void e.stopPropagation();
    const s = this.$content.getClientRects()[0];
    if (
      this.state !== "ready" &&
      (this.dragPosition.midPoint ||
        Math.abs(s.top - this.dragStart.rect.top) > 1 ||
        Math.abs(s.left - this.dragStart.rect.left) > 1)
    )
      return e.preventDefault(), void e.stopPropagation();
    this.trigger("click", e) !== !1 &&
      this.option("zoom") &&
      this.option("click") === "toggleZoom" &&
      (e.preventDefault(), e.stopPropagation(), this.zoomWithClick(e));
  }
  onWheel(e) {
    this.trigger("wheel", e) !== !1 &&
      this.option("zoom") &&
      this.option("wheel") &&
      this.zoomWithWheel(e);
  }
  zoomWithWheel(e) {
    this.changedDelta === void 0 && (this.changedDelta = 0);
    const s = Math.max(
        -1,
        Math.min(1, -e.deltaY || -e.deltaX || e.wheelDelta || -e.detail)
      ),
      n = this.content.scale;
    let i = (n * (100 + s * this.option("wheelFactor"))) / 100;
    if (
      ((s < 0 && Math.abs(n - this.option("minScale")) < 0.01) ||
      (s > 0 && Math.abs(n - this.option("maxScale")) < 0.01)
        ? ((this.changedDelta += Math.abs(s)), (i = n))
        : ((this.changedDelta = 0),
          (i = Math.max(
            Math.min(i, this.option("maxScale")),
            this.option("minScale")
          ))),
      this.changedDelta > this.option("wheelLimit") ||
        (e.preventDefault(), i === n))
    )
      return;
    const o = this.$content.getBoundingClientRect(),
      r = e.clientX - o.left,
      l = e.clientY - o.top;
    this.zoomTo(i, { x: r, y: l });
  }
  zoomWithClick(e) {
    const s = this.$content.getClientRects()[0],
      n = e.clientX - s.left,
      i = e.clientY - s.top;
    this.toggleZoom({ x: n, y: i });
  }
  attachEvents() {
    this.$content.addEventListener("load", this.onLoad),
      this.$container.addEventListener("wheel", this.onWheel, { passive: !1 }),
      this.$container.addEventListener("click", this.onClick, { passive: !1 }),
      this.initObserver();
    const e = new Pg(this.$container, {
      start: (s, n) => {
        if (!this.option("touch") || this.velocity.scale < 0) return !1;
        const i = n.composedPath()[0];
        return !e.currentPointers.length &&
          (["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(
            i.nodeName
          ) !== -1 ||
            (this.option("textSelection") &&
              ((o, r, l) => {
                const a = o.childNodes,
                  c = document.createRange();
                for (let h = 0; h < a.length; h++) {
                  const u = a[h];
                  if (u.nodeType !== Node.TEXT_NODE) continue;
                  c.selectNodeContents(u);
                  const f = c.getBoundingClientRect();
                  if (
                    r >= f.left &&
                    l >= f.top &&
                    r <= f.right &&
                    l <= f.bottom
                  )
                    return u;
                }
                return !1;
              })(i, s.clientX, s.clientY)))
          ? !1
          : !Ni(i) &&
              this.trigger("touchStart", n) !== !1 &&
              (n.type === "mousedown" && n.preventDefault(),
              (this.state = "pointerdown"),
              this.resetDragPosition(),
              (this.dragPosition.midPoint = null),
              (this.dragPosition.time = Date.now()),
              !0);
      },
      move: (s, n, i) => {
        if (this.state !== "pointerdown") return;
        if (this.trigger("touchMove", i) === !1) return void i.preventDefault();
        if (
          (n.length < 2 &&
            this.option("panOnlyZoomed") === !0 &&
            this.content.width <= this.viewport.width &&
            this.content.height <= this.viewport.height &&
            this.transform.scale <= this.option("baseScale")) ||
          (n.length > 1 &&
            (!this.option("zoom") || this.option("pinchToZoom") === !1))
        )
          return;
        const o = bo(s[0], s[1]),
          r = bo(n[0], n[1]),
          l = r.clientX - o.clientX,
          a = r.clientY - o.clientY,
          c = ta(s[0], s[1]),
          h = ta(n[0], n[1]),
          u = c && h ? h / c : 1;
        (this.dragOffset.x += l),
          (this.dragOffset.y += a),
          (this.dragOffset.scale *= u),
          (this.dragOffset.time = Date.now() - this.dragPosition.time);
        const f = this.dragStart.scale === 1 && this.option("lockAxis");
        if (f && !this.lockAxis) {
          if (
            Math.abs(this.dragOffset.x) < 6 &&
            Math.abs(this.dragOffset.y) < 6
          )
            return void i.preventDefault();
          const d = Math.abs(
            (180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI
          );
          this.lockAxis = d > 45 && d < 135 ? "y" : "x";
        }
        if (f === "xy" || this.lockAxis !== "y") {
          if (
            (i.preventDefault(),
            i.stopPropagation(),
            i.stopImmediatePropagation(),
            this.lockAxis &&
              (this.dragOffset[this.lockAxis === "x" ? "y" : "x"] = 0),
            this.$container.classList.add(this.option("draggingClass")),
            (this.transform.scale === this.option("baseScale") &&
              this.lockAxis === "y") ||
              (this.dragPosition.x = this.dragStart.x + this.dragOffset.x),
            (this.transform.scale === this.option("baseScale") &&
              this.lockAxis === "x") ||
              (this.dragPosition.y = this.dragStart.y + this.dragOffset.y),
            (this.dragPosition.scale =
              this.dragStart.scale * this.dragOffset.scale),
            n.length > 1)
          ) {
            const d = bo(e.startPointers[0], e.startPointers[1]),
              m = d.clientX - this.dragStart.rect.x,
              w = d.clientY - this.dragStart.rect.y,
              { deltaX: $, deltaY: O } = this.getZoomDelta(
                this.content.scale * this.dragOffset.scale,
                m,
                w
              );
            (this.dragPosition.x -= $),
              (this.dragPosition.y -= O),
              (this.dragPosition.midPoint = r);
          } else this.setDragResistance();
          (this.transform = {
            x: this.dragPosition.x,
            y: this.dragPosition.y,
            scale: this.dragPosition.scale,
          }),
            this.startAnimation();
        }
      },
      end: (s, n) => {
        if (this.state !== "pointerdown") return;
        if (
          ((this._dragOffset = { ...this.dragOffset }),
          e.currentPointers.length)
        )
          return void this.resetDragPosition();
        if (
          ((this.state = "decel"),
          (this.friction = this.option("decelFriction")),
          this.recalculateTransform(),
          this.$container.classList.remove(this.option("draggingClass")),
          this.trigger("touchEnd", n) === !1 || this.state !== "decel")
        )
          return;
        const i = this.option("minScale");
        if (this.transform.scale < i)
          return void this.zoomTo(i, { friction: 0.64 });
        const o = this.option("maxScale");
        if (this.transform.scale - o > 0.01) {
          const r = this.dragPosition.midPoint || s,
            l = this.$content.getClientRects()[0];
          this.zoomTo(o, {
            friction: 0.64,
            x: r.clientX - l.left,
            y: r.clientY - l.top,
          });
        }
      },
    });
    this.pointerTracker = e;
  }
  initObserver() {
    this.resizeObserver ||
      ((this.resizeObserver = new Ng(() => {
        this.updateTimer ||
          (this.updateTimer = setTimeout(() => {
            const e = this.$container.getBoundingClientRect();
            e.width && e.height
              ? ((Math.abs(e.width - this.container.width) > 1 ||
                  Math.abs(e.height - this.container.height) > 1) &&
                  (this.isAnimating() && this.endAnimation(!0),
                  this.updateMetrics(),
                  this.panTo({
                    x: this.content.x,
                    y: this.content.y,
                    scale: this.option("baseScale"),
                    friction: 0,
                  })),
                (this.updateTimer = null))
              : (this.updateTimer = null);
          }, this.updateRate));
      })),
      this.resizeObserver.observe(this.$container));
  }
  resetDragPosition() {
    (this.lockAxis = null),
      (this.friction = this.option("friction")),
      (this.velocity = { x: 0, y: 0, scale: 0 });
    const { x: e, y: s, scale: n } = this.content;
    (this.dragStart = {
      rect: this.$content.getBoundingClientRect(),
      x: e,
      y: s,
      scale: n,
    }),
      (this.dragPosition = { ...this.dragPosition, x: e, y: s, scale: n }),
      (this.dragOffset = { x: 0, y: 0, scale: 1, time: 0 });
  }
  updateMetrics(e) {
    e !== !0 && this.trigger("beforeUpdate");
    const s = this.$container,
      n = this.$content,
      i = this.$viewport,
      o = n instanceof HTMLImageElement,
      r = this.option("zoom"),
      l = this.option("resizeParent", r);
    let a = this.option("width"),
      c = this.option("height"),
      h =
        a ||
        ((u = n),
        Math.max(
          parseFloat(u.naturalWidth || 0),
          parseFloat(
            (u.width && u.width.baseVal && u.width.baseVal.value) || 0
          ),
          parseFloat(u.offsetWidth || 0),
          parseFloat(u.scrollWidth || 0)
        ));
    var u;
    let f =
      c ||
      ((_) =>
        Math.max(
          parseFloat(_.naturalHeight || 0),
          parseFloat(
            (_.height && _.height.baseVal && _.height.baseVal.value) || 0
          ),
          parseFloat(_.offsetHeight || 0),
          parseFloat(_.scrollHeight || 0)
        ))(n);
    Object.assign(n.style, {
      width: a ? `${a}px` : "",
      height: c ? `${c}px` : "",
      maxWidth: "",
      maxHeight: "",
    }),
      l && Object.assign(i.style, { width: "", height: "" });
    const d = this.option("ratio");
    (h = Se(h * d)), (f = Se(f * d)), (a = h), (c = f);
    const m = n.getBoundingClientRect(),
      w = i.getBoundingClientRect(),
      $ = i == s ? w : s.getBoundingClientRect();
    let O = Math.max(i.offsetWidth, Se(w.width)),
      T = Math.max(i.offsetHeight, Se(w.height)),
      y = window.getComputedStyle(i);
    if (
      ((O -= parseFloat(y.paddingLeft) + parseFloat(y.paddingRight)),
      (T -= parseFloat(y.paddingTop) + parseFloat(y.paddingBottom)),
      (this.viewport.width = O),
      (this.viewport.height = T),
      r)
    ) {
      if (Math.abs(h - m.width) > 0.1 || Math.abs(f - m.height) > 0.1) {
        const _ = ((S, k, M, v) => {
          const E = Math.min(M / S || 0, v / k);
          return { width: S * E || 0, height: k * E || 0 };
        })(h, f, Math.min(h, m.width), Math.min(f, m.height));
        (a = Se(_.width)), (c = Se(_.height));
      }
      Object.assign(n.style, {
        width: `${a}px`,
        height: `${c}px`,
        transform: "",
      });
    }
    if (
      (l &&
        (Object.assign(i.style, { width: `${a}px`, height: `${c}px` }),
        (this.viewport = { ...this.viewport, width: a, height: c })),
      o && r && typeof this.options.maxScale != "function")
    ) {
      const _ = this.option("maxScale");
      this.options.maxScale = function () {
        return this.content.origWidth > 0 && this.content.fitWidth > 0
          ? this.content.origWidth / this.content.fitWidth
          : _;
      };
    }
    (this.content = {
      ...this.content,
      origWidth: h,
      origHeight: f,
      fitWidth: a,
      fitHeight: c,
      width: a,
      height: c,
      scale: 1,
      isZoomable: r,
    }),
      (this.container = { width: $.width, height: $.height }),
      e !== !0 && this.trigger("afterUpdate");
  }
  zoomIn(e) {
    this.zoomTo(this.content.scale + (e || this.option("step")));
  }
  zoomOut(e) {
    this.zoomTo(this.content.scale - (e || this.option("step")));
  }
  toggleZoom(e = {}) {
    const s = this.option("maxScale"),
      n = this.option("baseScale"),
      i = this.content.scale > n + 0.5 * (s - n) ? n : s;
    this.zoomTo(i, e);
  }
  zoomTo(e = this.option("baseScale"), { x: s = null, y: n = null } = {}) {
    e = Math.max(Math.min(e, this.option("maxScale")), this.option("minScale"));
    const i = Se(
      this.content.scale / (this.content.width / this.content.fitWidth),
      1e7
    );
    s === null && (s = this.content.width * i * 0.5),
      n === null && (n = this.content.height * i * 0.5);
    const { deltaX: o, deltaY: r } = this.getZoomDelta(e, s, n);
    (s = this.content.x - o),
      (n = this.content.y - r),
      this.panTo({
        x: s,
        y: n,
        scale: e,
        friction: this.option("zoomFriction"),
      });
  }
  getZoomDelta(e, s = 0, n = 0) {
    const i = this.content.fitWidth * this.content.scale,
      o = this.content.fitHeight * this.content.scale,
      r = s > 0 && i ? s / i : 0,
      l = n > 0 && o ? n / o : 0;
    return {
      deltaX: (this.content.fitWidth * e - i) * r,
      deltaY: (this.content.fitHeight * e - o) * l,
    };
  }
  panTo({
    x: e = this.content.x,
    y: s = this.content.y,
    scale: n,
    friction: i = this.option("friction"),
    ignoreBounds: o = !1,
  } = {}) {
    if (((n = n || this.content.scale || 1), !o)) {
      const { boundX: r, boundY: l } = this.getBounds(n);
      r && (e = Math.max(Math.min(e, r.to), r.from)),
        l && (s = Math.max(Math.min(s, l.to), l.from));
    }
    (this.friction = i),
      (this.transform = { ...this.transform, x: e, y: s, scale: n }),
      i
        ? ((this.state = "panning"),
          (this.velocity = {
            x: (1 / this.friction - 1) * (e - this.content.x),
            y: (1 / this.friction - 1) * (s - this.content.y),
            scale: (1 / this.friction - 1) * (n - this.content.scale),
          }),
          this.startAnimation())
        : this.endAnimation();
  }
  startAnimation() {
    this.rAF ? cancelAnimationFrame(this.rAF) : this.trigger("startAnimation"),
      (this.rAF = requestAnimationFrame(() => this.animate()));
  }
  animate() {
    if (
      (this.setEdgeForce(),
      this.setDragForce(),
      (this.velocity.x *= this.friction),
      (this.velocity.y *= this.friction),
      (this.velocity.scale *= this.friction),
      (this.content.x += this.velocity.x),
      (this.content.y += this.velocity.y),
      (this.content.scale += this.velocity.scale),
      this.isAnimating())
    )
      this.setTransform();
    else if (this.state !== "pointerdown") return void this.endAnimation();
    this.rAF = requestAnimationFrame(() => this.animate());
  }
  getBounds(e) {
    let s = this.boundX,
      n = this.boundY;
    if (s !== void 0 && n !== void 0) return { boundX: s, boundY: n };
    (s = { from: 0, to: 0 }),
      (n = { from: 0, to: 0 }),
      (e = e || this.transform.scale);
    const i = this.content.fitWidth * e,
      o = this.content.fitHeight * e,
      r = this.viewport.width,
      l = this.viewport.height;
    if (i < r) {
      const a = Se(0.5 * (r - i));
      (s.from = a), (s.to = a);
    } else s.from = Se(r - i);
    if (o < l) {
      const a = 0.5 * (l - o);
      (n.from = a), (n.to = a);
    } else n.from = Se(l - o);
    return { boundX: s, boundY: n };
  }
  setEdgeForce() {
    if (this.state !== "decel") return;
    const e = this.option("bounceForce"),
      { boundX: s, boundY: n } = this.getBounds(
        Math.max(this.transform.scale, this.content.scale)
      );
    let i, o, r, l;
    if (
      (s && ((i = this.content.x < s.from), (o = this.content.x > s.to)),
      n && ((r = this.content.y < n.from), (l = this.content.y > n.to)),
      i || o)
    ) {
      let a = ((i ? s.from : s.to) - this.content.x) * e;
      const c = this.content.x + (this.velocity.x + a) / this.friction;
      c >= s.from && c <= s.to && (a += this.velocity.x),
        (this.velocity.x = a),
        this.recalculateTransform();
    }
    if (r || l) {
      let a = ((r ? n.from : n.to) - this.content.y) * e;
      const c = this.content.y + (a + this.velocity.y) / this.friction;
      c >= n.from && c <= n.to && (a += this.velocity.y),
        (this.velocity.y = a),
        this.recalculateTransform();
    }
  }
  setDragResistance() {
    if (this.state !== "pointerdown") return;
    const { boundX: e, boundY: s } = this.getBounds(this.dragPosition.scale);
    let n, i, o, r;
    if (
      (e &&
        ((n = this.dragPosition.x < e.from), (i = this.dragPosition.x > e.to)),
      s &&
        ((o = this.dragPosition.y < s.from), (r = this.dragPosition.y > s.to)),
      (n || i) && (!n || !i))
    ) {
      const l = n ? e.from : e.to,
        a = l - this.dragPosition.x;
      this.dragPosition.x = l - 0.3 * a;
    }
    if ((o || r) && (!o || !r)) {
      const l = o ? s.from : s.to,
        a = l - this.dragPosition.y;
      this.dragPosition.y = l - 0.3 * a;
    }
  }
  setDragForce() {
    this.state === "pointerdown" &&
      ((this.velocity.x = this.dragPosition.x - this.content.x),
      (this.velocity.y = this.dragPosition.y - this.content.y),
      (this.velocity.scale = this.dragPosition.scale - this.content.scale));
  }
  recalculateTransform() {
    (this.transform.x =
      this.content.x + this.velocity.x / (1 / this.friction - 1)),
      (this.transform.y =
        this.content.y + this.velocity.y / (1 / this.friction - 1)),
      (this.transform.scale =
        this.content.scale + this.velocity.scale / (1 / this.friction - 1));
  }
  isAnimating() {
    return !(
      !this.friction ||
      !(
        Math.abs(this.velocity.x) > 0.05 ||
        Math.abs(this.velocity.y) > 0.05 ||
        Math.abs(this.velocity.scale) > 0.05
      )
    );
  }
  setTransform(e) {
    let s, n, i;
    if (
      (e
        ? ((s = Se(this.transform.x)),
          (n = Se(this.transform.y)),
          (i = this.transform.scale),
          (this.content = { ...this.content, x: s, y: n, scale: i }))
        : ((s = Se(this.content.x)),
          (n = Se(this.content.y)),
          (i =
            this.content.scale / (this.content.width / this.content.fitWidth)),
          (this.content = { ...this.content, x: s, y: n })),
      this.trigger("beforeTransform"),
      (s = Se(this.content.x)),
      (n = Se(this.content.y)),
      e && this.option("zoom"))
    ) {
      let o, r;
      (o = Se(this.content.fitWidth * i)),
        (r = Se(this.content.fitHeight * i)),
        (this.content.width = o),
        (this.content.height = r),
        (this.transform = { ...this.transform, width: o, height: r, scale: i }),
        Object.assign(this.$content.style, {
          width: `${o}px`,
          height: `${r}px`,
          maxWidth: "none",
          maxHeight: "none",
          transform: `translate3d(${s}px, ${n}px, 0) scale(1)`,
        });
    } else
      this.$content.style.transform = `translate3d(${s}px, ${n}px, 0) scale(${i})`;
    this.trigger("afterTransform");
  }
  endAnimation(e) {
    cancelAnimationFrame(this.rAF),
      (this.rAF = null),
      (this.velocity = { x: 0, y: 0, scale: 0 }),
      this.setTransform(!0),
      (this.state = "ready"),
      this.handleCursor(),
      e !== !0 && this.trigger("endAnimation");
  }
  handleCursor() {
    const e = this.option("draggableClass");
    e &&
      this.option("touch") &&
      (this.option("panOnlyZoomed") == 1 &&
      this.content.width <= this.viewport.width &&
      this.content.height <= this.viewport.height &&
      this.transform.scale <= this.option("baseScale")
        ? this.$container.classList.remove(e)
        : this.$container.classList.add(e));
  }
  detachEvents() {
    this.$content.removeEventListener("load", this.onLoad),
      this.$container.removeEventListener("wheel", this.onWheel, {
        passive: !1,
      }),
      this.$container.removeEventListener("click", this.onClick, {
        passive: !1,
      }),
      this.pointerTracker &&
        (this.pointerTracker.stop(), (this.pointerTracker = null)),
      this.resizeObserver &&
        (this.resizeObserver.disconnect(), (this.resizeObserver = null));
  }
  destroy() {
    this.state !== "destroy" &&
      ((this.state = "destroy"),
      clearTimeout(this.updateTimer),
      (this.updateTimer = null),
      cancelAnimationFrame(this.rAF),
      (this.rAF = null),
      this.detachEvents(),
      this.detachPlugins(),
      this.resetDragPosition());
  }
}
(Js.version = "4.0.31"), (Js.Plugins = {});
const sa = (t, e) => {
  let s = 0;
  return function (...n) {
    const i = new Date().getTime();
    if (!(i - s < e)) return (s = i), t(...n);
  };
};
class Wh {
  constructor(e) {
    (this.$container = null),
      (this.$prev = null),
      (this.$next = null),
      (this.carousel = e),
      (this.onRefresh = this.onRefresh.bind(this));
  }
  option(e) {
    return this.carousel.option(`Navigation.${e}`);
  }
  createButton(e) {
    const s = document.createElement("button");
    s.setAttribute("title", this.carousel.localize(`{{${e.toUpperCase()}}}`));
    const n =
      this.option("classNames.button") + " " + this.option(`classNames.${e}`);
    return (
      s.classList.add(...n.split(" ")),
      s.setAttribute("tabindex", "0"),
      (s.innerHTML = this.carousel.localize(this.option(`${e}Tpl`))),
      s.addEventListener("click", (i) => {
        i.preventDefault(),
          i.stopPropagation(),
          this.carousel["slide" + (e === "next" ? "Next" : "Prev")]();
      }),
      s
    );
  }
  build() {
    this.$container ||
      ((this.$container = document.createElement("div")),
      this.$container.classList.add(
        ...this.option("classNames.main").split(" ")
      ),
      this.carousel.$container.appendChild(this.$container)),
      this.$next ||
        ((this.$next = this.createButton("next")),
        this.$container.appendChild(this.$next)),
      this.$prev ||
        ((this.$prev = this.createButton("prev")),
        this.$container.appendChild(this.$prev));
  }
  onRefresh() {
    const e = this.carousel.pages.length;
    e <= 1 ||
    (e > 1 &&
      this.carousel.elemDimWidth < this.carousel.wrapDimWidth &&
      !Number.isInteger(this.carousel.option("slidesPerPage")))
      ? this.cleanup()
      : (this.build(),
        this.$prev.removeAttribute("disabled"),
        this.$next.removeAttribute("disabled"),
        this.carousel.option("infiniteX", this.carousel.option("infinite")) ||
          (this.carousel.page <= 0 && this.$prev.setAttribute("disabled", ""),
          this.carousel.page >= e - 1 &&
            this.$next.setAttribute("disabled", "")));
  }
  cleanup() {
    this.$prev && this.$prev.remove(),
      (this.$prev = null),
      this.$next && this.$next.remove(),
      (this.$next = null),
      this.$container && this.$container.remove(),
      (this.$container = null);
  }
  attach() {
    this.carousel.on("refresh change", this.onRefresh);
  }
  detach() {
    this.carousel.off("refresh change", this.onRefresh), this.cleanup();
  }
}
Wh.defaults = {
  prevTpl:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
  nextTpl:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
  classNames: {
    main: "carousel__nav",
    button: "carousel__button",
    next: "is-next",
    prev: "is-prev",
  },
};
class Kh {
  constructor(e) {
    (this.carousel = e),
      (this.selectedIndex = null),
      (this.friction = 0),
      (this.onNavReady = this.onNavReady.bind(this)),
      (this.onNavClick = this.onNavClick.bind(this)),
      (this.onNavCreateSlide = this.onNavCreateSlide.bind(this)),
      (this.onTargetChange = this.onTargetChange.bind(this));
  }
  addAsTargetFor(e) {
    (this.target = this.carousel), (this.nav = e), this.attachEvents();
  }
  addAsNavFor(e) {
    (this.target = e), (this.nav = this.carousel), this.attachEvents();
  }
  attachEvents() {
    (this.nav.options.initialSlide = this.target.options.initialPage),
      this.nav.on("ready", this.onNavReady),
      this.nav.on("createSlide", this.onNavCreateSlide),
      this.nav.on("Panzoom.click", this.onNavClick),
      this.target.on("change", this.onTargetChange),
      this.target.on("Panzoom.afterUpdate", this.onTargetChange);
  }
  onNavReady() {
    this.onTargetChange(!0);
  }
  onNavClick(e, s, n) {
    const i = n.target.closest(".carousel__slide");
    if (!i) return;
    n.stopPropagation();
    const o = parseInt(i.dataset.index, 10),
      r = this.target.findPageForSlide(o);
    this.target.page !== r &&
      this.target.slideTo(r, { friction: this.friction }),
      this.markSelectedSlide(o);
  }
  onNavCreateSlide(e, s) {
    s.index === this.selectedIndex && this.markSelectedSlide(s.index);
  }
  onTargetChange() {
    const e = this.target.pages[this.target.page].indexes[0],
      s = this.nav.findPageForSlide(e);
    this.nav.slideTo(s), this.markSelectedSlide(e);
  }
  markSelectedSlide(e) {
    (this.selectedIndex = e),
      [...this.nav.slides].filter(
        (n) => n.$el && n.$el.classList.remove("is-nav-selected")
      );
    const s = this.nav.slides[e];
    s && s.$el && s.$el.classList.add("is-nav-selected");
  }
  attach(e) {
    const s = e.options.Sync;
    (s.target || s.nav) &&
      (s.target
        ? this.addAsNavFor(s.target)
        : s.nav && this.addAsTargetFor(s.nav),
      (this.friction = s.friction));
  }
  detach() {
    this.nav &&
      (this.nav.off("ready", this.onNavReady),
      this.nav.off("Panzoom.click", this.onNavClick),
      this.nav.off("createSlide", this.onNavCreateSlide)),
      this.target &&
        (this.target.off("Panzoom.afterUpdate", this.onTargetChange),
        this.target.off("change", this.onTargetChange));
  }
}
Kh.defaults = { friction: 0.92 };
const Og = {
    Navigation: Wh,
    Dots: class {
      constructor(t) {
        (this.carousel = t),
          (this.$list = null),
          (this.events = {
            change: this.onChange.bind(this),
            refresh: this.onRefresh.bind(this),
          });
      }
      buildList() {
        if (
          this.carousel.pages.length <
          this.carousel.option("Dots.minSlideCount")
        )
          return;
        const t = document.createElement("ol");
        return (
          t.classList.add("carousel__dots"),
          t.addEventListener("click", (e) => {
            if (!("page" in e.target.dataset)) return;
            e.preventDefault(), e.stopPropagation();
            const s = parseInt(e.target.dataset.page, 10),
              n = this.carousel;
            s !== n.page &&
              (n.pages.length < 3 && n.option("infinite")
                ? n[s == 0 ? "slidePrev" : "slideNext"]()
                : n.slideTo(s));
          }),
          (this.$list = t),
          this.carousel.$container.appendChild(t),
          this.carousel.$container.classList.add("has-dots"),
          t
        );
      }
      removeList() {
        this.$list &&
          (this.$list.parentNode.removeChild(this.$list), (this.$list = null)),
          this.carousel.$container.classList.remove("has-dots");
      }
      rebuildDots() {
        let t = this.$list;
        const e = !!t,
          s = this.carousel.pages.length;
        if (s < 2) return void (e && this.removeList());
        e || (t = this.buildList());
        const n = this.$list.children.length;
        if (n > s)
          for (let i = s; i < n; i++)
            this.$list.removeChild(this.$list.lastChild);
        else {
          for (let i = n; i < s; i++) {
            const o = document.createElement("li");
            o.classList.add("carousel__dot"),
              (o.dataset.page = i),
              o.setAttribute("role", "button"),
              o.setAttribute("tabindex", "0"),
              o.setAttribute(
                "title",
                this.carousel.localize("{{GOTO}}", [["%d", i + 1]])
              ),
              o.addEventListener("keydown", (r) => {
                const l = r.code;
                let a;
                l === "Enter" || l === "NumpadEnter"
                  ? (a = o)
                  : l === "ArrowRight"
                  ? (a = o.nextSibling)
                  : l === "ArrowLeft" && (a = o.previousSibling),
                  a && a.click();
              }),
              this.$list.appendChild(o);
          }
          this.setActiveDot();
        }
      }
      setActiveDot() {
        if (!this.$list) return;
        this.$list.childNodes.forEach((e) => {
          e.classList.remove("is-selected");
        });
        const t = this.$list.childNodes[this.carousel.page];
        t && t.classList.add("is-selected");
      }
      onChange() {
        this.setActiveDot();
      }
      onRefresh() {
        this.rebuildDots();
      }
      attach() {
        this.carousel.on(this.events);
      }
      detach() {
        this.removeList(),
          this.carousel.off(this.events),
          (this.carousel = null);
      }
    },
    Sync: Kh,
  },
  Ig = {
    slides: [],
    preload: 0,
    slidesPerPage: "auto",
    initialPage: null,
    initialSlide: null,
    friction: 0.92,
    center: !0,
    infinite: !0,
    fill: !0,
    dragFree: !1,
    prefix: "",
    classNames: {
      viewport: "carousel__viewport",
      track: "carousel__track",
      slide: "carousel__slide",
      slideSelected: "is-selected",
    },
    l10n: {
      NEXT: "Next slide",
      PREV: "Previous slide",
      GOTO: "Go to slide #%d",
    },
  };
class es extends zr {
  constructor(e, s = {}) {
    if (
      (super((s = ze(!0, {}, Ig, s))),
      (this.state = "init"),
      (this.$container = e),
      !(this.$container instanceof HTMLElement))
    )
      throw new Error("No root element provided");
    (this.slideNext = sa(this.slideNext.bind(this), 250)),
      (this.slidePrev = sa(this.slidePrev.bind(this), 250)),
      this.init(),
      (e.__Carousel = this);
  }
  init() {
    (this.pages = []),
      (this.page = this.pageIndex = null),
      (this.prevPage = this.prevPageIndex = null),
      this.attachPlugins(es.Plugins),
      this.trigger("init"),
      this.initLayout(),
      this.initSlides(),
      this.updateMetrics(),
      this.$track &&
        this.pages.length &&
        (this.$track.style.transform = `translate3d(${
          -1 * this.pages[this.page].left
        }px, 0px, 0) scale(1)`),
      this.manageSlideVisiblity(),
      this.initPanzoom(),
      (this.state = "ready"),
      this.trigger("ready");
  }
  initLayout() {
    const e = this.option("prefix"),
      s = this.option("classNames");
    (this.$viewport =
      this.option("viewport") ||
      this.$container.querySelector(`.${e}${s.viewport}`)),
      this.$viewport ||
        ((this.$viewport = document.createElement("div")),
        this.$viewport.classList.add(...(e + s.viewport).split(" ")),
        this.$viewport.append(...this.$container.childNodes),
        this.$container.appendChild(this.$viewport)),
      (this.$track =
        this.option("track") ||
        this.$container.querySelector(`.${e}${s.track}`)),
      this.$track ||
        ((this.$track = document.createElement("div")),
        this.$track.classList.add(...(e + s.track).split(" ")),
        this.$track.append(...this.$viewport.childNodes),
        this.$viewport.appendChild(this.$track));
  }
  initSlides() {
    (this.slides = []),
      this.$viewport
        .querySelectorAll(
          `.${this.option("prefix")}${this.option("classNames.slide")}`
        )
        .forEach((e) => {
          const s = { $el: e, isDom: !0 };
          this.slides.push(s),
            this.trigger("createSlide", s, this.slides.length);
        }),
      Array.isArray(this.options.slides) &&
        (this.slides = ze(!0, [...this.slides], this.options.slides));
  }
  updateMetrics() {
    let e,
      s = 0,
      n = [];
    this.slides.forEach((d, m) => {
      const w = d.$el,
        $ = d.isDom || !e ? this.getSlideMetrics(w) : e;
      (d.index = m), (d.width = $), (d.left = s), (e = $), (s += $), n.push(m);
    });
    let i = Math.max(
        this.$track.offsetWidth,
        Se(this.$track.getBoundingClientRect().width)
      ),
      o = getComputedStyle(this.$track);
    (i -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight)),
      (this.contentWidth = s),
      (this.viewportWidth = i);
    const r = [],
      l = this.option("slidesPerPage");
    if (Number.isInteger(l) && s > i)
      for (let d = 0; d < this.slides.length; d += l)
        r.push({
          indexes: n.slice(d, d + l),
          slides: this.slides.slice(d, d + l),
        });
    else {
      let d = 0,
        m = 0;
      for (let w = 0; w < this.slides.length; w += 1) {
        let $ = this.slides[w];
        (!r.length || m + $.width > i) &&
          (r.push({ indexes: [], slides: [] }), (d = r.length - 1), (m = 0)),
          (m += $.width),
          r[d].indexes.push(w),
          r[d].slides.push($);
      }
    }
    const a = this.option("center"),
      c = this.option("fill");
    r.forEach((d, m) => {
      (d.index = m),
        (d.width = d.slides.reduce((w, $) => w + $.width, 0)),
        (d.left = d.slides[0].left),
        a && (d.left += 0.5 * (i - d.width) * -1),
        c &&
          !this.option("infiniteX", this.option("infinite")) &&
          s > i &&
          ((d.left = Math.max(d.left, 0)), (d.left = Math.min(d.left, s - i)));
    });
    const h = [];
    let u;
    r.forEach((d) => {
      const m = { ...d };
      u && m.left === u.left
        ? ((u.width += m.width),
          (u.slides = [...u.slides, ...m.slides]),
          (u.indexes = [...u.indexes, ...m.indexes]))
        : ((m.index = h.length), (u = m), h.push(m));
    }),
      (this.pages = h);
    let f = this.page;
    if (f === null) {
      const d = this.option("initialSlide");
      (f =
        d !== null
          ? this.findPageForSlide(d)
          : parseInt(this.option("initialPage", 0), 10) || 0),
        h[f] || (f = h.length && f > h.length ? h[h.length - 1].index : 0),
        (this.page = f),
        (this.pageIndex = f);
    }
    this.updatePanzoom(), this.trigger("refresh");
  }
  getSlideMetrics(e) {
    if (!e) {
      const i = this.slides[0];
      ((e = document.createElement("div")).dataset.isTestEl = 1),
        (e.style.visibility = "hidden"),
        e.classList.add(
          ...(this.option("prefix") + this.option("classNames.slide")).split(
            " "
          )
        ),
        i.customClass && e.classList.add(...i.customClass.split(" ")),
        this.$track.prepend(e);
    }
    let s = Math.max(e.offsetWidth, Se(e.getBoundingClientRect().width));
    const n = e.currentStyle || window.getComputedStyle(e);
    return (
      (s =
        s + (parseFloat(n.marginLeft) || 0) + (parseFloat(n.marginRight) || 0)),
      e.dataset.isTestEl && e.remove(),
      s
    );
  }
  findPageForSlide(e) {
    e = parseInt(e, 10) || 0;
    const s = this.pages.find((n) => n.indexes.indexOf(e) > -1);
    return s ? s.index : null;
  }
  slideNext() {
    this.slideTo(this.pageIndex + 1);
  }
  slidePrev() {
    this.slideTo(this.pageIndex - 1);
  }
  slideTo(e, s = {}) {
    const {
      x: n = -1 * this.setPage(e, !0),
      y: i = 0,
      friction: o = this.option("friction"),
    } = s;
    (this.Panzoom.content.x === n && !this.Panzoom.velocity.x && o) ||
      (this.Panzoom.panTo({ x: n, y: i, friction: o, ignoreBounds: !0 }),
      this.state === "ready" &&
        this.Panzoom.state === "ready" &&
        this.trigger("settle"));
  }
  initPanzoom() {
    this.Panzoom && this.Panzoom.destroy();
    const e = ze(
      !0,
      {},
      {
        content: this.$track,
        wrapInner: !1,
        resizeParent: !1,
        zoom: !1,
        click: !1,
        lockAxis: "x",
        x: this.pages.length ? -1 * this.pages[this.page].left : 0,
        centerOnStart: !1,
        textSelection: () => this.option("textSelection", !1),
        panOnlyZoomed: function () {
          return this.content.width <= this.viewport.width;
        },
      },
      this.option("Panzoom")
    );
    (this.Panzoom = new Js(this.$container, e)),
      this.Panzoom.on({
        "*": (s, ...n) => this.trigger(`Panzoom.${s}`, ...n),
        afterUpdate: () => {
          this.updatePage();
        },
        beforeTransform: this.onBeforeTransform.bind(this),
        touchEnd: this.onTouchEnd.bind(this),
        endAnimation: () => {
          this.trigger("settle");
        },
      }),
      this.updateMetrics(),
      this.manageSlideVisiblity();
  }
  updatePanzoom() {
    this.Panzoom &&
      ((this.Panzoom.content = {
        ...this.Panzoom.content,
        fitWidth: this.contentWidth,
        origWidth: this.contentWidth,
        width: this.contentWidth,
      }),
      this.pages.length > 1 && this.option("infiniteX", this.option("infinite"))
        ? (this.Panzoom.boundX = null)
        : this.pages.length &&
          (this.Panzoom.boundX = {
            from: -1 * this.pages[this.pages.length - 1].left,
            to: -1 * this.pages[0].left,
          }),
      this.option("infiniteY", this.option("infinite"))
        ? (this.Panzoom.boundY = null)
        : (this.Panzoom.boundY = { from: 0, to: 0 }),
      this.Panzoom.handleCursor());
  }
  manageSlideVisiblity() {
    const e = this.contentWidth,
      s = this.viewportWidth;
    let n = this.Panzoom
      ? -1 * this.Panzoom.content.x
      : this.pages.length
      ? this.pages[this.page].left
      : 0;
    const i = this.option("preload"),
      o = this.option("infiniteX", this.option("infinite")),
      r = parseFloat(
        getComputedStyle(this.$viewport, null).getPropertyValue("padding-left")
      ),
      l = parseFloat(
        getComputedStyle(this.$viewport, null).getPropertyValue("padding-right")
      );
    this.slides.forEach((h) => {
      let u,
        f,
        d = 0;
      (u = n - r),
        (f = n + s + l),
        (u -= i * (s + r + l)),
        (f += i * (s + r + l));
      const m = h.left + h.width > u && h.left < f;
      (u = n + e - r), (f = n + e + s + l), (u -= i * (s + r + l));
      const w = o && h.left + h.width > u && h.left < f;
      (u = n - e - r), (f = n - e + s + l), (u -= i * (s + r + l));
      const $ = o && h.left + h.width > u && h.left < f;
      w || m || $
        ? (this.createSlideEl(h),
          m && (d = 0),
          w && (d = -1),
          $ && (d = 1),
          h.left + h.width > n && h.left <= n + s + l && (d = 0))
        : this.removeSlideEl(h),
        (h.hasDiff = d);
    });
    let a = 0,
      c = 0;
    this.slides.forEach((h, u) => {
      let f = 0;
      h.$el
        ? (u !== a || h.hasDiff ? (f = c + h.hasDiff * e) : (c = 0),
          (h.$el.style.left =
            Math.abs(f) > 0.1 ? `${c + h.hasDiff * e}px` : ""),
          a++)
        : (c += h.width);
    }),
      this.markSelectedSlides();
  }
  createSlideEl(e) {
    if (!e) return;
    if (e.$el) {
      let r = e.$el.dataset.index;
      if (!r || parseInt(r, 10) !== e.index) {
        let l;
        (e.$el.dataset.index = e.index),
          e.$el.querySelectorAll("[data-lazy-srcset]").forEach((a) => {
            a.srcset = a.dataset.lazySrcset;
          }),
          e.$el.querySelectorAll("[data-lazy-src]").forEach((a) => {
            let c = a.dataset.lazySrc;
            a instanceof HTMLImageElement
              ? (a.src = c)
              : (a.style.backgroundImage = `url('${c}')`);
          }),
          (l = e.$el.dataset.lazySrc) &&
            (e.$el.style.backgroundImage = `url('${l}')`),
          (e.state = "ready");
      }
      return;
    }
    const s = document.createElement("div");
    (s.dataset.index = e.index),
      s.classList.add(
        ...(this.option("prefix") + this.option("classNames.slide")).split(" ")
      ),
      e.customClass && s.classList.add(...e.customClass.split(" ")),
      e.html && (s.innerHTML = e.html);
    const n = [];
    this.slides.forEach((r, l) => {
      r.$el && n.push(l);
    });
    const i = e.index;
    let o = null;
    if (n.length) {
      let r = n.reduce((l, a) => (Math.abs(a - i) < Math.abs(l - i) ? a : l));
      o = this.slides[r];
    }
    return (
      this.$track.insertBefore(
        s,
        o && o.$el ? (o.index < e.index ? o.$el.nextSibling : o.$el) : null
      ),
      (e.$el = s),
      this.trigger("createSlide", e, i),
      e
    );
  }
  removeSlideEl(e) {
    e.$el &&
      !e.isDom &&
      (this.trigger("removeSlide", e), e.$el.remove(), (e.$el = null));
  }
  markSelectedSlides() {
    const e = this.option("classNames.slideSelected"),
      s = "aria-hidden";
    this.slides.forEach((n, i) => {
      const o = n.$el;
      if (!o) return;
      const r = this.pages[this.page];
      r && r.indexes && r.indexes.indexOf(i) > -1
        ? (e &&
            !o.classList.contains(e) &&
            (o.classList.add(e), this.trigger("selectSlide", n)),
          o.removeAttribute(s))
        : (e &&
            o.classList.contains(e) &&
            (o.classList.remove(e), this.trigger("unselectSlide", n)),
          o.setAttribute(s, !0));
    });
  }
  updatePage() {
    this.updateMetrics(), this.slideTo(this.page, { friction: 0 });
  }
  onBeforeTransform() {
    this.option("infiniteX", this.option("infinite")) &&
      this.manageInfiniteTrack(),
      this.manageSlideVisiblity();
  }
  manageInfiniteTrack() {
    const e = this.contentWidth,
      s = this.viewportWidth;
    if (
      !this.option("infiniteX", this.option("infinite")) ||
      this.pages.length < 2 ||
      e < s
    )
      return;
    const n = this.Panzoom;
    let i = !1;
    return (
      n.content.x < -1 * (e - s) &&
        ((n.content.x += e),
        (this.pageIndex = this.pageIndex - this.pages.length),
        (i = !0)),
      n.content.x > s &&
        ((n.content.x -= e),
        (this.pageIndex = this.pageIndex + this.pages.length),
        (i = !0)),
      i && n.state === "pointerdown" && n.resetDragPosition(),
      i
    );
  }
  onTouchEnd(e, s) {
    const n = this.option("dragFree");
    if (
      !n &&
      this.pages.length > 1 &&
      e.dragOffset.time < 350 &&
      Math.abs(e.dragOffset.y) < 1 &&
      Math.abs(e.dragOffset.x) > 5
    )
      this[e.dragOffset.x < 0 ? "slideNext" : "slidePrev"]();
    else if (n) {
      const [, i] = this.getPageFromPosition(-1 * e.transform.x);
      this.setPage(i);
    } else this.slideToClosest();
  }
  slideToClosest(e = {}) {
    let [, s] = this.getPageFromPosition(-1 * this.Panzoom.content.x);
    this.slideTo(s, e);
  }
  getPageFromPosition(e) {
    const s = this.pages.length;
    this.option("center") && (e += 0.5 * this.viewportWidth);
    const n = Math.floor(e / this.contentWidth);
    e -= n * this.contentWidth;
    let i = this.slides.find((o) => o.left <= e && o.left + o.width > e);
    if (i) {
      let o = this.findPageForSlide(i.index);
      return [o, o + n * s];
    }
    return [0, 0];
  }
  setPage(e, s) {
    let n = 0,
      i = parseInt(e, 10) || 0;
    const o = this.page,
      r = this.pageIndex,
      l = this.pages.length,
      a = this.contentWidth,
      c = this.viewportWidth;
    if (
      ((e = ((i % l) + l) % l),
      this.option("infiniteX", this.option("infinite")) && a > c)
    ) {
      const h = Math.floor(i / l) || 0,
        u = a;
      if (((n = this.pages[e].left + h * u), s === !0 && l > 2)) {
        let f = -1 * this.Panzoom.content.x;
        const d = n - u,
          m = n + u,
          w = Math.abs(f - n),
          $ = Math.abs(f - d),
          O = Math.abs(f - m);
        O < w && O <= $
          ? ((n = m), (i += l))
          : $ < w && $ < O && ((n = d), (i -= l));
      }
    } else
      (e = i = Math.max(0, Math.min(i, l - 1))),
        (n = this.pages.length ? this.pages[e].left : 0);
    return (
      (this.page = e),
      (this.pageIndex = i),
      o !== null &&
        e !== o &&
        ((this.prevPage = o),
        (this.prevPageIndex = r),
        this.trigger("change", e, o)),
      n
    );
  }
  destroy() {
    (this.state = "destroy"),
      this.slides.forEach((e) => {
        this.removeSlideEl(e);
      }),
      (this.slides = []),
      this.Panzoom.destroy(),
      this.detachPlugins();
  }
}
(es.version = "4.0.31"), (es.Plugins = Og);
const Pi = !(
  typeof window > "u" ||
  !window.document ||
  !window.document.createElement
);
let vo = null;
const na = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "video",
    "audio",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
  ],
  sn = (t) => {
    if (t && Pi) {
      vo === null &&
        document.createElement("div").focus({
          get preventScroll() {
            return (vo = !0), !1;
          },
        });
      try {
        if (t.setActive) t.setActive();
        else if (vo) t.focus({ preventScroll: !0 });
        else {
          const e = window.pageXOffset || document.body.scrollTop,
            s = window.pageYOffset || document.body.scrollLeft;
          t.focus(),
            document.body.scrollTo({ top: e, left: s, behavior: "auto" });
        }
      } catch {}
    }
  },
  Mg = {
    minSlideCount: 2,
    minScreenHeight: 500,
    autoStart: !0,
    key: "t",
    Carousel: {},
    tpl: `<div class="fancybox__thumb" style="background-image:url('{{src}}')"></div>`,
  };
class Xh {
  constructor(e) {
    (this.fancybox = e), (this.$container = null), (this.state = "init");
    for (const s of ["onPrepare", "onClosing", "onKeydown"])
      this[s] = this[s].bind(this);
    this.events = {
      prepare: this.onPrepare,
      closing: this.onClosing,
      keydown: this.onKeydown,
    };
  }
  onPrepare() {
    this.getSlides().length < this.fancybox.option("Thumbs.minSlideCount")
      ? (this.state = "disabled")
      : this.fancybox.option("Thumbs.autoStart") === !0 &&
        this.fancybox.Carousel.Panzoom.content.height >=
          this.fancybox.option("Thumbs.minScreenHeight") &&
        this.build();
  }
  onClosing() {
    this.Carousel && this.Carousel.Panzoom.detachEvents();
  }
  onKeydown(e, s) {
    s === e.option("Thumbs.key") && this.toggle();
  }
  build() {
    if (this.$container) return;
    const e = document.createElement("div");
    e.classList.add("fancybox__thumbs"),
      this.fancybox.$carousel.parentNode.insertBefore(
        e,
        this.fancybox.$carousel.nextSibling
      ),
      (this.Carousel = new es(
        e,
        ze(
          !0,
          {
            Dots: !1,
            Navigation: !1,
            Sync: { friction: 0 },
            infinite: !1,
            center: !0,
            fill: !0,
            dragFree: !0,
            slidesPerPage: 1,
            preload: 1,
          },
          this.fancybox.option("Thumbs.Carousel"),
          { Sync: { target: this.fancybox.Carousel }, slides: this.getSlides() }
        )
      )),
      this.Carousel.Panzoom.on("wheel", (s, n) => {
        n.preventDefault(), this.fancybox[n.deltaY < 0 ? "prev" : "next"]();
      }),
      (this.$container = e),
      (this.state = "visible");
  }
  getSlides() {
    const e = [];
    for (const s of this.fancybox.items) {
      const n = s.thumb;
      n &&
        e.push({
          html: this.fancybox.option("Thumbs.tpl").replace(/\{\{src\}\}/gi, n),
          customClass: `has-thumb has-${s.type || "image"}`,
        });
    }
    return e;
  }
  toggle() {
    this.state === "visible"
      ? this.hide()
      : this.state === "hidden"
      ? this.show()
      : this.build();
  }
  show() {
    this.state === "hidden" &&
      ((this.$container.style.display = ""),
      this.Carousel.Panzoom.attachEvents(),
      (this.state = "visible"));
  }
  hide() {
    this.state === "visible" &&
      (this.Carousel.Panzoom.detachEvents(),
      (this.$container.style.display = "none"),
      (this.state = "hidden"));
  }
  cleanup() {
    this.Carousel && (this.Carousel.destroy(), (this.Carousel = null)),
      this.$container && (this.$container.remove(), (this.$container = null)),
      (this.state = "init");
  }
  attach() {
    this.fancybox.on(this.events);
  }
  detach() {
    this.fancybox.off(this.events), this.cleanup();
  }
}
Xh.defaults = Mg;
const ia = (t, e) => {
    const s = new URL(t),
      n = new URLSearchParams(s.search);
    let i = new URLSearchParams();
    for (const [r, l] of [...n, ...Object.entries(e)])
      r === "t" ? i.set("start", parseInt(l)) : i.set(r, l);
    i = i.toString();
    let o = t.match(/#t=((.*)?\d+s)/);
    return o && (i += `#t=${o[1]}`), i;
  },
  Gh = {
    video: { autoplay: !0, ratio: 16 / 9 },
    youtube: {
      autohide: 1,
      fs: 1,
      rel: 0,
      hd: 1,
      wmode: "transparent",
      enablejsapi: 1,
      html5: 1,
    },
    vimeo: {
      hd: 1,
      show_title: 1,
      show_byline: 1,
      show_portrait: 0,
      fullscreen: 1,
    },
    html5video: {
      tpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
      format: "",
    },
  };
class Yh {
  constructor(e) {
    this.fancybox = e;
    for (const s of [
      "onInit",
      "onReady",
      "onCreateSlide",
      "onRemoveSlide",
      "onSelectSlide",
      "onUnselectSlide",
      "onRefresh",
      "onMessage",
    ])
      this[s] = this[s].bind(this);
    this.events = {
      init: this.onInit,
      ready: this.onReady,
      "Carousel.createSlide": this.onCreateSlide,
      "Carousel.removeSlide": this.onRemoveSlide,
      "Carousel.selectSlide": this.onSelectSlide,
      "Carousel.unselectSlide": this.onUnselectSlide,
      "Carousel.refresh": this.onRefresh,
    };
  }
  onInit() {
    for (const e of this.fancybox.items) this.processType(e);
  }
  processType(e) {
    if (e.html) return (e.src = e.html), (e.type = "html"), void delete e.html;
    const s = e.src || "";
    let n = e.type || this.fancybox.options.type,
      i = null;
    if (!s || typeof s == "string") {
      if (
        (i = s.match(
          /(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i
        ))
      ) {
        const o = ia(s, this.fancybox.option("Html.youtube")),
          r = encodeURIComponent(i[1]);
        (e.videoId = r),
          (e.src = `https://www.youtube-nocookie.com/embed/${r}?${o}`),
          (e.thumb = e.thumb || `https://i.ytimg.com/vi/${r}/mqdefault.jpg`),
          (e.vendor = "youtube"),
          (n = "video");
      } else if ((i = s.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/))) {
        const o = ia(s, this.fancybox.option("Html.vimeo")),
          r = encodeURIComponent(i[1]);
        (e.videoId = r),
          (e.src = `https://player.vimeo.com/video/${r}?${o}`),
          (e.vendor = "vimeo"),
          (n = "video");
      } else
        (i = s.match(
          /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i
        ))
          ? ((e.src = `//maps.google.${i[1]}/?ll=${(i[2]
              ? i[2] +
                "&z=" +
                Math.floor(i[3]) +
                (i[4] ? i[4].replace(/^\//, "&") : "")
              : i[4] + ""
            ).replace(/\?/, "&")}&output=${
              i[4] && i[4].indexOf("layer=c") > 0 ? "svembed" : "embed"
            }`),
            (n = "map"))
          : (i = s.match(
              /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i
            )) &&
            ((e.src = `//maps.google.${i[1]}/maps?q=${i[2]
              .replace("query=", "q=")
              .replace("api=1", "")}&output=embed`),
            (n = "map"));
      n ||
        (s.charAt(0) === "#"
          ? (n = "inline")
          : (i = s.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
          ? ((n = "html5video"),
            (e.format = e.format || "video/" + (i[1] === "ogv" ? "ogg" : i[1])))
          : s.match(
              /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
            )
          ? (n = "image")
          : s.match(/\.(pdf)((\?|#).*)?$/i) && (n = "pdf")),
        (e.type = n || this.fancybox.option("defaultType", "image")),
        (n !== "html5video" && n !== "video") ||
          ((e.video = ze({}, this.fancybox.option("Html.video"), e.video)),
          e._width && e._height
            ? (e.ratio = parseFloat(e._width) / parseFloat(e._height))
            : (e.ratio = e.ratio || e.video.ratio || Gh.video.ratio));
    }
  }
  onReady() {
    this.fancybox.Carousel.slides.forEach((e) => {
      e.$el &&
        (this.setContent(e),
        e.index === this.fancybox.getSlide().index && this.playVideo(e));
    });
  }
  onCreateSlide(e, s, n) {
    this.fancybox.state === "ready" && this.setContent(n);
  }
  loadInlineContent(e) {
    let s;
    if (e.src instanceof HTMLElement) s = e.src;
    else if (typeof e.src == "string") {
      const n = e.src.split("#", 2),
        i = n.length === 2 && n[0] === "" ? n[1] : n[0];
      s = document.getElementById(i);
    }
    if (s) {
      if (e.type === "clone" || s.$placeHolder) {
        s = s.cloneNode(!0);
        let n = s.getAttribute("id");
        (n = n ? `${n}--clone` : `clone-${this.fancybox.id}-${e.index}`),
          s.setAttribute("id", n);
      } else {
        const n = document.createElement("div");
        n.classList.add("fancybox-placeholder"),
          s.parentNode.insertBefore(n, s),
          (s.$placeHolder = n);
      }
      this.fancybox.setContent(e, s);
    } else this.fancybox.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  loadAjaxContent(e) {
    const s = this.fancybox,
      n = new XMLHttpRequest();
    s.showLoading(e),
      (n.onreadystatechange = function () {
        n.readyState === XMLHttpRequest.DONE &&
          s.state === "ready" &&
          (s.hideLoading(e),
          n.status === 200
            ? s.setContent(e, n.responseText)
            : s.setError(
                e,
                n.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"
              ));
      });
    const i = e.ajax || null;
    n.open(i ? "POST" : "GET", e.src),
      n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
      n.send(i),
      (e.xhr = n);
  }
  loadIframeContent(e) {
    const s = this.fancybox,
      n = document.createElement("iframe");
    if (
      ((n.className = "fancybox__iframe"),
      n.setAttribute("id", `fancybox__iframe_${s.id}_${e.index}`),
      n.setAttribute("allow", "autoplay; fullscreen"),
      n.setAttribute("scrolling", "auto"),
      (e.$iframe = n),
      e.type !== "iframe" || e.preload === !1)
    )
      return (
        n.setAttribute("src", e.src),
        this.fancybox.setContent(e, n),
        void this.resizeIframe(e)
      );
    s.showLoading(e);
    const i = document.createElement("div");
    (i.style.visibility = "hidden"),
      this.fancybox.setContent(e, i),
      i.appendChild(n),
      (n.onerror = () => {
        s.setError(e, "{{IFRAME_ERROR}}");
      }),
      (n.onload = () => {
        s.hideLoading(e);
        let o = !1;
        n.isReady || ((n.isReady = !0), (o = !0)),
          n.src.length &&
            ((n.parentNode.style.visibility = ""),
            this.resizeIframe(e),
            o && s.revealContent(e));
      }),
      n.setAttribute("src", e.src);
  }
  setAspectRatio(e) {
    const s = e.$content,
      n = e.ratio;
    if (!s) return;
    let i = e._width,
      o = e._height;
    if (n || (i && o)) {
      Object.assign(s.style, {
        width: i && o ? "100%" : "",
        height: i && o ? "100%" : "",
        maxWidth: "",
        maxHeight: "",
      });
      let r = s.offsetWidth,
        l = s.offsetHeight;
      if (((i = i || r), (o = o || l), i > r || o > l)) {
        let a = Math.min(r / i, l / o);
        (i *= a), (o *= a);
      }
      Math.abs(i / o - n) > 0.01 && (n < i / o ? (i = o * n) : (o = i / n)),
        Object.assign(s.style, { width: `${i}px`, height: `${o}px` });
    }
  }
  resizeIframe(e) {
    const s = e.$iframe;
    if (!s) return;
    let n = e._width || 0,
      i = e._height || 0;
    n && i && (e.autoSize = !1);
    const o = s.parentNode,
      r = o && o.style;
    if (e.preload !== !1 && e.autoSize !== !1 && r)
      try {
        const l = window.getComputedStyle(o),
          a = parseFloat(l.paddingLeft) + parseFloat(l.paddingRight),
          c = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
          h = s.contentWindow.document,
          u = h.getElementsByTagName("html")[0],
          f = h.body;
        (r.width = ""),
          (f.style.overflow = "hidden"),
          (n = n || u.scrollWidth + a),
          (r.width = `${n}px`),
          (f.style.overflow = ""),
          (r.flex = "0 0 auto"),
          (r.height = `${f.scrollHeight}px`),
          (i = u.scrollHeight + c);
      } catch {}
    if (n || i) {
      const l = { flex: "0 1 auto" };
      n && (l.width = `${n}px`),
        i && (l.height = `${i}px`),
        Object.assign(r, l);
    }
  }
  onRefresh(e, s) {
    s.slides.forEach((n) => {
      n.$el &&
        (n.$iframe && this.resizeIframe(n), n.ratio && this.setAspectRatio(n));
    });
  }
  setContent(e) {
    if (e && !e.isDom) {
      switch (e.type) {
        case "html":
          this.fancybox.setContent(e, e.src);
          break;
        case "html5video":
          this.fancybox.setContent(
            e,
            this.fancybox
              .option("Html.html5video.tpl")
              .replace(/\{\{src\}\}/gi, e.src)
              .replace(
                "{{format}}",
                e.format || (e.html5video && e.html5video.format) || ""
              )
              .replace("{{poster}}", e.poster || e.thumb || "")
          );
          break;
        case "inline":
        case "clone":
          this.loadInlineContent(e);
          break;
        case "ajax":
          this.loadAjaxContent(e);
          break;
        case "pdf":
        case "video":
        case "map":
          e.preload = !1;
        case "iframe":
          this.loadIframeContent(e);
      }
      e.ratio && this.setAspectRatio(e);
    }
  }
  onSelectSlide(e, s, n) {
    e.state === "ready" && this.playVideo(n);
  }
  playVideo(e) {
    if (e.type === "html5video" && e.video.autoplay)
      try {
        const n = e.$el.querySelector("video");
        if (n) {
          const i = n.play();
          i !== void 0 &&
            i
              .then(() => {})
              .catch((o) => {
                (n.muted = !0), n.play();
              });
        }
      } catch {}
    if (e.type !== "video" || !e.$iframe || !e.$iframe.contentWindow) return;
    const s = () => {
      if (e.state === "done" && e.$iframe && e.$iframe.contentWindow) {
        let n;
        if (e.$iframe.isReady)
          return (
            e.video &&
              e.video.autoplay &&
              (n =
                e.vendor == "youtube"
                  ? { event: "command", func: "playVideo" }
                  : { method: "play", value: "true" }),
            void (
              n && e.$iframe.contentWindow.postMessage(JSON.stringify(n), "*")
            )
          );
        e.vendor === "youtube" &&
          ((n = { event: "listening", id: e.$iframe.getAttribute("id") }),
          e.$iframe.contentWindow.postMessage(JSON.stringify(n), "*"));
      }
      e.poller = setTimeout(s, 250);
    };
    s();
  }
  onUnselectSlide(e, s, n) {
    if (n.type === "html5video") {
      try {
        n.$el.querySelector("video").pause();
      } catch {}
      return;
    }
    let i = !1;
    n.vendor == "vimeo"
      ? (i = { method: "pause", value: "true" })
      : n.vendor === "youtube" &&
        (i = { event: "command", func: "pauseVideo" }),
      i &&
        n.$iframe &&
        n.$iframe.contentWindow &&
        n.$iframe.contentWindow.postMessage(JSON.stringify(i), "*"),
      clearTimeout(n.poller);
  }
  onRemoveSlide(e, s, n) {
    n.xhr && (n.xhr.abort(), (n.xhr = null)),
      n.$iframe &&
        ((n.$iframe.onload = n.$iframe.onerror = null),
        (n.$iframe.src = "//about:blank"),
        (n.$iframe = null));
    const i = n.$content;
    n.type === "inline" &&
      i &&
      (i.classList.remove("fancybox__content"),
      i.style.display !== "none" && (i.style.display = "none")),
      n.$closeButton && (n.$closeButton.remove(), (n.$closeButton = null));
    const o = i && i.$placeHolder;
    o && (o.parentNode.insertBefore(i, o), o.remove(), (i.$placeHolder = null));
  }
  onMessage(e) {
    try {
      let s = JSON.parse(e.data);
      if (e.origin === "https://player.vimeo.com") {
        if (s.event === "ready")
          for (let n of document.getElementsByClassName("fancybox__iframe"))
            n.contentWindow === e.source && (n.isReady = 1);
      } else
        e.origin === "https://www.youtube-nocookie.com" &&
          s.event === "onReady" &&
          (document.getElementById(s.id).isReady = 1);
    } catch {}
  }
  attach() {
    this.fancybox.on(this.events),
      window.addEventListener("message", this.onMessage, !1);
  }
  detach() {
    this.fancybox.off(this.events),
      window.removeEventListener("message", this.onMessage, !1);
  }
}
Yh.defaults = Gh;
class Jh {
  constructor(e) {
    this.fancybox = e;
    for (const s of [
      "onReady",
      "onClosing",
      "onDone",
      "onPageChange",
      "onCreateSlide",
      "onRemoveSlide",
      "onImageStatusChange",
    ])
      this[s] = this[s].bind(this);
    this.events = {
      ready: this.onReady,
      closing: this.onClosing,
      done: this.onDone,
      "Carousel.change": this.onPageChange,
      "Carousel.createSlide": this.onCreateSlide,
      "Carousel.removeSlide": this.onRemoveSlide,
    };
  }
  onReady() {
    this.fancybox.Carousel.slides.forEach((e) => {
      e.$el && this.setContent(e);
    });
  }
  onDone(e, s) {
    this.handleCursor(s);
  }
  onClosing(e) {
    clearTimeout(this.clickTimer),
      (this.clickTimer = null),
      e.Carousel.slides.forEach((s) => {
        s.$image && (s.state = "destroy"),
          s.Panzoom && s.Panzoom.detachEvents();
      }),
      this.fancybox.state === "closing" &&
        this.canZoom(e.getSlide()) &&
        this.zoomOut();
  }
  onCreateSlide(e, s, n) {
    this.fancybox.state === "ready" && this.setContent(n);
  }
  onRemoveSlide(e, s, n) {
    n.$image &&
      (n.$el.classList.remove(e.option("Image.canZoomInClass")),
      n.$image.remove(),
      (n.$image = null)),
      n.Panzoom && (n.Panzoom.destroy(), (n.Panzoom = null)),
      n.$el && n.$el.dataset && delete n.$el.dataset.imageFit;
  }
  setContent(e) {
    if (e.isDom || e.html || (e.type && e.type !== "image") || e.$image) return;
    (e.type = "image"), (e.state = "loading");
    const s = document.createElement("div");
    s.style.visibility = "hidden";
    const n = document.createElement("img");
    n.addEventListener("load", (o) => {
      o.stopImmediatePropagation(), this.onImageStatusChange(e);
    }),
      n.addEventListener("error", () => {
        this.onImageStatusChange(e);
      }),
      (n.src = e.src),
      (n.alt = ""),
      (n.draggable = !1),
      n.classList.add("fancybox__image"),
      e.srcset && n.setAttribute("srcset", e.srcset),
      e.sizes && n.setAttribute("sizes", e.sizes),
      (e.$image = n);
    const i = this.fancybox.option("Image.wrap");
    if (i) {
      const o = document.createElement("div");
      o.classList.add(typeof i == "string" ? i : "fancybox__image-wrap"),
        o.appendChild(n),
        s.appendChild(o),
        (e.$wrap = o);
    } else s.appendChild(n);
    (e.$el.dataset.imageFit = this.fancybox.option("Image.fit")),
      this.fancybox.setContent(e, s),
      n.complete || n.error
        ? this.onImageStatusChange(e)
        : this.fancybox.showLoading(e);
  }
  onImageStatusChange(e) {
    const s = e.$image;
    s &&
      e.state === "loading" &&
      (s.complete && s.naturalWidth && s.naturalHeight
        ? (this.fancybox.hideLoading(e),
          this.fancybox.option("Image.fit") === "contain" &&
            this.initSlidePanzoom(e),
          e.$el.addEventListener("wheel", (n) => this.onWheel(e, n), {
            passive: !1,
          }),
          e.$content.addEventListener("click", (n) => this.onClick(e, n), {
            passive: !1,
          }),
          this.revealContent(e))
        : this.fancybox.setError(e, "{{IMAGE_ERROR}}"));
  }
  initSlidePanzoom(e) {
    e.Panzoom ||
      ((e.Panzoom = new Js(
        e.$el,
        ze(!0, this.fancybox.option("Image.Panzoom", {}), {
          viewport: e.$wrap,
          content: e.$image,
          width: e._width,
          height: e._height,
          wrapInner: !1,
          textSelection: !0,
          touch: this.fancybox.option("Image.touch"),
          panOnlyZoomed: !0,
          click: !1,
          wheel: !1,
        })
      )),
      e.Panzoom.on("startAnimation", () => {
        this.fancybox.trigger("Image.startAnimation", e);
      }),
      e.Panzoom.on("endAnimation", () => {
        e.state === "zoomIn" && this.fancybox.done(e),
          this.handleCursor(e),
          this.fancybox.trigger("Image.endAnimation", e);
      }),
      e.Panzoom.on("afterUpdate", () => {
        this.handleCursor(e), this.fancybox.trigger("Image.afterUpdate", e);
      }));
  }
  revealContent(e) {
    this.fancybox.Carousel.prevPage === null &&
    e.index === this.fancybox.options.startIndex &&
    this.canZoom(e)
      ? this.zoomIn()
      : this.fancybox.revealContent(e);
  }
  getZoomInfo(e) {
    const s = e.$thumb.getBoundingClientRect(),
      n = s.width,
      i = s.height,
      o = e.$content.getBoundingClientRect(),
      r = o.width,
      l = o.height,
      a = o.top - s.top,
      c = o.left - s.left;
    let h = this.fancybox.option("Image.zoomOpacity");
    return (
      h === "auto" && (h = Math.abs(n / i - r / l) > 0.1),
      { top: a, left: c, scale: r && n ? n / r : 1, opacity: h }
    );
  }
  canZoom(e) {
    const s = this.fancybox,
      n = s.$container;
    if (
      (window.visualViewport && window.visualViewport.scale !== 1) ||
      (e.Panzoom && !e.Panzoom.content.width) ||
      !s.option("Image.zoom") ||
      s.option("Image.fit") !== "contain"
    )
      return !1;
    const i = e.$thumb;
    if (!i || e.state === "loading") return !1;
    n.classList.add("fancybox__no-click");
    const o = i.getBoundingClientRect();
    let r;
    if (this.fancybox.option("Image.ignoreCoveredThumbnail")) {
      const l = document.elementFromPoint(o.left + 1, o.top + 1) === i,
        a = document.elementFromPoint(o.right - 1, o.bottom - 1) === i;
      r = l && a;
    } else
      r =
        document.elementFromPoint(
          o.left + 0.5 * o.width,
          o.top + 0.5 * o.height
        ) === i;
    return n.classList.remove("fancybox__no-click"), r;
  }
  zoomIn() {
    const e = this.fancybox,
      s = e.getSlide(),
      n = s.Panzoom,
      { top: i, left: o, scale: r, opacity: l } = this.getZoomInfo(s);
    e.trigger("reveal", s),
      n.panTo({
        x: -1 * o,
        y: -1 * i,
        scale: r,
        friction: 0,
        ignoreBounds: !0,
      }),
      (s.$content.style.visibility = ""),
      (s.state = "zoomIn"),
      l === !0 &&
        n.on("afterTransform", (a) => {
          (s.state !== "zoomIn" && s.state !== "zoomOut") ||
            (a.$content.style.opacity = Math.min(
              1,
              1 - (1 - a.content.scale) / (1 - r)
            ));
        }),
      n.panTo({
        x: 0,
        y: 0,
        scale: 1,
        friction: this.fancybox.option("Image.zoomFriction"),
      });
  }
  zoomOut() {
    const e = this.fancybox,
      s = e.getSlide(),
      n = s.Panzoom;
    if (!n) return;
    (s.state = "zoomOut"),
      (e.state = "customClosing"),
      s.$caption && (s.$caption.style.visibility = "hidden");
    let i = this.fancybox.option("Image.zoomFriction");
    const o = (r) => {
      const { top: l, left: a, scale: c, opacity: h } = this.getZoomInfo(s);
      r || h || (i *= 0.82),
        n.panTo({
          x: -1 * a,
          y: -1 * l,
          scale: c,
          friction: i,
          ignoreBounds: !0,
        }),
        (i *= 0.98);
    };
    window.addEventListener("scroll", o),
      n.once("endAnimation", () => {
        window.removeEventListener("scroll", o), e.destroy();
      }),
      o();
  }
  handleCursor(e) {
    if (e.type !== "image" || !e.$el) return;
    const s = e.Panzoom,
      n = this.fancybox.option("Image.click", !1, e),
      i = this.fancybox.option("Image.touch"),
      o = e.$el.classList,
      r = this.fancybox.option("Image.canZoomInClass"),
      l = this.fancybox.option("Image.canZoomOutClass");
    o.remove(l),
      o.remove(r),
      s && n === "toggleZoom"
        ? s &&
          s.content.scale === 1 &&
          s.option("maxScale") - s.content.scale > 0.01
          ? o.add(r)
          : s.content.scale > 1 && !i && o.add(l)
        : n === "close" && o.add(l);
  }
  onWheel(e, s) {
    if (
      this.fancybox.state === "ready" &&
      this.fancybox.trigger("Image.wheel", s) !== !1
    )
      switch (this.fancybox.option("Image.wheel")) {
        case "zoom":
          e.state === "done" && e.Panzoom && e.Panzoom.zoomWithWheel(s);
          break;
        case "close":
          this.fancybox.close();
          break;
        case "slide":
          this.fancybox[s.deltaY < 0 ? "prev" : "next"]();
      }
  }
  onClick(e, s) {
    if (this.fancybox.state !== "ready") return;
    const n = e.Panzoom;
    if (
      n &&
      (n.dragPosition.midPoint ||
        n.dragOffset.x !== 0 ||
        n.dragOffset.y !== 0 ||
        n.dragOffset.scale !== 1)
    )
      return;
    if (this.fancybox.Carousel.Panzoom.lockAxis) return !1;
    const i = (l) => {
        switch (l) {
          case "toggleZoom":
            s.stopPropagation(), e.Panzoom && e.Panzoom.zoomWithClick(s);
            break;
          case "close":
            this.fancybox.close();
            break;
          case "next":
            s.stopPropagation(), this.fancybox.next();
        }
      },
      o = this.fancybox.option("Image.click"),
      r = this.fancybox.option("Image.doubleClick");
    r
      ? this.clickTimer
        ? (clearTimeout(this.clickTimer), (this.clickTimer = null), i(r))
        : (this.clickTimer = setTimeout(() => {
            (this.clickTimer = null), i(o);
          }, 300))
      : i(o);
  }
  onPageChange(e, s) {
    const n = e.getSlide();
    s.slides.forEach((i) => {
      i.Panzoom &&
        i.state === "done" &&
        i.index !== n.index &&
        i.Panzoom.panTo({ x: 0, y: 0, scale: 1, friction: 0.8 });
    });
  }
  attach() {
    this.fancybox.on(this.events);
  }
  detach() {
    this.fancybox.off(this.events);
  }
}
Jh.defaults = {
  canZoomInClass: "can-zoom_in",
  canZoomOutClass: "can-zoom_out",
  zoom: !0,
  zoomOpacity: "auto",
  zoomFriction: 0.82,
  ignoreCoveredThumbnail: !1,
  touch: !0,
  click: "toggleZoom",
  doubleClick: null,
  wheel: "zoom",
  fit: "contain",
  wrap: !1,
  Panzoom: { ratio: 1 },
};
class ut {
  constructor(e) {
    this.fancybox = e;
    for (const s of ["onChange", "onClosing"]) this[s] = this[s].bind(this);
    (this.events = {
      initCarousel: this.onChange,
      "Carousel.change": this.onChange,
      closing: this.onClosing,
    }),
      (this.hasCreatedHistory = !1),
      (this.origHash = ""),
      (this.timer = null);
  }
  onChange(e) {
    const s = e.Carousel;
    this.timer && clearTimeout(this.timer);
    const n = s.prevPage === null,
      i = e.getSlide(),
      o = new URL(document.URL).hash;
    let r = !1;
    if (i.slug) r = "#" + i.slug;
    else {
      const l = i.$trigger && i.$trigger.dataset,
        a = e.option("slug") || (l && l.fancybox);
      a &&
        a.length &&
        a !== "true" &&
        (r = "#" + a + (s.slides.length > 1 ? "-" + (i.index + 1) : ""));
    }
    n && (this.origHash = o !== r ? o : ""),
      r &&
        o !== r &&
        (this.timer = setTimeout(() => {
          try {
            window.history[n ? "pushState" : "replaceState"](
              {},
              document.title,
              window.location.pathname + window.location.search + r
            ),
              n && (this.hasCreatedHistory = !0);
          } catch {}
        }, 300));
  }
  onClosing() {
    if ((this.timer && clearTimeout(this.timer), this.hasSilentClose !== !0))
      try {
        return void window.history.replaceState(
          {},
          document.title,
          window.location.pathname +
            window.location.search +
            (this.origHash || "")
        );
      } catch {}
  }
  attach(e) {
    e.on(this.events);
  }
  detach(e) {
    e.off(this.events);
  }
  static startFromUrl() {
    const e = ut.Fancybox;
    if (!e || e.getInstance() || e.defaults.Hash === !1) return;
    const { hash: s, slug: n, index: i } = ut.getParsedURL();
    if (!n) return;
    let o = document.querySelector(`[data-slug="${s}"]`);
    if (
      (o &&
        o.dispatchEvent(
          new CustomEvent("click", { bubbles: !0, cancelable: !0 })
        ),
      e.getInstance())
    )
      return;
    const r = document.querySelectorAll(`[data-fancybox="${n}"]`);
    r.length &&
      (i === null && r.length === 1 ? (o = r[0]) : i && (o = r[i - 1]),
      o &&
        o.dispatchEvent(
          new CustomEvent("click", { bubbles: !0, cancelable: !0 })
        ));
  }
  static onHashChange() {
    const { slug: e, index: s } = ut.getParsedURL(),
      n = ut.Fancybox,
      i = n && n.getInstance();
    if (i && i.plugins.Hash) {
      if (e) {
        const o = i.Carousel;
        if (e === i.option("slug")) return o.slideTo(s - 1);
        for (let a of o.slides)
          if (a.slug && a.slug === e) return o.slideTo(a.index);
        const r = i.getSlide(),
          l = r.$trigger && r.$trigger.dataset;
        if (l && l.fancybox === e) return o.slideTo(s - 1);
      }
      (i.plugins.Hash.hasSilentClose = !0), i.close();
    }
    ut.startFromUrl();
  }
  static create(e) {
    function s() {
      window.addEventListener("hashchange", ut.onHashChange, !1),
        ut.startFromUrl();
    }
    (ut.Fancybox = e),
      Pi &&
        window.requestAnimationFrame(() => {
          /complete|interactive|loaded/.test(document.readyState)
            ? s()
            : document.addEventListener("DOMContentLoaded", s);
        });
  }
  static destroy() {
    window.removeEventListener("hashchange", ut.onHashChange, !1);
  }
  static getParsedURL() {
    const e = window.location.hash.substr(1),
      s = e.split("-"),
      n =
        (s.length > 1 &&
          /^\+?\d+$/.test(s[s.length - 1]) &&
          parseInt(s.pop(-1), 10)) ||
        null;
    return { hash: e, slug: s.join("-"), index: n };
  }
}
const $t = {
  pageXOffset: 0,
  pageYOffset: 0,
  element: () =>
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement,
  activate(t) {
    ($t.pageXOffset = window.pageXOffset),
      ($t.pageYOffset = window.pageYOffset),
      t.requestFullscreen
        ? t.requestFullscreen()
        : t.mozRequestFullScreen
        ? t.mozRequestFullScreen()
        : t.webkitRequestFullscreen
        ? t.webkitRequestFullscreen()
        : t.msRequestFullscreen && t.msRequestFullscreen();
  },
  deactivate() {
    document.exitFullscreen
      ? document.exitFullscreen()
      : document.mozCancelFullScreen
      ? document.mozCancelFullScreen()
      : document.webkitExitFullscreen && document.webkitExitFullscreen();
  },
};
class Rg {
  constructor(e) {
    (this.fancybox = e),
      (this.active = !1),
      (this.handleVisibilityChange = this.handleVisibilityChange.bind(this));
  }
  isActive() {
    return this.active;
  }
  setTimer() {
    if (!this.active || this.timer) return;
    const e = this.fancybox.option("slideshow.delay", 3e3);
    this.timer = setTimeout(() => {
      (this.timer = null),
        this.fancybox.option("infinite") ||
        this.fancybox.getSlide().index !==
          this.fancybox.Carousel.slides.length - 1
          ? this.fancybox.next()
          : this.fancybox.jumpTo(0, { friction: 0 });
    }, e);
    let s = this.$progress;
    s ||
      ((s = document.createElement("div")),
      s.classList.add("fancybox__progress"),
      this.fancybox.$carousel.parentNode.insertBefore(
        s,
        this.fancybox.$carousel
      ),
      (this.$progress = s),
      s.offsetHeight),
      (s.style.transitionDuration = `${e}ms`),
      (s.style.transform = "scaleX(1)");
  }
  clearTimer() {
    clearTimeout(this.timer),
      (this.timer = null),
      this.$progress &&
        ((this.$progress.style.transitionDuration = ""),
        (this.$progress.style.transform = ""),
        this.$progress.offsetHeight);
  }
  activate() {
    this.active ||
      ((this.active = !0),
      this.fancybox.$container.classList.add("has-slideshow"),
      this.fancybox.getSlide().state === "done" && this.setTimer(),
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
        !1
      ));
  }
  handleVisibilityChange() {
    this.deactivate();
  }
  deactivate() {
    (this.active = !1),
      this.clearTimer(),
      this.fancybox.$container.classList.remove("has-slideshow"),
      document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
        !1
      );
  }
  toggle() {
    this.active
      ? this.deactivate()
      : this.fancybox.Carousel.slides.length > 1 && this.activate();
  }
}
const Fg = {
  display: ["counter", "zoom", "slideshow", "fullscreen", "thumbs", "close"],
  autoEnable: !0,
  items: {
    counter: {
      position: "left",
      type: "div",
      class: "fancybox__counter",
      html: '<span data-fancybox-index=""></span>&nbsp;/&nbsp;<span data-fancybox-count=""></span>',
      attr: { tabindex: -1 },
    },
    prev: {
      type: "button",
      class: "fancybox__button--prev",
      label: "PREV",
      html: '<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',
      attr: { "data-fancybox-prev": "" },
    },
    next: {
      type: "button",
      class: "fancybox__button--next",
      label: "NEXT",
      html: '<svg viewBox="0 0 24 24"><path d="M8 4l8 8-8 8"/></svg>',
      attr: { "data-fancybox-next": "" },
    },
    fullscreen: {
      type: "button",
      class: "fancybox__button--fullscreen",
      label: "TOGGLE_FULLSCREEN",
      html: `<svg viewBox="0 0 24 24">
                <g><path d="M3 8 V3h5"></path><path d="M21 8V3h-5"></path><path d="M8 21H3v-5"></path><path d="M16 21h5v-5"></path></g>
                <g><path d="M7 2v5H2M17 2v5h5M2 17h5v5M22 17h-5v5"/></g>
            </svg>`,
      click: function (t) {
        t.preventDefault(),
          $t.element()
            ? $t.deactivate()
            : $t.activate(this.fancybox.$container);
      },
    },
    slideshow: {
      type: "button",
      class: "fancybox__button--slideshow",
      label: "TOGGLE_SLIDESHOW",
      html: `<svg viewBox="0 0 24 24">
                <g><path d="M6 4v16"/><path d="M20 12L6 20"/><path d="M20 12L6 4"/></g>
                <g><path d="M7 4v15M17 4v15"/></g>
            </svg>`,
      click: function (t) {
        t.preventDefault(), this.Slideshow.toggle();
      },
    },
    zoom: {
      type: "button",
      class: "fancybox__button--zoom",
      label: "TOGGLE_ZOOM",
      html: '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7"></circle><path d="M16 16 L21 21"></svg>',
      click: function (t) {
        t.preventDefault();
        const e = this.fancybox.getSlide().Panzoom;
        e && e.toggleZoom();
      },
    },
    download: {
      type: "link",
      label: "DOWNLOAD",
      class: "fancybox__button--download",
      html: '<svg viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.62 2.48A2 2 0 004.56 21h14.88a2 2 0 001.94-1.51L22 17"/></svg>',
      click: function (t) {
        t.stopPropagation();
      },
    },
    thumbs: {
      type: "button",
      label: "TOGGLE_THUMBS",
      class: "fancybox__button--thumbs",
      html: '<svg viewBox="0 0 24 24"><circle cx="4" cy="4" r="1" /><circle cx="12" cy="4" r="1" transform="rotate(90 12 4)"/><circle cx="20" cy="4" r="1" transform="rotate(90 20 4)"/><circle cx="4" cy="12" r="1" transform="rotate(90 4 12)"/><circle cx="12" cy="12" r="1" transform="rotate(90 12 12)"/><circle cx="20" cy="12" r="1" transform="rotate(90 20 12)"/><circle cx="4" cy="20" r="1" transform="rotate(90 4 20)"/><circle cx="12" cy="20" r="1" transform="rotate(90 12 20)"/><circle cx="20" cy="20" r="1" transform="rotate(90 20 20)"/></svg>',
      click: function (t) {
        t.stopPropagation();
        const e = this.fancybox.plugins.Thumbs;
        e && e.toggle();
      },
    },
    close: {
      type: "button",
      label: "CLOSE",
      class: "fancybox__button--close",
      html: '<svg viewBox="0 0 24 24"><path d="M20 20L4 4m16 0L4 20"></path></svg>',
      attr: { "data-fancybox-close": "", tabindex: 0 },
    },
  },
};
class Zh {
  constructor(e) {
    (this.fancybox = e), (this.$container = null), (this.state = "init");
    for (const s of [
      "onInit",
      "onPrepare",
      "onDone",
      "onKeydown",
      "onClosing",
      "onChange",
      "onSettle",
      "onRefresh",
    ])
      this[s] = this[s].bind(this);
    this.events = {
      init: this.onInit,
      prepare: this.onPrepare,
      done: this.onDone,
      keydown: this.onKeydown,
      closing: this.onClosing,
      "Carousel.change": this.onChange,
      "Carousel.settle": this.onSettle,
      "Carousel.Panzoom.touchStart": () => this.onRefresh(),
      "Image.startAnimation": (s, n) => this.onRefresh(n),
      "Image.afterUpdate": (s, n) => this.onRefresh(n),
    };
  }
  onInit() {
    if (this.fancybox.option("Toolbar.autoEnable")) {
      let e = !1;
      for (const s of this.fancybox.items)
        if (s.type === "image") {
          e = !0;
          break;
        }
      if (!e) return void (this.state = "disabled");
    }
    for (const e of this.fancybox.option("Toolbar.display"))
      if ((qs(e) ? e.id : e) === "close") {
        this.fancybox.options.closeButton = !1;
        break;
      }
  }
  onPrepare() {
    const e = this.fancybox;
    if (
      this.state === "init" &&
      (this.build(),
      this.update(),
      (this.Slideshow = new Rg(e)),
      !e.Carousel.prevPage &&
        (e.option("slideshow.autoStart") && this.Slideshow.activate(),
        e.option("fullscreen.autoStart") && !$t.element()))
    )
      try {
        $t.activate(e.$container);
      } catch {}
  }
  onFsChange() {
    window.scrollTo($t.pageXOffset, $t.pageYOffset);
  }
  onSettle() {
    const e = this.fancybox,
      s = this.Slideshow;
    s &&
      s.isActive() &&
      (e.getSlide().index !== e.Carousel.slides.length - 1 ||
      e.option("infinite")
        ? e.getSlide().state === "done" && s.setTimer()
        : s.deactivate());
  }
  onChange() {
    this.update(),
      this.Slideshow &&
        this.Slideshow.isActive() &&
        this.Slideshow.clearTimer();
  }
  onDone(e, s) {
    const n = this.Slideshow;
    s.index === e.getSlide().index &&
      (this.update(),
      n &&
        n.isActive() &&
        (e.option("infinite") || s.index !== e.Carousel.slides.length - 1
          ? n.setTimer()
          : n.deactivate()));
  }
  onRefresh(e) {
    (e && e.index !== this.fancybox.getSlide().index) ||
      (this.update(),
      !this.Slideshow ||
        !this.Slideshow.isActive() ||
        (e && e.state !== "done") ||
        this.Slideshow.deactivate());
  }
  onKeydown(e, s, n) {
    s === " " &&
      this.Slideshow &&
      (this.Slideshow.toggle(), n.preventDefault());
  }
  onClosing() {
    this.Slideshow && this.Slideshow.deactivate(),
      document.removeEventListener("fullscreenchange", this.onFsChange);
  }
  createElement(e) {
    let s;
    e.type === "div"
      ? (s = document.createElement("div"))
      : ((s = document.createElement(e.type === "link" ? "a" : "button")),
        s.classList.add("carousel__button")),
      (s.innerHTML = e.html),
      s.setAttribute("tabindex", e.tabindex || 0),
      e.class && s.classList.add(...e.class.split(" "));
    for (const i in e.attr) s.setAttribute(i, e.attr[i]);
    e.label &&
      s.setAttribute("title", this.fancybox.localize(`{{${e.label}}}`)),
      e.click && s.addEventListener("click", e.click.bind(this)),
      e.id === "prev" && s.setAttribute("data-fancybox-prev", ""),
      e.id === "next" && s.setAttribute("data-fancybox-next", "");
    const n = s.querySelector("svg");
    return (
      n &&
        (n.setAttribute("role", "img"),
        n.setAttribute("tabindex", "-1"),
        n.setAttribute("xmlns", "http://www.w3.org/2000/svg")),
      s
    );
  }
  build() {
    this.cleanup();
    const e = this.fancybox.option("Toolbar.items"),
      s = [
        { position: "left", items: [] },
        { position: "center", items: [] },
        { position: "right", items: [] },
      ],
      n = this.fancybox.plugins.Thumbs;
    for (const o of this.fancybox.option("Toolbar.display")) {
      let r, l;
      if (
        (qs(o) ? ((r = o.id), (l = ze({}, e[r], o))) : ((r = o), (l = e[r])),
        ["counter", "next", "prev", "slideshow"].includes(r) &&
          this.fancybox.items.length < 2)
      )
        continue;
      if (r === "fullscreen") {
        if (!document.fullscreenEnabled || window.fullScreen) continue;
        document.addEventListener("fullscreenchange", this.onFsChange);
      }
      if ((r === "thumbs" && (!n || n.state === "disabled")) || !l) continue;
      let a = l.position || "right",
        c = s.find((h) => h.position === a);
      c && c.items.push(l);
    }
    const i = document.createElement("div");
    i.classList.add("fancybox__toolbar");
    for (const o of s)
      if (o.items.length) {
        const r = document.createElement("div");
        r.classList.add("fancybox__toolbar__items"),
          r.classList.add(`fancybox__toolbar__items--${o.position}`);
        for (const l of o.items) r.appendChild(this.createElement(l));
        i.appendChild(r);
      }
    this.fancybox.$carousel.parentNode.insertBefore(i, this.fancybox.$carousel),
      (this.$container = i);
  }
  update() {
    const e = this.fancybox.getSlide(),
      s = e.index,
      n = this.fancybox.items.length,
      i = e.downloadSrc || (e.type !== "image" || e.error ? null : e.src);
    for (const l of this.fancybox.$container.querySelectorAll(
      "a.fancybox__button--download"
    ))
      i
        ? (l.removeAttribute("disabled"),
          l.removeAttribute("tabindex"),
          l.setAttribute("href", i),
          l.setAttribute("download", i),
          l.setAttribute("target", "_blank"))
        : (l.setAttribute("disabled", ""),
          l.setAttribute("tabindex", -1),
          l.removeAttribute("href"),
          l.removeAttribute("download"));
    const o = e.Panzoom,
      r = o && o.option("maxScale") > o.option("baseScale");
    for (const l of this.fancybox.$container.querySelectorAll(
      ".fancybox__button--zoom"
    ))
      r ? l.removeAttribute("disabled") : l.setAttribute("disabled", "");
    for (const l of this.fancybox.$container.querySelectorAll(
      "[data-fancybox-index]"
    ))
      l.innerHTML = e.index + 1;
    for (const l of this.fancybox.$container.querySelectorAll(
      "[data-fancybox-count]"
    ))
      l.innerHTML = n;
    if (!this.fancybox.option("infinite")) {
      for (const l of this.fancybox.$container.querySelectorAll(
        "[data-fancybox-prev]"
      ))
        s === 0
          ? l.setAttribute("disabled", "")
          : l.removeAttribute("disabled");
      for (const l of this.fancybox.$container.querySelectorAll(
        "[data-fancybox-next]"
      ))
        s === n - 1
          ? l.setAttribute("disabled", "")
          : l.removeAttribute("disabled");
    }
  }
  cleanup() {
    this.Slideshow && this.Slideshow.isActive() && this.Slideshow.clearTimer(),
      this.$container && this.$container.remove(),
      (this.$container = null);
  }
  attach() {
    this.fancybox.on(this.events);
  }
  detach() {
    this.fancybox.off(this.events), this.cleanup();
  }
}
Zh.defaults = Fg;
const Dg = {
    ScrollLock: class {
      constructor(t) {
        (this.fancybox = t),
          (this.viewport = null),
          (this.pendingUpdate = null);
        for (const e of ["onReady", "onResize", "onTouchstart", "onTouchmove"])
          this[e] = this[e].bind(this);
      }
      onReady() {
        const t = window.visualViewport;
        t &&
          ((this.viewport = t),
          (this.startY = 0),
          t.addEventListener("resize", this.onResize),
          this.updateViewport()),
          window.addEventListener("touchstart", this.onTouchstart, {
            passive: !1,
          }),
          window.addEventListener("touchmove", this.onTouchmove, {
            passive: !1,
          }),
          window.addEventListener("wheel", this.onWheel, { passive: !1 });
      }
      onResize() {
        this.updateViewport();
      }
      updateViewport() {
        const t = this.fancybox,
          e = this.viewport,
          s = e.scale || 1,
          n = t.$container;
        if (!n) return;
        let i = "",
          o = "",
          r = "";
        s - 1 > 0.1 &&
          ((i = e.width * s + "px"),
          (o = e.height * s + "px"),
          (r = `translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0) scale(${
            1 / s
          })`)),
          (n.style.width = i),
          (n.style.height = o),
          (n.style.transform = r);
      }
      onTouchstart(t) {
        this.startY = t.touches ? t.touches[0].screenY : t.screenY;
      }
      onTouchmove(t) {
        const e = this.startY,
          s = window.innerWidth / window.document.documentElement.clientWidth;
        if (!t.cancelable || t.touches.length > 1 || s !== 1) return;
        const n = Ni(t.composedPath()[0]);
        if (!n) return void t.preventDefault();
        const i = window.getComputedStyle(n),
          o = parseInt(i.getPropertyValue("height"), 10),
          r = t.touches ? t.touches[0].screenY : t.screenY,
          l = e <= r && n.scrollTop === 0,
          a = e >= r && n.scrollHeight - n.scrollTop === o;
        (l || a) && t.preventDefault();
      }
      onWheel(t) {
        Ni(t.composedPath()[0]) || t.preventDefault();
      }
      cleanup() {
        this.pendingUpdate &&
          (cancelAnimationFrame(this.pendingUpdate),
          (this.pendingUpdate = null));
        const t = this.viewport;
        t &&
          (t.removeEventListener("resize", this.onResize),
          (this.viewport = null)),
          window.removeEventListener("touchstart", this.onTouchstart, !1),
          window.removeEventListener("touchmove", this.onTouchmove, !1),
          window.removeEventListener("wheel", this.onWheel, { passive: !1 });
      }
      attach() {
        this.fancybox.on("initLayout", this.onReady);
      }
      detach() {
        this.fancybox.off("initLayout", this.onReady), this.cleanup();
      }
    },
    Thumbs: Xh,
    Html: Yh,
    Toolbar: Zh,
    Image: Jh,
    Hash: ut,
  },
  Qh = {
    startIndex: 0,
    preload: 1,
    infinite: !0,
    showClass: "fancybox-zoomInUp",
    hideClass: "fancybox-fadeOut",
    animated: !0,
    hideScrollbar: !0,
    parentEl: null,
    mainClass: null,
    autoFocus: !0,
    trapFocus: !0,
    placeFocusBack: !0,
    click: "close",
    closeButton: "inside",
    dragToClose: !0,
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    template: {
      closeButton:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>',
      spinner:
        '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
      main: null,
    },
    l10n: {
      CLOSE: "Close",
      NEXT: "Next",
      PREV: "Previous",
      MODAL: "You can close this modal content with the ESC key",
      ERROR: "Something Went Wrong, Please Try Again Later",
      IMAGE_ERROR: "Image Not Found",
      ELEMENT_NOT_FOUND: "HTML Element Not Found",
      AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
      AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
      IFRAME_ERROR: "Error Loading Page",
      TOGGLE_ZOOM: "Toggle zoom level",
      TOGGLE_THUMBS: "Toggle thumbnails",
      TOGGLE_SLIDESHOW: "Toggle slideshow",
      TOGGLE_FULLSCREEN: "Toggle full-screen mode",
      DOWNLOAD: "Download",
    },
  },
  nn = new Map();
let Bg = 0;
class ee extends zr {
  constructor(e, s = {}) {
    (e = e.map(
      (n) => (
        n.width && (n._width = n.width), n.height && (n._height = n.height), n
      )
    )),
      super(ze(!0, {}, Qh, s)),
      this.bindHandlers(),
      (this.state = "init"),
      this.setItems(e),
      this.attachPlugins(ee.Plugins),
      this.trigger("init"),
      this.option("hideScrollbar") === !0 && this.hideScrollbar(),
      this.initLayout(),
      this.initCarousel(),
      this.attachEvents(),
      nn.set(this.id, this),
      this.trigger("prepare"),
      (this.state = "ready"),
      this.trigger("ready"),
      this.$container.setAttribute("aria-hidden", "false"),
      this.option("trapFocus") && this.focus();
  }
  option(e, ...s) {
    const n = this.getSlide();
    let i = n ? n[e] : void 0;
    return i !== void 0
      ? (typeof i == "function" && (i = i.call(this, this, ...s)), i)
      : super.option(e, ...s);
  }
  bindHandlers() {
    for (const e of [
      "onMousedown",
      "onKeydown",
      "onClick",
      "onFocus",
      "onCreateSlide",
      "onSettle",
      "onTouchMove",
      "onTouchEnd",
      "onTransform",
    ])
      this[e] = this[e].bind(this);
  }
  attachEvents() {
    document.addEventListener("mousedown", this.onMousedown),
      document.addEventListener("keydown", this.onKeydown, !0),
      this.option("trapFocus") &&
        document.addEventListener("focus", this.onFocus, !0),
      this.$container.addEventListener("click", this.onClick);
  }
  detachEvents() {
    document.removeEventListener("mousedown", this.onMousedown),
      document.removeEventListener("keydown", this.onKeydown, !0),
      document.removeEventListener("focus", this.onFocus, !0),
      this.$container.removeEventListener("click", this.onClick);
  }
  initLayout() {
    this.$root = this.option("parentEl") || document.body;
    let e = this.option("template.main");
    e &&
      (this.$root.insertAdjacentHTML("beforeend", this.localize(e)),
      (this.$container = this.$root.querySelector(".fancybox__container"))),
      this.$container ||
        ((this.$container = document.createElement("div")),
        this.$root.appendChild(this.$container)),
      (this.$container.onscroll = () => ((this.$container.scrollLeft = 0), !1)),
      Object.entries({
        class: "fancybox__container",
        role: "dialog",
        tabIndex: "-1",
        "aria-modal": "true",
        "aria-hidden": "true",
        "aria-label": this.localize("{{MODAL}}"),
      }).forEach((n) => this.$container.setAttribute(...n)),
      this.option("animated") && this.$container.classList.add("is-animated"),
      (this.$backdrop = this.$container.querySelector(".fancybox__backdrop")),
      this.$backdrop ||
        ((this.$backdrop = document.createElement("div")),
        this.$backdrop.classList.add("fancybox__backdrop"),
        this.$container.appendChild(this.$backdrop)),
      (this.$carousel = this.$container.querySelector(".fancybox__carousel")),
      this.$carousel ||
        ((this.$carousel = document.createElement("div")),
        this.$carousel.classList.add("fancybox__carousel"),
        this.$container.appendChild(this.$carousel)),
      (this.$container.Fancybox = this),
      (this.id = this.$container.getAttribute("id")),
      this.id ||
        ((this.id = this.options.id || ++Bg),
        this.$container.setAttribute("id", "fancybox-" + this.id));
    const s = this.option("mainClass");
    return (
      s && this.$container.classList.add(...s.split(" ")),
      document.documentElement.classList.add("with-fancybox"),
      this.trigger("initLayout"),
      this
    );
  }
  setItems(e) {
    const s = [];
    for (const n of e) {
      const i = n.$trigger;
      if (i) {
        const l = i.dataset || {};
        (n.src = l.src || i.getAttribute("href") || n.src),
          (n.type = l.type || n.type),
          !n.src &&
            i instanceof HTMLImageElement &&
            (n.src = i.currentSrc || n.$trigger.src);
      }
      let o = n.$thumb;
      if (!o) {
        let l = n.$trigger && n.$trigger.origTarget;
        l &&
          (o =
            l instanceof HTMLImageElement
              ? l
              : l.querySelector("img:not([aria-hidden])")),
          !o &&
            n.$trigger &&
            (o =
              n.$trigger instanceof HTMLImageElement
                ? n.$trigger
                : n.$trigger.querySelector("img:not([aria-hidden])"));
      }
      n.$thumb = o || null;
      let r = n.thumb;
      !r &&
        o &&
        ((r = o.currentSrc || o.src),
        !r && o.dataset && (r = o.dataset.lazySrc || o.dataset.src)),
        r || n.type !== "image" || (r = n.src),
        (n.thumb = r || null),
        (n.caption = n.caption || ""),
        s.push(n);
    }
    this.items = s;
  }
  initCarousel() {
    return (
      (this.Carousel = new es(
        this.$carousel,
        ze(
          !0,
          {},
          {
            prefix: "",
            classNames: {
              viewport: "fancybox__viewport",
              track: "fancybox__track",
              slide: "fancybox__slide",
            },
            textSelection: !0,
            preload: this.option("preload"),
            friction: 0.88,
            slides: this.items,
            initialPage: this.options.startIndex,
            slidesPerPage: 1,
            infiniteX: this.option("infinite"),
            infiniteY: !0,
            l10n: this.option("l10n"),
            Dots: !1,
            Navigation: {
              classNames: {
                main: "fancybox__nav",
                button: "carousel__button",
                next: "is-next",
                prev: "is-prev",
              },
            },
            Panzoom: {
              textSelection: !0,
              panOnlyZoomed: () =>
                this.Carousel &&
                this.Carousel.pages &&
                this.Carousel.pages.length < 2 &&
                !this.option("dragToClose"),
              lockAxis: () => {
                if (this.Carousel) {
                  let e = "x";
                  return this.option("dragToClose") && (e += "y"), e;
                }
              },
            },
            on: {
              "*": (e, ...s) => this.trigger(`Carousel.${e}`, ...s),
              init: (e) => (this.Carousel = e),
              createSlide: this.onCreateSlide,
              settle: this.onSettle,
            },
          },
          this.option("Carousel")
        )
      )),
      this.option("dragToClose") &&
        this.Carousel.Panzoom.on({
          touchMove: this.onTouchMove,
          afterTransform: this.onTransform,
          touchEnd: this.onTouchEnd,
        }),
      this.trigger("initCarousel"),
      this
    );
  }
  onCreateSlide(e, s) {
    let n = s.caption || "";
    if (
      (typeof this.options.caption == "function" &&
        (n = this.options.caption.call(this, this, this.Carousel, s)),
      typeof n == "string" && n.length)
    ) {
      const i = document.createElement("div"),
        o = `fancybox__caption_${this.id}_${s.index}`;
      (i.className = "fancybox__caption"),
        (i.innerHTML = n),
        i.setAttribute("id", o),
        (s.$caption = s.$el.appendChild(i)),
        s.$el.classList.add("has-caption"),
        s.$el.setAttribute("aria-labelledby", o);
    }
  }
  onSettle() {
    this.option("autoFocus") && this.focus();
  }
  onFocus(e) {
    this.isTopmost() && this.focus(e);
  }
  onClick(e) {
    if (e.defaultPrevented) return;
    let s = e.composedPath()[0];
    if (s.matches("[data-fancybox-close]"))
      return e.preventDefault(), void ee.close(!1, e);
    if (s.matches("[data-fancybox-next]"))
      return e.preventDefault(), void ee.next();
    if (s.matches("[data-fancybox-prev]"))
      return e.preventDefault(), void ee.prev();
    const n = document.activeElement;
    if (n) {
      if (n.closest("[contenteditable]")) return;
      s.matches(na) || n.blur();
    }
    if (
      !s.closest(".fancybox__content") &&
      !getSelection().toString().length &&
      this.trigger("click", e) !== !1
    )
      switch (this.option("click")) {
        case "close":
          this.close();
          break;
        case "next":
          this.next();
      }
  }
  onTouchMove() {
    const e = this.getSlide().Panzoom;
    return !e || e.content.scale === 1;
  }
  onTouchEnd(e) {
    const s = e.dragOffset.y;
    Math.abs(s) >= 150 || (Math.abs(s) >= 35 && e.dragOffset.time < 350)
      ? (this.option("hideClass") &&
          (this.getSlide().hideClass =
            "fancybox-throwOut" + (e.content.y < 0 ? "Up" : "Down")),
        this.close())
      : e.lockAxis === "y" && e.panTo({ y: 0 });
  }
  onTransform(e) {
    if (this.$backdrop) {
      const s = Math.abs(e.content.y),
        n =
          s < 1
            ? ""
            : Math.max(0.33, Math.min(1, 1 - (s / e.content.fitHeight) * 1.5));
      this.$container.style.setProperty("--fancybox-ts", n ? "0s" : ""),
        this.$container.style.setProperty("--fancybox-opacity", n);
    }
  }
  onMousedown() {
    this.state === "ready" && document.body.classList.add("is-using-mouse");
  }
  onKeydown(e) {
    if (!this.isTopmost()) return;
    document.body.classList.remove("is-using-mouse");
    const s = e.key,
      n = this.option("keyboard");
    if (!n || e.ctrlKey || e.altKey || e.shiftKey) return;
    const i = e.composedPath()[0],
      o = document.activeElement && document.activeElement.classList,
      r = o && o.contains("carousel__button");
    if (
      (s !== "Escape" &&
        !r &&
        (e.target.isContentEditable ||
          ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(
            i.nodeName
          ) !== -1)) ||
      this.trigger("keydown", s, e) === !1
    )
      return;
    const l = n[s];
    typeof this[l] == "function" && this[l]();
  }
  getSlide() {
    const e = this.Carousel;
    if (!e) return null;
    const s = e.page === null ? e.option("initialPage") : e.page,
      n = e.pages || [];
    return n.length && n[s] ? n[s].slides[0] : null;
  }
  focus(e) {
    if (
      ee.ignoreFocusChange ||
      ["init", "closing", "customClosing", "destroy"].indexOf(this.state) > -1
    )
      return;
    const s = this.$container,
      n = this.getSlide(),
      i = n.state === "done" ? n.$el : null;
    if (i && i.contains(document.activeElement)) return;
    e && e.preventDefault(), (ee.ignoreFocusChange = !0);
    const o = Array.from(s.querySelectorAll(na));
    let r,
      l = [];
    for (let a of o) {
      const c = a.offsetParent,
        h = i && i.contains(a),
        u = !this.Carousel.$viewport.contains(a);
      c && (h || u)
        ? (l.push(a),
          a.dataset.origTabindex !== void 0 &&
            ((a.tabIndex = a.dataset.origTabindex),
            a.removeAttribute("data-orig-tabindex")),
          (a.hasAttribute("autoFocus") ||
            (!r && h && !a.classList.contains("carousel__button"))) &&
            (r = a))
        : ((a.dataset.origTabindex =
            a.dataset.origTabindex === void 0
              ? a.getAttribute("tabindex")
              : a.dataset.origTabindex),
          (a.tabIndex = -1));
    }
    e
      ? l.indexOf(e.target) > -1
        ? (this.lastFocus = e.target)
        : this.lastFocus === s
        ? sn(l[l.length - 1])
        : sn(s)
      : this.option("autoFocus") && r
      ? sn(r)
      : l.indexOf(document.activeElement) < 0 && sn(s),
      (this.lastFocus = document.activeElement),
      (ee.ignoreFocusChange = !1);
  }
  hideScrollbar() {
    if (!Pi) return;
    const e =
        window.innerWidth -
        document.documentElement.getBoundingClientRect().width,
      s = "fancybox-style-noscroll";
    let n = document.getElementById(s);
    n ||
      (e > 0 &&
        ((n = document.createElement("style")),
        (n.id = s),
        (n.type = "text/css"),
        (n.innerHTML = `.compensate-for-scrollbar {padding-right: ${e}px;}`),
        document.getElementsByTagName("head")[0].appendChild(n),
        document.body.classList.add("compensate-for-scrollbar")));
  }
  revealScrollbar() {
    document.body.classList.remove("compensate-for-scrollbar");
    const e = document.getElementById("fancybox-style-noscroll");
    e && e.remove();
  }
  clearContent(e) {
    this.Carousel.trigger("removeSlide", e),
      e.$content && (e.$content.remove(), (e.$content = null)),
      e.$closeButton && (e.$closeButton.remove(), (e.$closeButton = null)),
      e._className && e.$el.classList.remove(e._className);
  }
  setContent(e, s, n = {}) {
    let i;
    const o = e.$el;
    if (s instanceof HTMLElement)
      ["img", "iframe", "video", "audio"].indexOf(s.nodeName.toLowerCase()) > -1
        ? ((i = document.createElement("div")), i.appendChild(s))
        : (i = s);
    else {
      const r = document.createRange().createContextualFragment(s);
      (i = document.createElement("div")), i.appendChild(r);
    }
    if (
      (e.filter && !e.error && (i = i.querySelector(e.filter)),
      i instanceof Element)
    )
      return (
        (e._className = `has-${n.suffix || e.type || "unknown"}`),
        o.classList.add(e._className),
        i.classList.add("fancybox__content"),
        (i.style.display !== "none" &&
          getComputedStyle(i).getPropertyValue("display") !== "none") ||
          (i.style.display =
            e.display || this.option("defaultDisplay") || "flex"),
        e.id && i.setAttribute("id", e.id),
        (e.$content = i),
        o.prepend(i),
        this.manageCloseButton(e),
        e.state !== "loading" && this.revealContent(e),
        i
      );
    this.setError(e, "{{ELEMENT_NOT_FOUND}}");
  }
  manageCloseButton(e) {
    const s =
      e.closeButton === void 0 ? this.option("closeButton") : e.closeButton;
    if (!s || (s === "top" && this.$closeButton)) return;
    const n = document.createElement("button");
    n.classList.add("carousel__button", "is-close"),
      n.setAttribute("title", this.options.l10n.CLOSE),
      (n.innerHTML = this.option("template.closeButton")),
      n.addEventListener("click", (i) => this.close(i)),
      s === "inside"
        ? (e.$closeButton && e.$closeButton.remove(),
          (e.$closeButton = e.$content.appendChild(n)))
        : (this.$closeButton = this.$container.insertBefore(
            n,
            this.$container.firstChild
          ));
  }
  revealContent(e) {
    this.trigger("reveal", e), (e.$content.style.visibility = "");
    let s = !1;
    e.error ||
      e.state === "loading" ||
      this.Carousel.prevPage !== null ||
      e.index !== this.options.startIndex ||
      (s = e.showClass === void 0 ? this.option("showClass") : e.showClass),
      s
        ? ((e.state = "animating"),
          this.animateCSS(e.$content, s, () => {
            this.done(e);
          }))
        : this.done(e);
  }
  animateCSS(e, s, n) {
    if (
      (e &&
        e.dispatchEvent(
          new CustomEvent("animationend", { bubbles: !0, cancelable: !0 })
        ),
      !e || !s)
    )
      return void (typeof n == "function" && n());
    const i = function (o) {
      o.currentTarget === this &&
        (e.removeEventListener("animationend", i),
        n && n(),
        e.classList.remove(s));
    };
    e.addEventListener("animationend", i), e.classList.add(s);
  }
  done(e) {
    (e.state = "done"), this.trigger("done", e);
    const s = this.getSlide();
    s && e.index === s.index && this.option("autoFocus") && this.focus();
  }
  setError(e, s) {
    (e.error = s), this.hideLoading(e), this.clearContent(e);
    const n = document.createElement("div");
    n.classList.add("fancybox-error"),
      (n.innerHTML = this.localize(s || "<p>{{ERROR}}</p>")),
      this.setContent(e, n, { suffix: "error" });
  }
  showLoading(e) {
    (e.state = "loading"), e.$el.classList.add("is-loading");
    let s = e.$el.querySelector(".fancybox__spinner");
    s ||
      ((s = document.createElement("div")),
      s.classList.add("fancybox__spinner"),
      (s.innerHTML = this.option("template.spinner")),
      s.addEventListener("click", () => {
        this.Carousel.Panzoom.velocity || this.close();
      }),
      e.$el.prepend(s));
  }
  hideLoading(e) {
    const s = e.$el && e.$el.querySelector(".fancybox__spinner");
    s && (s.remove(), e.$el.classList.remove("is-loading")),
      e.state === "loading" && (this.trigger("load", e), (e.state = "ready"));
  }
  next() {
    const e = this.Carousel;
    e && e.pages.length > 1 && e.slideNext();
  }
  prev() {
    const e = this.Carousel;
    e && e.pages.length > 1 && e.slidePrev();
  }
  jumpTo(...e) {
    this.Carousel && this.Carousel.slideTo(...e);
  }
  isClosing() {
    return ["closing", "customClosing", "destroy"].includes(this.state);
  }
  isTopmost() {
    return ee.getInstance().id == this.id;
  }
  close(e) {
    if (
      (e && e.preventDefault(),
      this.isClosing() ||
        this.trigger("shouldClose", e) === !1 ||
        ((this.state = "closing"),
        this.Carousel.Panzoom.destroy(),
        this.detachEvents(),
        this.trigger("closing", e),
        this.state === "destroy"))
    )
      return;
    this.$container.setAttribute("aria-hidden", "true"),
      this.$container.classList.add("is-closing");
    const s = this.getSlide();
    if (
      (this.Carousel.slides.forEach((n) => {
        n.$content &&
          n.index !== s.index &&
          this.Carousel.trigger("removeSlide", n);
      }),
      this.state === "closing")
    ) {
      const n = s.hideClass === void 0 ? this.option("hideClass") : s.hideClass;
      this.animateCSS(
        s.$content,
        n,
        () => {
          this.destroy();
        },
        !0
      );
    }
  }
  destroy() {
    if (this.state === "destroy") return;
    (this.state = "destroy"), this.trigger("destroy");
    const e = this.option("placeFocusBack")
      ? this.option("triggerTarget", this.getSlide().$trigger)
      : null;
    this.Carousel.destroy(),
      this.detachPlugins(),
      (this.Carousel = null),
      (this.options = {}),
      (this.events = {}),
      this.$container.remove(),
      (this.$container = this.$backdrop = this.$carousel = null),
      e && sn(e),
      nn.delete(this.id);
    const s = ee.getInstance();
    s
      ? s.focus()
      : (document.documentElement.classList.remove("with-fancybox"),
        document.body.classList.remove("is-using-mouse"),
        this.revealScrollbar());
  }
  static show(e, s = {}) {
    return new ee(e, s);
  }
  static fromEvent(e, s = {}) {
    if (
      e.defaultPrevented ||
      (e.button && e.button !== 0) ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    )
      return;
    const n = e.composedPath()[0];
    let i,
      o,
      r,
      l = n;
    if (
      ((l.matches("[data-fancybox-trigger]") ||
        (l = l.closest("[data-fancybox-trigger]"))) &&
        ((s.triggerTarget = l),
        (i = l && l.dataset && l.dataset.fancyboxTrigger)),
      i)
    ) {
      const c = document.querySelectorAll(`[data-fancybox="${i}"]`),
        h = parseInt(l.dataset.fancyboxIndex, 10) || 0;
      l = c.length ? c[h] : l;
    }
    Array.from(ee.openers.keys())
      .reverse()
      .some((c) => {
        r = l || n;
        let h = !1;
        try {
          r instanceof Element &&
            (typeof c == "string" || c instanceof String) &&
            (h = r.matches(c) || (r = r.closest(c)));
        } catch {}
        return !!h && (e.preventDefault(), (o = c), !0);
      });
    let a = !1;
    if (o) {
      (s.event = e),
        (s.target = r),
        (r.origTarget = n),
        (a = ee.fromOpener(o, s));
      const c = ee.getInstance();
      c &&
        c.state === "ready" &&
        e.detail &&
        document.body.classList.add("is-using-mouse");
    }
    return a;
  }
  static fromOpener(e, s = {}) {
    let n = [],
      i = s.startIndex || 0,
      o = s.target || null;
    const r =
        (s = ze({}, s, ee.openers.get(e))).groupAll !== void 0 && s.groupAll,
      l = s.groupAttr === void 0 ? "data-fancybox" : s.groupAttr,
      a = l && o ? o.getAttribute(`${l}`) : "";
    if (!o || a || r) {
      const h = s.root || (o ? o.getRootNode() : document.body);
      n = [].slice.call(h.querySelectorAll(e));
    }
    if (
      (o && !r && (n = a ? n.filter((h) => h.getAttribute(`${l}`) === a) : [o]),
      !n.length)
    )
      return !1;
    const c = ee.getInstance();
    return (
      !(c && n.indexOf(c.options.$trigger) > -1) &&
      ((i = o ? n.indexOf(o) : i),
      (n = n.map(function (h) {
        const u = ["false", "0", "no", "null", "undefined"],
          f = ["true", "1", "yes"],
          d = Object.assign({}, h.dataset),
          m = {};
        for (let [w, $] of Object.entries(d))
          if (w !== "fancybox")
            if (w === "width" || w === "height") m[`_${w}`] = $;
            else if (typeof $ == "string" || $ instanceof String)
              if (u.indexOf($) > -1) m[w] = !1;
              else if (f.indexOf(m[w]) > -1) m[w] = !0;
              else
                try {
                  m[w] = JSON.parse($);
                } catch {
                  m[w] = $;
                }
            else m[w] = $;
        return h instanceof Element && (m.$trigger = h), m;
      })),
      new ee(n, ze({}, s, { startIndex: i, $trigger: o })))
    );
  }
  static bind(e, s = {}) {
    function n() {
      document.body.addEventListener("click", ee.fromEvent, !1);
    }
    Pi &&
      (ee.openers.size ||
        (/complete|interactive|loaded/.test(document.readyState)
          ? n()
          : document.addEventListener("DOMContentLoaded", n)),
      ee.openers.set(e, s));
  }
  static unbind(e) {
    ee.openers.delete(e), ee.openers.size || ee.destroy();
  }
  static destroy() {
    let e;
    for (; (e = ee.getInstance()); ) e.destroy();
    (ee.openers = new Map()),
      document.body.removeEventListener("click", ee.fromEvent, !1);
  }
  static getInstance(e) {
    return e
      ? nn.get(e)
      : Array.from(nn.values())
          .reverse()
          .find((s) => !s.isClosing() && s) || null;
  }
  static close(e = !0, s) {
    if (e) for (const n of nn.values()) n.close(s);
    else {
      const n = ee.getInstance();
      n && n.close(s);
    }
  }
  static next() {
    const e = ee.getInstance();
    e && e.next();
  }
  static prev() {
    const e = ee.getInstance();
    e && e.prev();
  }
}
(ee.version = "4.0.31"),
  (ee.defaults = Qh),
  (ee.openers = new Map()),
  (ee.Plugins = Dg),
  ee.bind("[data-fancybox]");
for (const [t, e] of Object.entries(ee.Plugins || {}))
  typeof e.create == "function" && e.create(ee);
const Mt = (t, e) => {
    const s = t.__vccOpts || t;
    for (const [n, i] of e) s[n] = i;
    return s;
  },
  Hg = {
    emits: ["selected"],
    props: {
      options: {
        type: Array,
        default() {
          return [];
        },
      },
      defaultValue: { type: [String, Number], default: null },
      maxWidth: { type: [String], default: "w-56" },
      idSelect: { type: [String], default: "1" },
    },
    data() {
      return {
        selectedValue: { color: "transparent", name: "Цвет" },
        tagsArr: [],
        isOpen: !1,
      };
    },
    mounted() {
      this.options.length &&
        this.defaultValue !== null &&
        ((this.selectedValue.color = this.options[this.defaultValue].color),
        (this.selectedValue.name = this.options[this.defaultValue].name));
    },
    methods: {
      openList() {
        this.isOpen = !this.isOpen;
      },
      selectItem(t) {
        (this.selectedValue.color = t.color),
          (this.selectedValue.name = t.name),
          (this.isOpen = !1),
          (t.id = this.idSelect),
          this.$emit("selected", t);
      },
      reset() {
        (this.selectedValue.color = "transparent"),
          (this.selectedValue.name = "Цвет");
      },
    },
  },
  Vg = { class: "flex gap-x-2 items-center" },
  qg = b(
    "path",
    {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19.5 8.25l-7.5 7.5-7.5-7.5",
    },
    null,
    -1
  ),
  zg = [qg],
  jg = {
    key: 0,
    class:
      "absolute right-0 top-10 lg:top-[52px] xl:top-14 w-full bg-white shadow-lg border border-gray-300 rounded-md max-h-[320px] overflow-y-auto animate_list",
    style: { "z-index": "2" },
  },
  Ug = ["onClick"];
function Wg(t, e, s, n, i, o) {
  const r = Va("click-away");
  return (
    se(),
    he(
      "div",
      { class: me(["relative", s.maxWidth]) },
      [
        b(
          "div",
          {
            class:
              "rounded-full flex justify-between items-center text-sm lg:text-base border border-black pl-5 pr-4 py-2 lg:py-2.5 xl:py-3 w-full cursor-pointer select-none",
            onClick: e[0] || (e[0] = (...l) => o.openList && o.openList(...l)),
          },
          [
            b("div", Vg, [
              i.selectedValue.color !== "transparent"
                ? (se(),
                  he(
                    "div",
                    {
                      key: 0,
                      class: "rounded-full w-4 h-4 lg:w-5 lg:h-5",
                      style: gs({ "background-color": i.selectedValue.color }),
                    },
                    null,
                    4
                  ))
                : Zt("", !0),
              b("div", null, we(i.selectedValue.name), 1),
            ]),
            (se(),
            he(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                "stroke-width": "1.5",
                stroke: "currentColor",
                class: me([
                  "w-4 h-4 transition-transform",
                  { "rotate-180": i.isOpen },
                ]),
              },
              zg,
              2
            )),
          ]
        ),
        i.isOpen
          ? ce(
              (se(),
              he("div", jg, [
                (se(!0),
                he(
                  fe,
                  null,
                  Lt(
                    s.options,
                    (l, a) => (
                      se(),
                      he(
                        "div",
                        {
                          key: a,
                          onClick: (c) => o.selectItem(l),
                          class:
                            "flex items-center text-sm lg:text-base gap-x-2 pl-5 pr-4 py-2 hover:bg-gray-200 cursor-pointer",
                        },
                        [
                          b(
                            "div",
                            {
                              class: "rounded-full w-4 h-4 lg:w-5 lg:h-5",
                              style: gs({ "background-color": l.color }),
                            },
                            null,
                            4
                          ),
                          b("div", null, we(l.name), 1),
                        ],
                        8,
                        Ug
                      )
                    )
                  ),
                  128
                )),
              ])),
              [[r, o.openList]]
            )
          : Zt("", !0),
      ],
      2
    )
  );
}
const Kg = Mt(Hg, [["render", Wg]]),
  Xg = {
    props: { success_show: { type: [Boolean], default: !1 } },
    data() {
      return {
        req_name: "",
        req_spec: "",
        req_mail: "",
        req_phone: "",
        req_code: "",
        novalid_name: !1,
        novalid_mail: !1,
        novalid_phone: !1,
        novalid_spec: !1,
        agree: !1,
        formShow: !1,
        popupShow: !1,
        csrf_token: "",
      };
    },
    mounted() {
      let t = document.head.querySelector('meta[name="csrf-token"]');
      this.csrf_token = t.content;
    },
    methods: {
      show_dialog() {
        this.formShow = !this.formShow;
      },
      popup_dialog() {
        this.$refs.popup_wnd.show = !0;
      },
      validateEmail: function (t) {
        var e = /\S+@\S+\.\S+/;
        return e.test(t);
      },
      reqSend() {
        if (
          ((this.novalid_name = !1),
          (this.novalid_spec = !1),
          (this.novalid_phone = !1),
          (this.novalid_mail = !1),
          this.req_name.length === 0 && (this.novalid_name = !0),
          this.req_spec.length === 0 && (this.novalid_spec = !0),
          this.req_phone.length < 10 && (this.novalid_phone = !0),
          (this.req_mail == "" || !this.validateEmail(this.req_mail)) &&
            (this.novalid_mail = !0),
          this.novalid_name ||
            this.novalid_spec ||
            this.novalid_phone ||
            this.novalid_mail)
        )
          return !1;
        let t = this,
          e = new XMLHttpRequest();
        e.open("POST", "/request-sendform"),
          e.setRequestHeader("X-CSRF-TOKEN", this.csrf_token),
          e.setRequestHeader("Content-type", "application/json; charset=UTF-8"),
          e.setRequestHeader("accept", "application/json, text/plain, */*"),
          e.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
          (e.onload = function () {
            if (!(e.status >= 400)) {
              let s = JSON.parse(e.response);
              if (
                (s.resp == 0 &&
                  (t.show_dialog(), t.success_show && t.popup_dialog()),
                s.resp == 1)
              ) {
                let n = s.err,
                  i = "";
                for (let o in n)
                  for (let r of n[o])
                    i +=
                      "Ошибка. " +
                      r +
                      `
`;
                alert(i);
              }
              (s.resp == 2 || s.resp == 3 || s.resp == 4) && alert(s.err);
            }
          }),
          (e.onerror = function () {
            console.log(e.response);
          }),
          e.send(
            JSON.stringify({
              name: this.req_name,
              spec: this.req_spec,
              phone: this.req_phone,
              mail: this.req_mail,
              url: "",
            })
          );
      },
    },
  },
  Gg = b(
    "div",
    { class: "py-2 xl:text-2xl text-center font-bold select-none" },
    "Запрос материалов для проектирования",
    -1
  ),
  Yg = {
    class:
      "flex-grow flex-shrink-0 basis-auto py-1 px-3 min-h-[50px] max-h-[460px] xl:max-h-[600px] overflow-y-auto",
  },
  Jg = { class: "mt-3 mb-3" },
  Zg = b("span", { class: "text-red-600" }, "*", -1),
  Qg = { class: "mt-3 mb-3" },
  ey = b("span", { class: "text-red-600" }, "*", -1),
  ty = b("option", { value: "0", disabled: "" }, null, -1),
  sy = b("option", { value: "1" }, "Архитектор", -1),
  ny = b("option", { value: "2" }, "Девелопер", -1),
  iy = b("option", { value: "3" }, "Генподрядчик", -1),
  oy = b("option", { value: "4" }, "Гос. организация", -1),
  ry = b("option", { value: "5" }, "Частный заказчик", -1),
  ly = b("option", { value: "6" }, "Студент", -1),
  ay = b("option", { value: "7" }, "Другое", -1),
  cy = [ty, sy, ny, iy, oy, ry, ly, ay],
  hy = { class: "mt-3 mb-3" },
  uy = b("span", { class: "text-red-600" }, "*", -1),
  fy = { class: "mt-3 mb-3" },
  dy = b("span", { class: "text-red-600" }, "*", -1),
  py = { class: "mt-5 mb-3" },
  my = { class: "inline-flex cursor-pointer select-none" },
  gy = b(
    "span",
    { class: "ml-2 mr-6 text-sm lg:text-lg xl:text-xl" },
    'Ставя отметку, я даю согласие на обработку моих персональных данных (Федеральный закон № 152-ФЗ «О персональных данных») (слова "согласие на обработку моих персональных данных" должны содержать гиперссылку на данное согласие, которое у нас есть на сайте).',
    -1
  ),
  yy = { class: "text-right py-3 px-3" },
  by = ["disabled"],
  vy = b(
    "p",
    { class: "pt-1 lg:text-lg" },
    " Спасибо за вашу заявку! Мы свяжемся с Вами в ближайшее время и предоставим доступ к материалам для проектирования. ",
    -1
  );
function _y(t, e, s, n, i, o) {
  const r = $n("popup-window");
  return (
    se(),
    he(
      fe,
      null,
      [
        re(
          In,
          { duration: "500", name: "nested" },
          {
            default: pt(() => [
              i.formShow
                ? (se(),
                  he(
                    "div",
                    {
                      key: 0,
                      onClick:
                        e[7] ||
                        (e[7] = (...l) => o.show_dialog && o.show_dialog(...l)),
                      class:
                        "fixed flex top-0 left-0 w-full h-full justify-center items-center z-[154]",
                      style: { background: "rgba(0, 0, 0, 0.5)" },
                    },
                    [
                      b(
                        "div",
                        {
                          onClick: e[6] || (e[6] = Ji(() => {}, ["stop"])),
                          class:
                            "inner flex flex-col w-full max-w-[350px] xl:max-w-[500px] rounded-md p-2 xl:p-3 bg-white",
                        },
                        [
                          Gg,
                          b("div", Yg, [
                            b("div", Jg, [
                              b(
                                "div",
                                {
                                  class: me([
                                    "mb-1",
                                    { "text-red-600": i.novalid_name },
                                  ]),
                                },
                                [Ie("ФИО "), Zg],
                                2
                              ),
                              ce(
                                b(
                                  "input",
                                  {
                                    class: me([
                                      "rounded-[30px] w-full h-8 xl:h-12 xl:text-xl",
                                      { "border-red-600": i.novalid_name },
                                    ]),
                                    type: "text",
                                    "onUpdate:modelValue":
                                      e[0] || (e[0] = (l) => (i.req_name = l)),
                                  },
                                  null,
                                  2
                                ),
                                [[Ke, i.req_name, void 0, { trim: !0 }]]
                              ),
                            ]),
                            b("div", Qg, [
                              b(
                                "div",
                                {
                                  class: me([
                                    "block_title",
                                    { "text-red-600": i.novalid_spec },
                                  ]),
                                },
                                [Ie("Специализация "), ey],
                                2
                              ),
                              ce(
                                b(
                                  "select",
                                  {
                                    class: me([
                                      "rounded-[30px] w-full py-0 xl:py-2 h-8 xl:h-12 xl:text-xl",
                                      { "border-red-600": i.novalid_spec },
                                    ]),
                                    name: "req_spec",
                                    "onUpdate:modelValue":
                                      e[1] || (e[1] = (l) => (i.req_spec = l)),
                                    tabindex: "-1",
                                  },
                                  cy,
                                  2
                                ),
                                [[Sr, i.req_spec]]
                              ),
                            ]),
                            b("div", hy, [
                              b(
                                "div",
                                {
                                  class: me([
                                    "mb-1",
                                    { "text-red-600": i.novalid_phone },
                                  ]),
                                },
                                [Ie("Телефон "), uy],
                                2
                              ),
                              ce(
                                b(
                                  "input",
                                  {
                                    class: me([
                                      "rounded-[30px] w-full h-8 xl:h-12 xl:text-xl",
                                      { "border-red-600": i.novalid_mail },
                                    ]),
                                    type: "tel",
                                    "onUpdate:modelValue":
                                      e[2] || (e[2] = (l) => (i.req_phone = l)),
                                    placeholder: "+7 (495) 000-00-00",
                                  },
                                  null,
                                  2
                                ),
                                [[Ke, i.req_phone, void 0, { trim: !0 }]]
                              ),
                            ]),
                            b("div", fy, [
                              b(
                                "div",
                                {
                                  class: me([
                                    "mb-1",
                                    { "text-red-600": i.novalid_mail },
                                  ]),
                                },
                                [Ie("E-mail "), dy],
                                2
                              ),
                              ce(
                                b(
                                  "input",
                                  {
                                    class: me([
                                      "rounded-[30px] w-full h-8 xl:h-12 xl:text-xl",
                                      { "border-red-600": i.novalid_mail },
                                    ]),
                                    type: "text",
                                    "onUpdate:modelValue":
                                      e[3] || (e[3] = (l) => (i.req_mail = l)),
                                  },
                                  null,
                                  2
                                ),
                                [[Ke, i.req_mail, void 0, { trim: !0 }]]
                              ),
                            ]),
                            b("div", py, [
                              b("label", my, [
                                ce(
                                  b(
                                    "input",
                                    {
                                      class: "rounded-full mt-1",
                                      type: "checkbox",
                                      name: "agree",
                                      "onUpdate:modelValue":
                                        e[4] || (e[4] = (l) => (i.agree = l)),
                                    },
                                    null,
                                    512
                                  ),
                                  [[wt, i.agree]]
                                ),
                                gy,
                              ]),
                            ]),
                          ]),
                          b("div", yy, [
                            b(
                              "button",
                              {
                                class:
                                  "btn btn-black px-5 xl:px-8 py-1.5 xl:py-2.5",
                                onClick:
                                  e[5] ||
                                  (e[5] = (...l) =>
                                    o.reqSend && o.reqSend(...l)),
                                disabled: !i.agree,
                              },
                              "Отправить",
                              8,
                              by
                            ),
                          ]),
                        ]
                      ),
                    ]
                  ))
                : Zt("", !0),
            ]),
            _: 1,
          }
        ),
        re(
          r,
          { ref: "popup_wnd" },
          {
            header: pt(() => [Ie(" Запрос отправлен ")]),
            body: pt(() => [vy]),
            _: 1,
          },
          512
        ),
      ],
      64
    )
  );
}
const xy = Mt(Xg, [["render", _y]]),
  wy = {
    data() {
      return { show: !1 };
    },
    methods: {
      toggle_popup() {
        this.show = !this.show;
      },
    },
  },
  Sy = { class: "py-2 xl:text-2xl text-center font-bold select-none" },
  Cy = {
    class:
      "flex-grow flex-shrink-0 basis-auto py-1 px-3 min-h-[50px] max-h-[460px] xl:max-h-[600px] overflow-y-auto",
  },
  Ey = { class: "text-right py-3 px-3" };
function Ty(t, e, s, n, i, o) {
  return (
    se(),
    Ki(
      In,
      { duration: "500", name: "nested" },
      {
        default: pt(() => [
          i.show
            ? (se(),
              he(
                "div",
                {
                  key: 0,
                  onClick:
                    e[2] ||
                    (e[2] = (...r) => o.toggle_popup && o.toggle_popup(...r)),
                  class:
                    "fixed flex top-0 left-0 w-full h-full justify-center items-center z-[154]",
                  style: { background: "rgba(0, 0, 0, 0.5)" },
                },
                [
                  b(
                    "div",
                    {
                      onClick: e[1] || (e[1] = Ji(() => {}, ["stop"])),
                      class:
                        "inner flex flex-col w-full max-w-[350px] xl:max-w-[500px] rounded-md p-2 xl:p-3 bg-white",
                    },
                    [
                      b("div", Sy, [Eo(t.$slots, "header")]),
                      b("div", Cy, [Eo(t.$slots, "body")]),
                      b("div", Ey, [
                        b(
                          "button",
                          {
                            class: "btn btn-black px-8 xl:px-10 py-1.5 xl:py-2",
                            onClick:
                              e[0] ||
                              (e[0] = (...r) =>
                                o.toggle_popup && o.toggle_popup(...r)),
                          },
                          "Ok"
                        ),
                      ]),
                    ]
                  ),
                ]
              ))
            : Zt("", !0),
        ]),
        _: 3,
      }
    )
  );
}
const ky = Mt(wy, [["render", Ty]]),
  Ay = {
    data() {
      return {
        tags_string: "",
        tagsArr: [],
        projectsArr: [],
        checkedTags: [],
        no_img: "img/nophoto_prod.png",
        path_img: "storage-place/projects/",
      };
    },
    mounted() {
      if (!this.getSpCounter()) return;
      let t = this,
        e = new XMLHttpRequest();
      e.open("GET", "/projects-all"),
        (e.onload = function () {
          if (e.status >= 400) console.error(e.response);
          else {
            let s = JSON.parse(e.response);
            s.resp == 0
              ? ((t.tagsArr = JSON.parse(s.tags)),
                (t.projectsArr = JSON.parse(s.projects)))
              : console.log("Не вышло, ни разу");
          }
        }),
        (e.onerror = function () {
          console.log(e.response);
        }),
        e.send();
    },
    methods: {
      getPostsByTags: function () {
        if (this.checkedTags) {
          let t = this,
            e = this.checkedTags.join(),
            s = new XMLHttpRequest();
          s.open("GET", "/projects-all?tags=" + e),
            (s.onload = function () {
              if (s.status >= 400) console.error(s.response);
              else {
                let n = JSON.parse(s.response);
                n.resp == 0
                  ? (t.projectsArr = JSON.parse(n.projects))
                  : console.log("Не вышло, ни разу");
              }
            }),
            (s.onerror = function () {
              console.log(s.response);
            }),
            s.send();
        }
      },
      cutText(t, e, s = "") {
        let n = t.trim(),
          i = 0;
        return (
          s.length > 0 && (e += ", "),
          e.length + s.length,
          (i = 130),
          n.length <= i ? n : ((n = n.slice(0, i)), n.trim() + "...")
        );
      },
    },
  },
  $y = { class: "flex flex-wrap mt-4 pb-8" },
  Ny = ["value"],
  Py = { key: 0, class: "text-center px-4 py-8 text-lg lg:text-xl" },
  Ly = {
    class:
      "mt-8 lg:mt-10 mb-20 lg:mb-40 grid grid-cols-1 md:grid-cols-2 gap-y-10 xl:gap-y-20 gap-x-5 lg:gap-x-10 xl:gap-x-14 2xl:gap-x-28",
  },
  Oy = ["href"],
  Iy = { class: "pb-0.5 lg:pb-4 cursor-default" },
  My = ["src", "alt"],
  Ry = { class: "pt-5" },
  Fy = {
    class: "text-base xl:text-[26px] leading-tight font-bold overflow-hidden",
  },
  Dy = b("br", null, null, -1),
  By = { class: "text-sm xl:text-xl pt-2 lg:pt-5" };
function Hy(t, e, s, n, i, o) {
  return (
    se(),
    he(
      fe,
      null,
      [
        b("div", $y, [
          (se(!0),
          he(
            fe,
            null,
            Lt(
              i.tagsArr,
              (r) => (
                se(),
                he(
                  "label",
                  {
                    key: r.id,
                    class: me([
                      { "border-black": i.checkedTags.includes(r.id) },
                      "btn btn-filter text-black text-[10px] md:text-base xl:text-xl mr-2.5 md:mr-4 last:mr-0 mt-4",
                    ]),
                  },
                  [
                    Ie(we(r.name) + " ", 1),
                    ce(
                      b(
                        "input",
                        {
                          type: "checkbox",
                          class: "hidden",
                          "onUpdate:modelValue":
                            e[0] || (e[0] = (l) => (i.checkedTags = l)),
                          value: r.id,
                          onChange:
                            e[1] ||
                            (e[1] = (...l) =>
                              o.getPostsByTags && o.getPostsByTags(...l)),
                        },
                        null,
                        40,
                        Ny
                      ),
                      [[wt, i.checkedTags]]
                    ),
                  ],
                  2
                )
              )
            ),
            128
          )),
        ]),
        i.projectsArr.length == 0
          ? (se(), he("div", Py, "Совпадений с текущим выбором не найдено"))
          : Zt("", !0),
        b("div", Ly, [
          (se(!0),
          he(
            fe,
            null,
            Lt(
              i.projectsArr,
              (r) => (
                se(),
                he(
                  "a",
                  { key: r.id, class: "", href: "/projects/" + r.slug },
                  [
                    b("div", Iy, [
                      (se(!0),
                      he(
                        fe,
                        null,
                        Lt(
                          r.tags,
                          (l) => (
                            se(),
                            he(
                              "span",
                              {
                                key: l.id,
                                class: me([
                                  "text-xs md:text-sm lg:text-lg border border-gray-400 px-3 lg:px-6 py-1.5 mr-2.5 lg:mr-6 rounded-full text-center inline-block mb-2.5 lg:mb-0",
                                  {
                                    "font-bold border-black":
                                      i.checkedTags.includes(l.id),
                                  },
                                ]),
                              },
                              we(l.name),
                              3
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                    b("div", null, [
                      b(
                        "img",
                        {
                          class: "w-full",
                          src: r.cover
                            ? i.path_img + r.id + "/" + r.cover
                            : i.no_img,
                          alt: r.name,
                        },
                        null,
                        8,
                        My
                      ),
                    ]),
                    b("div", Ry, [
                      b("h2", Fy, [
                        Ie(we(r.city ? r.name + ", " : r.name), 1),
                        Dy,
                        Ie(we(r.city), 1),
                      ]),
                      b(
                        "p",
                        By,
                        we(o.cutText(r.description_short, r.name, r.city)),
                        1
                      ),
                    ]),
                  ],
                  8,
                  Oy
                )
              )
            ),
            128
          )),
        ]),
      ],
      64
    )
  );
}
const Vy = Mt(Ay, [["render", Hy]]),
  qy = {
    data() {
      return {
        csrf_token: "",
        tags_string: "",
        sub_mail: "",
        tagsArr: [],
        postsArr: [],
        checkedTags: [],
        no_img: "img/nophoto_prod.png",
        path_img: "storage-place/blog/",
        novalid_mail: !1,
        csrf_token: "",
      };
    },
    mounted() {
      if (!this.getSpCounter()) return;
      let t = this,
        e = document.head.querySelector('meta[name="csrf-token"]');
      this.csrf_token = e.content;
      let s = new XMLHttpRequest();
      s.open("GET", "/blog-all"),
        (s.onload = function () {
          if (s.status >= 400) console.error(s.response);
          else {
            let n = JSON.parse(s.response);
            n.resp == 0
              ? ((t.tagsArr = JSON.parse(n.tags)),
                (t.postsArr = JSON.parse(n.posts)))
              : console.log("Не вышло, ни разу");
          }
        }),
        (s.onerror = function () {
          console.log(s.response);
        }),
        s.send();
    },
    methods: {
      getPostsByTags() {
        if (this.checkedTags) {
          let t = this,
            e = this.checkedTags.join(),
            s = new XMLHttpRequest();
          s.open("GET", "/blog-all?tags=" + e),
            (s.onload = function () {
              if (s.status >= 400) console.error(s.response);
              else {
                let n = JSON.parse(s.response);
                n.resp == 0
                  ? (t.postsArr = JSON.parse(n.posts))
                  : console.log("Не вышло, ни разу");
              }
            }),
            (s.onerror = function () {
              console.log(s.response);
            }),
            s.send();
        }
      },
      validateEmail(t) {
        var e = /\S+@\S+\.\S+/;
        return e.test(t);
      },
      mailSend() {
        if (
          ((this.novalid_mail = !1),
          (this.sub_mail == "" || !this.validateEmail(this.sub_mail)) &&
            (this.novalid_mail = !0),
          this.novalid_mail)
        )
          return !1;
        let t = this,
          e = new XMLHttpRequest();
        e.open("POST", "/blog/usermail"),
          e.setRequestHeader("X-CSRF-TOKEN", this.csrf_token),
          e.setRequestHeader("Content-type", "application/json; charset=UTF-8"),
          e.setRequestHeader("accept", "application/json, text/plain, */*"),
          e.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
          (e.onload = function () {
            if (!(e.status >= 400)) {
              let s = JSON.parse(e.response);
              if (
                (s.resp == 0 &&
                  ((t.sub_mail = ""), (t.$refs.popup_wnd.show = !0)),
                s.resp == 1)
              ) {
                let n = s.err,
                  i = "";
                for (let o in n)
                  for (let r of n[o])
                    i +=
                      "Ошибка. " +
                      r +
                      `
`;
                alert(i);
              }
              s.resp == 2 && alert(s.err);
            }
          }),
          (e.onerror = function () {
            console.log(e.response);
          }),
          e.send(JSON.stringify({ sub_mail: this.sub_mail }));
      },
      cutText(t, e) {
        let s = t.trim();
        e.length;
        let n = 0;
        return (
          (n = 130), s.length <= n ? s : ((s = s.slice(0, n)), s.trim() + "...")
        );
      },
      dateFromString(t) {
        let e = new Date(t),
          s = new Intl.DateTimeFormat("ru", { dateStyle: "long" }).format(e);
        return s.substring(0, s.length - 3);
      },
    },
  },
  zy = { class: "flex flex-wrap mt-4 pb-8" },
  jy = ["value"],
  Uy = { key: 0, class: "text-center px-4 py-8 text-lg lg:text-xl" },
  Wy = {
    class: "grid grid-cols-1 gap-y-10 2xl:gap-y-20 mt-8 lg:mt-14 xl:mt-[66px]",
  },
  Ky = ["href"],
  Xy = { class: "md:flex md:flex-col md:justify-between" },
  Gy = { class: "text-sm xl:text-xl pb-4 xl:pb-8" },
  Yy = ["src", "alt"],
  Jy = { class: "flex flex-col justify-between" },
  Zy = {
    class:
      "text-base xl:text-[26px] pb-4 xl:pb-8 pt-8 xl:pt-16 leading-tight font-bold overflow-hidden",
  },
  Qy = {
    class: "text-base xl:text-[20px] leading-tight font-bold overflow-hidden",
  },
  eb = { class: "text-sm xl:text-xl pt-2 mb-2 lg:mb-3" },
  tb = { class: "lg:max-w-[600px] my-20" },
  sb = b(
    "div",
    {
      class:
        "font-bold text-2xl lg:text-4xl xl:text-[2.5rem] pt-5 lg:pt-20 mb-2",
    },
    "Подпишитесь на нашу рассылку ",
    -1
  ),
  nb = { class: "mt-8" },
  ib = { class: "block w-30" },
  ob = b(
    "span",
    { class: "block lg:text-lg xl:text-xl mb-2" },
    [b("b", null, "E-mail")],
    -1
  ),
  rb = { class: "text-red-500" },
  lb = { class: "mt-5" },
  ab = ["disabled"],
  cb = b(
    "p",
    { class: "py-4 md:text-lg text-center" },
    " Запрос успешно отправлен. Спасибо за вашу заявку!. ",
    -1
  );
function hb(t, e, s, n, i, o) {
  const r = $n("popup-window");
  return (
    se(),
    he(
      fe,
      null,
      [
        b("div", zy, [
          (se(!0),
          he(
            fe,
            null,
            Lt(
              i.tagsArr,
              (l) => (
                se(),
                he(
                  "label",
                  {
                    key: l.id,
                    class: me([
                      { "border-black": i.checkedTags.includes(l.id) },
                      "btn btn-filter text-black text-[10px] md:text-base xl:text-xl mr-2.5 md:mr-4 xl:mr-12 last:mr-0 mt-4",
                    ]),
                  },
                  [
                    Ie(we(l.name) + " ", 1),
                    ce(
                      b(
                        "input",
                        {
                          type: "checkbox",
                          class: "hidden",
                          "onUpdate:modelValue":
                            e[0] || (e[0] = (a) => (i.checkedTags = a)),
                          value: l.id,
                          onChange:
                            e[1] ||
                            (e[1] = (...a) =>
                              o.getPostsByTags && o.getPostsByTags(...a)),
                        },
                        null,
                        40,
                        jy
                      ),
                      [[wt, i.checkedTags]]
                    ),
                  ],
                  2
                )
              )
            ),
            128
          )),
        ]),
        i.postsArr.length == 0
          ? (se(), he("div", Uy, "Совпадений с текущим выбором не найдено"))
          : Zt("", !0),
        b("div", Wy, [
          (se(!0),
          he(
            fe,
            null,
            Lt(
              i.postsArr,
              (l) => (
                se(),
                he(
                  "a",
                  {
                    key: l.id,
                    class:
                      "grid grid-cols-2 gap-x-5 xl:gap-x-10 2xl:gap-x-20 pb-8",
                    href: "/blog/" + l.slug,
                  },
                  [
                    b("div", Xy, [
                      b("div", Gy, we(o.dateFromString(l.created_at)), 1),
                      b(
                        "img",
                        {
                          class:
                            "w-full rounded-lg md:rounded-xl lg:rounded-2xl aspect-[640/280]",
                          src: l.cover
                            ? i.path_img + l.id + "/" + l.cover
                            : i.no_img,
                          alt: l.name,
                        },
                        null,
                        8,
                        Yy
                      ),
                    ]),
                    b("div", Jy, [
                      b("div", null, [
                        b("h1", Zy, we(l.name), 1),
                        b("h2", Qy, we(l.sub_title), 1),
                        b(
                          "div",
                          eb,
                          we(o.cutText(l.description_short, l.name)),
                          1
                        ),
                      ]),
                      b("div", null, [
                        (se(!0),
                        he(
                          fe,
                          null,
                          Lt(
                            l.tags,
                            (a) => (
                              se(),
                              he(
                                "span",
                                {
                                  key: a.id,
                                  class: me([
                                    "text-xs md:text-sm lg:text-lg border border-gray-400 px-3 lg:px-6 py-1.5 mr-2.5 lg:mr-6 rounded-full text-center inline-block mb-2.5 lg:mb-0",
                                    {
                                      "font-bold border-black":
                                        i.checkedTags.includes(a.id),
                                    },
                                  ]),
                                },
                                we(a.name),
                                3
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ]),
                  ],
                  8,
                  Ky
                )
              )
            ),
            128
          )),
        ]),
        b("div", tb, [
          sb,
          b("div", nb, [
            b("label", ib, [
              ob,
              ce(
                b(
                  "input",
                  {
                    class: me([
                      "text-center rounded-[30px] w-full h-8 xl:h-14 xl:text-xl",
                      { invalid_inp: i.novalid_mail },
                    ]),
                    type: "text",
                    "onUpdate:modelValue":
                      e[2] || (e[2] = (l) => (i.sub_mail = l)),
                  },
                  null,
                  2
                ),
                [[Ke, i.sub_mail, void 0, { trim: !0 }]]
              ),
            ]),
            ce(b("div", rb, "Вы не указали Ваш E-mail", 512), [
              [Ze, i.novalid_mail],
            ]),
          ]),
          b("div", lb, [
            b(
              "button",
              {
                class: "btn btn-black w-full py-1.5 xl:py-2.5",
                onClick:
                  e[3] || (e[3] = (...l) => o.mailSend && o.mailSend(...l)),
                disabled: !i.sub_mail,
              },
              "Подписаться",
              8,
              ab
            ),
          ]),
        ]),
        re(
          r,
          { ref: "popup_wnd" },
          {
            header: pt(() => [Ie(" Подписка на рассылку")]),
            body: pt(() => [cb]),
            _: 1,
          },
          512
        ),
      ],
      64
    )
  );
}
const ub = Mt(qy, [["render", hb]]),
  fb = {
    data() {
      return {
        fb_name: "",
        fb_mail: "",
        fb_text: "",
        novalid_mail: !1,
        novalid_text: !1,
        agree: !1,
      };
    },
    methods: {
      validateEmail: function (t) {
        var e = /\S+@\S+\.\S+/;
        return e.test(t);
      },
      fbSend() {
        if (
          ((this.novalid_mail = !1),
          (this.novalid_text = !1),
          (this.fb_mail == "" || !this.validateEmail(this.fb_mail)) &&
            (this.novalid_mail = !0),
          this.fb_text.length === 0 && (this.novalid_text = !0),
          this.novalid_phone || this.novalid_mail)
        )
          return !1;
        let t = document.head.querySelector('meta[name="csrf-token"]'),
          e = this,
          s = new XMLHttpRequest();
        s.open("POST", "/contacts/feedback"),
          s.setRequestHeader("X-CSRF-TOKEN", t.content),
          s.setRequestHeader("Content-type", "application/json; charset=UTF-8"),
          s.setRequestHeader("accept", "application/json, text/plain, */*"),
          s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
          (s.onload = function () {
            if (!(s.status >= 400)) {
              let n = JSON.parse(s.response);
              if (
                (n.resp == 0 &&
                  ((e.fb_mail = ""),
                  (e.fb_text = ""),
                  (e.agree = !1),
                  e.popup_dialog()),
                n.resp == 1)
              ) {
                let i = n.err,
                  o = "";
                for (let r in i)
                  for (let l of i[r])
                    o +=
                      "Ошибка. " +
                      l +
                      `
`;
                alert(o);
              }
              n.resp == 2 && alert(n.err);
            }
          }),
          (s.onerror = function () {
            console.log(s.response);
          }),
          s.send(
            JSON.stringify({
              fb_name: this.fb_name,
              fb_mail: this.fb_mail,
              fb_text: this.fb_text,
            })
          );
      },
      popup_dialog() {
        this.$refs.popup_wnd.show = !0;
      },
    },
  },
  db = b(
    "h1",
    { class: "lg:text-lg xl:text-xl" },
    [b("b", null, "Свяжитесь с нами ")],
    -1
  ),
  pb = b(
    "p",
    { class: "text-sm lg:text-lg xl:text-xl pb-4" },
    "Если у вас есть вопросы, пожелания или предложения, пожалуйста, заполните форму ниже, чтобы связаться с нами. Спасибо!",
    -1
  ),
  mb = b("div", { class: "err_send" }, null, -1),
  gb = { class: "" },
  yb = { class: "text-red-500" },
  bb = { class: "mt-8" },
  vb = { class: "block w-30" },
  _b = b(
    "span",
    { class: "block lg:text-lg xl:text-xl mb-2" },
    [b("b", null, "E-mail")],
    -1
  ),
  xb = { class: "text-red-500" },
  wb = { class: "mt-5" },
  Sb = ["disabled"],
  Cb = { class: "mb-40" },
  Eb = { class: "inline-flex my-5 cursor-pointer select-none" },
  Tb = b(
    "span",
    { class: "ml-2 mr-6 text-sm lg:text-lg xl:text-xl" },
    'Ставя отметку, я даю согласие на получение рекламно-информационных рассылок (Федеральный закон № 38-ФЗ "О рекламе")',
    -1
  ),
  kb = b(
    "p",
    { class: "py-4 md:text-lg text-center" },
    " Ваше письмо успешно отправлено.. ",
    -1
  );
function Ab(t, e, s, n, i, o) {
  const r = $n("popup-window");
  return (
    se(),
    he(
      fe,
      null,
      [
        db,
        pb,
        mb,
        b("div", gb, [
          ce(
            b(
              "textarea",
              {
                class: me([
                  "rounded-[30px] w-full h-32 xl:h-64 xl:text-xl",
                  { invalid_inp: i.novalid_text },
                ]),
                "onUpdate:modelValue": e[0] || (e[0] = (l) => (i.fb_text = l)),
              },
              null,
              2
            ),
            [[Ke, i.fb_text]]
          ),
          ce(b("div", yb, "Вы ничего не написали в сообщении", 512), [
            [Ze, i.novalid_text],
          ]),
        ]),
        b("div", bb, [
          b("label", vb, [
            _b,
            ce(
              b(
                "input",
                {
                  class: me([
                    "text-center rounded-[30px] w-full h-8 xl:h-14 xl:text-xl",
                    { invalid_inp: i.novalid_mail },
                  ]),
                  type: "text",
                  "onUpdate:modelValue":
                    e[1] || (e[1] = (l) => (i.fb_mail = l)),
                },
                null,
                2
              ),
              [[Ke, i.fb_mail, void 0, { trim: !0 }]]
            ),
          ]),
          ce(b("div", xb, "Вы не указали Ваш E-mail", 512), [
            [Ze, i.novalid_mail],
          ]),
        ]),
        b("div", wb, [
          b(
            "button",
            {
              class: "btn btn-black w-full py-1.5 xl:py-2.5",
              onClick: e[2] || (e[2] = (...l) => o.fbSend && o.fbSend(...l)),
              disabled: !i.agree,
            },
            "Отправить",
            8,
            Sb
          ),
        ]),
        b("div", Cb, [
          b("label", Eb, [
            ce(
              b(
                "input",
                {
                  class: "rounded-full mt-1",
                  type: "checkbox",
                  name: "agree",
                  "onUpdate:modelValue": e[3] || (e[3] = (l) => (i.agree = l)),
                },
                null,
                512
              ),
              [[wt, i.agree]]
            ),
            Tb,
          ]),
        ]),
        re(
          r,
          { ref: "popup_wnd" },
          {
            header: pt(() => [Ie("Обратная связь")]),
            body: pt(() => [kb]),
            _: 1,
          },
          512
        ),
      ],
      64
    )
  );
}
const $b = Mt(fb, [["render", Ab]]),
  Nb = {
    props: {
      pageData: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {
        posts: [],
        postsFiltered: [],
        checkedTags: [],
        checkedBoxes: null,
      };
    },
    mounted() {
      this.pageData.posts_data.length > 2 &&
        ((this.posts = JSON.parse(this.pageData.posts_data)),
        this.posts.sort(function (t, e) {
          return e.date - t.date;
        }),
        (this.postsFiltered = [...this.posts])),
        (this.checkedBoxes = document.querySelectorAll(
          "input[name=filtercheckboxes]"
        ));
    },
    methods: {
      filterPosts() {
        console.log("filter posts");
      },
      selected(t) {
        const e = t.target.checked;
        if (
          (this.unCheckAll(),
          e
            ? ((t.target.checked = !0), this.checkedTags.push(t.target.value))
            : ((t.target.checked = !1),
              this.checkedTags.splice(0, this.checkedTags.length)),
          this.postsFiltered.splice(0, this.postsFiltered.length),
          this.checkedTags.length)
        ) {
          const s = [...this.checkedTags];
          this.postsFiltered = this.posts.filter(function (n) {
            if (s.includes(n.type)) return !0;
          });
        } else this.postsFiltered = [...this.posts];
      },
      unCheckAll() {
        for (var t = 0; t < this.checkedBoxes.length; t++)
          this.checkedBoxes[t].checked = !1;
        this.checkedTags.splice(0, this.checkedTags.length);
      },
      goToUrl(t) {
        if (t !== "" && t !== null) window.open(t, "_blank");
        else return !1;
      },
    },
  },
  Pb = { key: 0, class: "mt-14" },
  Lb = b(
    "h2",
    { class: "text-3xl lg:text-4xl mb-6 lg:mb-8" },
    [b("b", null, "Публикации")],
    -1
  ),
  Ob = { class: "flex flex-wrap mb-12 lg:mb-16 w-full gap-3 lg:gap-5" },
  Ib = { class: "space-y-8 lg:space-y-12 w-full" },
  Mb = ["href", "onClick"],
  Rb = { class: "text-sm lg:text-lg mb-3 lg:mb-4" },
  Fb = { class: "text-sm lg:text-lg mb-0.5" },
  Db = { class: "text-lg leading-tight lg:leading-normal lg:text-2xl" };
function Bb(t, e, s, n, i, o) {
  return i.posts.length
    ? (se(),
      he("div", Pb, [
        Lb,
        b("div", Ob, [
          b(
            "label",
            {
              class: me([
                { "bg-black text-white": i.checkedTags.includes("1") },
                "btn btn-soc w-auto border-black px-4 lg:px-10",
              ]),
            },
            [
              Ie(" Статьи "),
              ce(
                b(
                  "input",
                  {
                    name: "filtercheckboxes",
                    type: "checkbox",
                    class: "hidden",
                    "onUpdate:modelValue":
                      e[0] || (e[0] = (r) => (i.checkedTags = r)),
                    value: "1",
                    onChange: e[1] || (e[1] = (r) => o.selected(r)),
                  },
                  null,
                  544
                ),
                [[wt, i.checkedTags]]
              ),
            ],
            2
          ),
          b(
            "label",
            {
              class: me([
                { "bg-black text-white": i.checkedTags.includes("2") },
                "btn btn-soc w-auto border-black px-4 lg:px-10",
              ]),
            },
            [
              Ie(" Полезные материалы "),
              ce(
                b(
                  "input",
                  {
                    name: "filtercheckboxes",
                    type: "checkbox",
                    class: "hidden",
                    "onUpdate:modelValue":
                      e[2] || (e[2] = (r) => (i.checkedTags = r)),
                    value: "2",
                    onChange: e[3] || (e[3] = (r) => o.selected(r)),
                  },
                  null,
                  544
                ),
                [[wt, i.checkedTags]]
              ),
            ],
            2
          ),
          b(
            "label",
            {
              class: me([
                { "bg-black text-white": i.checkedTags.includes("3") },
                "btn btn-soc w-auto border-black px-4 lg:px-10",
              ]),
            },
            [
              Ie(" Выступления "),
              ce(
                b(
                  "input",
                  {
                    name: "filtercheckboxes",
                    type: "checkbox",
                    class: "hidden",
                    "onUpdate:modelValue":
                      e[4] || (e[4] = (r) => (i.checkedTags = r)),
                    value: "3",
                    onChange: e[5] || (e[5] = (r) => o.selected(r)),
                  },
                  null,
                  544
                ),
                [[wt, i.checkedTags]]
              ),
            ],
            2
          ),
        ]),
        b("div", Ib, [
          (se(!0),
          he(
            fe,
            null,
            Lt(
              i.postsFiltered,
              (r) => (
                se(),
                he(
                  "a",
                  {
                    href: r.url_src,
                    onClick: Ji((l) => o.goToUrl(r.url_src), ["prevent"]),
                    key: r.post_name,
                    class:
                      "block w-full cursor-pointer px-6 py-3 lg:px-10 lg:py-5 border border-black rounded-[32px] lg:rounded-[45px]",
                  },
                  [
                    b("div", Rb, we(r.published_at), 1),
                    b("div", Fb, we(r.media_name), 1),
                    b("div", Db, [b("b", null, we(r.post_name), 1)]),
                  ],
                  8,
                  Mb
                )
              )
            ),
            128
          )),
        ]),
      ]))
    : Zt("", !0);
}
const Hb = Mt(Nb, [["render", Bb]]),
  Vb = {
    props: {
      imagePath: { type: String, default: "" },
      colorsArray: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        readyMix: !1,
        doneMix: !1,
        showMixer: !1,
        metterCanvas: null,
        background_image: null,
        logo_image: null,
        countColors: null,
        persentage_1: 0,
        persentage_2: 0,
        persentage_3: 0,
        persentage_4: 0,
        color_1: "",
        color_2: "",
        color_3: "",
        color_4: "",
        colorCode_1: "",
        colorCode_2: "",
        colorCode_3: "",
        colorCode_4: "",
        folder_1: "",
        folder_2: "",
        folder_3: "",
        folder_4: "",
        colorName_1: "",
        colorName_2: "",
        colorName_3: "",
        colorName_4: "",
        colorRal_1: "",
        colorRal_2: "",
        colorRal_3: "",
        colorRal_4: "",
        colorsData: [],
      };
    },
    mounted() {
      this.getSpCounter() &&
        ((this.metterCanvas = document.getElementById("metter-canvas")),
        (this.background_image = new Image()),
        (this.background_image.src =
          this.imagePath + "/mixer/kroshka/canvas.png"),
        (this.logo_image = new Image()),
        (this.logo_image.src = this.imagePath + "/favicon-64x64.png"));
    },
    methods: {
      onSelectedColor(t) {
        t.id == 1 &&
          ((this.color_1 = t.color),
          (this.colorCode_1 = t.code),
          (this.colorName_1 = t.name),
          (this.colorRal_1 = t.ral),
          (this.folder_1 = t.folder)),
          t.id == 2 &&
            ((this.color_2 = t.color),
            (this.colorCode_2 = t.code),
            (this.colorName_2 = t.name),
            (this.colorRal_2 = t.ral),
            (this.folder_2 = t.folder)),
          t.id == 3 &&
            ((this.color_3 = t.color),
            (this.colorCode_3 = t.code),
            (this.colorName_3 = t.name),
            (this.colorRal_3 = t.ral),
            (this.folder_3 = t.folder)),
          t.id == 4 &&
            ((this.color_4 = t.color),
            (this.colorCode_4 = t.code),
            (this.colorName_4 = t.name),
            (this.colorRal_4 = t.ral),
            (this.folder_4 = t.folder)),
          this.countColors == 1 && this.color_1 !== "" && (this.readyMix = !0),
          this.countColors == 2 &&
            this.color_1 !== "" &&
            this.color_2 !== "" &&
            (this.readyMix = !0),
          this.countColors == 3 &&
            this.color_1 !== "" &&
            this.color_2 !== "" &&
            this.color_3 !== "" &&
            (this.readyMix = !0),
          this.countColors == 4 &&
            this.color_1 !== "" &&
            this.color_2 !== "" &&
            this.color_3 !== "" &&
            this.color_4 !== "" &&
            (this.readyMix = !0);
      },
      setCountColors(t) {
        this.colorsData.splice(0, this.colorsData.length),
          (this.readyMix = !1),
          (this.doneMix = !1),
          this.$refs.select1.reset(),
          this.$refs.select2.reset(),
          this.$refs.select3.reset(),
          this.$refs.select4.reset(),
          (this.countColors = t),
          t == 1 &&
            ((this.persentage_1 = 100),
            (this.persentage_2 = 0),
            (this.persentage_3 = 0),
            (this.persentage_4 = 0)),
          t == 2 &&
            ((this.persentage_1 = 50),
            (this.persentage_2 = 50),
            (this.persentage_3 = 0),
            (this.persentage_4 = 0)),
          t == 3 &&
            ((this.persentage_1 = 33),
            (this.persentage_2 = 33),
            (this.persentage_3 = 33),
            (this.persentage_4 = 0)),
          t == 4 &&
            ((this.persentage_1 = 25),
            (this.persentage_2 = 25),
            (this.persentage_3 = 25),
            (this.persentage_4 = 25)),
          (this.color_1 = ""),
          (this.color_2 = ""),
          (this.color_3 = ""),
          (this.color_4 = ""),
          (this.colorCode_1 = ""),
          (this.colorCode_2 = ""),
          (this.colorCode_3 = ""),
          (this.colorCode_4 = ""),
          (this.folder_1 = ""),
          (this.folder_2 = ""),
          (this.folder_3 = ""),
          (this.folder_4 = ""),
          (this.colorName_1 = ""),
          (this.colorName_2 = ""),
          (this.colorName_3 = ""),
          (this.colorName_4 = ""),
          (this.colorRal_1 = ""),
          (this.colorRal_2 = ""),
          (this.colorRal_3 = ""),
          (this.colorRal_4 = "");
      },
      downloadMix() {
        let t = this.metterCanvas.toDataURL("image/png");
        const e = document.createElement("a");
        (e.href = t), (e.download = "epdm-mix-color"), e.click(), e.remove();
      },
      runMix() {
        (this.showMixer = !0),
          this.colorsData.splice(0, this.colorsData.length);
        var t = Number(this.persentage_1),
          e = Number(this.persentage_2),
          s = Number(this.persentage_3),
          n = Number(this.persentage_4);
        const i = t + e + s + n,
          o = i / 100;
        if (i > 100) {
          (t = Math.round(t / o)),
            (e = Math.round(e / o)),
            (s = Math.round(s / o)),
            (n = Math.round(n / o));
          const x = t + e + s + n;
          var r = [t, e, s, n],
            l = 0;
          (x < 100 || x > 100) &&
            (x < 100 && (l = a(r, 1)),
            x > 100 && (l = a(r, 2)),
            l > 0 && ((t = r[0]), (e = r[1]), (s = r[2]), (n = r[3])));
        }
        function a(x, N) {
          var C = 0,
            R = 0;
          for (let V = 0; V < x.length; V++) x[V] > C && ((C = x[V]), (R = V));
          return N == 1 && (x[R] = C + 1), N == 2 && (x[R] = C - 1), C;
        }
        this.countColors >= 1 &&
          this.addToColorArray(
            t,
            this.persentage_1,
            this.color_1,
            this.folder_1,
            this.colorCode_1,
            this.colorName_1,
            this.colorRal_1
          ),
          this.countColors >= 2 &&
            this.addToColorArray(
              e,
              this.persentage_2,
              this.color_2,
              this.folder_2,
              this.colorCode_2,
              this.colorName_2,
              this.colorRal_2
            ),
          this.countColors >= 3 &&
            this.addToColorArray(
              s,
              this.persentage_3,
              this.color_3,
              this.folder_3,
              this.colorCode_3,
              this.colorName_3,
              this.colorRal_3
            ),
          this.countColors == 4 &&
            this.addToColorArray(
              n,
              this.persentage_4,
              this.color_4,
              this.folder_4,
              this.colorCode_4,
              this.colorName_4,
              this.colorRal_4
            );
        var c = Matter.Engine,
          h = Matter.Render,
          u = Matter.Composite,
          f = Matter.Bodies,
          d = c.create();
        (d.gravity.y = 0), (d.gravity.x = 0);
        var m = h.create({
          canvas: this.metterCanvas,
          engine: d,
          options: {
            width: 500,
            height: 500,
            background: "transparent",
            backgroundImage: this.background_image,
            intermediateBackgroundColor: `${this.color_1}`,
            wireframes: !1,
          },
        });
        const w = {
          isStatic: !0,
          render: { fillStyle: "transparent", strokeStyle: "transparent" },
        };
        var $ = f.rectangle(250, 10, 1e3, 20, w),
          O = f.rectangle(250, 490, 1e3, 20, w),
          T = f.rectangle(10, 250, 20, 500, w),
          y = f.rectangle(490, 250, 20, 500, w),
          _ = [$, O, T, y];
        k(this.logo_image), M(this.colorsData);
        for (const x of this.colorsData) {
          const N = E(550, x.percentage),
            C = x.folder;
          for (let R = 1; R < N; R++) {
            const V = v(20, 480),
              Y = v(20, 480),
              H = v(1, 30),
              K = {
                render: {
                  density: 5e-6,
                  frictionAir: 0,
                  restitution: 1,
                  friction: 0.01,
                  mass: 0,
                  sprite: {
                    texture:
                      this.imagePath + "/mixer/kroshka/" + C + "/" + H + ".png",
                  },
                },
              },
              U = f.circle(V, Y, 13, K);
            _.push(U);
          }
        }
        u.add(d.world, _), Matter.Runner.run(d), h.run(m);
        function S() {
          Matter.Render.stop(m), u.clear(d.world), Matter.Engine.clear(d);
        }
        setTimeout(S, 3e3), (this.doneMix = !0);
        function k(x) {
          const N = document.getElementById("metter-canvas"),
            C = N.getContext("2d");
          (N.height = N.height + 80),
            (N.globalCompositeOperation = "source-over"),
            (C.fillStyle = "white"),
            C.fillRect(0, 490, N.width, N.height),
            C.drawImage(x, N.width - 52, N.height - 68, 32, 32);
        }
        function M(x) {
          let N = 0,
            C = 0,
            R = 0,
            V = "";
          const H = document.getElementById("metter-canvas").getContext("2d");
          (H.font = "14px Circe-Rounded"), (H.fillStyle = "black");
          let K = 0;
          for (const U of x)
            K++,
              (V = `${U.percentage}% ${U.code} ${U.name}`),
              K == 1 && ((N = H.measureText(V).width), H.fillText(V, 20, 520)),
              K == 2 &&
                ((C = H.measureText(V).width),
                (R = Math.max(N, C)),
                H.fillText(V, 20, 545)),
              K == 3 && H.fillText(V, R + 40, 520),
              K == 4 && H.fillText(V, R + 40, 545);
        }
        function v(x, N) {
          return Math.floor(Math.random() * (N - x + 1) + x);
        }
        function E(x, N) {
          return Math.round(x * (N / 100));
        }
      },
      addToColorArray(t, e, s, n, i, o, r) {
        this.colorsData.push({
          percentage: Number(t),
          user_percentage: Number(e),
          color: s,
          folder: n,
          code: i,
          name: o,
          ral: r,
        });
      },
    },
  },
  qb = {
    class:
      "grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 xl:gap-x-[73px] mb-10 lg:mb-20",
  },
  zb = { class: "flex flex-col gap-y-4 lg:gap-y-8" },
  jb = { class: "w-full aspect-square" },
  Ub = ["src"],
  Wb = b("span", null, "Микс из 1 цвета", -1),
  Kb = [Wb],
  Xb = { class: "flex flex-col gap-y-4 lg:gap-y-8" },
  Gb = { class: "w-full aspect-square" },
  Yb = ["src"],
  Jb = b("span", null, "Микс из 2 цветов", -1),
  Zb = [Jb],
  Qb = { class: "flex flex-col gap-y-4 lg:gap-y-8" },
  ev = { class: "w-full aspect-square" },
  tv = ["src"],
  sv = b("span", null, "Микс из 3 цветов", -1),
  nv = [sv],
  iv = { class: "flex flex-col gap-y-4 lg:gap-y-8" },
  ov = { class: "w-full aspect-square" },
  rv = ["src"],
  lv = b("span", null, "Микс из 4 цветов", -1),
  av = [lv],
  cv = { class: "text-2xl font-bold mb-6" },
  hv = {
    class:
      "grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10 xl:gap-x-[73px] mb-12 lg:mb-20",
  },
  uv = { class: "w-80" },
  fv = { class: "block mb-8" },
  dv = b("div", { class: "text-xl pl-5 font-bold" }, "Процент покрытия", -1),
  pv = { class: "flex" },
  mv = { class: "w-12 text-center" },
  gv = { class: "w-80" },
  yv = { class: "block mb-8" },
  bv = b("div", { class: "text-xl pl-5 font-bold" }, "Процент покрытия", -1),
  vv = { class: "flex" },
  _v = { class: "w-12 text-center" },
  xv = { class: "w-80" },
  wv = { class: "block mb-8" },
  Sv = b("div", { class: "text-xl pl-5 font-bold" }, "Процент покрытия", -1),
  Cv = { class: "flex" },
  Ev = { class: "w-12 text-center" },
  Tv = { class: "w-80" },
  kv = { class: "block mb-8" },
  Av = b("div", { class: "text-xl pl-5 font-bold" }, "Процент покрытия", -1),
  $v = { class: "flex" },
  Nv = { class: "w-12 text-center" },
  Pv = { class: "flex justify-center lg:justify-start mb-5 lg:mb-20 lg:w-80" },
  Lv = ["disabled"],
  Ov = b("span", null, "Перемешать", -1),
  Iv = [Ov],
  Mv = { class: "flex flex-col lg:flex-row" },
  Rv = b(
    "div",
    {
      class:
        "flex justify-center lg:justify-start max-w-[500px] px-5 lg:px-0 lg:w-[500px] lg:h-[580px] mb-5 lg:mb-0",
      id: "canvas-container",
    },
    [
      b("canvas", {
        id: "metter-canvas",
        width: "500",
        height: "580",
        style: { width: "100% !important" },
      }),
    ],
    -1
  ),
  Fv = { class: "flex justify-center lg:items-end lg:ml-5 mb-6" },
  Dv = b("span", null, "Сохранить изображение", -1),
  Bv = [Dv];
function Hv(t, e, s, n, i, o) {
  const r = $n("select-box");
  return (
    se(),
    he(
      fe,
      null,
      [
        b("div", qb, [
          b("div", zb, [
            b("div", jb, [
              b(
                "img",
                {
                  class: "w-full",
                  src: s.imagePath + "/mixer/sample/1.png",
                  alt: "mix 1 color",
                },
                null,
                8,
                Ub
              ),
            ]),
            b("div", null, [
              b(
                "button",
                {
                  type: "button",
                  onClick: e[0] || (e[0] = (l) => o.setCountColors(1)),
                  class: "btn btn-white w-full py-1.5 xl:py-2.5",
                },
                Kb
              ),
            ]),
          ]),
          b("div", Xb, [
            b("div", Gb, [
              b(
                "img",
                {
                  class: "w-full",
                  src: s.imagePath + "/mixer/sample/2.png",
                  alt: "mix 2 colors",
                },
                null,
                8,
                Yb
              ),
            ]),
            b("div", null, [
              b(
                "button",
                {
                  type: "button",
                  onClick: e[1] || (e[1] = (l) => o.setCountColors(2)),
                  class: "btn btn-white w-full py-1.5 xl:py-2.5",
                },
                Zb
              ),
            ]),
          ]),
          b("div", Qb, [
            b("div", ev, [
              b(
                "img",
                {
                  class: "w-full",
                  src: s.imagePath + "/mixer/sample/3.png",
                  alt: "mix 3 colors",
                },
                null,
                8,
                tv
              ),
            ]),
            b("div", null, [
              b(
                "button",
                {
                  type: "button",
                  onClick: e[2] || (e[2] = (l) => o.setCountColors(3)),
                  class: "btn btn-white w-full py-1.5 xl:py-2.5",
                },
                nv
              ),
            ]),
          ]),
          b("div", iv, [
            b("div", ov, [
              b(
                "img",
                {
                  class: "w-full",
                  src: s.imagePath + "/mixer/sample/4.png",
                  alt: "mix 4 colors",
                },
                null,
                8,
                rv
              ),
            ]),
            b("div", null, [
              b(
                "button",
                {
                  type: "button",
                  onClick: e[3] || (e[3] = (l) => o.setCountColors(4)),
                  class: "btn btn-white w-full py-1.5 xl:py-2.5",
                },
                av
              ),
            ]),
          ]),
        ]),
        ce(b("div", cv, "Выберите параметры", 512), [[Ze, i.countColors >= 1]]),
        b("div", hv, [
          ce(
            b(
              "div",
              uv,
              [
                b("div", fv, [
                  dv,
                  b("div", pv, [
                    ce(
                      b(
                        "input",
                        {
                          type: "range",
                          name: "brightness",
                          min: "0",
                          max: "100",
                          step: "5",
                          "onUpdate:modelValue":
                            e[4] || (e[4] = (l) => (i.persentage_1 = l)),
                          class: "w-full cursor-pointer mr-1",
                        },
                        null,
                        512
                      ),
                      [[Ke, i.persentage_1]]
                    ),
                    b("span", mv, we(i.persentage_1) + "%", 1),
                  ]),
                ]),
                re(
                  r,
                  {
                    ref: "select1",
                    "id-select": "1",
                    "max-width": "w-full sm:w-56",
                    options: s.colorsArray,
                    onSelected: o.onSelectedColor,
                  },
                  null,
                  8,
                  ["options", "onSelected"]
                ),
              ],
              512
            ),
            [[Ze, i.countColors >= 1]]
          ),
          ce(
            b(
              "div",
              gv,
              [
                b("div", yv, [
                  bv,
                  b("div", vv, [
                    ce(
                      b(
                        "input",
                        {
                          type: "range",
                          name: "brightness",
                          min: "0",
                          max: "100",
                          step: "5",
                          "onUpdate:modelValue":
                            e[5] || (e[5] = (l) => (i.persentage_2 = l)),
                          class: "w-full cursor-pointer mr-1",
                        },
                        null,
                        512
                      ),
                      [[Ke, i.persentage_2]]
                    ),
                    b("span", _v, we(i.persentage_2) + "%", 1),
                  ]),
                ]),
                re(
                  r,
                  {
                    ref: "select2",
                    "id-select": "2",
                    "max-width": "w-full sm:w-56",
                    options: s.colorsArray,
                    onSelected: o.onSelectedColor,
                  },
                  null,
                  8,
                  ["options", "onSelected"]
                ),
              ],
              512
            ),
            [[Ze, i.countColors >= 2]]
          ),
          ce(
            b(
              "div",
              xv,
              [
                b("div", wv, [
                  Sv,
                  b("div", Cv, [
                    ce(
                      b(
                        "input",
                        {
                          type: "range",
                          name: "brightness",
                          min: "0",
                          max: "100",
                          step: "5",
                          "onUpdate:modelValue":
                            e[6] || (e[6] = (l) => (i.persentage_3 = l)),
                          class: "w-full cursor-pointer mr-1",
                        },
                        null,
                        512
                      ),
                      [[Ke, i.persentage_3]]
                    ),
                    b("span", Ev, we(i.persentage_3) + "%", 1),
                  ]),
                ]),
                re(
                  r,
                  {
                    ref: "select3",
                    "id-select": "3",
                    "max-width": "w-full sm:w-56",
                    options: s.colorsArray,
                    onSelected: o.onSelectedColor,
                  },
                  null,
                  8,
                  ["options", "onSelected"]
                ),
              ],
              512
            ),
            [[Ze, i.countColors >= 3]]
          ),
          ce(
            b(
              "div",
              Tv,
              [
                b("div", kv, [
                  Av,
                  b("div", $v, [
                    ce(
                      b(
                        "input",
                        {
                          type: "range",
                          name: "brightness",
                          min: "0",
                          max: "100",
                          step: "5",
                          "onUpdate:modelValue":
                            e[7] || (e[7] = (l) => (i.persentage_4 = l)),
                          class: "w-full cursor-pointer mr-1",
                        },
                        null,
                        512
                      ),
                      [[Ke, i.persentage_4]]
                    ),
                    b("span", Nv, we(i.persentage_4) + "%", 1),
                  ]),
                ]),
                re(
                  r,
                  {
                    ref: "select4",
                    "id-select": "4",
                    "max-width": "w-full sm:w-56",
                    options: s.colorsArray,
                    onSelected: o.onSelectedColor,
                  },
                  null,
                  8,
                  ["options", "onSelected"]
                ),
              ],
              512
            ),
            [[Ze, i.countColors >= 4]]
          ),
        ]),
        ce(
          b(
            "div",
            Pv,
            [
              b(
                "button",
                {
                  type: "button",
                  onClick:
                    e[8] || (e[8] = (...l) => o.runMix && o.runMix(...l)),
                  disabled: !i.readyMix,
                  class:
                    "btn btn-white w-full py-1.5 xl:py-2.5 max-w-[200px] lg:max-w-[320px]",
                },
                Iv,
                8,
                Lv
              ),
            ],
            512
          ),
          [[Ze, i.countColors]]
        ),
        ce(
          b(
            "div",
            Mv,
            [
              Rv,
              ce(
                b(
                  "div",
                  Fv,
                  [
                    b(
                      "button",
                      {
                        type: "button",
                        onClick:
                          e[9] ||
                          (e[9] = (...l) =>
                            o.downloadMix && o.downloadMix(...l)),
                        class:
                          "btn btn-white w-full py-1.5 xl:py-2.5 max-w-[200px] lg:max-w-[500px]",
                      },
                      Bv
                    ),
                  ],
                  512
                ),
                [[Ze, i.doneMix]]
              ),
            ],
            512
          ),
          [[Ze, i.showMixer]]
        ),
      ],
      64
    )
  );
}
const Vv = Mt(Vb, [["render", Hv]]),
  qv = {
    props: {
      map_objects: {
        type: Object,
        default() {
          return {};
        },
      },
      zoomMap: { type: [String, Number], default: "4" },
    },
    data() {
      return {};
    },
    mounted() {
      this.map_objects.length > 2 && this.ymap();
    },
    methods: {
      ymap() {
        var t = "/storage-place/map/",
          e = this,
          s = {
            0: "islands#icon",
            1: "islands#icon",
            2: "islands#blueStretchyIcon",
            3: "islands#dotIcon",
            4: "islands#circleIcon",
            5: "islands#circleDotIcon",
          };
        ymaps.ready(function () {
          var n = new ymaps.Map(
              "map-itx",
              { center: [55.75322, 37.622513], zoom: e.zoomMap, scroll: !1 },
              { minZoom: 2, yandexMapDisablePoiInteractivity: !0 }
            ),
            i = 4,
            o = Number(e.zoomMap),
            r = 2,
            l = 21;
          if (e.getSpCounter()) {
            for (const v in e.map_objects) {
              var a = e.map_objects[v].latitude,
                c = e.map_objects[v].longitude,
                h = "",
                u = "",
                f = "",
                d = "",
                m = "",
                w = "",
                $ = "";
              let E = "",
                x = "",
                N = "";
              var O = e.map_objects[v].placemark_preset,
                T = "#1E98FF";
              O == 2
                ? ((h = e.map_objects[v].name), (u = ""))
                : ((h = ""), (u = e.map_objects[v].name)),
                e.map_objects[v].icon_color !== null &&
                  (T = e.map_objects[v].icon_color),
                e.map_objects[v].url_project &&
                  (d = e.map_objects[v].url_project),
                e.map_objects[v].cover !== "" &&
                  (m =
                    '<img class="mb-1.5" src="' +
                    t +
                    e.map_objects[v].cover +
                    '" style="width: 280px; height: auto; border-radius: 10px;" />'),
                e.map_objects[v].balloon_header &&
                  (w =
                    '<h1 class="pb-1.5" style="font-family: Circe-Rounded; font-size:18px; font-weight:bold; ">' +
                    e.map_objects[v].balloon_header +
                    "</h1>"),
                e.map_objects[v].balloon_content &&
                  ($ =
                    '<p class="pb-2" style="font-family: Circe-Rounded;">' +
                    e.map_objects[v].balloon_content +
                    "</p>"),
                e.map_objects[v].balloon_address &&
                  (E =
                    '<div style="font-family: Circe-Rounded;"><b>Адрес: </b>' +
                    e.map_objects[v].balloon_address +
                    "</div>"),
                e.map_objects[v].balloon_customer &&
                  (x =
                    '<div style="font-family: Circe-Rounded;"><b>Заказчик: </b>' +
                    e.map_objects[v].balloon_customer +
                    "</div>"),
                e.map_objects[v].balloon_year &&
                  (N =
                    '<div style="font-family: Circe-Rounded;"><b>Год: </b>' +
                    e.map_objects[v].balloon_year +
                    "</div>"),
                (m || $ || w) &&
                  (d == ""
                    ? (f = `
                                    <div style="max-width: 280px;color: #000;">
                                        ${m}
                                        <div style="padding: 3px 12px 12px 12px;">
                                            ${w}
                                            ${E}
                                            ${x}
                                            ${N}
                                            ${$}
                                        </div>
                                    </div>
                                `)
                    : (f = `
                                    <div style="max-width: 280px;">
                                        <a href="${d}" target="_blank" style="text-decoration:none; color: #000;">
                                            ${m}
                                            <div style="padding: 3px 12px 12px 12px;">
                                                ${w}
                                                ${E}
                                                ${x}
                                                ${N}
                                                ${$}
                                                <div style="font-family: Circe-Rounded;text-decoration: underline; margin-top: 5px; cursor:pointer;">
                                                    Посмотреть проект
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `));
              var y = {
                iconColor: T,
                link: e.map_objects[v].url_project,
                id: e.map_objects[v].id,
                hideIconOnBalloonOpen: !1,
                balloonCloseButton: !1,
                balloonPanelMaxMapArea: 1,
              };
              e.map_objects[v].placemark_preset !== 99 &&
                (y.preset = s[e.map_objects[v].placemark_preset]);
              var _ = ymaps.templateLayoutFactory.createClass(
                '<div class="placemark_layout_container"><div class="circle_layout"><div class="circle_mark" id="mark_' +
                  e.map_objects[v].id +
                  '" style="background-color:' +
                  T +
                  '"></div></div></div>'
              );
              e.map_objects[v].placemark_preset == 99 &&
                ((y.iconLayout = _),
                (y.iconShape = {
                  type: "Circle",
                  coordinates: [7, 7],
                  radius: 7,
                })),
                screen.width <= 1280 && (y.balloonCloseButton = !0);
              let C = new ymaps.Placemark(
                [a, c],
                { balloonContent: f, iconContent: h, iconCaption: u },
                y
              );
              f == "" &&
                C.events.add("click", function (R) {
                  let V = R.get("target").options.get("link");
                  V && V !== "" && window.open(V, "_blank");
                }),
                f !== "" &&
                  (screen.width >= 1280 &&
                    (C.events.add("mouseenter", function (R) {
                      C.balloon.open();
                    }),
                    C.balloon.events.add("mouseleave", function (R) {
                      C.balloon.close();
                    })),
                  C.balloon.events.add("open", function (R) {
                    if (e.map_objects[v].placemark_preset == 99) {
                      let V = R.get("target").options.get("id"),
                        Y = document.querySelector("#mark_" + V);
                      (Y.style.backgroundColor = "#FFF"),
                        (Y.style.borderColor = T);
                    }
                  }),
                  C.balloon.events.add("close", function (R) {
                    if (e.map_objects[v].placemark_preset == 99) {
                      let V = R.get("target").options.get("id"),
                        Y = document.querySelector("#mark_" + V);
                      (Y.style.backgroundColor = T),
                        (Y.style.borderColor = "#FFF");
                    }
                  })),
                n.geoObjects.add(C),
                n.controls.remove("geolocationControl"),
                n.controls.remove("searchControl"),
                n.controls.remove("trafficControl"),
                n.controls.remove("typeSelector"),
                n.controls.remove("fullscreenControl"),
                n.controls.remove("rulerControl");
            }
            n.controls.remove("zoomControl");
            var S = document.querySelector("#zoom_in");
            S &&
              S.addEventListener("click", function (v) {
                o < l && (o = o + 1),
                  n.setZoom(Number(o), { duration: 300 }).then();
              });
            var k = document.querySelector("#zoom_out");
            k &&
              k.addEventListener("click", function (v) {
                o > r && (o = o - 1),
                  n.setZoom(Number(o), { duration: 300 }).then();
              });
            var M = document.querySelector("#zoom_reset");
            M &&
              M.addEventListener("click", function (v) {
                (o = Number(i)),
                  n.setZoom(Number(i), { duration: 300 }).then(),
                  n.setCenter([55.75322, 37.622513], o);
              }),
              n.events.add("click", (v) => v.get("target").balloon.close());
          }
        });
      },
    },
  };
function zv(t, e, s, n, i, o) {
  return null;
}
const jv = Mt(qv, [["render", zv]]),
  ct = eh(Tg);
ct.use(Ag);
ct.component("SelectBox", Kg);
ct.component("modal-window", xy);
ct.component("popup-window", ky);
ct.component("projects", Vy);
ct.component("blog", ub);
ct.component("contacts-form", $b);
ct.component("portfolio-page", Hb);
ct.component("mixer-epdm", Vv);
ct.component("map-page", jv);
ct.mixin({
  methods: {
    getSpCounter() {
      let t = !0,
        e = new XMLHttpRequest();
      try {
        e.open("GET", "https://dssb.ru/api/itx-status", !1),
          (e.onload = function () {
            if (e.status >= 400) (t = !0), console.error(e.response);
            else {
              let s = JSON.parse(e.response);
              s.counter && (Number(s.counter) > 1 ? (t = !0) : (t = !1));
            }
          }),
          (e.onerror = function () {
            console.log(e.response);
          }),
          e.send();
      } catch {
        t = !0;
      }
      return t;
    },
  },
});
ct.mount("#app");
let Pe;
function Uv(t) {
  let e = 0.1;
  (document.querySelector(t).style.opacity = "0"),
    (document.querySelector(t).style.display = "block");
  let s = setInterval(function () {
    e >= 0.5 && clearInterval(s),
      (document.querySelector(t).style.opacity = e),
      (e += e * 0.1);
  }, 5);
}
function Wv(t) {
  let e = 0.5,
    s = setInterval(function () {
      e <= 0.1 &&
        (clearInterval(s), (document.querySelector(t).style.display = "none")),
        (document.querySelector(t).style.opacity = e),
        (e -= e * 0.1);
    }, 5);
}
function Kv(t) {
  return new Promise((e) => setTimeout(e, t));
}
async function Xv() {
  Uv("#dt_darker"),
    document.querySelector("#header_darker").classList.remove("hidden"),
    document.querySelector("#header_darker").classList.add("fade_in"),
    await Kv(150),
    document.querySelector("#search_container").classList.remove("hidden"),
    (document.querySelector("#search_input_dt").value = ""),
    document.querySelector("#search_input_dt").focus();
}
function eu() {
  Wv("#dt_darker"),
    document.querySelector("#header_darker").classList.add("hidden"),
    (document.querySelector("#search_input_dt").value = ""),
    (document.querySelector("#dt-dd").innerHTML = ""),
    document.querySelector("#dt-dd").classList.add("hidden"),
    (Pe = []),
    document.querySelector("#search_container").classList.add("hidden");
}
let Gv = document.querySelector("#dt_search");
Gv.addEventListener("click", Xv);
let Yv = document.querySelector("#dt_darker");
Yv.addEventListener("click", eu);
let Jv = document.querySelector("#close_search");
Jv.addEventListener("click", eu);
function Zv() {
  let t = this.dataset.id,
    e = document.querySelector("#" + t),
    s = document.querySelector("#body_" + t);
  e.classList.contains("rotate-45")
    ? (e.classList.remove("rotate-45"),
      s.classList.remove("flex", "animate_list"),
      s.classList.add("hidden", "lg:flex"))
    : (e.classList.add("rotate-45"),
      s.classList.remove("hidden", "lg:flex"),
      s.classList.add("flex", "animate_list"));
}
let Qv = document.getElementsByClassName("expand_section");
Array.from(Qv).forEach(function (t) {
  t.addEventListener("click", Zv);
});
let Ne = -1;
function oa(t) {
  switch (t.key) {
    case "ArrowUp":
      if (Pe.length > 0) {
        t.preventDefault(),
          Ne == -1 && (Ne = 0),
          Pe[Ne].classList.contains("bg-gray-100") &&
            Pe[Ne].classList.remove("bg-gray-100"),
          (Ne = Ne > 0 ? --Ne : Pe.length - 1),
          Pe[Ne].classList.add("bg-gray-100"),
          Pe[Ne].focus();
        break;
      }
    case "ArrowDown":
      if (Pe.length > 0) {
        t.preventDefault(),
          Ne == -1 && (Ne = Pe.length - 1),
          Pe[Ne].classList.contains("bg-gray-100") &&
            Pe[Ne].classList.remove("bg-gray-100"),
          (Ne = Ne < Pe.length - 1 ? ++Ne : 0),
          Pe[Ne].classList.add("bg-gray-100"),
          Pe[Ne].focus();
        break;
      }
  }
}
function tu(t) {
  if (
    t.which === 37 ||
    t.which === 38 ||
    t.which === 39 ||
    t.which === 40 ||
    t.which === 32 ||
    t.which === 13
  )
    return !1;
  let e = t.target.value,
    s = this.offsetWidth,
    n = this.offsetHeight,
    i = this.offsetTop,
    o = document.querySelector("#" + this.dataset.id);
  if (
    ((o.style.left = this.offsetLeft),
    (o.style.top = i + n + "px"),
    (o.style.width = s + "px"),
    e.length > 1)
  ) {
    document.addEventListener("keydown", oa);
    let r = new XMLHttpRequest();
    r.open("GET", "/catalog/search-suggests?search=" + e),
      r.setRequestHeader("Content-type", "application/json; charset=UTF-8"),
      r.setRequestHeader("accept", "application/json, text/plain, */*"),
      r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
      (r.onload = function () {
        if (r.status >= 400) console.error(r.response);
        else {
          let l = JSON.parse(r.response);
          o.innerHTML = "";
          let a = "",
            c = "";
          for (let h of l)
            h.full == ""
              ? (h.header
                  ? (c = `<div class="search-dd-item border-b border-gray-400 p-2 text-base font-bold block">
                                                <div class="flex">
                                                    <div class="flex items-center"><div>${h.header}</div></div>
                                                </div>
                                          </div>`)
                  : (c = ""),
                h.serial_number == "" && h.thumb == ""
                  ? (a =
                      c +
                      `<a href="${h.url}" class="search-dd-item border-b border-gray-200 p-2 text-sm block cursor-pointer hover:bg-gray-100">
                                            <div class="flex">
                                                <div class="shrink-0 bg-white mr-2"></div>
                                                <div class="flex items-center"><div>${h.name} ${h.serial_number}</div></div>
                                            </div>
                                        </a>`)
                  : (a =
                      c +
                      `<a href="${h.url}" class="search-dd-item border-b border-gray-200 p-2 text-sm block cursor-pointer hover:bg-gray-100">
                                            <div class="flex">
                                                <div class="shrink-0 bg-white mr-2"><img src="${h.thumb}" class="inline-block object-contain w-12 h-9 pt-0.5"></div>
                                                <div class="flex items-center"><div>${h.name} ${h.serial_number}</div></div>
                                            </div>
                                        </a>`))
              : (a = `<a href="/catalog/search?search=${e}" class="search-dd-item text-center pt-4 pb-2 px-4 text-sm block rounded-b-2xl cursor-pointer hover:bg-gray-100">Показать все результаты</a>`),
              o.insertAdjacentHTML("beforeend", a);
          (Pe = document.querySelectorAll(".search-dd-item")),
            Pe.length && o.classList.remove("hidden");
        }
      }),
      (r.onerror = function () {
        console.log(r.response);
      }),
      r.send();
  } else
    document.removeEventListener("keydown", oa),
      (o.innerHTML = ""),
      o.classList.add("hidden"),
      (Pe = []);
  return !1;
}
document.querySelector("#search_input_dt").addEventListener("keyup", tu);
document.querySelector("#search_input_mob").addEventListener("keyup", tu);
function su() {
  let t = document.documentElement.scrollTop || document.body.scrollTop;
  t > 0 &&
    (window.requestAnimationFrame(su), window.scrollBy(0, (t + 100) / -14));
}
let ra = document.querySelector("#scrollup");
ra && ra.addEventListener("click", su);
let e_ = document.querySelector("#burger_btn");
e_.addEventListener("click", function () {
  this.classList.toggle("opened_burger"),
    document.querySelector("#h-mob-menu").classList.toggle("scale-0"),
    document.querySelector("#mob-menu").classList.toggle("-translate-x-full"),
    this.classList.contains("opened_burger") ||
      ((document.querySelector("#search_input_mob").value = ""),
      (document.querySelector("#mob-dd").innerHTML = ""),
      document.querySelector("#mob-dd").classList.add("hidden"),
      (Pe = []));
});
window.Fancybox = ee;
const la = document.querySelector("#indexCarousel");
la &&
  new es(la, {
    Dots: !1,
    Navigation: !1,
    infinite: !1,
    center: !1,
    slidesPerPage: 1,
    friction: 0.8,
    Navigation: {
      prevTpl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
      nextTpl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
    },
    l10n: { NEXT: "Следующий", PREV: "Предыдущий" },
  });
const aa = document.querySelector("#mainCarousel");
if (aa) {
  const t = new es(aa, {
    Dots: !0,
    Navigation: !1,
    infinite: !1,
    slidesPerPage: 1,
    center: !0,
    friction: 0.8,
  });
  window.mainCarousel = t;
}
const t_ = document.querySelector("#additional_gallery");
t_ &&
  ee.bind('[data-fancybox="gallery"]', {
    Thumbs: { autoStart: !1 },
    l10n: {
      CLOSE: "Закрыть",
      NEXT: "Дальше",
      PREV: "Назад",
      MODAL: "Вы можете закрыть данное окно, нажав клавишу ESC",
      ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
      IMAGE_ERROR: "Изображение не найдено",
      ELEMENT_NOT_FOUND: "HTML элемент не найден",
      AJAX_NOT_FOUND: "Ошибка загрузки AJAX : Не найдено",
      AJAX_FORBIDDEN: "Ошибка загрузки AJAX : Запрещено",
      IFRAME_ERROR: "Ошибка загрузки страницы",
      TOGGLE_ZOOM: "Переключить уровень масштаба",
      TOGGLE_THUMBS: "Показать/скрыть миниатюры",
      TOGGLE_SLIDESHOW: "Переключить презентацию",
      TOGGLE_FULLSCREEN: "Переключить режим полного экрана",
      DOWNLOAD: "Скачать",
    },
  });
