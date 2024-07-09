function m4(o) {
  return Object.keys(o).reduce((p, l) => {
    const c = o[l];
    return p[l] = Object.assign({}, c), Du(c.value) && !R4(c.value) && !Array.isArray(c.value) && (p[l].value = Object.assign({}, c.value)), Array.isArray(c.value) && (p[l].value = c.value.slice(0)), p;
  }, {});
}
function h4(o) {
  return o ? Object.keys(o).reduce((p, l) => {
    const c = o[l];
    return p[l] = Du(c) && "value" in c ? c : {
      value: c
    }, p[l].attribute || (p[l].attribute = g4(l)), p[l].parse = "parse" in p[l] ? p[l].parse : typeof p[l].value != "string", p;
  }, {}) : {};
}
function y4(o) {
  return Object.keys(o).reduce((p, l) => (p[l] = o[l].value, p), {});
}
function E4(o, a) {
  const p = m4(a);
  return Object.keys(a).forEach((c) => {
    const g = p[c], m = o.getAttribute(g.attribute), E = o[c];
    m && (g.value = g.parse ? Vu(m) : m), E != null && (g.value = Array.isArray(E) ? E.slice(0) : E), g.reflect && vu(o, g.attribute, g.value), Object.defineProperty(o, c, {
      get() {
        return g.value;
      },
      set(f) {
        const x = g.value;
        g.value = f, g.reflect && vu(this, g.attribute, g.value);
        for (let V = 0, q = this.__propertyChangedCallbacks.length; V < q; V++)
          this.__propertyChangedCallbacks[V](c, f, x);
      },
      enumerable: !0,
      configurable: !0
    });
  }), p;
}
function Vu(o) {
  if (o)
    try {
      return JSON.parse(o);
    } catch {
      return o;
    }
}
function vu(o, a, p) {
  if (p == null || p === !1)
    return o.removeAttribute(a);
  let l = JSON.stringify(p);
  o.__updating[a] = !0, l === "true" && (l = ""), o.setAttribute(a, l), Promise.resolve().then(() => delete o.__updating[a]);
}
function g4(o) {
  return o.replace(/\.?([A-Z]+)/g, (a, p) => "-" + p.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Du(o) {
  return o != null && (typeof o == "object" || typeof o == "function");
}
function R4(o) {
  return Object.prototype.toString.call(o) === "[object Function]";
}
function b4(o) {
  return typeof o == "function" && o.toString().indexOf("class") === 0;
}
let Wr;
function A4(o, a) {
  const p = Object.keys(a);
  return class extends o {
    static get observedAttributes() {
      return p.map((c) => a[c].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = E4(this, a);
      const c = y4(this.props), g = this.Component, m = Wr;
      try {
        Wr = this, this.__initialized = !0, b4(g) ? new g(c, {
          element: this
        }) : g(c, {
          element: this
        });
      } finally {
        Wr = m;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let c = null;
      for (; c = this.__releaseCallbacks.pop(); )
        c(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(c, g, m) {
      if (this.__initialized && !this.__updating[c] && (c = this.lookupProp(c), c in a)) {
        if (m == null && !this[c])
          return;
        this[c] = a[c].parse ? Vu(m) : m;
      }
    }
    lookupProp(c) {
      if (a)
        return p.find((g) => c === g || c === a[g].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(c) {
      this.__releaseCallbacks.push(c);
    }
    addPropertyChangedCallback(c) {
      this.__propertyChangedCallbacks.push(c);
    }
  };
}
function T4(o, a = {}, p = {}) {
  const {
    BaseElement: l = HTMLElement,
    extension: c
  } = p;
  return (g) => {
    if (!o)
      throw new Error("tag is required to register a Component");
    let m = customElements.get(o);
    return m ? (m.prototype.Component = g, m) : (m = A4(l, h4(a)), m.prototype.Component = g, m.prototype.registeredTag = o, customElements.define(o, m, c), m);
  };
}
const v4 = (o, a) => o === a, ii = Symbol("solid-proxy"), yr = {
  equals: v4
};
let Pu = Fu;
const Xe = 1, Er = 2, Nu = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var ce = null;
let Jr = null, w4 = null, ne = null, de = null, $e = null, Tr = 0;
function L4(o, a) {
  const p = ne, l = ce, c = o.length === 0, g = a === void 0 ? l : a, m = c ? Nu : {
    owned: null,
    cleanups: null,
    context: g ? g.context : null,
    owner: g
  }, E = c ? o : () => o(() => Pt(() => vr(m)));
  ce = m, ne = null;
  try {
    return It(E, !0);
  } finally {
    ne = p, ce = l;
  }
}
function ni(o, a) {
  a = a ? Object.assign({}, yr, a) : yr;
  const p = {
    value: o,
    observers: null,
    observerSlots: null,
    comparator: a.equals || void 0
  }, l = (c) => (typeof c == "function" && (c = c(p.value)), ju(p, c));
  return [Iu.bind(p), l];
}
function Se(o, a, p) {
  const l = oi(o, a, !1, Xe);
  Nt(l);
}
function _4(o, a, p) {
  Pu = B4;
  const l = oi(o, a, !1, Xe);
  (!p || !p.render) && (l.user = !0), $e ? $e.push(l) : Nt(l);
}
function it(o, a, p) {
  p = p ? Object.assign({}, yr, p) : yr;
  const l = oi(o, a, !0, 0);
  return l.observers = null, l.observerSlots = null, l.comparator = p.equals || void 0, Nt(l), Iu.bind(l);
}
function Pt(o) {
  if (ne === null)
    return o();
  const a = ne;
  ne = null;
  try {
    return o();
  } finally {
    ne = a;
  }
}
function C4() {
  return ce;
}
function Iu() {
  if (this.sources && this.state)
    if (this.state === Xe)
      Nt(this);
    else {
      const o = de;
      de = null, It(() => Rr(this), !1), de = o;
    }
  if (ne) {
    const o = this.observers ? this.observers.length : 0;
    ne.sources ? (ne.sources.push(this), ne.sourceSlots.push(o)) : (ne.sources = [this], ne.sourceSlots = [o]), this.observers ? (this.observers.push(ne), this.observerSlots.push(ne.sources.length - 1)) : (this.observers = [ne], this.observerSlots = [ne.sources.length - 1]);
  }
  return this.value;
}
function ju(o, a, p) {
  let l = o.value;
  return (!o.comparator || !o.comparator(l, a)) && (o.value = a, o.observers && o.observers.length && It(() => {
    for (let c = 0; c < o.observers.length; c += 1) {
      const g = o.observers[c], m = Jr && Jr.running;
      m && Jr.disposed.has(g), (m ? !g.tState : !g.state) && (g.pure ? de.push(g) : $e.push(g), g.observers && qu(g)), m || (g.state = Xe);
    }
    if (de.length > 1e6)
      throw de = [], new Error();
  }, !1)), a;
}
function Nt(o) {
  if (!o.fn)
    return;
  vr(o);
  const a = Tr;
  S4(
    o,
    o.value,
    a
  );
}
function S4(o, a, p) {
  let l;
  const c = ce, g = ne;
  ne = ce = o;
  try {
    l = o.fn(a);
  } catch (m) {
    return o.pure && (o.state = Xe, o.owned && o.owned.forEach(vr), o.owned = null), o.updatedAt = p + 1, Mu(m);
  } finally {
    ne = g, ce = c;
  }
  (!o.updatedAt || o.updatedAt <= p) && (o.updatedAt != null && "observers" in o ? ju(o, l) : o.value = l, o.updatedAt = p);
}
function oi(o, a, p, l = Xe, c) {
  const g = {
    fn: o,
    state: l,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: a,
    owner: ce,
    context: ce ? ce.context : null,
    pure: p
  };
  return ce === null || ce !== Nu && (ce.owned ? ce.owned.push(g) : ce.owned = [g]), g;
}
function gr(o) {
  if (o.state === 0)
    return;
  if (o.state === Er)
    return Rr(o);
  if (o.suspense && Pt(o.suspense.inFallback))
    return o.suspense.effects.push(o);
  const a = [o];
  for (; (o = o.owner) && (!o.updatedAt || o.updatedAt < Tr); )
    o.state && a.push(o);
  for (let p = a.length - 1; p >= 0; p--)
    if (o = a[p], o.state === Xe)
      Nt(o);
    else if (o.state === Er) {
      const l = de;
      de = null, It(() => Rr(o, a[0]), !1), de = l;
    }
}
function It(o, a) {
  if (de)
    return o();
  let p = !1;
  a || (de = []), $e ? p = !0 : $e = [], Tr++;
  try {
    const l = o();
    return x4(p), l;
  } catch (l) {
    p || ($e = null), de = null, Mu(l);
  }
}
function x4(o) {
  if (de && (Fu(de), de = null), o)
    return;
  const a = $e;
  $e = null, a.length && It(() => Pu(a), !1);
}
function Fu(o) {
  for (let a = 0; a < o.length; a++)
    gr(o[a]);
}
function B4(o) {
  let a, p = 0;
  for (a = 0; a < o.length; a++) {
    const l = o[a];
    l.user ? o[p++] = l : gr(l);
  }
  for (a = 0; a < p; a++)
    gr(o[a]);
}
function Rr(o, a) {
  o.state = 0;
  for (let p = 0; p < o.sources.length; p += 1) {
    const l = o.sources[p];
    if (l.sources) {
      const c = l.state;
      c === Xe ? l !== a && (!l.updatedAt || l.updatedAt < Tr) && gr(l) : c === Er && Rr(l, a);
    }
  }
}
function qu(o) {
  for (let a = 0; a < o.observers.length; a += 1) {
    const p = o.observers[a];
    p.state || (p.state = Er, p.pure ? de.push(p) : $e.push(p), p.observers && qu(p));
  }
}
function vr(o) {
  let a;
  if (o.sources)
    for (; o.sources.length; ) {
      const p = o.sources.pop(), l = o.sourceSlots.pop(), c = p.observers;
      if (c && c.length) {
        const g = c.pop(), m = p.observerSlots.pop();
        l < c.length && (g.sourceSlots[m] = l, c[l] = g, p.observerSlots[l] = m);
      }
    }
  if (o.owned) {
    for (a = o.owned.length - 1; a >= 0; a--)
      vr(o.owned[a]);
    o.owned = null;
  }
  if (o.cleanups) {
    for (a = o.cleanups.length - 1; a >= 0; a--)
      o.cleanups[a]();
    o.cleanups = null;
  }
  o.state = 0;
}
function k4(o) {
  return o instanceof Error ? o : new Error(typeof o == "string" ? o : "Unknown error", {
    cause: o
  });
}
function Mu(o, a = ce) {
  throw k4(o);
}
function $u(o, a) {
  return Pt(() => o(a || {}));
}
function mr() {
  return !0;
}
const K4 = {
  get(o, a, p) {
    return a === ii ? p : o.get(a);
  },
  has(o, a) {
    return a === ii ? !0 : o.has(a);
  },
  set: mr,
  deleteProperty: mr,
  getOwnPropertyDescriptor(o, a) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return o.get(a);
      },
      set: mr,
      deleteProperty: mr
    };
  },
  ownKeys(o) {
    return o.keys();
  }
};
function Qr(o) {
  return (o = typeof o == "function" ? o() : o) ? o : {};
}
function U4() {
  for (let o = 0, a = this.length; o < a; ++o) {
    const p = this[o]();
    if (p !== void 0)
      return p;
  }
}
function V4(...o) {
  let a = !1;
  for (let m = 0; m < o.length; m++) {
    const E = o[m];
    a = a || !!E && ii in E, o[m] = typeof E == "function" ? (a = !0, it(E)) : E;
  }
  if (a)
    return new Proxy(
      {
        get(m) {
          for (let E = o.length - 1; E >= 0; E--) {
            const f = Qr(o[E])[m];
            if (f !== void 0)
              return f;
          }
        },
        has(m) {
          for (let E = o.length - 1; E >= 0; E--)
            if (m in Qr(o[E]))
              return !0;
          return !1;
        },
        keys() {
          const m = [];
          for (let E = 0; E < o.length; E++)
            m.push(...Object.keys(Qr(o[E])));
          return [...new Set(m)];
        }
      },
      K4
    );
  const p = {}, l = /* @__PURE__ */ Object.create(null);
  for (let m = o.length - 1; m >= 0; m--) {
    const E = o[m];
    if (!E)
      continue;
    const f = Object.getOwnPropertyNames(E);
    for (let x = f.length - 1; x >= 0; x--) {
      const V = f[x];
      if (V === "__proto__" || V === "constructor")
        continue;
      const q = Object.getOwnPropertyDescriptor(E, V);
      if (!l[V])
        l[V] = q.get ? {
          enumerable: !0,
          configurable: !0,
          get: U4.bind(p[V] = [q.get.bind(E)])
        } : q.value !== void 0 ? q : void 0;
      else {
        const Z = p[V];
        Z && (q.get ? Z.push(q.get.bind(E)) : q.value !== void 0 && Z.push(() => q.value));
      }
    }
  }
  const c = {}, g = Object.keys(l);
  for (let m = g.length - 1; m >= 0; m--) {
    const E = g[m], f = l[E];
    f && f.get ? Object.defineProperty(c, E, f) : c[E] = f ? f.value : void 0;
  }
  return c;
}
function D4(o, a, p) {
  let l = p.length, c = a.length, g = l, m = 0, E = 0, f = a[c - 1].nextSibling, x = null;
  for (; m < c || E < g; ) {
    if (a[m] === p[E]) {
      m++, E++;
      continue;
    }
    for (; a[c - 1] === p[g - 1]; )
      c--, g--;
    if (c === m) {
      const V = g < l ? E ? p[E - 1].nextSibling : p[g - E] : f;
      for (; E < g; )
        o.insertBefore(p[E++], V);
    } else if (g === E)
      for (; m < c; )
        (!x || !x.has(a[m])) && a[m].remove(), m++;
    else if (a[m] === p[g - 1] && p[E] === a[c - 1]) {
      const V = a[--c].nextSibling;
      o.insertBefore(p[E++], a[m++].nextSibling), o.insertBefore(p[--g], V), a[c] = p[g];
    } else {
      if (!x) {
        x = /* @__PURE__ */ new Map();
        let q = E;
        for (; q < g; )
          x.set(p[q], q++);
      }
      const V = x.get(a[m]);
      if (V != null)
        if (E < V && V < g) {
          let q = m, Z = 1, be;
          for (; ++q < c && q < g && !((be = x.get(a[q])) == null || be !== V + Z); )
            Z++;
          if (Z > V - E) {
            const oe = a[m];
            for (; E < V; )
              o.insertBefore(p[E++], oe);
          } else
            o.replaceChild(p[E++], a[m++]);
        } else
          m++;
      else
        a[m++].remove();
    }
  }
}
const wu = "_$DX_DELEGATE";
function we(o, a, p) {
  let l;
  const c = () => {
    const m = document.createElement("template");
    return m.innerHTML = o, p ? m.content.firstChild.firstChild : m.content.firstChild;
  }, g = a ? () => Pt(() => document.importNode(l || (l = c()), !0)) : () => (l || (l = c())).cloneNode(!0);
  return g.cloneNode = g, g;
}
function P4(o, a = window.document) {
  const p = a[wu] || (a[wu] = /* @__PURE__ */ new Set());
  for (let l = 0, c = o.length; l < c; l++) {
    const g = o[l];
    p.has(g) || (p.add(g), a.addEventListener(g, N4));
  }
}
function fe(o, a, p) {
  p == null ? o.removeAttribute(a) : o.setAttribute(a, p);
}
function Ou(o, a) {
  a == null ? o.removeAttribute("class") : o.className = a;
}
function Lu(o, a, p) {
  return Pt(() => o(a, p));
}
function ie(o, a, p, l) {
  if (p !== void 0 && !l && (l = []), typeof a != "function")
    return br(o, a, l, p);
  Se((c) => br(o, a(), c, p), l);
}
function N4(o) {
  const a = `$$${o.type}`;
  let p = o.composedPath && o.composedPath()[0] || o.target;
  for (o.target !== p && Object.defineProperty(o, "target", {
    configurable: !0,
    value: p
  }), Object.defineProperty(o, "currentTarget", {
    configurable: !0,
    get() {
      return p || document;
    }
  }); p; ) {
    const l = p[a];
    if (l && !p.disabled) {
      const c = p[`${a}Data`];
      if (c !== void 0 ? l.call(p, c, o) : l.call(p, o), o.cancelBubble)
        return;
    }
    p = p._$host || p.parentNode || p.host;
  }
}
function br(o, a, p, l, c) {
  for (; typeof p == "function"; )
    p = p();
  if (a === p)
    return p;
  const g = typeof a, m = l !== void 0;
  if (o = m && p[0] && p[0].parentNode || o, g === "string" || g === "number")
    if (g === "number" && (a = a.toString()), m) {
      let E = p[0];
      E && E.nodeType === 3 ? E.data !== a && (E.data = a) : E = document.createTextNode(a), p = ft(o, p, l, E);
    } else
      p !== "" && typeof p == "string" ? p = o.firstChild.data = a : p = o.textContent = a;
  else if (a == null || g === "boolean")
    p = ft(o, p, l);
  else {
    if (g === "function")
      return Se(() => {
        let E = a();
        for (; typeof E == "function"; )
          E = E();
        p = br(o, E, p, l);
      }), () => p;
    if (Array.isArray(a)) {
      const E = [], f = p && Array.isArray(p);
      if (si(E, a, p, c))
        return Se(() => p = br(o, E, p, l, !0)), () => p;
      if (E.length === 0) {
        if (p = ft(o, p, l), m)
          return p;
      } else
        f ? p.length === 0 ? _u(o, E, l) : D4(o, p, E) : (p && ft(o), _u(o, E));
      p = E;
    } else if (a.nodeType) {
      if (Array.isArray(p)) {
        if (m)
          return p = ft(o, p, l, a);
        ft(o, p, null, a);
      } else
        p == null || p === "" || !o.firstChild ? o.appendChild(a) : o.replaceChild(a, o.firstChild);
      p = a;
    }
  }
  return p;
}
function si(o, a, p, l) {
  let c = !1;
  for (let g = 0, m = a.length; g < m; g++) {
    let E = a[g], f = p && p[o.length], x;
    if (!(E == null || E === !0 || E === !1))
      if ((x = typeof E) == "object" && E.nodeType)
        o.push(E);
      else if (Array.isArray(E))
        c = si(o, E, f) || c;
      else if (x === "function")
        if (l) {
          for (; typeof E == "function"; )
            E = E();
          c = si(
            o,
            Array.isArray(E) ? E : [E],
            Array.isArray(f) ? f : [f]
          ) || c;
        } else
          o.push(E), c = !0;
      else {
        const V = String(E);
        f && f.nodeType === 3 && f.data === V ? o.push(f) : o.push(document.createTextNode(V));
      }
  }
  return c;
}
function _u(o, a, p = null) {
  for (let l = 0, c = a.length; l < c; l++)
    o.insertBefore(a[l], p);
}
function ft(o, a, p, l) {
  if (p === void 0)
    return o.textContent = "";
  const c = l || document.createTextNode("");
  if (a.length) {
    let g = !1;
    for (let m = a.length - 1; m >= 0; m--) {
      const E = a[m];
      if (c !== E) {
        const f = E.parentNode === o;
        !g && !m ? f ? o.replaceChild(c, E) : o.insertBefore(c, p) : f && E.remove();
      } else
        g = !0;
    }
  } else
    o.insertBefore(c, p);
  return [c];
}
function I4(o) {
  const a = Object.keys(o), p = {};
  for (let l = 0; l < a.length; l++) {
    const [c, g] = ni(o[a[l]]);
    Object.defineProperty(p, a[l], {
      get: c,
      set(m) {
        g(() => m);
      }
    });
  }
  return p;
}
function j4(o) {
  if (o.assignedSlot && o.assignedSlot._$owner)
    return o.assignedSlot._$owner;
  let a = o.parentNode;
  for (; a && !a._$owner && !(a.assignedSlot && a.assignedSlot._$owner); )
    a = a.parentNode;
  return a && a.assignedSlot ? a.assignedSlot._$owner : o._$owner;
}
function F4(o) {
  return (a, p) => {
    const { element: l } = p;
    return L4((c) => {
      const g = I4(a);
      l.addPropertyChangedCallback((E, f) => g[E] = f), l.addReleaseCallback(() => {
        l.renderRoot.textContent = "", c();
      });
      const m = o(g, p);
      return ie(l.renderRoot, m);
    }, j4(l));
  };
}
function q4(o, a, p) {
  return arguments.length === 2 && (p = a, a = {}), T4(o, a)(F4(p));
}
const M4 = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#00cccc}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#00cccc}input::placeholder,textarea::placeholder{opacity:1;color:#00cccc}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.fixed{position:fixed}.right-5{right:1.25rem}.top-5{top:1.25rem}.col-span-2{grid-column:span 2 / span 2}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-auto{margin-left:auto;margin-right:auto}.mb-1{margin-bottom:.25rem}.ml-10{margin-left:2.5rem}.mr-1{margin-right:.25rem}.mt-4{margin-top:1rem}.block{display:block}.inline{display:inline}.flex{display:flex}.grid{display:grid}.h-10{height:2.5rem}.h-14{height:3.5rem}.h-2{height:.5rem}.h-4{height:1rem}.max-h-\\[90vh\\]{max-height:90vh}.w-10{width:2.5rem}.w-14{width:3.5rem}.w-4{width:1rem}.max-w-\\[calc\\(100vw-96px\\)\\]{max-width:calc(100vw - 96px)}.max-w-screen-sm{max-width:640px}.flex-1{flex:1 1 0%}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.items-center{align-items:center}.justify-center{justify-content:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-4{gap:1rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-md{border-radius:.375rem}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-white{--tw-border-opacity: 1;border-color:rgb(0 204 204 / var(--tw-border-opacity))}.bg-cyan-200{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.bgwhite{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bgwhite{--tw-bg-opacity: 1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.bgwhite{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity))}.p-3{padding:.75rem}.p-4{padding:1rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-white{--tw-text-opacity: 1;color:rgb(0 204 204 / var(--tw-text-opacity))}.textwhite{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity))}.textwhite{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop\\:bg-cyan-200::backdrop{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.backdrop\\:opacity-90::backdrop{opacity:.9}.hover\\:underline:hover{text-decoration-line:underline}.dark\\:border-white:where(.dark,.dark *){--tw-border-opacity: 1;border-color:rgb(0 204 204 / var(--tw-border-opacity))}.dark\\:bgwhite:where(.dark,.dark *){--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity))}.dark\\:textwhite:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity))}.dark\\:text-white:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}';
var Gu = { exports: {} };
(function(o) {
  var a = Object.create, p = Object.defineProperty, l = Object.getOwnPropertyDescriptor, c = Object.getOwnPropertyNames, g = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty, E = (t, i) => function() {
    return i || (0, t[c(t)[0]])((i = { exports: {} }).exports, i), i.exports;
  }, f = (t, i) => {
    for (var r in i)
      p(t, r, { get: i[r], enumerable: !0 });
  }, x = (t, i, r, n) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let s of c(i))
        !m.call(t, s) && s !== r && p(t, s, { get: () => i[s], enumerable: !(n = l(i, s)) || n.enumerable });
    return t;
  }, V = (t, i, r) => (r = t != null ? a(g(t)) : {}, x(i || !t || !t.__esModule ? p(r, "default", { value: t, enumerable: !0 }) : r, t)), q = (t) => x(p({}, "__esModule", { value: !0 }), t), Z = E({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/boundaries.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.EXTENDED_PICTOGRAPHIC = t.CLUSTER_BREAK = void 0, function(i) {
        i[i.CR = 0] = "CR", i[i.LF = 1] = "LF", i[i.CONTROL = 2] = "CONTROL", i[i.EXTEND = 3] = "EXTEND", i[i.REGIONAL_INDICATOR = 4] = "REGIONAL_INDICATOR", i[i.SPACINGMARK = 5] = "SPACINGMARK", i[i.L = 6] = "L", i[i.V = 7] = "V", i[i.T = 8] = "T", i[i.LV = 9] = "LV", i[i.LVT = 10] = "LVT", i[i.OTHER = 11] = "OTHER", i[i.PREPEND = 12] = "PREPEND", i[i.E_BASE = 13] = "E_BASE", i[i.E_MODIFIER = 14] = "E_MODIFIER", i[i.ZWJ = 15] = "ZWJ", i[i.GLUE_AFTER_ZWJ = 16] = "GLUE_AFTER_ZWJ", i[i.E_BASE_GAZ = 17] = "E_BASE_GAZ";
      }(t.CLUSTER_BREAK || (t.CLUSTER_BREAK = {})), t.EXTENDED_PICTOGRAPHIC = 101;
    }
  }), be = E({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/GraphemerHelper.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = Z(), r = 0, n = 1, s = 2, u = 3, e = 4, d = class {
        static isSurrogate(y, T) {
          return 55296 <= y.charCodeAt(T) && y.charCodeAt(T) <= 56319 && 56320 <= y.charCodeAt(T + 1) && y.charCodeAt(T + 1) <= 57343;
        }
        static codePointAt(y, T) {
          T === void 0 && (T = 0);
          const L = y.charCodeAt(T);
          if (55296 <= L && L <= 56319 && T < y.length - 1) {
            const S = L, X = y.charCodeAt(T + 1);
            return 56320 <= X && X <= 57343 ? (S - 55296) * 1024 + (X - 56320) + 65536 : S;
          }
          if (56320 <= L && L <= 57343 && T >= 1) {
            const S = y.charCodeAt(T - 1), X = L;
            return 55296 <= S && S <= 56319 ? (S - 55296) * 1024 + (X - 56320) + 65536 : X;
          }
          return L;
        }
        static shouldBreak(y, T, L, S, X, ae) {
          const I = [y].concat(T).concat([L]), z = [S].concat(X).concat([ae]), H = I[I.length - 2], G = L, ge = ae, ye = I.lastIndexOf(i.CLUSTER_BREAK.REGIONAL_INDICATOR);
          if (ye > 0 && I.slice(1, ye).every(function(le) {
            return le === i.CLUSTER_BREAK.REGIONAL_INDICATOR;
          }) && [i.CLUSTER_BREAK.PREPEND, i.CLUSTER_BREAK.REGIONAL_INDICATOR].indexOf(H) === -1)
            return I.filter(function(le) {
              return le === i.CLUSTER_BREAK.REGIONAL_INDICATOR;
            }).length % 2 === 1 ? u : e;
          if (H === i.CLUSTER_BREAK.CR && G === i.CLUSTER_BREAK.LF)
            return r;
          if (H === i.CLUSTER_BREAK.CONTROL || H === i.CLUSTER_BREAK.CR || H === i.CLUSTER_BREAK.LF)
            return n;
          if (G === i.CLUSTER_BREAK.CONTROL || G === i.CLUSTER_BREAK.CR || G === i.CLUSTER_BREAK.LF)
            return n;
          if (H === i.CLUSTER_BREAK.L && (G === i.CLUSTER_BREAK.L || G === i.CLUSTER_BREAK.V || G === i.CLUSTER_BREAK.LV || G === i.CLUSTER_BREAK.LVT))
            return r;
          if ((H === i.CLUSTER_BREAK.LV || H === i.CLUSTER_BREAK.V) && (G === i.CLUSTER_BREAK.V || G === i.CLUSTER_BREAK.T))
            return r;
          if ((H === i.CLUSTER_BREAK.LVT || H === i.CLUSTER_BREAK.T) && G === i.CLUSTER_BREAK.T)
            return r;
          if (G === i.CLUSTER_BREAK.EXTEND || G === i.CLUSTER_BREAK.ZWJ)
            return r;
          if (G === i.CLUSTER_BREAK.SPACINGMARK)
            return r;
          if (H === i.CLUSTER_BREAK.PREPEND)
            return r;
          const $ = z.slice(0, -1).lastIndexOf(i.EXTENDED_PICTOGRAPHIC);
          return $ !== -1 && z[$] === i.EXTENDED_PICTOGRAPHIC && I.slice($ + 1, -2).every(function(le) {
            return le === i.CLUSTER_BREAK.EXTEND;
          }) && H === i.CLUSTER_BREAK.ZWJ && ge === i.EXTENDED_PICTOGRAPHIC ? r : T.indexOf(i.CLUSTER_BREAK.REGIONAL_INDICATOR) !== -1 ? s : H === i.CLUSTER_BREAK.REGIONAL_INDICATOR && G === i.CLUSTER_BREAK.REGIONAL_INDICATOR ? r : n;
        }
      };
      t.default = d;
    }
  }), oe = E({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/GraphemerIterator.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = class {
        constructor(r, n) {
          this._index = 0, this._str = r, this._nextBreak = n;
        }
        [Symbol.iterator]() {
          return this;
        }
        next() {
          let r;
          if ((r = this._nextBreak(this._str, this._index)) < this._str.length) {
            const n = this._str.slice(this._index, r);
            return this._index = r, { value: n, done: !1 };
          }
          if (this._index < this._str.length) {
            const n = this._str.slice(this._index);
            return this._index = this._str.length, { value: n, done: !1 };
          }
          return { value: void 0, done: !0 };
        }
      };
      t.default = i;
    }
  }), W = E({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/Graphemer.js"(t) {
      var i = t && t.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = Z(), n = i(be()), s = i(oe()), u = class {
        static nextBreak(e, d) {
          if (d === void 0 && (d = 0), d < 0)
            return 0;
          if (d >= e.length - 1)
            return e.length;
          const y = n.default.codePointAt(e, d), T = u.getGraphemeBreakProperty(y), L = u.getEmojiProperty(y), S = [], X = [];
          for (let ae = d + 1; ae < e.length; ae++) {
            if (n.default.isSurrogate(e, ae - 1))
              continue;
            const I = n.default.codePointAt(e, ae), z = u.getGraphemeBreakProperty(I), H = u.getEmojiProperty(I);
            if (n.default.shouldBreak(T, S, z, L, X, H))
              return ae;
            S.push(z), X.push(H);
          }
          return e.length;
        }
        splitGraphemes(e) {
          const d = [];
          let y = 0, T;
          for (; (T = u.nextBreak(e, y)) < e.length; )
            d.push(e.slice(y, T)), y = T;
          return y < e.length && d.push(e.slice(y)), d;
        }
        iterateGraphemes(e) {
          return new s.default(e, u.nextBreak);
        }
        countGraphemes(e) {
          let d = 0, y = 0, T;
          for (; (T = u.nextBreak(e, y)) < e.length; )
            y = T, d++;
          return y < e.length && d++, d;
        }
        static getGraphemeBreakProperty(e) {
          if (e < 48905) {
            if (e < 44116) {
              if (e < 4141) {
                if (e < 2818) {
                  if (e < 2363)
                    if (e < 1759) {
                      if (e < 1471) {
                        if (e < 127) {
                          if (e < 11) {
                            if (e < 10) {
                              if (0 <= e && e <= 9)
                                return r.CLUSTER_BREAK.CONTROL;
                            } else if (e === 10)
                              return r.CLUSTER_BREAK.LF;
                          } else if (e < 13) {
                            if (11 <= e && e <= 12)
                              return r.CLUSTER_BREAK.CONTROL;
                          } else if (e < 14) {
                            if (e === 13)
                              return r.CLUSTER_BREAK.CR;
                          } else if (14 <= e && e <= 31)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (e < 768) {
                          if (e < 173) {
                            if (127 <= e && e <= 159)
                              return r.CLUSTER_BREAK.CONTROL;
                          } else if (e === 173)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (e < 1155) {
                          if (768 <= e && e <= 879)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1425) {
                          if (1155 <= e && e <= 1161)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1425 <= e && e <= 1469)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1552) {
                        if (e < 1476) {
                          if (e < 1473) {
                            if (e === 1471)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (1473 <= e && e <= 1474)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1479) {
                          if (1476 <= e && e <= 1477)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1536) {
                          if (e === 1479)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1536 <= e && e <= 1541)
                          return r.CLUSTER_BREAK.PREPEND;
                      } else if (e < 1648) {
                        if (e < 1564) {
                          if (1552 <= e && e <= 1562)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1611) {
                          if (e === 1564)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (1611 <= e && e <= 1631)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1750) {
                        if (e === 1648)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1757) {
                        if (1750 <= e && e <= 1756)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 1757)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2075) {
                      if (e < 1840)
                        if (e < 1770) {
                          if (e < 1767) {
                            if (1759 <= e && e <= 1764)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (1767 <= e && e <= 1768)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1807) {
                          if (1770 <= e && e <= 1773)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else {
                          if (e === 1807)
                            return r.CLUSTER_BREAK.PREPEND;
                          if (e === 1809)
                            return r.CLUSTER_BREAK.EXTEND;
                        }
                      else if (e < 2027) {
                        if (e < 1958) {
                          if (1840 <= e && e <= 1866)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1958 <= e && e <= 1968)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2045) {
                        if (2027 <= e && e <= 2035)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2070) {
                        if (e === 2045)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2070 <= e && e <= 2073)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2200) {
                      if (e < 2089) {
                        if (e < 2085) {
                          if (2075 <= e && e <= 2083)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2085 <= e && e <= 2087)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2137) {
                        if (2089 <= e && e <= 2093)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2192) {
                        if (2137 <= e && e <= 2139)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2192 <= e && e <= 2193)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2275) {
                      if (e < 2250) {
                        if (2200 <= e && e <= 2207)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2274) {
                        if (2250 <= e && e <= 2273)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2274)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2307) {
                      if (2275 <= e && e <= 2306)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 2307)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 2362)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 2561) {
                    if (e < 2434) {
                      if (e < 2381) {
                        if (e < 2366) {
                          if (e === 2363)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                          if (e === 2364)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2369) {
                          if (2366 <= e && e <= 2368)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e < 2377) {
                          if (2369 <= e && e <= 2376)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2377 <= e && e <= 2380)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2385) {
                        if (e < 2382) {
                          if (e === 2381)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2382 <= e && e <= 2383)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2402) {
                        if (2385 <= e && e <= 2391)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2433) {
                        if (2402 <= e && e <= 2403)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2433)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2503) {
                      if (e < 2494) {
                        if (e < 2492) {
                          if (2434 <= e && e <= 2435)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e === 2492)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2495) {
                        if (e === 2494)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2497) {
                        if (2495 <= e && e <= 2496)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (2497 <= e && e <= 2500)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2519) {
                      if (e < 2507) {
                        if (2503 <= e && e <= 2504)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2509) {
                        if (2507 <= e && e <= 2508)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 2509)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2530) {
                      if (e === 2519)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2558) {
                      if (2530 <= e && e <= 2531)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 2558)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2691) {
                    if (e < 2631) {
                      if (e < 2620) {
                        if (e < 2563) {
                          if (2561 <= e && e <= 2562)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e === 2563)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2622) {
                        if (e === 2620)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2625) {
                        if (2622 <= e && e <= 2624)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (2625 <= e && e <= 2626)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2672) {
                      if (e < 2635) {
                        if (2631 <= e && e <= 2632)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2641) {
                        if (2635 <= e && e <= 2637)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2641)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2677) {
                      if (2672 <= e && e <= 2673)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2689) {
                      if (e === 2677)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (2689 <= e && e <= 2690)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2761) {
                    if (e < 2750) {
                      if (e === 2691)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 2748)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2753) {
                      if (2750 <= e && e <= 2752)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 2759) {
                      if (2753 <= e && e <= 2757)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (2759 <= e && e <= 2760)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2786) {
                    if (e < 2763) {
                      if (e === 2761)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 2765) {
                      if (2763 <= e && e <= 2764)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 2765)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2810) {
                    if (2786 <= e && e <= 2787)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2817) {
                    if (2810 <= e && e <= 2815)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 2817)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3315) {
                  if (e < 3076) {
                    if (e < 2946) {
                      if (e < 2887) {
                        if (e < 2878) {
                          if (e < 2876) {
                            if (2818 <= e && e <= 2819)
                              return r.CLUSTER_BREAK.SPACINGMARK;
                          } else if (e === 2876)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2880) {
                          if (2878 <= e && e <= 2879)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2881) {
                          if (e === 2880)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (2881 <= e && e <= 2884)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2893) {
                        if (e < 2891) {
                          if (2887 <= e && e <= 2888)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (2891 <= e && e <= 2892)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2901) {
                        if (e === 2893)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2914) {
                        if (2901 <= e && e <= 2903)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2914 <= e && e <= 2915)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3014) {
                      if (e < 3007) {
                        if (e === 2946 || e === 3006)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3008) {
                        if (e === 3007)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3009) {
                        if (e === 3008)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3009 <= e && e <= 3010)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3031) {
                      if (e < 3018) {
                        if (3014 <= e && e <= 3016)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3021) {
                        if (3018 <= e && e <= 3020)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 3021)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3072) {
                      if (e === 3031)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3073) {
                      if (e === 3072)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3073 <= e && e <= 3075)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3262) {
                    if (e < 3146) {
                      if (e < 3134) {
                        if (e === 3076 || e === 3132)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3137) {
                        if (3134 <= e && e <= 3136)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3142) {
                        if (3137 <= e && e <= 3140)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (3142 <= e && e <= 3144)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3201) {
                      if (e < 3157) {
                        if (3146 <= e && e <= 3149)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3170) {
                        if (3157 <= e && e <= 3158)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3170 <= e && e <= 3171)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3202) {
                      if (e === 3201)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3260) {
                      if (3202 <= e && e <= 3203)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 3260)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3270) {
                    if (e < 3264) {
                      if (e === 3262)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 3263)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3266) {
                      if (3264 <= e && e <= 3265)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3267) {
                      if (e === 3266)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3267 <= e && e <= 3268)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3276) {
                    if (e < 3271) {
                      if (e === 3270)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3274) {
                      if (3271 <= e && e <= 3272)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (3274 <= e && e <= 3275)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3285) {
                    if (3276 <= e && e <= 3277)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3298) {
                    if (3285 <= e && e <= 3286)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3298 <= e && e <= 3299)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3551) {
                  if (e < 3406) {
                    if (e < 3391) {
                      if (e < 3330) {
                        if (e < 3328) {
                          if (e === 3315)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (3328 <= e && e <= 3329)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3387) {
                        if (3330 <= e && e <= 3331)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3390) {
                        if (3387 <= e && e <= 3388)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 3390)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3398) {
                      if (e < 3393) {
                        if (3391 <= e && e <= 3392)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (3393 <= e && e <= 3396)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3402) {
                      if (3398 <= e && e <= 3400)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3405) {
                      if (3402 <= e && e <= 3404)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 3405)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3530) {
                    if (e < 3426) {
                      if (e === 3406)
                        return r.CLUSTER_BREAK.PREPEND;
                      if (e === 3415)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3457) {
                      if (3426 <= e && e <= 3427)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3458) {
                      if (e === 3457)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3458 <= e && e <= 3459)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3538) {
                    if (e < 3535) {
                      if (e === 3530)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3536) {
                      if (e === 3535)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3536 <= e && e <= 3537)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3542) {
                    if (3538 <= e && e <= 3540)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3544) {
                    if (e === 3542)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3544 <= e && e <= 3550)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 3893) {
                  if (e < 3655) {
                    if (e < 3633) {
                      if (e < 3570) {
                        if (e === 3551)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3570 <= e && e <= 3571)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3635) {
                      if (e === 3633)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3636) {
                      if (e === 3635)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (3636 <= e && e <= 3642)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3764)
                    if (e < 3761) {
                      if (3655 <= e && e <= 3662)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 3761)
                        return r.CLUSTER_BREAK.EXTEND;
                      if (e === 3763)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    }
                  else if (e < 3784) {
                    if (3764 <= e && e <= 3772)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3864) {
                    if (3784 <= e && e <= 3790)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3864 <= e && e <= 3865)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3967) {
                  if (e < 3897) {
                    if (e === 3893 || e === 3895)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3902) {
                    if (e === 3897)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3953) {
                    if (3902 <= e && e <= 3903)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (3953 <= e && e <= 3966)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3981) {
                  if (e < 3968) {
                    if (e === 3967)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3974) {
                    if (3968 <= e && e <= 3972)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3974 <= e && e <= 3975)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3993) {
                  if (3981 <= e && e <= 3991)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 4038) {
                  if (3993 <= e && e <= 4028)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 4038)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 7204) {
                if (e < 6448) {
                  if (e < 5938) {
                    if (e < 4226) {
                      if (e < 4157) {
                        if (e < 4146) {
                          if (e < 4145) {
                            if (4141 <= e && e <= 4144)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (e === 4145)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e < 4153) {
                          if (4146 <= e && e <= 4151)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 4155) {
                          if (4153 <= e && e <= 4154)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (4155 <= e && e <= 4156)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4184) {
                        if (e < 4182) {
                          if (4157 <= e && e <= 4158)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (4182 <= e && e <= 4183)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4190) {
                        if (4184 <= e && e <= 4185)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 4209) {
                        if (4190 <= e && e <= 4192)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (4209 <= e && e <= 4212)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 4352) {
                      if (e < 4229) {
                        if (e === 4226)
                          return r.CLUSTER_BREAK.EXTEND;
                        if (e === 4228)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4237) {
                        if (4229 <= e && e <= 4230)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 4237 || e === 4253)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 4957) {
                      if (e < 4448) {
                        if (4352 <= e && e <= 4447)
                          return r.CLUSTER_BREAK.L;
                      } else if (e < 4520) {
                        if (4448 <= e && e <= 4519)
                          return r.CLUSTER_BREAK.V;
                      } else if (4520 <= e && e <= 4607)
                        return r.CLUSTER_BREAK.T;
                    } else if (e < 5906) {
                      if (4957 <= e && e <= 4959)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 5909) {
                      if (5906 <= e && e <= 5908)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 5909)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6089) {
                    if (e < 6070) {
                      if (e < 5970) {
                        if (e < 5940) {
                          if (5938 <= e && e <= 5939)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e === 5940)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 6002) {
                        if (5970 <= e && e <= 5971)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 6068) {
                        if (6002 <= e && e <= 6003)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (6068 <= e && e <= 6069)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6078) {
                      if (e < 6071) {
                        if (e === 6070)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (6071 <= e && e <= 6077)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6086) {
                      if (6078 <= e && e <= 6085)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 6087) {
                      if (e === 6086)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6087 <= e && e <= 6088)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6277)
                    if (e < 6155) {
                      if (e < 6109) {
                        if (6089 <= e && e <= 6099)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 6109)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6158) {
                      if (6155 <= e && e <= 6157)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 6158)
                        return r.CLUSTER_BREAK.CONTROL;
                      if (e === 6159)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 6435) {
                    if (e < 6313) {
                      if (6277 <= e && e <= 6278)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6432) {
                      if (e === 6313)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6432 <= e && e <= 6434)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6439) {
                    if (6435 <= e && e <= 6438)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6441) {
                    if (6439 <= e && e <= 6440)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (6441 <= e && e <= 6443)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 6971) {
                  if (e < 6744)
                    if (e < 6681) {
                      if (e < 6451) {
                        if (e < 6450) {
                          if (6448 <= e && e <= 6449)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e === 6450)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 6457) {
                        if (6451 <= e && e <= 6456)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 6679) {
                        if (6457 <= e && e <= 6459)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (6679 <= e && e <= 6680)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6741) {
                      if (e < 6683) {
                        if (6681 <= e && e <= 6682)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 6683)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6742) {
                      if (e === 6741)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else {
                      if (e === 6742)
                        return r.CLUSTER_BREAK.EXTEND;
                      if (e === 6743)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    }
                  else if (e < 6771) {
                    if (e < 6754) {
                      if (e < 6752) {
                        if (6744 <= e && e <= 6750)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 6752)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6757) {
                      if (e === 6754)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6765) {
                      if (6757 <= e && e <= 6764)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6765 <= e && e <= 6770)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6912) {
                    if (e < 6783) {
                      if (6771 <= e && e <= 6780)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6832) {
                      if (e === 6783)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6832 <= e && e <= 6862)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6916) {
                    if (6912 <= e && e <= 6915)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6964) {
                    if (e === 6916)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (6964 <= e && e <= 6970)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 7080) {
                  if (e < 7019) {
                    if (e < 6973) {
                      if (e === 6971)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 6972)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6978) {
                      if (6973 <= e && e <= 6977)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 6979) {
                      if (e === 6978)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6979 <= e && e <= 6980)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7073) {
                    if (e < 7040) {
                      if (7019 <= e && e <= 7027)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 7042) {
                      if (7040 <= e && e <= 7041)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7042)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7074) {
                    if (e === 7073)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7078) {
                    if (7074 <= e && e <= 7077)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (7078 <= e && e <= 7079)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 7144)
                  if (e < 7083) {
                    if (e < 7082) {
                      if (7080 <= e && e <= 7081)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7082)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7142) {
                    if (7083 <= e && e <= 7085)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else {
                    if (e === 7142)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 7143)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 7150) {
                  if (e < 7146) {
                    if (7144 <= e && e <= 7145)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 7149) {
                    if (7146 <= e && e <= 7148)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 7149)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 7151) {
                  if (e === 7150)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 7154) {
                  if (7151 <= e && e <= 7153)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (7154 <= e && e <= 7155)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 43346) {
                if (e < 11647) {
                  if (e < 7415) {
                    if (e < 7380) {
                      if (e < 7220) {
                        if (e < 7212) {
                          if (7204 <= e && e <= 7211)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (7212 <= e && e <= 7219)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 7222) {
                        if (7220 <= e && e <= 7221)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 7376) {
                        if (7222 <= e && e <= 7223)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (7376 <= e && e <= 7378)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 7394) {
                      if (e < 7393) {
                        if (7380 <= e && e <= 7392)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 7393)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 7405) {
                      if (7394 <= e && e <= 7400)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7405 || e === 7412)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 8205)
                    if (e < 7616) {
                      if (e < 7416) {
                        if (e === 7415)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (7416 <= e && e <= 7417)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 8203) {
                      if (7616 <= e && e <= 7679)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 8203)
                        return r.CLUSTER_BREAK.CONTROL;
                      if (e === 8204)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 8288) {
                    if (e < 8206) {
                      if (e === 8205)
                        return r.CLUSTER_BREAK.ZWJ;
                    } else if (e < 8232) {
                      if (8206 <= e && e <= 8207)
                        return r.CLUSTER_BREAK.CONTROL;
                    } else if (8232 <= e && e <= 8238)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 8400) {
                    if (8288 <= e && e <= 8303)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 11503) {
                    if (8400 <= e && e <= 8432)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (11503 <= e && e <= 11505)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43043) {
                  if (e < 42612) {
                    if (e < 12330) {
                      if (e < 11744) {
                        if (e === 11647)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (11744 <= e && e <= 11775)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 12441) {
                      if (12330 <= e && e <= 12335)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 42607) {
                      if (12441 <= e && e <= 12442)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (42607 <= e && e <= 42610)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43010) {
                    if (e < 42654) {
                      if (42612 <= e && e <= 42621)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 42736) {
                      if (42654 <= e && e <= 42655)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (42736 <= e && e <= 42737)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43014) {
                    if (e === 43010)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 43014 || e === 43019)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43188) {
                  if (e < 43047) {
                    if (e < 43045) {
                      if (43043 <= e && e <= 43044)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (43045 <= e && e <= 43046)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43052) {
                    if (e === 43047)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43136) {
                    if (e === 43052)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43136 <= e && e <= 43137)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43263) {
                  if (e < 43204) {
                    if (43188 <= e && e <= 43203)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43232) {
                    if (43204 <= e && e <= 43205)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43232 <= e && e <= 43249)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43302) {
                  if (e === 43263)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43335) {
                  if (43302 <= e && e <= 43309)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (43335 <= e && e <= 43345)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 43698) {
                if (e < 43493) {
                  if (e < 43444)
                    if (e < 43392) {
                      if (e < 43360) {
                        if (43346 <= e && e <= 43347)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (43360 <= e && e <= 43388)
                        return r.CLUSTER_BREAK.L;
                    } else if (e < 43395) {
                      if (43392 <= e && e <= 43394)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 43395)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 43443)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 43450) {
                    if (e < 43446) {
                      if (43444 <= e && e <= 43445)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (43446 <= e && e <= 43449)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43452) {
                    if (43450 <= e && e <= 43451)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43454) {
                    if (43452 <= e && e <= 43453)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43454 <= e && e <= 43456)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43573) {
                  if (e < 43567) {
                    if (e < 43561) {
                      if (e === 43493)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (43561 <= e && e <= 43566)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43569) {
                    if (43567 <= e && e <= 43568)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43571) {
                    if (43569 <= e && e <= 43570)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43571 <= e && e <= 43572)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43597) {
                  if (e < 43587) {
                    if (43573 <= e && e <= 43574)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 43587 || e === 43596)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43644) {
                  if (e === 43597)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 43644 || e === 43696)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 44006) {
                if (e < 43756)
                  if (e < 43710) {
                    if (e < 43703) {
                      if (43698 <= e && e <= 43700)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (43703 <= e && e <= 43704)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43713) {
                    if (43710 <= e && e <= 43711)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else {
                    if (e === 43713)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 43755)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 43766) {
                  if (e < 43758) {
                    if (43756 <= e && e <= 43757)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43765) {
                    if (43758 <= e && e <= 43759)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 43765)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 44003) {
                  if (e === 43766)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 44005) {
                  if (44003 <= e && e <= 44004)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 44005)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 44032)
                if (e < 44009) {
                  if (e < 44008) {
                    if (44006 <= e && e <= 44007)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 44008)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 44012) {
                  if (44009 <= e && e <= 44010)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else {
                  if (e === 44012)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 44013)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 44061) {
                if (e < 44033) {
                  if (e === 44032)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 44060) {
                  if (44033 <= e && e <= 44059)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 44060)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 44088) {
                if (44061 <= e && e <= 44087)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 44089) {
                if (e === 44088)
                  return r.CLUSTER_BREAK.LV;
              } else if (44089 <= e && e <= 44115)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 46497) {
              if (e < 45293) {
                if (e < 44704) {
                  if (e < 44397) {
                    if (e < 44256) {
                      if (e < 44173) {
                        if (e < 44144) {
                          if (e < 44117) {
                            if (e === 44116)
                              return r.CLUSTER_BREAK.LV;
                          } else if (44117 <= e && e <= 44143)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e < 44145) {
                          if (e === 44144)
                            return r.CLUSTER_BREAK.LV;
                        } else if (e < 44172) {
                          if (44145 <= e && e <= 44171)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44172)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44201) {
                        if (e < 44200) {
                          if (44173 <= e && e <= 44199)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44200)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44228) {
                        if (44201 <= e && e <= 44227)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44229) {
                        if (e === 44228)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44229 <= e && e <= 44255)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44313) {
                      if (e < 44284) {
                        if (e < 44257) {
                          if (e === 44256)
                            return r.CLUSTER_BREAK.LV;
                        } else if (44257 <= e && e <= 44283)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44285) {
                        if (e === 44284)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44312) {
                        if (44285 <= e && e <= 44311)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44312)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44368) {
                      if (e < 44340) {
                        if (44313 <= e && e <= 44339)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44341) {
                        if (e === 44340)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44341 <= e && e <= 44367)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44369) {
                      if (e === 44368)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44396) {
                      if (44369 <= e && e <= 44395)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44396)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44537) {
                    if (e < 44480) {
                      if (e < 44425) {
                        if (e < 44424) {
                          if (44397 <= e && e <= 44423)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44424)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44452) {
                        if (44425 <= e && e <= 44451)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44453) {
                        if (e === 44452)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44453 <= e && e <= 44479)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44508) {
                      if (e < 44481) {
                        if (e === 44480)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44481 <= e && e <= 44507)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44509) {
                      if (e === 44508)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44536) {
                      if (44509 <= e && e <= 44535)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44536)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44620) {
                    if (e < 44565) {
                      if (e < 44564) {
                        if (44537 <= e && e <= 44563)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44564)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44592) {
                      if (44565 <= e && e <= 44591)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44593) {
                      if (e === 44592)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44593 <= e && e <= 44619)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44649) {
                    if (e < 44621) {
                      if (e === 44620)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44648) {
                      if (44621 <= e && e <= 44647)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44648)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44676) {
                    if (44649 <= e && e <= 44675)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44677) {
                    if (e === 44676)
                      return r.CLUSTER_BREAK.LV;
                  } else if (44677 <= e && e <= 44703)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 44985) {
                  if (e < 44844) {
                    if (e < 44761) {
                      if (e < 44732) {
                        if (e < 44705) {
                          if (e === 44704)
                            return r.CLUSTER_BREAK.LV;
                        } else if (44705 <= e && e <= 44731)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44733) {
                        if (e === 44732)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44760) {
                        if (44733 <= e && e <= 44759)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44760)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44789) {
                      if (e < 44788) {
                        if (44761 <= e && e <= 44787)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44788)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44816) {
                      if (44789 <= e && e <= 44815)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44817) {
                      if (e === 44816)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44817 <= e && e <= 44843)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44901) {
                    if (e < 44872) {
                      if (e < 44845) {
                        if (e === 44844)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44845 <= e && e <= 44871)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44873) {
                      if (e === 44872)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44900) {
                      if (44873 <= e && e <= 44899)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44900)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44956) {
                    if (e < 44928) {
                      if (44901 <= e && e <= 44927)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44929) {
                      if (e === 44928)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44929 <= e && e <= 44955)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44957) {
                    if (e === 44956)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44984) {
                    if (44957 <= e && e <= 44983)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 44984)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45152) {
                  if (e < 45068) {
                    if (e < 45013) {
                      if (e < 45012) {
                        if (44985 <= e && e <= 45011)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 45012)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45040) {
                      if (45013 <= e && e <= 45039)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45041) {
                      if (e === 45040)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45041 <= e && e <= 45067)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45097) {
                    if (e < 45069) {
                      if (e === 45068)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45096) {
                      if (45069 <= e && e <= 45095)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45096)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45124) {
                    if (45097 <= e && e <= 45123)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45125) {
                    if (e === 45124)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45125 <= e && e <= 45151)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45209) {
                  if (e < 45180) {
                    if (e < 45153) {
                      if (e === 45152)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45153 <= e && e <= 45179)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45181) {
                    if (e === 45180)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45208) {
                    if (45181 <= e && e <= 45207)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45208)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45264) {
                  if (e < 45236) {
                    if (45209 <= e && e <= 45235)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45237) {
                    if (e === 45236)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45237 <= e && e <= 45263)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45265) {
                  if (e === 45264)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45292) {
                  if (45265 <= e && e <= 45291)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 45292)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 45908) {
                if (e < 45600) {
                  if (e < 45433) {
                    if (e < 45376) {
                      if (e < 45321) {
                        if (e < 45320) {
                          if (45293 <= e && e <= 45319)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 45320)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 45348) {
                        if (45321 <= e && e <= 45347)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 45349) {
                        if (e === 45348)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45349 <= e && e <= 45375)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45404) {
                      if (e < 45377) {
                        if (e === 45376)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45377 <= e && e <= 45403)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45405) {
                      if (e === 45404)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45432) {
                      if (45405 <= e && e <= 45431)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45432)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45516) {
                    if (e < 45461) {
                      if (e < 45460) {
                        if (45433 <= e && e <= 45459)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 45460)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45488) {
                      if (45461 <= e && e <= 45487)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45489) {
                      if (e === 45488)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45489 <= e && e <= 45515)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45545) {
                    if (e < 45517) {
                      if (e === 45516)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45544) {
                      if (45517 <= e && e <= 45543)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45544)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45572) {
                    if (45545 <= e && e <= 45571)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45573) {
                    if (e === 45572)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45573 <= e && e <= 45599)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45741) {
                  if (e < 45657) {
                    if (e < 45628) {
                      if (e < 45601) {
                        if (e === 45600)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45601 <= e && e <= 45627)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45629) {
                      if (e === 45628)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45656) {
                      if (45629 <= e && e <= 45655)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45656)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45712) {
                    if (e < 45684) {
                      if (45657 <= e && e <= 45683)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45685) {
                      if (e === 45684)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45685 <= e && e <= 45711)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45713) {
                    if (e === 45712)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45740) {
                    if (45713 <= e && e <= 45739)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45740)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45824) {
                  if (e < 45769) {
                    if (e < 45768) {
                      if (45741 <= e && e <= 45767)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45768)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45796) {
                    if (45769 <= e && e <= 45795)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45797) {
                    if (e === 45796)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45797 <= e && e <= 45823)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45853) {
                  if (e < 45825) {
                    if (e === 45824)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45852) {
                    if (45825 <= e && e <= 45851)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45852)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45880) {
                  if (45853 <= e && e <= 45879)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45881) {
                  if (e === 45880)
                    return r.CLUSTER_BREAK.LV;
                } else if (45881 <= e && e <= 45907)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46189) {
                if (e < 46048) {
                  if (e < 45965) {
                    if (e < 45936) {
                      if (e < 45909) {
                        if (e === 45908)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45909 <= e && e <= 45935)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45937) {
                      if (e === 45936)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45964) {
                      if (45937 <= e && e <= 45963)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45964)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45993) {
                    if (e < 45992) {
                      if (45965 <= e && e <= 45991)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45992)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46020) {
                    if (45993 <= e && e <= 46019)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46021) {
                    if (e === 46020)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46021 <= e && e <= 46047)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46105) {
                  if (e < 46076) {
                    if (e < 46049) {
                      if (e === 46048)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46049 <= e && e <= 46075)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46077) {
                    if (e === 46076)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46104) {
                    if (46077 <= e && e <= 46103)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46104)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46160) {
                  if (e < 46132) {
                    if (46105 <= e && e <= 46131)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46133) {
                    if (e === 46132)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46133 <= e && e <= 46159)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46161) {
                  if (e === 46160)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46188) {
                  if (46161 <= e && e <= 46187)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 46188)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46356) {
                if (e < 46272) {
                  if (e < 46217) {
                    if (e < 46216) {
                      if (46189 <= e && e <= 46215)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46216)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46244) {
                    if (46217 <= e && e <= 46243)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46245) {
                    if (e === 46244)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46245 <= e && e <= 46271)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46301) {
                  if (e < 46273) {
                    if (e === 46272)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46300) {
                    if (46273 <= e && e <= 46299)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46300)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46328) {
                  if (46301 <= e && e <= 46327)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46329) {
                  if (e === 46328)
                    return r.CLUSTER_BREAK.LV;
                } else if (46329 <= e && e <= 46355)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46413) {
                if (e < 46384) {
                  if (e < 46357) {
                    if (e === 46356)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46357 <= e && e <= 46383)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46385) {
                  if (e === 46384)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46412) {
                  if (46385 <= e && e <= 46411)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 46412)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46468) {
                if (e < 46440) {
                  if (46413 <= e && e <= 46439)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46441) {
                  if (e === 46440)
                    return r.CLUSTER_BREAK.LV;
                } else if (46441 <= e && e <= 46467)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46469) {
                if (e === 46468)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46496) {
                if (46469 <= e && e <= 46495)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 46496)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 47701) {
              if (e < 47112) {
                if (e < 46804) {
                  if (e < 46637) {
                    if (e < 46580) {
                      if (e < 46525) {
                        if (e < 46524) {
                          if (46497 <= e && e <= 46523)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 46524)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 46552) {
                        if (46525 <= e && e <= 46551)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 46553) {
                        if (e === 46552)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46553 <= e && e <= 46579)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46608) {
                      if (e < 46581) {
                        if (e === 46580)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46581 <= e && e <= 46607)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46609) {
                      if (e === 46608)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46636) {
                      if (46609 <= e && e <= 46635)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46636)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46720) {
                    if (e < 46665) {
                      if (e < 46664) {
                        if (46637 <= e && e <= 46663)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 46664)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46692) {
                      if (46665 <= e && e <= 46691)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46693) {
                      if (e === 46692)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46693 <= e && e <= 46719)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46749) {
                    if (e < 46721) {
                      if (e === 46720)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46748) {
                      if (46721 <= e && e <= 46747)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46748)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46776) {
                    if (46749 <= e && e <= 46775)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46777) {
                    if (e === 46776)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46777 <= e && e <= 46803)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46945) {
                  if (e < 46861) {
                    if (e < 46832) {
                      if (e < 46805) {
                        if (e === 46804)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46805 <= e && e <= 46831)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46833) {
                      if (e === 46832)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46860) {
                      if (46833 <= e && e <= 46859)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46860)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46916) {
                    if (e < 46888) {
                      if (46861 <= e && e <= 46887)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46889) {
                      if (e === 46888)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46889 <= e && e <= 46915)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46917) {
                    if (e === 46916)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46944) {
                    if (46917 <= e && e <= 46943)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46944)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47028) {
                  if (e < 46973) {
                    if (e < 46972) {
                      if (46945 <= e && e <= 46971)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46972)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47e3) {
                    if (46973 <= e && e <= 46999)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47001) {
                    if (e === 47e3)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47001 <= e && e <= 47027)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47057) {
                  if (e < 47029) {
                    if (e === 47028)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47056) {
                    if (47029 <= e && e <= 47055)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47056)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47084) {
                  if (47057 <= e && e <= 47083)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47085) {
                  if (e === 47084)
                    return r.CLUSTER_BREAK.LV;
                } else if (47085 <= e && e <= 47111)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47393) {
                if (e < 47252) {
                  if (e < 47169) {
                    if (e < 47140) {
                      if (e < 47113) {
                        if (e === 47112)
                          return r.CLUSTER_BREAK.LV;
                      } else if (47113 <= e && e <= 47139)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 47141) {
                      if (e === 47140)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 47168) {
                      if (47141 <= e && e <= 47167)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47168)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47197) {
                    if (e < 47196) {
                      if (47169 <= e && e <= 47195)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47196)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47224) {
                    if (47197 <= e && e <= 47223)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47225) {
                    if (e === 47224)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47225 <= e && e <= 47251)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47309) {
                  if (e < 47280) {
                    if (e < 47253) {
                      if (e === 47252)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47253 <= e && e <= 47279)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47281) {
                    if (e === 47280)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47308) {
                    if (47281 <= e && e <= 47307)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47308)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47364) {
                  if (e < 47336) {
                    if (47309 <= e && e <= 47335)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47337) {
                    if (e === 47336)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47337 <= e && e <= 47363)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47365) {
                  if (e === 47364)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47392) {
                  if (47365 <= e && e <= 47391)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 47392)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47560) {
                if (e < 47476) {
                  if (e < 47421) {
                    if (e < 47420) {
                      if (47393 <= e && e <= 47419)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47420)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47448) {
                    if (47421 <= e && e <= 47447)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47449) {
                    if (e === 47448)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47449 <= e && e <= 47475)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47505) {
                  if (e < 47477) {
                    if (e === 47476)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47504) {
                    if (47477 <= e && e <= 47503)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47504)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47532) {
                  if (47505 <= e && e <= 47531)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47533) {
                  if (e === 47532)
                    return r.CLUSTER_BREAK.LV;
                } else if (47533 <= e && e <= 47559)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47617) {
                if (e < 47588) {
                  if (e < 47561) {
                    if (e === 47560)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47561 <= e && e <= 47587)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47589) {
                  if (e === 47588)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47616) {
                  if (47589 <= e && e <= 47615)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 47616)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47672) {
                if (e < 47644) {
                  if (47617 <= e && e <= 47643)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47645) {
                  if (e === 47644)
                    return r.CLUSTER_BREAK.LV;
                } else if (47645 <= e && e <= 47671)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47673) {
                if (e === 47672)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47700) {
                if (47673 <= e && e <= 47699)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 47700)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48316) {
              if (e < 48008) {
                if (e < 47841) {
                  if (e < 47784) {
                    if (e < 47729) {
                      if (e < 47728) {
                        if (47701 <= e && e <= 47727)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 47728)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 47756) {
                      if (47729 <= e && e <= 47755)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 47757) {
                      if (e === 47756)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47757 <= e && e <= 47783)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47812) {
                    if (e < 47785) {
                      if (e === 47784)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47785 <= e && e <= 47811)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47813) {
                    if (e === 47812)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47840) {
                    if (47813 <= e && e <= 47839)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47840)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47924) {
                  if (e < 47869) {
                    if (e < 47868) {
                      if (47841 <= e && e <= 47867)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47868)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47896) {
                    if (47869 <= e && e <= 47895)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47897) {
                    if (e === 47896)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47897 <= e && e <= 47923)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47953) {
                  if (e < 47925) {
                    if (e === 47924)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47952) {
                    if (47925 <= e && e <= 47951)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47952)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47980) {
                  if (47953 <= e && e <= 47979)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47981) {
                  if (e === 47980)
                    return r.CLUSTER_BREAK.LV;
                } else if (47981 <= e && e <= 48007)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48149) {
                if (e < 48065) {
                  if (e < 48036) {
                    if (e < 48009) {
                      if (e === 48008)
                        return r.CLUSTER_BREAK.LV;
                    } else if (48009 <= e && e <= 48035)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48037) {
                    if (e === 48036)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 48064) {
                    if (48037 <= e && e <= 48063)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48064)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48120) {
                  if (e < 48092) {
                    if (48065 <= e && e <= 48091)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48093) {
                    if (e === 48092)
                      return r.CLUSTER_BREAK.LV;
                  } else if (48093 <= e && e <= 48119)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48121) {
                  if (e === 48120)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48148) {
                  if (48121 <= e && e <= 48147)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48148)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48232) {
                if (e < 48177) {
                  if (e < 48176) {
                    if (48149 <= e && e <= 48175)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48176)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48204) {
                  if (48177 <= e && e <= 48203)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48205) {
                  if (e === 48204)
                    return r.CLUSTER_BREAK.LV;
                } else if (48205 <= e && e <= 48231)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48261) {
                if (e < 48233) {
                  if (e === 48232)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48260) {
                  if (48233 <= e && e <= 48259)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48260)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48288) {
                if (48261 <= e && e <= 48287)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48289) {
                if (e === 48288)
                  return r.CLUSTER_BREAK.LV;
              } else if (48289 <= e && e <= 48315)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48597) {
              if (e < 48456) {
                if (e < 48373) {
                  if (e < 48344) {
                    if (e < 48317) {
                      if (e === 48316)
                        return r.CLUSTER_BREAK.LV;
                    } else if (48317 <= e && e <= 48343)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48345) {
                    if (e === 48344)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 48372) {
                    if (48345 <= e && e <= 48371)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48372)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48401) {
                  if (e < 48400) {
                    if (48373 <= e && e <= 48399)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48400)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48428) {
                  if (48401 <= e && e <= 48427)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48429) {
                  if (e === 48428)
                    return r.CLUSTER_BREAK.LV;
                } else if (48429 <= e && e <= 48455)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48513) {
                if (e < 48484) {
                  if (e < 48457) {
                    if (e === 48456)
                      return r.CLUSTER_BREAK.LV;
                  } else if (48457 <= e && e <= 48483)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48485) {
                  if (e === 48484)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48512) {
                  if (48485 <= e && e <= 48511)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48512)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48568) {
                if (e < 48540) {
                  if (48513 <= e && e <= 48539)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48541) {
                  if (e === 48540)
                    return r.CLUSTER_BREAK.LV;
                } else if (48541 <= e && e <= 48567)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48569) {
                if (e === 48568)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48596) {
                if (48569 <= e && e <= 48595)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 48596)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48764) {
              if (e < 48680) {
                if (e < 48625) {
                  if (e < 48624) {
                    if (48597 <= e && e <= 48623)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48624)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48652) {
                  if (48625 <= e && e <= 48651)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48653) {
                  if (e === 48652)
                    return r.CLUSTER_BREAK.LV;
                } else if (48653 <= e && e <= 48679)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48709) {
                if (e < 48681) {
                  if (e === 48680)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48708) {
                  if (48681 <= e && e <= 48707)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48708)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48736) {
                if (48709 <= e && e <= 48735)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48737) {
                if (e === 48736)
                  return r.CLUSTER_BREAK.LV;
              } else if (48737 <= e && e <= 48763)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48821) {
              if (e < 48792) {
                if (e < 48765) {
                  if (e === 48764)
                    return r.CLUSTER_BREAK.LV;
                } else if (48765 <= e && e <= 48791)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48793) {
                if (e === 48792)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48820) {
                if (48793 <= e && e <= 48819)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 48820)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48876) {
              if (e < 48848) {
                if (48821 <= e && e <= 48847)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48849) {
                if (e === 48848)
                  return r.CLUSTER_BREAK.LV;
              } else if (48849 <= e && e <= 48875)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48877) {
              if (e === 48876)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48904) {
              if (48877 <= e && e <= 48903)
                return r.CLUSTER_BREAK.LVT;
            } else if (e === 48904)
              return r.CLUSTER_BREAK.LV;
          } else if (e < 53720) {
            if (e < 51312) {
              if (e < 50108) {
                if (e < 49493) {
                  if (e < 49212) {
                    if (e < 49045) {
                      if (e < 48988) {
                        if (e < 48933) {
                          if (e < 48932) {
                            if (48905 <= e && e <= 48931)
                              return r.CLUSTER_BREAK.LVT;
                          } else if (e === 48932)
                            return r.CLUSTER_BREAK.LV;
                        } else if (e < 48960) {
                          if (48933 <= e && e <= 48959)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e < 48961) {
                          if (e === 48960)
                            return r.CLUSTER_BREAK.LV;
                        } else if (48961 <= e && e <= 48987)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49016) {
                        if (e < 48989) {
                          if (e === 48988)
                            return r.CLUSTER_BREAK.LV;
                        } else if (48989 <= e && e <= 49015)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49017) {
                        if (e === 49016)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49044) {
                        if (49017 <= e && e <= 49043)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49044)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49128) {
                      if (e < 49073) {
                        if (e < 49072) {
                          if (49045 <= e && e <= 49071)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 49072)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49100) {
                        if (49073 <= e && e <= 49099)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49101) {
                        if (e === 49100)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49101 <= e && e <= 49127)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49157) {
                      if (e < 49129) {
                        if (e === 49128)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49156) {
                        if (49129 <= e && e <= 49155)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49156)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49184) {
                      if (49157 <= e && e <= 49183)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49185) {
                      if (e === 49184)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49185 <= e && e <= 49211)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49352) {
                    if (e < 49269) {
                      if (e < 49240) {
                        if (e < 49213) {
                          if (e === 49212)
                            return r.CLUSTER_BREAK.LV;
                        } else if (49213 <= e && e <= 49239)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49241) {
                        if (e === 49240)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49268) {
                        if (49241 <= e && e <= 49267)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49268)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49297) {
                      if (e < 49296) {
                        if (49269 <= e && e <= 49295)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49296)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49324) {
                      if (49297 <= e && e <= 49323)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49325) {
                      if (e === 49324)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49325 <= e && e <= 49351)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49409) {
                    if (e < 49380) {
                      if (e < 49353) {
                        if (e === 49352)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49353 <= e && e <= 49379)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49381) {
                      if (e === 49380)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49408) {
                      if (49381 <= e && e <= 49407)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49408)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49464) {
                    if (e < 49436) {
                      if (49409 <= e && e <= 49435)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49437) {
                      if (e === 49436)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49437 <= e && e <= 49463)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49465) {
                    if (e === 49464)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49492) {
                    if (49465 <= e && e <= 49491)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 49492)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 49800) {
                  if (e < 49633) {
                    if (e < 49576) {
                      if (e < 49521) {
                        if (e < 49520) {
                          if (49493 <= e && e <= 49519)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 49520)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49548) {
                        if (49521 <= e && e <= 49547)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49549) {
                        if (e === 49548)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49549 <= e && e <= 49575)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49604) {
                      if (e < 49577) {
                        if (e === 49576)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49577 <= e && e <= 49603)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49605) {
                      if (e === 49604)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49632) {
                      if (49605 <= e && e <= 49631)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49632)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49716) {
                    if (e < 49661) {
                      if (e < 49660) {
                        if (49633 <= e && e <= 49659)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49660)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49688) {
                      if (49661 <= e && e <= 49687)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49689) {
                      if (e === 49688)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49689 <= e && e <= 49715)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49745) {
                    if (e < 49717) {
                      if (e === 49716)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49744) {
                      if (49717 <= e && e <= 49743)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49744)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49772) {
                    if (49745 <= e && e <= 49771)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49773) {
                    if (e === 49772)
                      return r.CLUSTER_BREAK.LV;
                  } else if (49773 <= e && e <= 49799)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 49941) {
                  if (e < 49857) {
                    if (e < 49828) {
                      if (e < 49801) {
                        if (e === 49800)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49801 <= e && e <= 49827)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49829) {
                      if (e === 49828)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49856) {
                      if (49829 <= e && e <= 49855)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49856)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49912) {
                    if (e < 49884) {
                      if (49857 <= e && e <= 49883)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49885) {
                      if (e === 49884)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49885 <= e && e <= 49911)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49913) {
                    if (e === 49912)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49940) {
                    if (49913 <= e && e <= 49939)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 49940)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50024) {
                  if (e < 49969) {
                    if (e < 49968) {
                      if (49941 <= e && e <= 49967)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49968)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49996) {
                    if (49969 <= e && e <= 49995)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49997) {
                    if (e === 49996)
                      return r.CLUSTER_BREAK.LV;
                  } else if (49997 <= e && e <= 50023)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50053) {
                  if (e < 50025) {
                    if (e === 50024)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50052) {
                    if (50025 <= e && e <= 50051)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50052)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50080) {
                  if (50053 <= e && e <= 50079)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50081) {
                  if (e === 50080)
                    return r.CLUSTER_BREAK.LV;
                } else if (50081 <= e && e <= 50107)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 50697) {
                if (e < 50389) {
                  if (e < 50248) {
                    if (e < 50165) {
                      if (e < 50136) {
                        if (e < 50109) {
                          if (e === 50108)
                            return r.CLUSTER_BREAK.LV;
                        } else if (50109 <= e && e <= 50135)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 50137) {
                        if (e === 50136)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 50164) {
                        if (50137 <= e && e <= 50163)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50164)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50193) {
                      if (e < 50192) {
                        if (50165 <= e && e <= 50191)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50192)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50220) {
                      if (50193 <= e && e <= 50219)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50221) {
                      if (e === 50220)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50221 <= e && e <= 50247)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50305) {
                    if (e < 50276) {
                      if (e < 50249) {
                        if (e === 50248)
                          return r.CLUSTER_BREAK.LV;
                      } else if (50249 <= e && e <= 50275)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50277) {
                      if (e === 50276)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50304) {
                      if (50277 <= e && e <= 50303)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50304)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50360) {
                    if (e < 50332) {
                      if (50305 <= e && e <= 50331)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50333) {
                      if (e === 50332)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50333 <= e && e <= 50359)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50361) {
                    if (e === 50360)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50388) {
                    if (50361 <= e && e <= 50387)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50388)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50556) {
                  if (e < 50472) {
                    if (e < 50417) {
                      if (e < 50416) {
                        if (50389 <= e && e <= 50415)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50416)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50444) {
                      if (50417 <= e && e <= 50443)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50445) {
                      if (e === 50444)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50445 <= e && e <= 50471)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50501) {
                    if (e < 50473) {
                      if (e === 50472)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50500) {
                      if (50473 <= e && e <= 50499)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50500)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50528) {
                    if (50501 <= e && e <= 50527)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50529) {
                    if (e === 50528)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50529 <= e && e <= 50555)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50613) {
                  if (e < 50584) {
                    if (e < 50557) {
                      if (e === 50556)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50557 <= e && e <= 50583)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50585) {
                    if (e === 50584)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50612) {
                    if (50585 <= e && e <= 50611)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50612)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50668) {
                  if (e < 50640) {
                    if (50613 <= e && e <= 50639)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50641) {
                    if (e === 50640)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50641 <= e && e <= 50667)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50669) {
                  if (e === 50668)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50696) {
                  if (50669 <= e && e <= 50695)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 50696)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51004) {
                if (e < 50837) {
                  if (e < 50780) {
                    if (e < 50725) {
                      if (e < 50724) {
                        if (50697 <= e && e <= 50723)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50724)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50752) {
                      if (50725 <= e && e <= 50751)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50753) {
                      if (e === 50752)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50753 <= e && e <= 50779)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50808) {
                    if (e < 50781) {
                      if (e === 50780)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50781 <= e && e <= 50807)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50809) {
                    if (e === 50808)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50836) {
                    if (50809 <= e && e <= 50835)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50836)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50920) {
                  if (e < 50865) {
                    if (e < 50864) {
                      if (50837 <= e && e <= 50863)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50864)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50892) {
                    if (50865 <= e && e <= 50891)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50893) {
                    if (e === 50892)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50893 <= e && e <= 50919)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50949) {
                  if (e < 50921) {
                    if (e === 50920)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50948) {
                    if (50921 <= e && e <= 50947)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50948)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50976) {
                  if (50949 <= e && e <= 50975)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50977) {
                  if (e === 50976)
                    return r.CLUSTER_BREAK.LV;
                } else if (50977 <= e && e <= 51003)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51145) {
                if (e < 51061) {
                  if (e < 51032) {
                    if (e < 51005) {
                      if (e === 51004)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51005 <= e && e <= 51031)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51033) {
                    if (e === 51032)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51060) {
                    if (51033 <= e && e <= 51059)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51060)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51116) {
                  if (e < 51088) {
                    if (51061 <= e && e <= 51087)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51089) {
                    if (e === 51088)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51089 <= e && e <= 51115)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51117) {
                  if (e === 51116)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51144) {
                  if (51117 <= e && e <= 51143)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51144)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51228) {
                if (e < 51173) {
                  if (e < 51172) {
                    if (51145 <= e && e <= 51171)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51172)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51200) {
                  if (51173 <= e && e <= 51199)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51201) {
                  if (e === 51200)
                    return r.CLUSTER_BREAK.LV;
                } else if (51201 <= e && e <= 51227)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51257) {
                if (e < 51229) {
                  if (e === 51228)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51256) {
                  if (51229 <= e && e <= 51255)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51256)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51284) {
                if (51257 <= e && e <= 51283)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51285) {
                if (e === 51284)
                  return r.CLUSTER_BREAK.LV;
              } else if (51285 <= e && e <= 51311)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 52516) {
              if (e < 51901) {
                if (e < 51593) {
                  if (e < 51452) {
                    if (e < 51369) {
                      if (e < 51340) {
                        if (e < 51313) {
                          if (e === 51312)
                            return r.CLUSTER_BREAK.LV;
                        } else if (51313 <= e && e <= 51339)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 51341) {
                        if (e === 51340)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 51368) {
                        if (51341 <= e && e <= 51367)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51368)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51397) {
                      if (e < 51396) {
                        if (51369 <= e && e <= 51395)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51396)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51424) {
                      if (51397 <= e && e <= 51423)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51425) {
                      if (e === 51424)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51425 <= e && e <= 51451)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51509) {
                    if (e < 51480) {
                      if (e < 51453) {
                        if (e === 51452)
                          return r.CLUSTER_BREAK.LV;
                      } else if (51453 <= e && e <= 51479)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51481) {
                      if (e === 51480)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51508) {
                      if (51481 <= e && e <= 51507)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 51508)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51564) {
                    if (e < 51536) {
                      if (51509 <= e && e <= 51535)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51537) {
                      if (e === 51536)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51537 <= e && e <= 51563)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51565) {
                    if (e === 51564)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51592) {
                    if (51565 <= e && e <= 51591)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51592)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51760) {
                  if (e < 51676) {
                    if (e < 51621) {
                      if (e < 51620) {
                        if (51593 <= e && e <= 51619)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51620)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51648) {
                      if (51621 <= e && e <= 51647)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51649) {
                      if (e === 51648)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51649 <= e && e <= 51675)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51705) {
                    if (e < 51677) {
                      if (e === 51676)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51704) {
                      if (51677 <= e && e <= 51703)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 51704)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51732) {
                    if (51705 <= e && e <= 51731)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51733) {
                    if (e === 51732)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51733 <= e && e <= 51759)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51817) {
                  if (e < 51788) {
                    if (e < 51761) {
                      if (e === 51760)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51761 <= e && e <= 51787)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51789) {
                    if (e === 51788)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51816) {
                    if (51789 <= e && e <= 51815)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51816)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51872) {
                  if (e < 51844) {
                    if (51817 <= e && e <= 51843)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51845) {
                    if (e === 51844)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51845 <= e && e <= 51871)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51873) {
                  if (e === 51872)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51900) {
                  if (51873 <= e && e <= 51899)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51900)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52208) {
                if (e < 52041) {
                  if (e < 51984) {
                    if (e < 51929) {
                      if (e < 51928) {
                        if (51901 <= e && e <= 51927)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51928)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51956) {
                      if (51929 <= e && e <= 51955)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51957) {
                      if (e === 51956)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51957 <= e && e <= 51983)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52012) {
                    if (e < 51985) {
                      if (e === 51984)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51985 <= e && e <= 52011)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52013) {
                    if (e === 52012)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52040) {
                    if (52013 <= e && e <= 52039)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52040)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52124) {
                  if (e < 52069) {
                    if (e < 52068) {
                      if (52041 <= e && e <= 52067)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52068)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52096) {
                    if (52069 <= e && e <= 52095)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52097) {
                    if (e === 52096)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52097 <= e && e <= 52123)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52153) {
                  if (e < 52125) {
                    if (e === 52124)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52152) {
                    if (52125 <= e && e <= 52151)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52152)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52180) {
                  if (52153 <= e && e <= 52179)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52181) {
                  if (e === 52180)
                    return r.CLUSTER_BREAK.LV;
                } else if (52181 <= e && e <= 52207)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52349) {
                if (e < 52265) {
                  if (e < 52236) {
                    if (e < 52209) {
                      if (e === 52208)
                        return r.CLUSTER_BREAK.LV;
                    } else if (52209 <= e && e <= 52235)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52237) {
                    if (e === 52236)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52264) {
                    if (52237 <= e && e <= 52263)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52264)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52320) {
                  if (e < 52292) {
                    if (52265 <= e && e <= 52291)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52293) {
                    if (e === 52292)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52293 <= e && e <= 52319)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52321) {
                  if (e === 52320)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52348) {
                  if (52321 <= e && e <= 52347)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52348)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52432) {
                if (e < 52377) {
                  if (e < 52376) {
                    if (52349 <= e && e <= 52375)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52376)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52404) {
                  if (52377 <= e && e <= 52403)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52405) {
                  if (e === 52404)
                    return r.CLUSTER_BREAK.LV;
                } else if (52405 <= e && e <= 52431)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52461) {
                if (e < 52433) {
                  if (e === 52432)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52460) {
                  if (52433 <= e && e <= 52459)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52460)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52488) {
                if (52461 <= e && e <= 52487)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52489) {
                if (e === 52488)
                  return r.CLUSTER_BREAK.LV;
              } else if (52489 <= e && e <= 52515)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53105) {
              if (e < 52797) {
                if (e < 52656) {
                  if (e < 52573) {
                    if (e < 52544) {
                      if (e < 52517) {
                        if (e === 52516)
                          return r.CLUSTER_BREAK.LV;
                      } else if (52517 <= e && e <= 52543)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 52545) {
                      if (e === 52544)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 52572) {
                      if (52545 <= e && e <= 52571)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52572)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52601) {
                    if (e < 52600) {
                      if (52573 <= e && e <= 52599)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52600)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52628) {
                    if (52601 <= e && e <= 52627)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52629) {
                    if (e === 52628)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52629 <= e && e <= 52655)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52713) {
                  if (e < 52684) {
                    if (e < 52657) {
                      if (e === 52656)
                        return r.CLUSTER_BREAK.LV;
                    } else if (52657 <= e && e <= 52683)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52685) {
                    if (e === 52684)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52712) {
                    if (52685 <= e && e <= 52711)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52712)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52768) {
                  if (e < 52740) {
                    if (52713 <= e && e <= 52739)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52741) {
                    if (e === 52740)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52741 <= e && e <= 52767)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52769) {
                  if (e === 52768)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52796) {
                  if (52769 <= e && e <= 52795)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52796)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52964) {
                if (e < 52880) {
                  if (e < 52825) {
                    if (e < 52824) {
                      if (52797 <= e && e <= 52823)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52824)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52852) {
                    if (52825 <= e && e <= 52851)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52853) {
                    if (e === 52852)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52853 <= e && e <= 52879)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52909) {
                  if (e < 52881) {
                    if (e === 52880)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52908) {
                    if (52881 <= e && e <= 52907)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52908)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52936) {
                  if (52909 <= e && e <= 52935)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52937) {
                  if (e === 52936)
                    return r.CLUSTER_BREAK.LV;
                } else if (52937 <= e && e <= 52963)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53021) {
                if (e < 52992) {
                  if (e < 52965) {
                    if (e === 52964)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52965 <= e && e <= 52991)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52993) {
                  if (e === 52992)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53020) {
                  if (52993 <= e && e <= 53019)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53020)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53076) {
                if (e < 53048) {
                  if (53021 <= e && e <= 53047)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53049) {
                  if (e === 53048)
                    return r.CLUSTER_BREAK.LV;
                } else if (53049 <= e && e <= 53075)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53077) {
                if (e === 53076)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53104) {
                if (53077 <= e && e <= 53103)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53104)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53412) {
              if (e < 53245) {
                if (e < 53188) {
                  if (e < 53133) {
                    if (e < 53132) {
                      if (53105 <= e && e <= 53131)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 53132)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 53160) {
                    if (53133 <= e && e <= 53159)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53161) {
                    if (e === 53160)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53161 <= e && e <= 53187)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53216) {
                  if (e < 53189) {
                    if (e === 53188)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53189 <= e && e <= 53215)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53217) {
                  if (e === 53216)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53244) {
                  if (53217 <= e && e <= 53243)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53244)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53328) {
                if (e < 53273) {
                  if (e < 53272) {
                    if (53245 <= e && e <= 53271)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 53272)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53300) {
                  if (53273 <= e && e <= 53299)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53301) {
                  if (e === 53300)
                    return r.CLUSTER_BREAK.LV;
                } else if (53301 <= e && e <= 53327)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53357) {
                if (e < 53329) {
                  if (e === 53328)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53356) {
                  if (53329 <= e && e <= 53355)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53356)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53384) {
                if (53357 <= e && e <= 53383)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53385) {
                if (e === 53384)
                  return r.CLUSTER_BREAK.LV;
              } else if (53385 <= e && e <= 53411)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53553) {
              if (e < 53469) {
                if (e < 53440) {
                  if (e < 53413) {
                    if (e === 53412)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53413 <= e && e <= 53439)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53441) {
                  if (e === 53440)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53468) {
                  if (53441 <= e && e <= 53467)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53468)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53524) {
                if (e < 53496) {
                  if (53469 <= e && e <= 53495)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53497) {
                  if (e === 53496)
                    return r.CLUSTER_BREAK.LV;
                } else if (53497 <= e && e <= 53523)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53525) {
                if (e === 53524)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53552) {
                if (53525 <= e && e <= 53551)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53552)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53636) {
              if (e < 53581) {
                if (e < 53580) {
                  if (53553 <= e && e <= 53579)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53580)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53608) {
                if (53581 <= e && e <= 53607)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53609) {
                if (e === 53608)
                  return r.CLUSTER_BREAK.LV;
              } else if (53609 <= e && e <= 53635)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53665) {
              if (e < 53637) {
                if (e === 53636)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53664) {
                if (53637 <= e && e <= 53663)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53664)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53692) {
              if (53665 <= e && e <= 53691)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53693) {
              if (e === 53692)
                return r.CLUSTER_BREAK.LV;
            } else if (53693 <= e && e <= 53719)
              return r.CLUSTER_BREAK.LVT;
          } else if (e < 70459) {
            if (e < 54897) {
              if (e < 54308) {
                if (e < 54001) {
                  if (e < 53860) {
                    if (e < 53777) {
                      if (e < 53748) {
                        if (e < 53721) {
                          if (e === 53720)
                            return r.CLUSTER_BREAK.LV;
                        } else if (53721 <= e && e <= 53747)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 53749) {
                        if (e === 53748)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 53776) {
                        if (53749 <= e && e <= 53775)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 53776)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53805) {
                      if (e < 53804) {
                        if (53777 <= e && e <= 53803)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 53804)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53832) {
                      if (53805 <= e && e <= 53831)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53833) {
                      if (e === 53832)
                        return r.CLUSTER_BREAK.LV;
                    } else if (53833 <= e && e <= 53859)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53917) {
                    if (e < 53888) {
                      if (e < 53861) {
                        if (e === 53860)
                          return r.CLUSTER_BREAK.LV;
                      } else if (53861 <= e && e <= 53887)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53889) {
                      if (e === 53888)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53916) {
                      if (53889 <= e && e <= 53915)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 53916)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 53972) {
                    if (e < 53944) {
                      if (53917 <= e && e <= 53943)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53945) {
                      if (e === 53944)
                        return r.CLUSTER_BREAK.LV;
                    } else if (53945 <= e && e <= 53971)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53973) {
                    if (e === 53972)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54e3) {
                    if (53973 <= e && e <= 53999)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54e3)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54141) {
                  if (e < 54084) {
                    if (e < 54029) {
                      if (e < 54028) {
                        if (54001 <= e && e <= 54027)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 54028)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54056) {
                      if (54029 <= e && e <= 54055)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54057) {
                      if (e === 54056)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54057 <= e && e <= 54083)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54112) {
                    if (e < 54085) {
                      if (e === 54084)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54085 <= e && e <= 54111)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54113) {
                    if (e === 54112)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54140) {
                    if (54113 <= e && e <= 54139)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54140)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54224) {
                  if (e < 54169) {
                    if (e < 54168) {
                      if (54141 <= e && e <= 54167)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54168)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54196) {
                    if (54169 <= e && e <= 54195)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54197) {
                    if (e === 54196)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54197 <= e && e <= 54223)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54253) {
                  if (e < 54225) {
                    if (e === 54224)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54252) {
                    if (54225 <= e && e <= 54251)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54252)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54280) {
                  if (54253 <= e && e <= 54279)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54281) {
                  if (e === 54280)
                    return r.CLUSTER_BREAK.LV;
                } else if (54281 <= e && e <= 54307)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54589) {
                if (e < 54448) {
                  if (e < 54365) {
                    if (e < 54336) {
                      if (e < 54309) {
                        if (e === 54308)
                          return r.CLUSTER_BREAK.LV;
                      } else if (54309 <= e && e <= 54335)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54337) {
                      if (e === 54336)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54364) {
                      if (54337 <= e && e <= 54363)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54364)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54393) {
                    if (e < 54392) {
                      if (54365 <= e && e <= 54391)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54392)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54420) {
                    if (54393 <= e && e <= 54419)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54421) {
                    if (e === 54420)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54421 <= e && e <= 54447)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54505) {
                  if (e < 54476) {
                    if (e < 54449) {
                      if (e === 54448)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54449 <= e && e <= 54475)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54477) {
                    if (e === 54476)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54504) {
                    if (54477 <= e && e <= 54503)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54504)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54560) {
                  if (e < 54532) {
                    if (54505 <= e && e <= 54531)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54533) {
                    if (e === 54532)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54533 <= e && e <= 54559)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54561) {
                  if (e === 54560)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54588) {
                  if (54561 <= e && e <= 54587)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 54588)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54756) {
                if (e < 54672) {
                  if (e < 54617) {
                    if (e < 54616) {
                      if (54589 <= e && e <= 54615)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54616)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54644) {
                    if (54617 <= e && e <= 54643)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54645) {
                    if (e === 54644)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54645 <= e && e <= 54671)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54701) {
                  if (e < 54673) {
                    if (e === 54672)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54700) {
                    if (54673 <= e && e <= 54699)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54700)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54728) {
                  if (54701 <= e && e <= 54727)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54729) {
                  if (e === 54728)
                    return r.CLUSTER_BREAK.LV;
                } else if (54729 <= e && e <= 54755)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54813) {
                if (e < 54784) {
                  if (e < 54757) {
                    if (e === 54756)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54757 <= e && e <= 54783)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54785) {
                  if (e === 54784)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54812) {
                  if (54785 <= e && e <= 54811)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 54812)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54868) {
                if (e < 54840) {
                  if (54813 <= e && e <= 54839)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54841) {
                  if (e === 54840)
                    return r.CLUSTER_BREAK.LV;
                } else if (54841 <= e && e <= 54867)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54869) {
                if (e === 54868)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54896) {
                if (54869 <= e && e <= 54895)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 54896)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 69632) {
              if (e < 55216) {
                if (e < 55037) {
                  if (e < 54980) {
                    if (e < 54925) {
                      if (e < 54924) {
                        if (54897 <= e && e <= 54923)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 54924)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54952) {
                      if (54925 <= e && e <= 54951)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54953) {
                      if (e === 54952)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54953 <= e && e <= 54979)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55008) {
                    if (e < 54981) {
                      if (e === 54980)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54981 <= e && e <= 55007)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55009) {
                    if (e === 55008)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55036) {
                    if (55009 <= e && e <= 55035)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 55036)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 55120) {
                  if (e < 55065) {
                    if (e < 55064) {
                      if (55037 <= e && e <= 55063)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 55064)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55092) {
                    if (55065 <= e && e <= 55091)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55093) {
                    if (e === 55092)
                      return r.CLUSTER_BREAK.LV;
                  } else if (55093 <= e && e <= 55119)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 55149) {
                  if (e < 55121) {
                    if (e === 55120)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55148) {
                    if (55121 <= e && e <= 55147)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 55148)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 55176) {
                  if (55149 <= e && e <= 55175)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 55177) {
                  if (e === 55176)
                    return r.CLUSTER_BREAK.LV;
                } else if (55177 <= e && e <= 55203)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 68097) {
                if (e < 65279) {
                  if (e < 64286) {
                    if (e < 55243) {
                      if (55216 <= e && e <= 55238)
                        return r.CLUSTER_BREAK.V;
                    } else if (55243 <= e && e <= 55291)
                      return r.CLUSTER_BREAK.T;
                  } else if (e < 65024) {
                    if (e === 64286)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 65056) {
                    if (65024 <= e && e <= 65039)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (65056 <= e && e <= 65071)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 66045) {
                  if (e < 65438) {
                    if (e === 65279)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 65520) {
                    if (65438 <= e && e <= 65439)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (65520 <= e && e <= 65531)
                    return r.CLUSTER_BREAK.CONTROL;
                } else if (e < 66272) {
                  if (e === 66045)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 66422) {
                  if (e === 66272)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (66422 <= e && e <= 66426)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 68325) {
                if (e < 68108) {
                  if (e < 68101) {
                    if (68097 <= e && e <= 68099)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (68101 <= e && e <= 68102)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 68152) {
                  if (68108 <= e && e <= 68111)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 68159) {
                  if (68152 <= e && e <= 68154)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 68159)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69373) {
                if (e < 68900) {
                  if (68325 <= e && e <= 68326)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69291) {
                  if (68900 <= e && e <= 68903)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (69291 <= e && e <= 69292)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69446) {
                if (69373 <= e && e <= 69375)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69506) {
                if (69446 <= e && e <= 69456)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (69506 <= e && e <= 69509)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70016) {
              if (e < 69815) {
                if (e < 69747) {
                  if (e < 69634) {
                    if (e === 69632)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                    if (e === 69633)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 69688) {
                    if (e === 69634)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 69744) {
                    if (69688 <= e && e <= 69702)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 69744)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69762) {
                  if (e < 69759) {
                    if (69747 <= e && e <= 69748)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (69759 <= e && e <= 69761)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69808) {
                  if (e === 69762)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 69811) {
                  if (69808 <= e && e <= 69810)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (69811 <= e && e <= 69814)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69888)
                if (e < 69821) {
                  if (e < 69817) {
                    if (69815 <= e && e <= 69816)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (69817 <= e && e <= 69818)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69826) {
                  if (e === 69821)
                    return r.CLUSTER_BREAK.PREPEND;
                } else {
                  if (e === 69826)
                    return r.CLUSTER_BREAK.EXTEND;
                  if (e === 69837)
                    return r.CLUSTER_BREAK.PREPEND;
                }
              else if (e < 69933) {
                if (e < 69927) {
                  if (69888 <= e && e <= 69890)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69932) {
                  if (69927 <= e && e <= 69931)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 69932)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 69957) {
                if (69933 <= e && e <= 69940)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70003) {
                if (69957 <= e && e <= 69958)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e === 70003)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70194) {
              if (e < 70082) {
                if (e < 70067) {
                  if (e < 70018) {
                    if (70016 <= e && e <= 70017)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 70018)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 70070) {
                  if (70067 <= e && e <= 70069)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 70079) {
                  if (70070 <= e && e <= 70078)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (70079 <= e && e <= 70080)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70095) {
                if (e < 70089) {
                  if (70082 <= e && e <= 70083)
                    return r.CLUSTER_BREAK.PREPEND;
                } else if (e < 70094) {
                  if (70089 <= e && e <= 70092)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 70094)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70188) {
                if (e === 70095)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70191) {
                if (70188 <= e && e <= 70190)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (70191 <= e && e <= 70193)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70209) {
              if (e < 70197) {
                if (e < 70196) {
                  if (70194 <= e && e <= 70195)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 70196)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70198) {
                if (e === 70197)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70206) {
                if (70198 <= e && e <= 70199)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e === 70206)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70371) {
              if (e < 70367) {
                if (e === 70209)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70368) {
                if (e === 70367)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (70368 <= e && e <= 70370)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 70400) {
              if (70371 <= e && e <= 70378)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70402) {
              if (70400 <= e && e <= 70401)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (70402 <= e && e <= 70403)
              return r.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 72343) {
            if (e < 71339) {
              if (e < 70841) {
                if (e < 70512) {
                  if (e < 70471) {
                    if (e < 70463) {
                      if (e < 70462) {
                        if (70459 <= e && e <= 70460)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 70462)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 70464) {
                      if (e === 70463)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 70465) {
                      if (e === 70464)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (70465 <= e && e <= 70468)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70487) {
                    if (e < 70475) {
                      if (70471 <= e && e <= 70472)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (70475 <= e && e <= 70477)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70498) {
                    if (e === 70487)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70502) {
                    if (70498 <= e && e <= 70499)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70502 <= e && e <= 70508)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70725) {
                  if (e < 70712) {
                    if (e < 70709) {
                      if (70512 <= e && e <= 70516)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (70709 <= e && e <= 70711)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70720) {
                    if (70712 <= e && e <= 70719)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70722) {
                    if (70720 <= e && e <= 70721)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70722 <= e && e <= 70724)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70832) {
                  if (e < 70726) {
                    if (e === 70725)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 70726 || e === 70750)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70833) {
                  if (e === 70832)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70835) {
                  if (70833 <= e && e <= 70834)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (70835 <= e && e <= 70840)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71096) {
                if (e < 70847)
                  if (e < 70843) {
                    if (e === 70841)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                    if (e === 70842)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70845) {
                    if (70843 <= e && e <= 70844)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else {
                    if (e === 70845)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 70846)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 71087) {
                  if (e < 70849) {
                    if (70847 <= e && e <= 70848)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70850) {
                    if (e === 70849)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70850 <= e && e <= 70851)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71088) {
                  if (e === 71087)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71090) {
                  if (71088 <= e && e <= 71089)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71090 <= e && e <= 71093)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71216) {
                if (e < 71102) {
                  if (e < 71100) {
                    if (71096 <= e && e <= 71099)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (71100 <= e && e <= 71101)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71103) {
                  if (e === 71102)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71132) {
                  if (71103 <= e && e <= 71104)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (71132 <= e && e <= 71133)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71229) {
                if (e < 71219) {
                  if (71216 <= e && e <= 71218)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71227) {
                  if (71219 <= e && e <= 71226)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (71227 <= e && e <= 71228)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71230) {
                if (e === 71229)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71231) {
                if (e === 71230)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (71231 <= e && e <= 71232)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 71999)
              if (e < 71463) {
                if (e < 71350) {
                  if (e < 71341) {
                    if (e === 71339)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 71340)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 71342) {
                    if (e === 71341)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 71344) {
                    if (71342 <= e && e <= 71343)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (71344 <= e && e <= 71349)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71453) {
                  if (e === 71350)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 71351)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71458) {
                  if (71453 <= e && e <= 71455)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71462) {
                  if (71458 <= e && e <= 71461)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 71462)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71984) {
                if (e < 71727) {
                  if (e < 71724) {
                    if (71463 <= e && e <= 71467)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (71724 <= e && e <= 71726)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71736) {
                  if (71727 <= e && e <= 71735)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71737) {
                  if (e === 71736)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71737 <= e && e <= 71738)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71995) {
                if (e < 71985) {
                  if (e === 71984)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71991) {
                  if (71985 <= e && e <= 71989)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71991 <= e && e <= 71992)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71997) {
                if (71995 <= e && e <= 71996)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 71997)
                  return r.CLUSTER_BREAK.SPACINGMARK;
                if (e === 71998)
                  return r.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 72193)
              if (e < 72145)
                if (e < 72001) {
                  if (e === 71999)
                    return r.CLUSTER_BREAK.PREPEND;
                  if (e === 72e3)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 72002) {
                  if (e === 72001)
                    return r.CLUSTER_BREAK.PREPEND;
                } else {
                  if (e === 72002)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 72003)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 72156) {
                if (e < 72148) {
                  if (72145 <= e && e <= 72147)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 72154) {
                  if (72148 <= e && e <= 72151)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (72154 <= e && e <= 72155)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72160) {
                if (72156 <= e && e <= 72159)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else {
                if (e === 72160)
                  return r.CLUSTER_BREAK.EXTEND;
                if (e === 72164)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 72263) {
              if (e < 72249) {
                if (e < 72243) {
                  if (72193 <= e && e <= 72202)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (72243 <= e && e <= 72248)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72250) {
                if (e === 72249)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 72251) {
                if (e === 72250)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (72251 <= e && e <= 72254)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 72281) {
              if (e < 72273) {
                if (e === 72263)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72279) {
                if (72273 <= e && e <= 72278)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (72279 <= e && e <= 72280)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 72324) {
              if (72281 <= e && e <= 72283)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 72330) {
              if (72324 <= e && e <= 72329)
                return r.CLUSTER_BREAK.PREPEND;
            } else if (72330 <= e && e <= 72342)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 94033) {
            if (e < 73104) {
              if (e < 72881) {
                if (e < 72766) {
                  if (e < 72751) {
                    if (e < 72344) {
                      if (e === 72343)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (72344 <= e && e <= 72345)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 72752) {
                    if (e === 72751)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 72760) {
                    if (72752 <= e && e <= 72758)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (72760 <= e && e <= 72765)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72850) {
                  if (e === 72766)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 72767)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72873) {
                  if (72850 <= e && e <= 72871)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72874) {
                  if (e === 72873)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (72874 <= e && e <= 72880)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73018) {
                if (e < 72884) {
                  if (e < 72882) {
                    if (e === 72881)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (72882 <= e && e <= 72883)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72885) {
                  if (e === 72884)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 73009) {
                  if (72885 <= e && e <= 72886)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73009 <= e && e <= 73014)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73030) {
                if (e < 73020) {
                  if (e === 73018)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 73023) {
                  if (73020 <= e && e <= 73021)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73023 <= e && e <= 73029)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73031) {
                if (e === 73030)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (e < 73098) {
                if (e === 73031)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (73098 <= e && e <= 73102)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 73526) {
              if (e < 73459)
                if (e < 73109) {
                  if (e < 73107) {
                    if (73104 <= e && e <= 73105)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (73107 <= e && e <= 73108)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 73110) {
                  if (e === 73109)
                    return r.CLUSTER_BREAK.EXTEND;
                } else {
                  if (e === 73110)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 73111)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 73474) {
                if (e < 73461) {
                  if (73459 <= e && e <= 73460)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 73472) {
                  if (73461 <= e && e <= 73462)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (73472 <= e && e <= 73473)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73475) {
                if (e === 73474)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (e < 73524) {
                if (e === 73475)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (73524 <= e && e <= 73525)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 78896)
              if (e < 73536) {
                if (e < 73534) {
                  if (73526 <= e && e <= 73530)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73534 <= e && e <= 73535)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 73537) {
                if (e === 73536)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 73537)
                  return r.CLUSTER_BREAK.SPACINGMARK;
                if (e === 73538)
                  return r.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 92912) {
              if (e < 78912) {
                if (78896 <= e && e <= 78911)
                  return r.CLUSTER_BREAK.CONTROL;
              } else if (e < 78919) {
                if (e === 78912)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (78919 <= e && e <= 78933)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 92976) {
              if (92912 <= e && e <= 92916)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 94031) {
              if (92976 <= e && e <= 92982)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 94031)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 121476) {
            if (e < 119143)
              if (e < 113824) {
                if (e < 94180) {
                  if (e < 94095) {
                    if (94033 <= e && e <= 94087)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (94095 <= e && e <= 94098)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 94192) {
                  if (e === 94180)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 113821) {
                  if (94192 <= e && e <= 94193)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (113821 <= e && e <= 113822)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 118576) {
                if (e < 118528) {
                  if (113824 <= e && e <= 113827)
                    return r.CLUSTER_BREAK.CONTROL;
                } else if (118528 <= e && e <= 118573)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119141) {
                if (118576 <= e && e <= 118598)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 119141)
                  return r.CLUSTER_BREAK.EXTEND;
                if (e === 119142)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 119173) {
              if (e < 119150) {
                if (e < 119149) {
                  if (119143 <= e && e <= 119145)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 119149)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 119155) {
                if (119150 <= e && e <= 119154)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119163) {
                if (119155 <= e && e <= 119162)
                  return r.CLUSTER_BREAK.CONTROL;
              } else if (119163 <= e && e <= 119170)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121344) {
              if (e < 119210) {
                if (119173 <= e && e <= 119179)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119362) {
                if (119210 <= e && e <= 119213)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (119362 <= e && e <= 119364)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121403) {
              if (121344 <= e && e <= 121398)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121461) {
              if (121403 <= e && e <= 121452)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 121461)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 123628) {
            if (e < 122907) {
              if (e < 121505) {
                if (e < 121499) {
                  if (e === 121476)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (121499 <= e && e <= 121503)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122880) {
                if (121505 <= e && e <= 121519)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122888) {
                if (122880 <= e && e <= 122886)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (122888 <= e && e <= 122904)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123023) {
              if (e < 122915) {
                if (122907 <= e && e <= 122913)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122918) {
                if (122915 <= e && e <= 122916)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (122918 <= e && e <= 122922)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123184) {
              if (e === 123023)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123566) {
              if (123184 <= e && e <= 123190)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 123566)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 127995) {
            if (e < 125136) {
              if (e < 124140) {
                if (123628 <= e && e <= 123631)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (124140 <= e && e <= 124143)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 125252) {
              if (125136 <= e && e <= 125142)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 127462) {
              if (125252 <= e && e <= 125258)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (127462 <= e && e <= 127487)
              return r.CLUSTER_BREAK.REGIONAL_INDICATOR;
          } else if (e < 917632) {
            if (e < 917504) {
              if (127995 <= e && e <= 127999)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 917536) {
              if (917504 <= e && e <= 917535)
                return r.CLUSTER_BREAK.CONTROL;
            } else if (917536 <= e && e <= 917631)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 917760) {
            if (917632 <= e && e <= 917759)
              return r.CLUSTER_BREAK.CONTROL;
          } else if (e < 918e3) {
            if (917760 <= e && e <= 917999)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (918e3 <= e && e <= 921599)
            return r.CLUSTER_BREAK.CONTROL;
          return r.CLUSTER_BREAK.OTHER;
        }
        static getEmojiProperty(e) {
          if (e < 10160) {
            if (e < 9728) {
              if (e < 9e3) {
                if (e < 8482) {
                  if (e < 8252) {
                    if (e === 169 || e === 174)
                      return r.EXTENDED_PICTOGRAPHIC;
                  } else if (e === 8252 || e === 8265)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8596) {
                  if (e === 8482 || e === 8505)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8617) {
                  if (8596 <= e && e <= 8601)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8986) {
                  if (8617 <= e && e <= 8618)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (8986 <= e && e <= 8987)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9410) {
                if (e < 9167) {
                  if (e === 9e3 || e === 9096)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9193) {
                  if (e === 9167)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9208) {
                  if (9193 <= e && e <= 9203)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9208 <= e && e <= 9210)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9654) {
                if (e < 9642) {
                  if (e === 9410)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9642 <= e && e <= 9643)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9664) {
                if (e === 9654)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9723) {
                if (e === 9664)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (9723 <= e && e <= 9726)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10035) {
              if (e < 10004) {
                if (e < 9748) {
                  if (e < 9735) {
                    if (9728 <= e && e <= 9733)
                      return r.EXTENDED_PICTOGRAPHIC;
                  } else if (9735 <= e && e <= 9746)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9872) {
                  if (9748 <= e && e <= 9861)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9992) {
                  if (9872 <= e && e <= 9989)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9992 <= e && e <= 10002)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10013) {
                if (e === 10004 || e === 10006)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10017) {
                if (e === 10013)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10017 || e === 10024)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10067) {
              if (e < 10055) {
                if (e < 10052) {
                  if (10035 <= e && e <= 10036)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 10052)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10060) {
                if (e === 10055)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10060 || e === 10062)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10083) {
              if (e < 10071) {
                if (10067 <= e && e <= 10069)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10071)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10133) {
              if (10083 <= e && e <= 10087)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10145) {
              if (10133 <= e && e <= 10135)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e === 10145)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 127489) {
            if (e < 12951) {
              if (e < 11035) {
                if (e < 10548) {
                  if (e === 10160 || e === 10175)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 11013) {
                  if (10548 <= e && e <= 10549)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (11013 <= e && e <= 11015)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 11093) {
                if (e < 11088) {
                  if (11035 <= e && e <= 11036)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 11088)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 12336) {
                if (e === 11093)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 12336 || e === 12349)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127340) {
              if (e < 126976) {
                if (e === 12951 || e === 12953)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127245) {
                if (126976 <= e && e <= 127231)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127279) {
                if (127245 <= e && e <= 127247)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 127279)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127374) {
              if (e < 127358) {
                if (127340 <= e && e <= 127345)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (127358 <= e && e <= 127359)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127377) {
              if (e === 127374)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127405) {
              if (127377 <= e && e <= 127386)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (127405 <= e && e <= 127461)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 128981) {
            if (e < 127561) {
              if (e < 127535) {
                if (e < 127514) {
                  if (127489 <= e && e <= 127503)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 127514)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127538) {
                if (e === 127535)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127548) {
                if (127538 <= e && e <= 127546)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (127548 <= e && e <= 127551)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128326) {
              if (e < 128e3) {
                if (127561 <= e && e <= 127994)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (128e3 <= e && e <= 128317)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128640) {
              if (128326 <= e && e <= 128591)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128884) {
              if (128640 <= e && e <= 128767)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (128884 <= e && e <= 128895)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129198) {
            if (e < 129096) {
              if (e < 129036) {
                if (128981 <= e && e <= 129023)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (129036 <= e && e <= 129039)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 129114) {
              if (129096 <= e && e <= 129103)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 129160) {
              if (129114 <= e && e <= 129119)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (129160 <= e && e <= 129167)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129340) {
            if (e < 129292) {
              if (129198 <= e && e <= 129279)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (129292 <= e && e <= 129338)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129351) {
            if (129340 <= e && e <= 129349)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 130048) {
            if (129351 <= e && e <= 129791)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (130048 <= e && e <= 131069)
            return r.EXTENDED_PICTOGRAPHIC;
          return r.CLUSTER_BREAK.OTHER;
        }
      };
      t.default = u;
    }
  }), ee = E({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/index.js"(t) {
      var i = t && t.__importDefault || function(n) {
        return n && n.__esModule ? n : { default: n };
      };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = i(W());
      t.default = r.default;
    }
  }), j = E({
    "../../node_modules/.pnpm/iso-datestring-validator@2.2.2/node_modules/iso-datestring-validator/dist/index.js"(t) {
      (() => {
        var i = { d: (L, S) => {
          for (var X in S)
            i.o(S, X) && !i.o(L, X) && Object.defineProperty(L, X, { enumerable: !0, get: S[X] });
        }, o: (L, S) => Object.prototype.hasOwnProperty.call(L, S), r: (L) => {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(L, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(L, "__esModule", { value: !0 });
        } }, r = {};
        function n(L, S) {
          return S === void 0 && (S = "-"), new RegExp("^(?!0{4}" + S + "0{2}" + S + "0{2})((?=[0-9]{4}" + S + "(((0[^2])|1[0-2])|02(?=" + S + "(([0-1][0-9])|2[0-8])))" + S + "[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))" + S + "02" + S + "29))([0-9]{4})" + S + "(?!((0[469])|11)" + S + "31)((0[1,3-9]|1[0-2])|(02(?!" + S + "3)))" + S + "(0[1-9]|[1-2][0-9]|3[0-1])$").test(L);
        }
        function s(L) {
          var S = /\D/.exec(L);
          return S ? S[0] : "";
        }
        function u(L, S, X) {
          S === void 0 && (S = ":"), X === void 0 && (X = !1);
          var ae = new RegExp("^([0-1]|2(?=([0-3])|4" + S + "00))[0-9]" + S + "[0-5][0-9](" + S + "([0-5]|6(?=0))[0-9])?(.[0-9]{1,9})?$");
          if (!X || !/[Z+\-]/.test(L))
            return ae.test(L);
          if (/Z$/.test(L))
            return ae.test(L.replace("Z", ""));
          var I = L.includes("+"), z = L.split(/[+-]/), H = z[0], G = z[1];
          return ae.test(H) && function(ge, ye, $) {
            return $ === void 0 && ($ = ":"), new RegExp(ye ? "^(0(?!(2" + $ + "4)|0" + $ + "3)|1(?=([0-1]|2(?=" + $ + "[04])|[34](?=" + $ + "0))))([03469](?=" + $ + "[03])|[17](?=" + $ + "0)|2(?=" + $ + "[04])|5(?=" + $ + "[034])|8(?=" + $ + "[04]))" + $ + "([03](?=0)|4(?=5))[05]$" : "^(0(?=[^0])|1(?=[0-2]))([39](?=" + $ + "[03])|[0-24-8](?=" + $ + "00))" + $ + "[03]0$").test(ge);
          }(G, I, s(G));
        }
        function e(L) {
          var S = L.split("T"), X = S[0], ae = S[1], I = n(X, s(X));
          if (!ae)
            return !1;
          var z, H = (z = ae.match(/([^Z+\-\d])(?=\d+\1)/), Array.isArray(z) ? z[0] : "");
          return I && u(ae, H, !0);
        }
        function d(L, S) {
          return S === void 0 && (S = "-"), new RegExp("^[0-9]{4}" + S + "(0(?=[^0])|1(?=[0-2]))[0-9]$").test(L);
        }
        i.r(r), i.d(r, { isValidDate: () => n, isValidISODateString: () => e, isValidTime: () => u, isValidYearMonth: () => d });
        var y = t;
        for (var T in r)
          y[T] = r[T];
        r.__esModule && Object.defineProperty(y, "__esModule", { value: !0 });
      })();
    }
  }), F = {};
  f(F, {
    APP_BSKY_GRAPH: () => Fb,
    AppBskyActorDefs: () => k,
    AppBskyActorGetPreferences: () => Ya,
    AppBskyActorGetProfile: () => eo,
    AppBskyActorGetProfiles: () => to,
    AppBskyActorGetSuggestions: () => ro,
    AppBskyActorNS: () => Zp,
    AppBskyActorProfile: () => Xr,
    AppBskyActorPutPreferences: () => io,
    AppBskyActorSearchActors: () => no,
    AppBskyActorSearchActorsTypeahead: () => so,
    AppBskyEmbedExternal: () => bp,
    AppBskyEmbedImages: () => Ap,
    AppBskyEmbedNS: () => Jp,
    AppBskyEmbedRecord: () => Ie,
    AppBskyEmbedRecordWithMedia: () => Hr,
    AppBskyFeedDefs: () => Tp,
    AppBskyFeedDescribeFeedGenerator: () => ao,
    AppBskyFeedGenerator: () => vp,
    AppBskyFeedGetActorFeeds: () => oo,
    AppBskyFeedGetActorLikes: () => po,
    AppBskyFeedGetAuthorFeed: () => co,
    AppBskyFeedGetFeed: () => Eo,
    AppBskyFeedGetFeedGenerator: () => bo,
    AppBskyFeedGetFeedGenerators: () => Ao,
    AppBskyFeedGetFeedSkeleton: () => To,
    AppBskyFeedGetLikes: () => Lo,
    AppBskyFeedGetListFeed: () => _o,
    AppBskyFeedGetPostThread: () => xo,
    AppBskyFeedGetPosts: () => Ko,
    AppBskyFeedGetRepostedBy: () => Uo,
    AppBskyFeedGetSuggestedFeeds: () => Vo,
    AppBskyFeedGetTimeline: () => Do,
    AppBskyFeedLike: () => wp,
    AppBskyFeedNS: () => Qp,
    AppBskyFeedPost: () => Lp,
    AppBskyFeedRepost: () => _p,
    AppBskyFeedSearchPosts: () => Po,
    AppBskyFeedThreadgate: () => Cp,
    AppBskyGraphBlock: () => Sp,
    AppBskyGraphDefs: () => xp,
    AppBskyGraphFollow: () => Bp,
    AppBskyGraphGetBlocks: () => jo,
    AppBskyGraphGetFollowers: () => Fo,
    AppBskyGraphGetFollows: () => qo,
    AppBskyGraphGetList: () => Mo,
    AppBskyGraphGetListBlocks: () => $o,
    AppBskyGraphGetListMutes: () => Oo,
    AppBskyGraphGetLists: () => Go,
    AppBskyGraphGetMutes: () => Xo,
    AppBskyGraphGetRelationships: () => Ho,
    AppBskyGraphGetSuggestedFollowsByActor: () => Wo,
    AppBskyGraphList: () => kp,
    AppBskyGraphListblock: () => Kp,
    AppBskyGraphListitem: () => Up,
    AppBskyGraphMuteActor: () => Jo,
    AppBskyGraphMuteActorList: () => Qo,
    AppBskyGraphNS: () => nu,
    AppBskyGraphUnmuteActor: () => Yo,
    AppBskyGraphUnmuteActorList: () => ep,
    AppBskyNS: () => zp,
    AppBskyNotificationGetUnreadCount: () => tp,
    AppBskyNotificationListNotifications: () => rp,
    AppBskyNotificationNS: () => lu,
    AppBskyNotificationRegisterPush: () => ip,
    AppBskyNotificationUpdateSeen: () => np,
    AppBskyRichtextFacet: () => je,
    AppBskyRichtextNS: () => fu,
    AppBskyUnspeccedDefs: () => Vp,
    AppBskyUnspeccedGetPopularFeedGenerators: () => sp,
    AppBskyUnspeccedGetTaggedSuggestions: () => ap,
    AppBskyUnspeccedNS: () => cu,
    AppBskyUnspeccedSearchActorsSkeleton: () => op,
    AppBskyUnspeccedSearchPostsSkeleton: () => lp,
    AppNS: () => Hp,
    AtUri: () => He,
    AtpAgent: () => fr,
    AtpBaseClient: () => Dp,
    AtpServiceClient: () => Pp,
    BlobRef: () => Ye,
    BlockRecord: () => su,
    BskyAgent: () => d4,
    COM_ATPROTO_ADMIN: () => Ib,
    COM_ATPROTO_MODERATION: () => jb,
    ComAtprotoAdminCreateCommunicationTemplate: () => Bn,
    ComAtprotoAdminDefs: () => dp,
    ComAtprotoAdminDeleteAccount: () => kn,
    ComAtprotoAdminDeleteCommunicationTemplate: () => Kn,
    ComAtprotoAdminDisableAccountInvites: () => Un,
    ComAtprotoAdminDisableInviteCodes: () => Vn,
    ComAtprotoAdminEmitModerationEvent: () => Dn,
    ComAtprotoAdminEnableAccountInvites: () => In,
    ComAtprotoAdminGetAccountInfo: () => jn,
    ComAtprotoAdminGetAccountInfos: () => Fn,
    ComAtprotoAdminGetInviteCodes: () => qn,
    ComAtprotoAdminGetModerationEvent: () => Mn,
    ComAtprotoAdminGetRecord: () => $n,
    ComAtprotoAdminGetRepo: () => Xn,
    ComAtprotoAdminGetSubjectStatus: () => Zn,
    ComAtprotoAdminListCommunicationTemplates: () => Wn,
    ComAtprotoAdminNS: () => jp,
    ComAtprotoAdminQueryModerationEvents: () => Jn,
    ComAtprotoAdminQueryModerationStatuses: () => Qn,
    ComAtprotoAdminSearchRepos: () => Yn,
    ComAtprotoAdminSendEmail: () => es,
    ComAtprotoAdminUpdateAccountEmail: () => ts,
    ComAtprotoAdminUpdateAccountHandle: () => rs,
    ComAtprotoAdminUpdateAccountPassword: () => is,
    ComAtprotoAdminUpdateCommunicationTemplate: () => ns,
    ComAtprotoAdminUpdateSubjectStatus: () => ss,
    ComAtprotoIdentityGetRecommendedDidCredentials: () => as,
    ComAtprotoIdentityNS: () => Fp,
    ComAtprotoIdentityRequestPlcOperationSignature: () => os,
    ComAtprotoIdentityResolveHandle: () => ps,
    ComAtprotoIdentitySignPlcOperation: () => us,
    ComAtprotoIdentitySubmitPlcOperation: () => ls,
    ComAtprotoIdentityUpdateHandle: () => fs,
    ComAtprotoLabelDefs: () => mp,
    ComAtprotoLabelNS: () => qp,
    ComAtprotoLabelQueryLabels: () => cs,
    ComAtprotoLabelSubscribeLabels: () => hp,
    ComAtprotoModerationCreateReport: () => ds,
    ComAtprotoModerationDefs: () => yp,
    ComAtprotoModerationNS: () => Mp,
    ComAtprotoNS: () => Ip,
    ComAtprotoRepoApplyWrites: () => ms,
    ComAtprotoRepoCreateRecord: () => Es,
    ComAtprotoRepoDeleteRecord: () => bs,
    ComAtprotoRepoDescribeRepo: () => vs,
    ComAtprotoRepoGetRecord: () => ws,
    ComAtprotoRepoImportRepo: () => Ls,
    ComAtprotoRepoListMissingBlobs: () => _s,
    ComAtprotoRepoListRecords: () => Cs,
    ComAtprotoRepoNS: () => $p,
    ComAtprotoRepoPutRecord: () => Gr,
    ComAtprotoRepoStrongRef: () => Ep,
    ComAtprotoRepoUploadBlob: () => Bs,
    ComAtprotoServerActivateAccount: () => ks,
    ComAtprotoServerCheckAccountStatus: () => Ks,
    ComAtprotoServerConfirmEmail: () => Us,
    ComAtprotoServerCreateAccount: () => js,
    ComAtprotoServerCreateAppPassword: () => zs,
    ComAtprotoServerCreateInviteCode: () => Js,
    ComAtprotoServerCreateInviteCodes: () => Qs,
    ComAtprotoServerCreateSession: () => Ys,
    ComAtprotoServerDeactivateAccount: () => ra,
    ComAtprotoServerDefs: () => gp,
    ComAtprotoServerDeleteAccount: () => ia,
    ComAtprotoServerDeleteSession: () => oa,
    ComAtprotoServerDescribeServer: () => pa,
    ComAtprotoServerGetAccountInviteCodes: () => ua,
    ComAtprotoServerGetServiceAuth: () => ca,
    ComAtprotoServerGetSession: () => da,
    ComAtprotoServerListAppPasswords: () => ma,
    ComAtprotoServerNS: () => Op,
    ComAtprotoServerRefreshSession: () => Ea,
    ComAtprotoServerRequestAccountDelete: () => ba,
    ComAtprotoServerRequestEmailConfirmation: () => Aa,
    ComAtprotoServerRequestEmailUpdate: () => Ta,
    ComAtprotoServerRequestPasswordReset: () => va,
    ComAtprotoServerReserveSigningKey: () => wa,
    ComAtprotoServerResetPassword: () => La,
    ComAtprotoServerRevokeAppPassword: () => xa,
    ComAtprotoServerUpdateEmail: () => Ba,
    ComAtprotoSyncGetBlob: () => Da,
    ComAtprotoSyncGetBlocks: () => Pa,
    ComAtprotoSyncGetCheckout: () => Na,
    ComAtprotoSyncGetHead: () => Ia,
    ComAtprotoSyncGetLatestCommit: () => qa,
    ComAtprotoSyncGetRecord: () => Oa,
    ComAtprotoSyncGetRepo: () => Ga,
    ComAtprotoSyncListBlobs: () => Xa,
    ComAtprotoSyncListRepos: () => Ha,
    ComAtprotoSyncNS: () => Gp,
    ComAtprotoSyncNotifyOfUpdate: () => za,
    ComAtprotoSyncRequestCrawl: () => Za,
    ComAtprotoSyncSubscribeRepos: () => Rp,
    ComAtprotoTempCheckSignupQueue: () => Wa,
    ComAtprotoTempFetchLabels: () => Ja,
    ComAtprotoTempNS: () => Xp,
    ComAtprotoTempRequestPhoneVerification: () => Qa,
    ComNS: () => Np,
    FollowRecord: () => au,
    GeneratorRecord: () => Yp,
    LABELS: () => O,
    LABEL_GROUPS: () => f4,
    LikeRecord: () => eu,
    ListRecord: () => ou,
    ListblockRecord: () => pu,
    ListitemRecord: () => uu,
    ModerationDecision: () => Ke,
    PostRecord: () => tu,
    ProfileRecord: () => Wp,
    RepostRecord: () => ru,
    RichText: () => gu,
    RichTextSegment: () => ut,
    ThreadgateRecord: () => iu,
    UnicodeString: () => St,
    default: () => fr,
    jsonStringToLex: () => Tn,
    jsonToLex: () => An,
    lexToJson: () => Rn,
    moderateFeedGenerator: () => u4,
    moderatePost: () => p4,
    moderateProfile: () => o4,
    moderateUserList: () => l4,
    parseLanguage: () => Bc,
    sanitizeRichText: () => hu,
    stringifyLex: () => bn
  }), o.exports = q(F);
  var se = (t) => {
    if (!/^[a-zA-Z0-9.-]*$/.test(t))
      throw new J("Disallowed characters in handle (ASCII letters, digits, dashes, periods only)");
    if (t.length > 253)
      throw new J("Handle is too long (253 chars max)");
    const i = t.split(".");
    if (i.length < 2)
      throw new J("Handle domain needs at least two parts");
    for (let r = 0; r < i.length; r++) {
      const n = i[r];
      if (n.length < 1)
        throw new J("Handle parts can not be empty");
      if (n.length > 63)
        throw new J("Handle part too long (max 63 chars)");
      if (n.endsWith("-") || n.startsWith("-"))
        throw new J("Handle parts can not start or end with hyphens");
      if (r + 1 == i.length && !/^[a-zA-Z]/.test(n))
        throw new J("Handle final component (TLD) must start with ASCII letter");
    }
  }, J = class extends Error {
  }, Ae = (t) => {
    if (!/^[a-zA-Z0-9._:%-]*$/.test(t))
      throw new te("Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)");
    const i = t.split(":");
    if (i.length < 3)
      throw new te("DID requires prefix, method, and method-specific content");
    if (i[0] != "did")
      throw new te('DID requires "did:" prefix');
    if (!/^[a-z]+$/.test(i[1]))
      throw new te("DID method must be lower-case letters");
    if (t.endsWith(":") || t.endsWith("%"))
      throw new te('DID can not end with ":" or "%"');
    if (t.length > 2 * 1024)
      throw new te("DID is too long (2048 chars max)");
  }, te = class extends Error {
  }, Ue = class {
    constructor(t) {
      this.segments = [], Te(t), this.segments = t.split(".");
    }
    static parse(t) {
      return new Ue(t);
    }
    static create(t, i) {
      const r = [...t.split(".").reverse(), i].join(".");
      return new Ue(r);
    }
    static isValid(t) {
      try {
        return Ue.parse(t), !0;
      } catch {
        return !1;
      }
    }
    get authority() {
      return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
    }
    get name() {
      return this.segments.at(this.segments.length - 1);
    }
    toString() {
      return this.segments.join(".");
    }
  }, Te = (t) => {
    const i = t;
    if (!/^[a-zA-Z0-9.-]*$/.test(i))
      throw new Ee("Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)");
    if (i.length > 317)
      throw new Ee("NSID is too long (317 chars max)");
    const r = i.split(".");
    if (r.length < 3)
      throw new Ee("NSID needs at least three parts");
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (s.length < 1)
        throw new Ee("NSID parts can not be empty");
      if (s.length > 63)
        throw new Ee("NSID part too long (max 63 chars)");
      if (s.endsWith("-") || s.startsWith("-"))
        throw new Ee("NSID parts can not start or end with hyphen");
      if (/^[0-9]/.test(s) && n == 0)
        throw new Ee("NSID first part may not start with a digit");
      if (!/^[a-zA-Z]+$/.test(s) && n + 1 == r.length)
        throw new Ee("NSID name part must be only letters");
    }
  }, Ee = class extends Error {
  }, jt = (t) => {
    const i = t.split("#");
    if (i.length > 2)
      throw new Error('ATURI can have at most one "#", separating fragment out');
    const r = i[1] || null;
    if (t = i[0], !/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(t))
      throw new Error("Disallowed characters in ATURI (ASCII)");
    const n = t.split("/");
    if (n.length >= 3 && (n[0] != "at:" || n[1].length != 0))
      throw new Error('ATURI must start with "at://"');
    if (n.length < 3)
      throw new Error("ATURI requires at least method and authority sections");
    try {
      n[2].startsWith("did:") ? Ae(n[2]) : se(n[2]);
    } catch {
      throw new Error("ATURI authority must be a valid handle or DID");
    }
    if (n.length >= 4) {
      if (n[3].length == 0)
        throw new Error("ATURI can not have a slash after authority without a path segment");
      try {
        Te(n[3]);
      } catch {
        throw new Error("ATURI requires first path segment (if supplied) to be valid NSID");
      }
    }
    if (n.length >= 5 && n[4].length == 0)
      throw new Error("ATURI can not have a slash after collection, unless record key is provided");
    if (n.length >= 6)
      throw new Error("ATURI path can have at most two parts, and no trailing slash");
    if (i.length >= 2 && r == null)
      throw new Error("ATURI fragment must be non-empty and start with slash");
    if (r != null) {
      if (r.length == 0 || r[0] != "/")
        throw new Error("ATURI fragment must be non-empty and start with slash");
      if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(r))
        throw new Error("Disallowed characters in ATURI fragment (ASCII)");
    }
    if (t.length > 8 * 1024)
      throw new Error("ATURI is far too long");
  }, tl = /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i, rl = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i, He = class {
    constructor(t, i) {
      let r;
      if (i) {
        if (r = pi(i), !r)
          throw new Error(`Invalid at uri: ${i}`);
        const n = il(t);
        if (!n)
          throw new Error(`Invalid path: ${t}`);
        Object.assign(r, n);
      } else if (r = pi(t), !r)
        throw new Error(`Invalid at uri: ${t}`);
      this.hash = r.hash, this.host = r.host, this.pathname = r.pathname, this.searchParams = r.searchParams;
    }
    static make(t, i, r) {
      let n = t;
      return i && (n += "/" + i), r && (n += "/" + r), new He(n);
    }
    get protocol() {
      return "at:";
    }
    get origin() {
      return `at://${this.host}`;
    }
    get hostname() {
      return this.host;
    }
    set hostname(t) {
      this.host = t;
    }
    get search() {
      return this.searchParams.toString();
    }
    set search(t) {
      this.searchParams = new URLSearchParams(t);
    }
    get collection() {
      return this.pathname.split("/").filter(Boolean)[0] || "";
    }
    set collection(t) {
      const i = this.pathname.split("/").filter(Boolean);
      i[0] = t, this.pathname = i.join("/");
    }
    get rkey() {
      return this.pathname.split("/").filter(Boolean)[1] || "";
    }
    set rkey(t) {
      const i = this.pathname.split("/").filter(Boolean);
      i[0] || (i[0] = "undefined"), i[1] = t, this.pathname = i.join("/");
    }
    get href() {
      return this.toString();
    }
    toString() {
      let t = this.pathname || "/";
      t.startsWith("/") || (t = `/${t}`);
      let i = this.searchParams.toString();
      i && !i.startsWith("?") && (i = `?${i}`);
      let r = this.hash;
      return r && !r.startsWith("#") && (r = `#${r}`), `at://${this.host}${t}${i}${r}`;
    }
  };
  function pi(t) {
    const i = tl.exec(t);
    if (i)
      return {
        hash: i[5] || "",
        host: i[2] || "",
        pathname: i[3] || "",
        searchParams: new URLSearchParams(i[4] || "")
      };
  }
  function il(t) {
    const i = rl.exec(t);
    if (i)
      return {
        hash: i[3] || "",
        pathname: i[1] || "",
        searchParams: new URLSearchParams(i[2] || "")
      };
  }
  var M;
  (function(t) {
    t.assertEqual = (s) => s;
    function i(s) {
    }
    t.assertIs = i;
    function r(s) {
      throw new Error();
    }
    t.assertNever = r, t.arrayToEnum = (s) => {
      const u = {};
      for (const e of s)
        u[e] = e;
      return u;
    }, t.getValidEnumValues = (s) => {
      const u = t.objectKeys(s).filter((d) => typeof s[s[d]] != "number"), e = {};
      for (const d of u)
        e[d] = s[d];
      return t.objectValues(e);
    }, t.objectValues = (s) => t.objectKeys(s).map(function(u) {
      return s[u];
    }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
      const u = [];
      for (const e in s)
        Object.prototype.hasOwnProperty.call(s, e) && u.push(e);
      return u;
    }, t.find = (s, u) => {
      for (const e of s)
        if (u(e))
          return e;
    }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
    function n(s, u = " | ") {
      return s.map((e) => typeof e == "string" ? `'${e}'` : e).join(u);
    }
    t.joinValues = n, t.jsonStringifyReplacer = (s, u) => typeof u == "bigint" ? u.toString() : u;
  })(M || (M = {}));
  var wr;
  (function(t) {
    t.mergeShapes = (i, r) => ({
      ...i,
      ...r
    });
  })(wr || (wr = {}));
  var _ = M.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]), Oe = (t) => {
    switch (typeof t) {
      case "undefined":
        return _.undefined;
      case "string":
        return _.string;
      case "number":
        return isNaN(t) ? _.nan : _.number;
      case "boolean":
        return _.boolean;
      case "function":
        return _.function;
      case "bigint":
        return _.bigint;
      case "symbol":
        return _.symbol;
      case "object":
        return Array.isArray(t) ? _.array : t === null ? _.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? _.promise : typeof Map < "u" && t instanceof Map ? _.map : typeof Set < "u" && t instanceof Set ? _.set : typeof Date < "u" && t instanceof Date ? _.date : _.object;
      default:
        return _.unknown;
    }
  }, v = M.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]), nl = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), Le = class extends Error {
    constructor(t) {
      super(), this.issues = [], this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }, this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      };
      const i = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, i) : this.__proto__ = i, this.name = "ZodError", this.issues = t;
    }
    get errors() {
      return this.issues;
    }
    format(t) {
      const i = t || function(s) {
        return s.message;
      }, r = { _errors: [] }, n = (s) => {
        for (const u of s.issues)
          if (u.code === "invalid_union")
            u.unionErrors.map(n);
          else if (u.code === "invalid_return_type")
            n(u.returnTypeError);
          else if (u.code === "invalid_arguments")
            n(u.argumentsError);
          else if (u.path.length === 0)
            r._errors.push(i(u));
          else {
            let e = r, d = 0;
            for (; d < u.path.length; ) {
              const y = u.path[d];
              d === u.path.length - 1 ? (e[y] = e[y] || { _errors: [] }, e[y]._errors.push(i(u))) : e[y] = e[y] || { _errors: [] }, e = e[y], d++;
            }
          }
      };
      return n(this), r;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, M.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (i) => i.message) {
      const i = {}, r = [];
      for (const n of this.issues)
        n.path.length > 0 ? (i[n.path[0]] = i[n.path[0]] || [], i[n.path[0]].push(t(n))) : r.push(t(n));
      return { formErrors: r, fieldErrors: i };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  Le.create = (t) => new Le(t);
  var dt = (t, i) => {
    let r;
    switch (t.code) {
      case v.invalid_type:
        t.received === _.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case v.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, M.jsonStringifyReplacer)}`;
        break;
      case v.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${M.joinValues(t.keys, ", ")}`;
        break;
      case v.invalid_union:
        r = "Invalid input";
        break;
      case v.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${M.joinValues(t.options)}`;
        break;
      case v.invalid_enum_value:
        r = `Invalid enum value. Expected ${M.joinValues(t.options)}, received '${t.received}'`;
        break;
      case v.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case v.invalid_return_type:
        r = "Invalid function return type";
        break;
      case v.invalid_date:
        r = "Invalid date";
        break;
      case v.invalid_string:
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : M.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
        break;
      case v.too_small:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
        break;
      case v.too_big:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
        break;
      case v.custom:
        r = "Invalid input";
        break;
      case v.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case v.not_multiple_of:
        r = `Number must be a multiple of ${t.multipleOf}`;
        break;
      case v.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = i.defaultError, M.assertNever(t);
    }
    return { message: r };
  }, ui = dt;
  function sl(t) {
    ui = t;
  }
  function Ft() {
    return ui;
  }
  var qt = (t) => {
    const { data: i, path: r, errorMaps: n, issueData: s } = t, u = [...r, ...s.path || []], e = {
      ...s,
      path: u
    };
    let d = "";
    const y = n.filter((T) => !!T).slice().reverse();
    for (const T of y)
      d = T(e, { data: i, defaultError: d }).message;
    return {
      ...s,
      path: u,
      message: s.message || d
    };
  }, al = [];
  function C(t, i) {
    const r = qt({
      issueData: i,
      data: t.data,
      path: t.path,
      errorMaps: [
        t.common.contextualErrorMap,
        t.schemaErrorMap,
        Ft(),
        dt
      ].filter((n) => !!n)
    });
    t.common.issues.push(r);
  }
  var me = class {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, i) {
      const r = [];
      for (const n of i) {
        if (n.status === "aborted")
          return D;
        n.status === "dirty" && t.dirty(), r.push(n.value);
      }
      return { status: t.value, value: r };
    }
    static async mergeObjectAsync(t, i) {
      const r = [];
      for (const n of i)
        r.push({
          key: await n.key,
          value: await n.value
        });
      return me.mergeObjectSync(t, r);
    }
    static mergeObjectSync(t, i) {
      const r = {};
      for (const n of i) {
        const { key: s, value: u } = n;
        if (s.status === "aborted" || u.status === "aborted")
          return D;
        s.status === "dirty" && t.dirty(), u.status === "dirty" && t.dirty(), (typeof u.value < "u" || n.alwaysSet) && (r[s.value] = u.value);
      }
      return { status: t.value, value: r };
    }
  }, D = Object.freeze({
    status: "aborted"
  }), li = (t) => ({ status: "dirty", value: t }), he = (t) => ({ status: "valid", value: t }), Lr = (t) => t.status === "aborted", _r = (t) => t.status === "dirty", Mt = (t) => t.status === "valid", $t = (t) => typeof Promise < "u" && t instanceof Promise, B;
  (function(t) {
    t.errToObj = (i) => typeof i == "string" ? { message: i } : i || {}, t.toString = (i) => typeof i == "string" ? i : i?.message;
  })(B || (B = {}));
  var xe = class {
    constructor(t, i, r, n) {
      this._cachedPath = [], this.parent = t, this.data = i, this._path = r, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }, fi = (t, i) => {
    if (Mt(i))
      return { success: !0, data: i.value };
    if (!t.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error)
          return this._error;
        const r = new Le(t.common.issues);
        return this._error = r, this._error;
      }
    };
  };
  function P(t) {
    if (!t)
      return {};
    const { errorMap: i, invalid_type_error: r, required_error: n, description: s } = t;
    if (i && (r || n))
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return i ? { errorMap: i, description: s } : { errorMap: (e, d) => e.code !== "invalid_type" ? { message: d.defaultError } : typeof d.data > "u" ? { message: n ?? d.defaultError } : { message: r ?? d.defaultError }, description: s };
  }
  var N = class {
    constructor(t) {
      this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return Oe(t.data);
    }
    _getOrReturnCtx(t, i) {
      return i || {
        common: t.parent.common,
        data: t.data,
        parsedType: Oe(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      };
    }
    _processInputParams(t) {
      return {
        status: new me(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: Oe(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent
        }
      };
    }
    _parseSync(t) {
      const i = this._parse(t);
      if ($t(i))
        throw new Error("Synchronous parse encountered promise.");
      return i;
    }
    _parseAsync(t) {
      const i = this._parse(t);
      return Promise.resolve(i);
    }
    parse(t, i) {
      const r = this.safeParse(t, i);
      if (r.success)
        return r.data;
      throw r.error;
    }
    safeParse(t, i) {
      var r;
      const n = {
        common: {
          issues: [],
          async: (r = i?.async) !== null && r !== void 0 ? r : !1,
          contextualErrorMap: i?.errorMap
        },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Oe(t)
      }, s = this._parseSync({ data: t, path: n.path, parent: n });
      return fi(n, s);
    }
    async parseAsync(t, i) {
      const r = await this.safeParseAsync(t, i);
      if (r.success)
        return r.data;
      throw r.error;
    }
    async safeParseAsync(t, i) {
      const r = {
        common: {
          issues: [],
          contextualErrorMap: i?.errorMap,
          async: !0
        },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Oe(t)
      }, n = this._parse({ data: t, path: r.path, parent: r }), s = await ($t(n) ? n : Promise.resolve(n));
      return fi(r, s);
    }
    refine(t, i) {
      const r = (n) => typeof i == "string" || typeof i > "u" ? { message: i } : typeof i == "function" ? i(n) : i;
      return this._refinement((n, s) => {
        const u = t(n), e = () => s.addIssue({
          code: v.custom,
          ...r(n)
        });
        return typeof Promise < "u" && u instanceof Promise ? u.then((d) => d ? !0 : (e(), !1)) : u ? !0 : (e(), !1);
      });
    }
    refinement(t, i) {
      return this._refinement((r, n) => t(r) ? !0 : (n.addIssue(typeof i == "function" ? i(r, n) : i), !1));
    }
    _refinement(t) {
      return new _e({
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "refinement", refinement: t }
      });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    optional() {
      return Pe.create(this, this._def);
    }
    nullable() {
      return Qe.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ke.create(this, this._def);
    }
    promise() {
      return pt.create(this, this._def);
    }
    or(t) {
      return Et.create([this, t], this._def);
    }
    and(t) {
      return gt.create(this, t, this._def);
    }
    transform(t) {
      return new _e({
        ...P(this._def),
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "transform", transform: t }
      });
    }
    default(t) {
      const i = typeof t == "function" ? t : () => t;
      return new vt({
        ...P(this._def),
        innerType: this,
        defaultValue: i,
        typeName: K.ZodDefault
      });
    }
    brand() {
      return new di({
        typeName: K.ZodBranded,
        type: this,
        ...P(this._def)
      });
    }
    catch(t) {
      const i = typeof t == "function" ? t : () => t;
      return new Zt({
        ...P(this._def),
        innerType: this,
        catchValue: i,
        typeName: K.ZodCatch
      });
    }
    describe(t) {
      const i = this.constructor;
      return new i({
        ...this._def,
        description: t
      });
    }
    pipe(t) {
      return Jt.create(this, t);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }, ol = /^c[^\s-]{8,}$/i, pl = /^[a-z][a-z0-9]*$/, ul = /[0-9A-HJKMNP-TV-Z]{26}/, ll = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, fl = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, cl = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, dl = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, ml = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, hl = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
  function yl(t, i) {
    return !!((i === "v4" || !i) && dl.test(t) || (i === "v6" || !i) && ml.test(t));
  }
  var Be = class extends N {
    constructor() {
      super(...arguments), this._regex = (t, i, r) => this.refinement((n) => t.test(n), {
        validation: i,
        code: v.invalid_string,
        ...B.errToObj(r)
      }), this.nonempty = (t) => this.min(1, B.errToObj(t)), this.trim = () => new Be({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      }), this.toLowerCase = () => new Be({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      }), this.toUpperCase = () => new Be({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    _parse(t) {
      if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== _.string) {
        const s = this._getOrReturnCtx(t);
        return C(s, {
          code: v.invalid_type,
          expected: _.string,
          received: s.parsedType
        }), D;
      }
      const r = new me();
      let n;
      for (const s of this._def.checks)
        if (s.kind === "min")
          t.data.length < s.value && (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.too_small,
            minimum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message
          }), r.dirty());
        else if (s.kind === "max")
          t.data.length > s.value && (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.too_big,
            maximum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message
          }), r.dirty());
        else if (s.kind === "length") {
          const u = t.data.length > s.value, e = t.data.length < s.value;
          (u || e) && (n = this._getOrReturnCtx(t, n), u ? C(n, {
            code: v.too_big,
            maximum: s.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: s.message
          }) : e && C(n, {
            code: v.too_small,
            minimum: s.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: s.message
          }), r.dirty());
        } else if (s.kind === "email")
          fl.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "email",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "emoji")
          cl.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "emoji",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "uuid")
          ll.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "uuid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "cuid")
          ol.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "cuid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "cuid2")
          pl.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "cuid2",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "ulid")
          ul.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "ulid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "url")
          try {
            new URL(t.data);
          } catch {
            n = this._getOrReturnCtx(t, n), C(n, {
              validation: "url",
              code: v.invalid_string,
              message: s.message
            }), r.dirty();
          }
        else
          s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "regex",
            code: v.invalid_string,
            message: s.message
          }), r.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.invalid_string,
            validation: { includes: s.value, position: s.position },
            message: s.message
          }), r.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.invalid_string,
            validation: { startsWith: s.value },
            message: s.message
          }), r.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.invalid_string,
            validation: { endsWith: s.value },
            message: s.message
          }), r.dirty()) : s.kind === "datetime" ? hl(s).test(t.data) || (n = this._getOrReturnCtx(t, n), C(n, {
            code: v.invalid_string,
            validation: "datetime",
            message: s.message
          }), r.dirty()) : s.kind === "ip" ? yl(t.data, s.version) || (n = this._getOrReturnCtx(t, n), C(n, {
            validation: "ip",
            code: v.invalid_string,
            message: s.message
          }), r.dirty()) : M.assertNever(s);
      return { status: r.value, value: t.data };
    }
    _addCheck(t) {
      return new Be({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    email(t) {
      return this._addCheck({ kind: "email", ...B.errToObj(t) });
    }
    url(t) {
      return this._addCheck({ kind: "url", ...B.errToObj(t) });
    }
    emoji(t) {
      return this._addCheck({ kind: "emoji", ...B.errToObj(t) });
    }
    uuid(t) {
      return this._addCheck({ kind: "uuid", ...B.errToObj(t) });
    }
    cuid(t) {
      return this._addCheck({ kind: "cuid", ...B.errToObj(t) });
    }
    cuid2(t) {
      return this._addCheck({ kind: "cuid2", ...B.errToObj(t) });
    }
    ulid(t) {
      return this._addCheck({ kind: "ulid", ...B.errToObj(t) });
    }
    ip(t) {
      return this._addCheck({ kind: "ip", ...B.errToObj(t) });
    }
    datetime(t) {
      var i;
      return typeof t == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        message: t
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof t?.precision > "u" ? null : t?.precision,
        offset: (i = t?.offset) !== null && i !== void 0 ? i : !1,
        ...B.errToObj(t?.message)
      });
    }
    regex(t, i) {
      return this._addCheck({
        kind: "regex",
        regex: t,
        ...B.errToObj(i)
      });
    }
    includes(t, i) {
      return this._addCheck({
        kind: "includes",
        value: t,
        position: i?.position,
        ...B.errToObj(i?.message)
      });
    }
    startsWith(t, i) {
      return this._addCheck({
        kind: "startsWith",
        value: t,
        ...B.errToObj(i)
      });
    }
    endsWith(t, i) {
      return this._addCheck({
        kind: "endsWith",
        value: t,
        ...B.errToObj(i)
      });
    }
    min(t, i) {
      return this._addCheck({
        kind: "min",
        value: t,
        ...B.errToObj(i)
      });
    }
    max(t, i) {
      return this._addCheck({
        kind: "max",
        value: t,
        ...B.errToObj(i)
      });
    }
    length(t, i) {
      return this._addCheck({
        kind: "length",
        value: t,
        ...B.errToObj(i)
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isEmail() {
      return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isCUID() {
      return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get minLength() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxLength() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
  };
  Be.create = (t) => {
    var i;
    return new Be({
      checks: [],
      typeName: K.ZodString,
      coerce: (i = t?.coerce) !== null && i !== void 0 ? i : !1,
      ...P(t)
    });
  };
  function El(t, i) {
    const r = (t.toString().split(".")[1] || "").length, n = (i.toString().split(".")[1] || "").length, s = r > n ? r : n, u = parseInt(t.toFixed(s).replace(".", "")), e = parseInt(i.toFixed(s).replace(".", ""));
    return u % e / Math.pow(10, s);
  }
  var ze = class extends N {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== _.number) {
        const s = this._getOrReturnCtx(t);
        return C(s, {
          code: v.invalid_type,
          expected: _.number,
          received: s.parsedType
        }), D;
      }
      let r;
      const n = new me();
      for (const s of this._def.checks)
        s.kind === "int" ? M.isInteger(t.data) || (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.invalid_type,
          expected: "integer",
          received: "float",
          message: s.message
        }), n.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.too_small,
          minimum: s.value,
          type: "number",
          inclusive: s.inclusive,
          exact: !1,
          message: s.message
        }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.too_big,
          maximum: s.value,
          type: "number",
          inclusive: s.inclusive,
          exact: !1,
          message: s.message
        }), n.dirty()) : s.kind === "multipleOf" ? El(t.data, s.value) !== 0 && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.not_multiple_of,
          multipleOf: s.value,
          message: s.message
        }), n.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.not_finite,
          message: s.message
        }), n.dirty()) : M.assertNever(s);
      return { status: n.value, value: t.data };
    }
    gte(t, i) {
      return this.setLimit("min", t, !0, B.toString(i));
    }
    gt(t, i) {
      return this.setLimit("min", t, !1, B.toString(i));
    }
    lte(t, i) {
      return this.setLimit("max", t, !0, B.toString(i));
    }
    lt(t, i) {
      return this.setLimit("max", t, !1, B.toString(i));
    }
    setLimit(t, i, r, n) {
      return new ze({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: i,
            inclusive: r,
            message: B.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new ze({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    int(t) {
      return this._addCheck({
        kind: "int",
        message: B.toString(t)
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: B.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: B.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: B.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: B.toString(t)
      });
    }
    multipleOf(t, i) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(i)
      });
    }
    finite(t) {
      return this._addCheck({
        kind: "finite",
        message: B.toString(t)
      });
    }
    safe(t) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: B.toString(t)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: B.toString(t)
      });
    }
    get minValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
    get isInt() {
      return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && M.isInteger(t.value));
    }
    get isFinite() {
      let t = null, i = null;
      for (const r of this._def.checks) {
        if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
          return !0;
        r.kind === "min" ? (i === null || r.value > i) && (i = r.value) : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      }
      return Number.isFinite(i) && Number.isFinite(t);
    }
  };
  ze.create = (t) => new ze({
    checks: [],
    typeName: K.ZodNumber,
    coerce: t?.coerce || !1,
    ...P(t)
  });
  var Ze = class extends N {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== _.bigint) {
        const s = this._getOrReturnCtx(t);
        return C(s, {
          code: v.invalid_type,
          expected: _.bigint,
          received: s.parsedType
        }), D;
      }
      let r;
      const n = new me();
      for (const s of this._def.checks)
        s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.too_small,
          type: "bigint",
          minimum: s.value,
          inclusive: s.inclusive,
          message: s.message
        }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.too_big,
          type: "bigint",
          maximum: s.value,
          inclusive: s.inclusive,
          message: s.message
        }), n.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(t, r), C(r, {
          code: v.not_multiple_of,
          multipleOf: s.value,
          message: s.message
        }), n.dirty()) : M.assertNever(s);
      return { status: n.value, value: t.data };
    }
    gte(t, i) {
      return this.setLimit("min", t, !0, B.toString(i));
    }
    gt(t, i) {
      return this.setLimit("min", t, !1, B.toString(i));
    }
    lte(t, i) {
      return this.setLimit("max", t, !0, B.toString(i));
    }
    lt(t, i) {
      return this.setLimit("max", t, !1, B.toString(i));
    }
    setLimit(t, i, r, n) {
      return new Ze({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: i,
            inclusive: r,
            message: B.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new Ze({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t)
      });
    }
    multipleOf(t, i) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(i)
      });
    }
    get minValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
  };
  Ze.create = (t) => {
    var i;
    return new Ze({
      checks: [],
      typeName: K.ZodBigInt,
      coerce: (i = t?.coerce) !== null && i !== void 0 ? i : !1,
      ...P(t)
    });
  };
  var mt = class extends N {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== _.boolean) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.boolean,
          received: r.parsedType
        }), D;
      }
      return he(t.data);
    }
  };
  mt.create = (t) => new mt({
    typeName: K.ZodBoolean,
    coerce: t?.coerce || !1,
    ...P(t)
  });
  var nt = class extends N {
    _parse(t) {
      if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== _.date) {
        const s = this._getOrReturnCtx(t);
        return C(s, {
          code: v.invalid_type,
          expected: _.date,
          received: s.parsedType
        }), D;
      }
      if (isNaN(t.data.getTime())) {
        const s = this._getOrReturnCtx(t);
        return C(s, {
          code: v.invalid_date
        }), D;
      }
      const r = new me();
      let n;
      for (const s of this._def.checks)
        s.kind === "min" ? t.data.getTime() < s.value && (n = this._getOrReturnCtx(t, n), C(n, {
          code: v.too_small,
          message: s.message,
          inclusive: !0,
          exact: !1,
          minimum: s.value,
          type: "date"
        }), r.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (n = this._getOrReturnCtx(t, n), C(n, {
          code: v.too_big,
          message: s.message,
          inclusive: !0,
          exact: !1,
          maximum: s.value,
          type: "date"
        }), r.dirty()) : M.assertNever(s);
      return {
        status: r.value,
        value: new Date(t.data.getTime())
      };
    }
    _addCheck(t) {
      return new nt({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    min(t, i) {
      return this._addCheck({
        kind: "min",
        value: t.getTime(),
        message: B.toString(i)
      });
    }
    max(t, i) {
      return this._addCheck({
        kind: "max",
        value: t.getTime(),
        message: B.toString(i)
      });
    }
    get minDate() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t != null ? new Date(t) : null;
    }
    get maxDate() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t != null ? new Date(t) : null;
    }
  };
  nt.create = (t) => new nt({
    checks: [],
    coerce: t?.coerce || !1,
    typeName: K.ZodDate,
    ...P(t)
  });
  var Ot = class extends N {
    _parse(t) {
      if (this._getType(t) !== _.symbol) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.symbol,
          received: r.parsedType
        }), D;
      }
      return he(t.data);
    }
  };
  Ot.create = (t) => new Ot({
    typeName: K.ZodSymbol,
    ...P(t)
  });
  var ht = class extends N {
    _parse(t) {
      if (this._getType(t) !== _.undefined) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.undefined,
          received: r.parsedType
        }), D;
      }
      return he(t.data);
    }
  };
  ht.create = (t) => new ht({
    typeName: K.ZodUndefined,
    ...P(t)
  });
  var yt = class extends N {
    _parse(t) {
      if (this._getType(t) !== _.null) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.null,
          received: r.parsedType
        }), D;
      }
      return he(t.data);
    }
  };
  yt.create = (t) => new yt({
    typeName: K.ZodNull,
    ...P(t)
  });
  var st = class extends N {
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(t) {
      return he(t.data);
    }
  };
  st.create = (t) => new st({
    typeName: K.ZodAny,
    ...P(t)
  });
  var We = class extends N {
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(t) {
      return he(t.data);
    }
  };
  We.create = (t) => new We({
    typeName: K.ZodUnknown,
    ...P(t)
  });
  var Ve = class extends N {
    _parse(t) {
      const i = this._getOrReturnCtx(t);
      return C(i, {
        code: v.invalid_type,
        expected: _.never,
        received: i.parsedType
      }), D;
    }
  };
  Ve.create = (t) => new Ve({
    typeName: K.ZodNever,
    ...P(t)
  });
  var Gt = class extends N {
    _parse(t) {
      if (this._getType(t) !== _.undefined) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.void,
          received: r.parsedType
        }), D;
      }
      return he(t.data);
    }
  };
  Gt.create = (t) => new Gt({
    typeName: K.ZodVoid,
    ...P(t)
  });
  var ke = class extends N {
    _parse(t) {
      const { ctx: i, status: r } = this._processInputParams(t), n = this._def;
      if (i.parsedType !== _.array)
        return C(i, {
          code: v.invalid_type,
          expected: _.array,
          received: i.parsedType
        }), D;
      if (n.exactLength !== null) {
        const u = i.data.length > n.exactLength.value, e = i.data.length < n.exactLength.value;
        (u || e) && (C(i, {
          code: u ? v.too_big : v.too_small,
          minimum: e ? n.exactLength.value : void 0,
          maximum: u ? n.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: n.exactLength.message
        }), r.dirty());
      }
      if (n.minLength !== null && i.data.length < n.minLength.value && (C(i, {
        code: v.too_small,
        minimum: n.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.minLength.message
      }), r.dirty()), n.maxLength !== null && i.data.length > n.maxLength.value && (C(i, {
        code: v.too_big,
        maximum: n.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.maxLength.message
      }), r.dirty()), i.common.async)
        return Promise.all([...i.data].map((u, e) => n.type._parseAsync(new xe(i, u, i.path, e)))).then((u) => me.mergeArray(r, u));
      const s = [...i.data].map((u, e) => n.type._parseSync(new xe(i, u, i.path, e)));
      return me.mergeArray(r, s);
    }
    get element() {
      return this._def.type;
    }
    min(t, i) {
      return new ke({
        ...this._def,
        minLength: { value: t, message: B.toString(i) }
      });
    }
    max(t, i) {
      return new ke({
        ...this._def,
        maxLength: { value: t, message: B.toString(i) }
      });
    }
    length(t, i) {
      return new ke({
        ...this._def,
        exactLength: { value: t, message: B.toString(i) }
      });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  ke.create = (t, i) => new ke({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: K.ZodArray,
    ...P(i)
  });
  function at(t) {
    if (t instanceof Y) {
      const i = {};
      for (const r in t.shape) {
        const n = t.shape[r];
        i[r] = Pe.create(at(n));
      }
      return new Y({
        ...t._def,
        shape: () => i
      });
    } else
      return t instanceof ke ? new ke({
        ...t._def,
        type: at(t.element)
      }) : t instanceof Pe ? Pe.create(at(t.unwrap())) : t instanceof Qe ? Qe.create(at(t.unwrap())) : t instanceof De ? De.create(t.items.map((i) => at(i))) : t;
  }
  var Y = class extends N {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const t = this._def.shape(), i = M.objectKeys(t);
      return this._cached = { shape: t, keys: i };
    }
    _parse(t) {
      if (this._getType(t) !== _.object) {
        const y = this._getOrReturnCtx(t);
        return C(y, {
          code: v.invalid_type,
          expected: _.object,
          received: y.parsedType
        }), D;
      }
      const { status: r, ctx: n } = this._processInputParams(t), { shape: s, keys: u } = this._getCached(), e = [];
      if (!(this._def.catchall instanceof Ve && this._def.unknownKeys === "strip"))
        for (const y in n.data)
          u.includes(y) || e.push(y);
      const d = [];
      for (const y of u) {
        const T = s[y], L = n.data[y];
        d.push({
          key: { status: "valid", value: y },
          value: T._parse(new xe(n, L, n.path, y)),
          alwaysSet: y in n.data
        });
      }
      if (this._def.catchall instanceof Ve) {
        const y = this._def.unknownKeys;
        if (y === "passthrough")
          for (const T of e)
            d.push({
              key: { status: "valid", value: T },
              value: { status: "valid", value: n.data[T] }
            });
        else if (y === "strict")
          e.length > 0 && (C(n, {
            code: v.unrecognized_keys,
            keys: e
          }), r.dirty());
        else if (y !== "strip")
          throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const y = this._def.catchall;
        for (const T of e) {
          const L = n.data[T];
          d.push({
            key: { status: "valid", value: T },
            value: y._parse(new xe(n, L, n.path, T)),
            alwaysSet: T in n.data
          });
        }
      }
      return n.common.async ? Promise.resolve().then(async () => {
        const y = [];
        for (const T of d) {
          const L = await T.key;
          y.push({
            key: L,
            value: await T.value,
            alwaysSet: T.alwaysSet
          });
        }
        return y;
      }).then((y) => me.mergeObjectSync(r, y)) : me.mergeObjectSync(r, d);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t) {
      return B.errToObj, new Y({
        ...this._def,
        unknownKeys: "strict",
        ...t !== void 0 ? {
          errorMap: (i, r) => {
            var n, s, u, e;
            const d = (u = (s = (n = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(n, i, r).message) !== null && u !== void 0 ? u : r.defaultError;
            return i.code === "unrecognized_keys" ? {
              message: (e = B.errToObj(t).message) !== null && e !== void 0 ? e : d
            } : {
              message: d
            };
          }
        } : {}
      });
    }
    strip() {
      return new Y({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new Y({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(t) {
      return new Y({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...t
        })
      });
    }
    merge(t) {
      return new Y({
        unknownKeys: t._def.unknownKeys,
        catchall: t._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...t._def.shape()
        }),
        typeName: K.ZodObject
      });
    }
    setKey(t, i) {
      return this.augment({ [t]: i });
    }
    catchall(t) {
      return new Y({
        ...this._def,
        catchall: t
      });
    }
    pick(t) {
      const i = {};
      return M.objectKeys(t).forEach((r) => {
        t[r] && this.shape[r] && (i[r] = this.shape[r]);
      }), new Y({
        ...this._def,
        shape: () => i
      });
    }
    omit(t) {
      const i = {};
      return M.objectKeys(this.shape).forEach((r) => {
        t[r] || (i[r] = this.shape[r]);
      }), new Y({
        ...this._def,
        shape: () => i
      });
    }
    deepPartial() {
      return at(this);
    }
    partial(t) {
      const i = {};
      return M.objectKeys(this.shape).forEach((r) => {
        const n = this.shape[r];
        t && !t[r] ? i[r] = n : i[r] = n.optional();
      }), new Y({
        ...this._def,
        shape: () => i
      });
    }
    required(t) {
      const i = {};
      return M.objectKeys(this.shape).forEach((r) => {
        if (t && !t[r])
          i[r] = this.shape[r];
        else {
          let s = this.shape[r];
          for (; s instanceof Pe; )
            s = s._def.innerType;
          i[r] = s;
        }
      }), new Y({
        ...this._def,
        shape: () => i
      });
    }
    keyof() {
      return ci(M.objectKeys(this.shape));
    }
  };
  Y.create = (t, i) => new Y({
    shape: () => t,
    unknownKeys: "strip",
    catchall: Ve.create(),
    typeName: K.ZodObject,
    ...P(i)
  }), Y.strictCreate = (t, i) => new Y({
    shape: () => t,
    unknownKeys: "strict",
    catchall: Ve.create(),
    typeName: K.ZodObject,
    ...P(i)
  }), Y.lazycreate = (t, i) => new Y({
    shape: t,
    unknownKeys: "strip",
    catchall: Ve.create(),
    typeName: K.ZodObject,
    ...P(i)
  });
  var Et = class extends N {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = this._def.options;
      function n(s) {
        for (const e of s)
          if (e.result.status === "valid")
            return e.result;
        for (const e of s)
          if (e.result.status === "dirty")
            return i.common.issues.push(...e.ctx.common.issues), e.result;
        const u = s.map((e) => new Le(e.ctx.common.issues));
        return C(i, {
          code: v.invalid_union,
          unionErrors: u
        }), D;
      }
      if (i.common.async)
        return Promise.all(r.map(async (s) => {
          const u = {
            ...i,
            common: {
              ...i.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await s._parseAsync({
              data: i.data,
              path: i.path,
              parent: u
            }),
            ctx: u
          };
        })).then(n);
      {
        let s;
        const u = [];
        for (const d of r) {
          const y = {
            ...i,
            common: {
              ...i.common,
              issues: []
            },
            parent: null
          }, T = d._parseSync({
            data: i.data,
            path: i.path,
            parent: y
          });
          if (T.status === "valid")
            return T;
          T.status === "dirty" && !s && (s = { result: T, ctx: y }), y.common.issues.length && u.push(y.common.issues);
        }
        if (s)
          return i.common.issues.push(...s.ctx.common.issues), s.result;
        const e = u.map((d) => new Le(d));
        return C(i, {
          code: v.invalid_union,
          unionErrors: e
        }), D;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  Et.create = (t, i) => new Et({
    options: t,
    typeName: K.ZodUnion,
    ...P(i)
  });
  var Xt = (t) => t instanceof bt ? Xt(t.schema) : t instanceof _e ? Xt(t.innerType()) : t instanceof At ? [t.value] : t instanceof Je ? t.options : t instanceof Tt ? Object.keys(t.enum) : t instanceof vt ? Xt(t._def.innerType) : t instanceof ht ? [void 0] : t instanceof yt ? [null] : null, Cr = class extends N {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== _.object)
        return C(i, {
          code: v.invalid_type,
          expected: _.object,
          received: i.parsedType
        }), D;
      const r = this.discriminator, n = i.data[r], s = this.optionsMap.get(n);
      return s ? i.common.async ? s._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      }) : s._parseSync({
        data: i.data,
        path: i.path,
        parent: i
      }) : (C(i, {
        code: v.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [r]
      }), D);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t, i, r) {
      const n = /* @__PURE__ */ new Map();
      for (const s of i) {
        const u = Xt(s.shape[t]);
        if (!u)
          throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
        for (const e of u) {
          if (n.has(e))
            throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(e)}`);
          n.set(e, s);
        }
      }
      return new Cr({
        typeName: K.ZodDiscriminatedUnion,
        discriminator: t,
        options: i,
        optionsMap: n,
        ...P(r)
      });
    }
  };
  function Sr(t, i) {
    const r = Oe(t), n = Oe(i);
    if (t === i)
      return { valid: !0, data: t };
    if (r === _.object && n === _.object) {
      const s = M.objectKeys(i), u = M.objectKeys(t).filter((d) => s.indexOf(d) !== -1), e = { ...t, ...i };
      for (const d of u) {
        const y = Sr(t[d], i[d]);
        if (!y.valid)
          return { valid: !1 };
        e[d] = y.data;
      }
      return { valid: !0, data: e };
    } else if (r === _.array && n === _.array) {
      if (t.length !== i.length)
        return { valid: !1 };
      const s = [];
      for (let u = 0; u < t.length; u++) {
        const e = t[u], d = i[u], y = Sr(e, d);
        if (!y.valid)
          return { valid: !1 };
        s.push(y.data);
      }
      return { valid: !0, data: s };
    } else
      return r === _.date && n === _.date && +t == +i ? { valid: !0, data: t } : { valid: !1 };
  }
  var gt = class extends N {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t), n = (s, u) => {
        if (Lr(s) || Lr(u))
          return D;
        const e = Sr(s.value, u.value);
        return e.valid ? ((_r(s) || _r(u)) && i.dirty(), { status: i.value, value: e.data }) : (C(r, {
          code: v.invalid_intersection_types
        }), D);
      };
      return r.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        }),
        this._def.right._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        })
      ]).then(([s, u]) => n(s, u)) : n(this._def.left._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }), this._def.right._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }));
    }
  };
  gt.create = (t, i, r) => new gt({
    left: t,
    right: i,
    typeName: K.ZodIntersection,
    ...P(r)
  });
  var De = class extends N {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== _.array)
        return C(r, {
          code: v.invalid_type,
          expected: _.array,
          received: r.parsedType
        }), D;
      if (r.data.length < this._def.items.length)
        return C(r, {
          code: v.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
        }), D;
      !this._def.rest && r.data.length > this._def.items.length && (C(r, {
        code: v.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), i.dirty());
      const s = [...r.data].map((u, e) => {
        const d = this._def.items[e] || this._def.rest;
        return d ? d._parse(new xe(r, u, r.path, e)) : null;
      }).filter((u) => !!u);
      return r.common.async ? Promise.all(s).then((u) => me.mergeArray(i, u)) : me.mergeArray(i, s);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new De({
        ...this._def,
        rest: t
      });
    }
  };
  De.create = (t, i) => {
    if (!Array.isArray(t))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new De({
      items: t,
      typeName: K.ZodTuple,
      rest: null,
      ...P(i)
    });
  };
  var Ht = class extends N {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== _.object)
        return C(r, {
          code: v.invalid_type,
          expected: _.object,
          received: r.parsedType
        }), D;
      const n = [], s = this._def.keyType, u = this._def.valueType;
      for (const e in r.data)
        n.push({
          key: s._parse(new xe(r, e, r.path, e)),
          value: u._parse(new xe(r, r.data[e], r.path, e))
        });
      return r.common.async ? me.mergeObjectAsync(i, n) : me.mergeObjectSync(i, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, i, r) {
      return i instanceof N ? new Ht({
        keyType: t,
        valueType: i,
        typeName: K.ZodRecord,
        ...P(r)
      }) : new Ht({
        keyType: Be.create(),
        valueType: t,
        typeName: K.ZodRecord,
        ...P(i)
      });
    }
  }, zt = class extends N {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== _.map)
        return C(r, {
          code: v.invalid_type,
          expected: _.map,
          received: r.parsedType
        }), D;
      const n = this._def.keyType, s = this._def.valueType, u = [...r.data.entries()].map(([e, d], y) => ({
        key: n._parse(new xe(r, e, r.path, [y, "key"])),
        value: s._parse(new xe(r, d, r.path, [y, "value"]))
      }));
      if (r.common.async) {
        const e = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const d of u) {
            const y = await d.key, T = await d.value;
            if (y.status === "aborted" || T.status === "aborted")
              return D;
            (y.status === "dirty" || T.status === "dirty") && i.dirty(), e.set(y.value, T.value);
          }
          return { status: i.value, value: e };
        });
      } else {
        const e = /* @__PURE__ */ new Map();
        for (const d of u) {
          const y = d.key, T = d.value;
          if (y.status === "aborted" || T.status === "aborted")
            return D;
          (y.status === "dirty" || T.status === "dirty") && i.dirty(), e.set(y.value, T.value);
        }
        return { status: i.value, value: e };
      }
    }
  };
  zt.create = (t, i, r) => new zt({
    valueType: i,
    keyType: t,
    typeName: K.ZodMap,
    ...P(r)
  });
  var ot = class extends N {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== _.set)
        return C(r, {
          code: v.invalid_type,
          expected: _.set,
          received: r.parsedType
        }), D;
      const n = this._def;
      n.minSize !== null && r.data.size < n.minSize.value && (C(r, {
        code: v.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.minSize.message
      }), i.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (C(r, {
        code: v.too_big,
        maximum: n.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.maxSize.message
      }), i.dirty());
      const s = this._def.valueType;
      function u(d) {
        const y = /* @__PURE__ */ new Set();
        for (const T of d) {
          if (T.status === "aborted")
            return D;
          T.status === "dirty" && i.dirty(), y.add(T.value);
        }
        return { status: i.value, value: y };
      }
      const e = [...r.data.values()].map((d, y) => s._parse(new xe(r, d, r.path, y)));
      return r.common.async ? Promise.all(e).then((d) => u(d)) : u(e);
    }
    min(t, i) {
      return new ot({
        ...this._def,
        minSize: { value: t, message: B.toString(i) }
      });
    }
    max(t, i) {
      return new ot({
        ...this._def,
        maxSize: { value: t, message: B.toString(i) }
      });
    }
    size(t, i) {
      return this.min(t, i).max(t, i);
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  ot.create = (t, i) => new ot({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: K.ZodSet,
    ...P(i)
  });
  var Rt = class extends N {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== _.function)
        return C(i, {
          code: v.invalid_type,
          expected: _.function,
          received: i.parsedType
        }), D;
      function r(e, d) {
        return qt({
          data: e,
          path: i.path,
          errorMaps: [
            i.common.contextualErrorMap,
            i.schemaErrorMap,
            Ft(),
            dt
          ].filter((y) => !!y),
          issueData: {
            code: v.invalid_arguments,
            argumentsError: d
          }
        });
      }
      function n(e, d) {
        return qt({
          data: e,
          path: i.path,
          errorMaps: [
            i.common.contextualErrorMap,
            i.schemaErrorMap,
            Ft(),
            dt
          ].filter((y) => !!y),
          issueData: {
            code: v.invalid_return_type,
            returnTypeError: d
          }
        });
      }
      const s = { errorMap: i.common.contextualErrorMap }, u = i.data;
      return this._def.returns instanceof pt ? he(async (...e) => {
        const d = new Le([]), y = await this._def.args.parseAsync(e, s).catch((S) => {
          throw d.addIssue(r(e, S)), d;
        }), T = await u(...y);
        return await this._def.returns._def.type.parseAsync(T, s).catch((S) => {
          throw d.addIssue(n(T, S)), d;
        });
      }) : he((...e) => {
        const d = this._def.args.safeParse(e, s);
        if (!d.success)
          throw new Le([r(e, d.error)]);
        const y = u(...d.data), T = this._def.returns.safeParse(y, s);
        if (!T.success)
          throw new Le([n(y, T.error)]);
        return T.data;
      });
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new Rt({
        ...this._def,
        args: De.create(t).rest(We.create())
      });
    }
    returns(t) {
      return new Rt({
        ...this._def,
        returns: t
      });
    }
    implement(t) {
      return this.parse(t);
    }
    strictImplement(t) {
      return this.parse(t);
    }
    static create(t, i, r) {
      return new Rt({
        args: t || De.create([]).rest(We.create()),
        returns: i || We.create(),
        typeName: K.ZodFunction,
        ...P(r)
      });
    }
  }, bt = class extends N {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      return this._def.getter()._parse({ data: i.data, path: i.path, parent: i });
    }
  };
  bt.create = (t, i) => new bt({
    getter: t,
    typeName: K.ZodLazy,
    ...P(i)
  });
  var At = class extends N {
    _parse(t) {
      if (t.data !== this._def.value) {
        const i = this._getOrReturnCtx(t);
        return C(i, {
          received: i.data,
          code: v.invalid_literal,
          expected: this._def.value
        }), D;
      }
      return { status: "valid", value: t.data };
    }
    get value() {
      return this._def.value;
    }
  };
  At.create = (t, i) => new At({
    value: t,
    typeName: K.ZodLiteral,
    ...P(i)
  });
  function ci(t, i) {
    return new Je({
      values: t,
      typeName: K.ZodEnum,
      ...P(i)
    });
  }
  var Je = class extends N {
    _parse(t) {
      if (typeof t.data != "string") {
        const i = this._getOrReturnCtx(t), r = this._def.values;
        return C(i, {
          expected: M.joinValues(r),
          received: i.parsedType,
          code: v.invalid_type
        }), D;
      }
      if (this._def.values.indexOf(t.data) === -1) {
        const i = this._getOrReturnCtx(t), r = this._def.values;
        return C(i, {
          received: i.data,
          code: v.invalid_enum_value,
          options: r
        }), D;
      }
      return he(t.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    get Values() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    get Enum() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    extract(t) {
      return Je.create(t);
    }
    exclude(t) {
      return Je.create(this.options.filter((i) => !t.includes(i)));
    }
  };
  Je.create = ci;
  var Tt = class extends N {
    _parse(t) {
      const i = M.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(t);
      if (r.parsedType !== _.string && r.parsedType !== _.number) {
        const n = M.objectValues(i);
        return C(r, {
          expected: M.joinValues(n),
          received: r.parsedType,
          code: v.invalid_type
        }), D;
      }
      if (i.indexOf(t.data) === -1) {
        const n = M.objectValues(i);
        return C(r, {
          received: r.data,
          code: v.invalid_enum_value,
          options: n
        }), D;
      }
      return he(t.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  Tt.create = (t, i) => new Tt({
    values: t,
    typeName: K.ZodNativeEnum,
    ...P(i)
  });
  var pt = class extends N {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== _.promise && i.common.async === !1)
        return C(i, {
          code: v.invalid_type,
          expected: _.promise,
          received: i.parsedType
        }), D;
      const r = i.parsedType === _.promise ? i.data : Promise.resolve(i.data);
      return he(r.then((n) => this._def.type.parseAsync(n, {
        path: i.path,
        errorMap: i.common.contextualErrorMap
      })));
    }
  };
  pt.create = (t, i) => new pt({
    type: t,
    typeName: K.ZodPromise,
    ...P(i)
  });
  var _e = class extends N {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === K.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t), n = this._def.effect || null;
      if (n.type === "preprocess") {
        const u = n.transform(r.data);
        return r.common.async ? Promise.resolve(u).then((e) => this._def.schema._parseAsync({
          data: e,
          path: r.path,
          parent: r
        })) : this._def.schema._parseSync({
          data: u,
          path: r.path,
          parent: r
        });
      }
      const s = {
        addIssue: (u) => {
          C(r, u), u.fatal ? i.abort() : i.dirty();
        },
        get path() {
          return r.path;
        }
      };
      if (s.addIssue = s.addIssue.bind(s), n.type === "refinement") {
        const u = (e) => {
          const d = n.refinement(e, s);
          if (r.common.async)
            return Promise.resolve(d);
          if (d instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return e;
        };
        if (r.common.async === !1) {
          const e = this._def.schema._parseSync({
            data: r.data,
            path: r.path,
            parent: r
          });
          return e.status === "aborted" ? D : (e.status === "dirty" && i.dirty(), u(e.value), { status: i.value, value: e.value });
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((e) => e.status === "aborted" ? D : (e.status === "dirty" && i.dirty(), u(e.value).then(() => ({ status: i.value, value: e.value }))));
      }
      if (n.type === "transform")
        if (r.common.async === !1) {
          const u = this._def.schema._parseSync({
            data: r.data,
            path: r.path,
            parent: r
          });
          if (!Mt(u))
            return u;
          const e = n.transform(u.value, s);
          if (e instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: i.value, value: e };
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((u) => Mt(u) ? Promise.resolve(n.transform(u.value, s)).then((e) => ({ status: i.value, value: e })) : u);
      M.assertNever(n);
    }
  };
  _e.create = (t, i, r) => new _e({
    schema: t,
    typeName: K.ZodEffects,
    effect: i,
    ...P(r)
  }), _e.createWithPreprocess = (t, i, r) => new _e({
    schema: i,
    effect: { type: "preprocess", transform: t },
    typeName: K.ZodEffects,
    ...P(r)
  });
  var Pe = class extends N {
    _parse(t) {
      return this._getType(t) === _.undefined ? he(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  Pe.create = (t, i) => new Pe({
    innerType: t,
    typeName: K.ZodOptional,
    ...P(i)
  });
  var Qe = class extends N {
    _parse(t) {
      return this._getType(t) === _.null ? he(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  Qe.create = (t, i) => new Qe({
    innerType: t,
    typeName: K.ZodNullable,
    ...P(i)
  });
  var vt = class extends N {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      let r = i.data;
      return i.parsedType === _.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
        data: r,
        path: i.path,
        parent: i
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  vt.create = (t, i) => new vt({
    innerType: t,
    typeName: K.ZodDefault,
    defaultValue: typeof i.default == "function" ? i.default : () => i.default,
    ...P(i)
  });
  var Zt = class extends N {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = {
        ...i,
        common: {
          ...i.common,
          issues: []
        }
      }, n = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: {
          ...r
        }
      });
      return $t(n) ? n.then((s) => ({
        status: "valid",
        value: s.status === "valid" ? s.value : this._def.catchValue({
          get error() {
            return new Le(r.common.issues);
          },
          input: r.data
        })
      })) : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new Le(r.common.issues);
          },
          input: r.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  Zt.create = (t, i) => new Zt({
    innerType: t,
    typeName: K.ZodCatch,
    catchValue: typeof i.catch == "function" ? i.catch : () => i.catch,
    ...P(i)
  });
  var Wt = class extends N {
    _parse(t) {
      if (this._getType(t) !== _.nan) {
        const r = this._getOrReturnCtx(t);
        return C(r, {
          code: v.invalid_type,
          expected: _.nan,
          received: r.parsedType
        }), D;
      }
      return { status: "valid", value: t.data };
    }
  };
  Wt.create = (t) => new Wt({
    typeName: K.ZodNaN,
    ...P(t)
  });
  var gl = Symbol("zod_brand"), di = class extends N {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = i.data;
      return this._def.type._parse({
        data: r,
        path: i.path,
        parent: i
      });
    }
    unwrap() {
      return this._def.type;
    }
  }, Jt = class extends N {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.common.async)
        return (async () => {
          const s = await this._def.in._parseAsync({
            data: r.data,
            path: r.path,
            parent: r
          });
          return s.status === "aborted" ? D : s.status === "dirty" ? (i.dirty(), li(s.value)) : this._def.out._parseAsync({
            data: s.value,
            path: r.path,
            parent: r
          });
        })();
      {
        const n = this._def.in._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return n.status === "aborted" ? D : n.status === "dirty" ? (i.dirty(), {
          status: "dirty",
          value: n.value
        }) : this._def.out._parseSync({
          data: n.value,
          path: r.path,
          parent: r
        });
      }
    }
    static create(t, i) {
      return new Jt({
        in: t,
        out: i,
        typeName: K.ZodPipeline
      });
    }
  }, mi = (t, i = {}, r) => t ? st.create().superRefine((n, s) => {
    var u, e;
    if (!t(n)) {
      const d = typeof i == "function" ? i(n) : typeof i == "string" ? { message: i } : i, y = (e = (u = d.fatal) !== null && u !== void 0 ? u : r) !== null && e !== void 0 ? e : !0, T = typeof d == "string" ? { message: d } : d;
      s.addIssue({ code: "custom", ...T, fatal: y });
    }
  }) : st.create(), Rl = {
    object: Y.lazycreate
  }, K;
  (function(t) {
    t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline";
  })(K || (K = {}));
  var bl = (t, i = {
    message: `Input not instance of ${t.name}`
  }) => mi((r) => r instanceof t, i), hi = Be.create, yi = ze.create, Al = Wt.create, Tl = Ze.create, Ei = mt.create, vl = nt.create, wl = Ot.create, Ll = ht.create, _l = yt.create, Cl = st.create, Sl = We.create, xl = Ve.create, Bl = Gt.create, kl = ke.create, Kl = Y.create, Ul = Y.strictCreate, Vl = Et.create, Dl = Cr.create, Pl = gt.create, Nl = De.create, Il = Ht.create, jl = zt.create, Fl = ot.create, ql = Rt.create, Ml = bt.create, $l = At.create, Ol = Je.create, Gl = Tt.create, Xl = pt.create, gi = _e.create, Hl = Pe.create, zl = Qe.create, Zl = _e.createWithPreprocess, Wl = Jt.create, Jl = () => hi().optional(), Ql = () => yi().optional(), Yl = () => Ei().optional(), ef = {
    string: (t) => Be.create({ ...t, coerce: !0 }),
    number: (t) => ze.create({ ...t, coerce: !0 }),
    boolean: (t) => mt.create({
      ...t,
      coerce: !0
    }),
    bigint: (t) => Ze.create({ ...t, coerce: !0 }),
    date: (t) => nt.create({ ...t, coerce: !0 })
  }, tf = D, h = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    defaultErrorMap: dt,
    setErrorMap: sl,
    getErrorMap: Ft,
    makeIssue: qt,
    EMPTY_PATH: al,
    addIssueToContext: C,
    ParseStatus: me,
    INVALID: D,
    DIRTY: li,
    OK: he,
    isAborted: Lr,
    isDirty: _r,
    isValid: Mt,
    isAsync: $t,
    get util() {
      return M;
    },
    get objectUtil() {
      return wr;
    },
    ZodParsedType: _,
    getParsedType: Oe,
    ZodType: N,
    ZodString: Be,
    ZodNumber: ze,
    ZodBigInt: Ze,
    ZodBoolean: mt,
    ZodDate: nt,
    ZodSymbol: Ot,
    ZodUndefined: ht,
    ZodNull: yt,
    ZodAny: st,
    ZodUnknown: We,
    ZodNever: Ve,
    ZodVoid: Gt,
    ZodArray: ke,
    ZodObject: Y,
    ZodUnion: Et,
    ZodDiscriminatedUnion: Cr,
    ZodIntersection: gt,
    ZodTuple: De,
    ZodRecord: Ht,
    ZodMap: zt,
    ZodSet: ot,
    ZodFunction: Rt,
    ZodLazy: bt,
    ZodLiteral: At,
    ZodEnum: Je,
    ZodNativeEnum: Tt,
    ZodPromise: pt,
    ZodEffects: _e,
    ZodTransformer: _e,
    ZodOptional: Pe,
    ZodNullable: Qe,
    ZodDefault: vt,
    ZodCatch: Zt,
    ZodNaN: Wt,
    BRAND: gl,
    ZodBranded: di,
    ZodPipeline: Jt,
    custom: mi,
    Schema: N,
    ZodSchema: N,
    late: Rl,
    get ZodFirstPartyTypeKind() {
      return K;
    },
    coerce: ef,
    any: Cl,
    array: kl,
    bigint: Tl,
    boolean: Ei,
    date: vl,
    discriminatedUnion: Dl,
    effect: gi,
    enum: Ol,
    function: ql,
    instanceof: bl,
    intersection: Pl,
    lazy: Ml,
    literal: $l,
    map: jl,
    nan: Al,
    nativeEnum: Gl,
    never: xl,
    null: _l,
    nullable: zl,
    number: yi,
    object: Kl,
    oboolean: Yl,
    onumber: Ql,
    optional: Hl,
    ostring: Jl,
    pipeline: Wl,
    preprocess: Zl,
    promise: Xl,
    record: Il,
    set: Fl,
    strictObject: Ul,
    string: hi,
    symbol: wl,
    transformer: gi,
    tuple: Nl,
    undefined: Ll,
    union: Vl,
    unknown: Sl,
    void: Bl,
    NEVER: tf,
    ZodIssueCode: v,
    quotelessJson: nl,
    ZodError: Le
  }), Qt = {};
  f(Qt, {
    assure: () => nf,
    is: () => rf,
    isObject: () => sf
  });
  var rf = (t, i) => i.safeParse(t).success, nf = (t, i) => t.parse(i), sf = (t) => typeof t == "object" && t !== null, af = bi, Ri = 128, of = 127, pf = ~of, uf = Math.pow(2, 31);
  function bi(t, i, r) {
    i = i || [], r = r || 0;
    for (var n = r; t >= uf; )
      i[r++] = t & 255 | Ri, t /= 128;
    for (; t & pf; )
      i[r++] = t & 255 | Ri, t >>>= 7;
    return i[r] = t | 0, bi.bytes = r - n + 1, i;
  }
  var lf = xr, ff = 128, Ai = 127;
  function xr(t, n) {
    var r = 0, n = n || 0, s = 0, u = n, e, d = t.length;
    do {
      if (u >= d)
        throw xr.bytes = 0, new RangeError("Could not decode varint");
      e = t[u++], r += s < 28 ? (e & Ai) << s : (e & Ai) * Math.pow(2, s), s += 7;
    } while (e >= ff);
    return xr.bytes = u - n, r;
  }
  var cf = Math.pow(2, 7), df = Math.pow(2, 14), mf = Math.pow(2, 21), hf = Math.pow(2, 28), yf = Math.pow(2, 35), Ef = Math.pow(2, 42), gf = Math.pow(2, 49), Rf = Math.pow(2, 56), bf = Math.pow(2, 63), Af = function(t) {
    return t < cf ? 1 : t < df ? 2 : t < mf ? 3 : t < hf ? 4 : t < yf ? 5 : t < Ef ? 6 : t < gf ? 7 : t < Rf ? 8 : t < bf ? 9 : 10;
  }, Tf = {
    encode: af,
    decode: lf,
    encodingLength: Af
  }, vf = Tf, Yt = vf, Br = (t, i = 0) => [
    Yt.decode(t, i),
    Yt.decode.bytes
  ], er = (t, i, r = 0) => (Yt.encode(t, i, r), i), tr = (t) => Yt.encodingLength(t), wf = (t, i) => {
    if (t === i)
      return !0;
    if (t.byteLength !== i.byteLength)
      return !1;
    for (let r = 0; r < t.byteLength; r++)
      if (t[r] !== i[r])
        return !1;
    return !0;
  }, rr = (t) => {
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
      return t;
    if (t instanceof ArrayBuffer)
      return new Uint8Array(t);
    if (ArrayBuffer.isView(t))
      return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
  }, Lf = (t) => new TextEncoder().encode(t), _f = (t) => new TextDecoder().decode(t), ir = (t, i) => {
    const r = i.byteLength, n = tr(t), s = n + tr(r), u = new Uint8Array(s + r);
    return er(t, u, 0), er(r, u, n), u.set(i, s), new kr(t, r, i, u);
  }, Cf = (t) => {
    const i = rr(t), [r, n] = Br(i), [s, u] = Br(i.subarray(n)), e = i.subarray(n + u);
    if (e.byteLength !== s)
      throw new Error("Incorrect length");
    return new kr(r, s, e, i);
  }, Sf = (t, i) => t === i ? !0 : t.code === i.code && t.size === i.size && wf(t.bytes, i.bytes), kr = class {
    constructor(t, i, r, n) {
      this.code = t, this.size = i, this.digest = r, this.bytes = n;
    }
  }, Ti = {};
  f(Ti, {
    base58btc: () => Ne,
    base58flickr: () => jf
  });
  function xf(t, i) {
    if (t.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
      r[n] = 255;
    for (var s = 0; s < t.length; s++) {
      var u = t.charAt(s), e = u.charCodeAt(0);
      if (r[e] !== 255)
        throw new TypeError(u + " is ambiguous");
      r[e] = s;
    }
    var d = t.length, y = t.charAt(0), T = Math.log(d) / Math.log(256), L = Math.log(256) / Math.log(d);
    function S(I) {
      if (I instanceof Uint8Array || (ArrayBuffer.isView(I) ? I = new Uint8Array(I.buffer, I.byteOffset, I.byteLength) : Array.isArray(I) && (I = Uint8Array.from(I))), !(I instanceof Uint8Array))
        throw new TypeError("Expected Uint8Array");
      if (I.length === 0)
        return "";
      for (var z = 0, H = 0, G = 0, ge = I.length; G !== ge && I[G] === 0; )
        G++, z++;
      for (var ye = (ge - G) * L + 1 >>> 0, $ = new Uint8Array(ye); G !== ge; ) {
        for (var le = I[G], Ge = 0, Ce = ye - 1; (le !== 0 || Ge < H) && Ce !== -1; Ce--, Ge++)
          le += 256 * $[Ce] >>> 0, $[Ce] = le % d >>> 0, le = le / d >>> 0;
        if (le !== 0)
          throw new Error("Non-zero carry");
        H = Ge, G++;
      }
      for (var Me = ye - H; Me !== ye && $[Me] === 0; )
        Me++;
      for (var dr = y.repeat(z); Me < ye; ++Me)
        dr += t.charAt($[Me]);
      return dr;
    }
    function X(I) {
      if (typeof I != "string")
        throw new TypeError("Expected String");
      if (I.length === 0)
        return new Uint8Array();
      var z = 0;
      if (I[z] !== " ") {
        for (var H = 0, G = 0; I[z] === y; )
          H++, z++;
        for (var ge = (I.length - z) * T + 1 >>> 0, ye = new Uint8Array(ge); I[z]; ) {
          var $ = r[I.charCodeAt(z)];
          if ($ === 255)
            return;
          for (var le = 0, Ge = ge - 1; ($ !== 0 || le < G) && Ge !== -1; Ge--, le++)
            $ += d * ye[Ge] >>> 0, ye[Ge] = $ % 256 >>> 0, $ = $ / 256 >>> 0;
          if ($ !== 0)
            throw new Error("Non-zero carry");
          G = le, z++;
        }
        if (I[z] !== " ") {
          for (var Ce = ge - G; Ce !== ge && ye[Ce] === 0; )
            Ce++;
          for (var Me = new Uint8Array(H + (ge - Ce)), dr = H; Ce !== ge; )
            Me[dr++] = ye[Ce++];
          return Me;
        }
      }
    }
    function ae(I) {
      var z = X(I);
      if (z)
        return z;
      throw new Error(`Non-${i} character`);
    }
    return {
      encode: S,
      decodeUnsafe: X,
      decode: ae
    };
  }
  var Bf = xf, kf = Bf, Kf = kf, Uf = class {
    constructor(t, i, r) {
      this.name = t, this.prefix = i, this.baseEncode = r;
    }
    encode(t) {
      if (t instanceof Uint8Array)
        return `${this.prefix}${this.baseEncode(t)}`;
      throw Error("Unknown type, must be binary type");
    }
  }, Vf = class {
    constructor(t, i, r) {
      if (this.name = t, this.prefix = i, i.codePointAt(0) === void 0)
        throw new Error("Invalid prefix character");
      this.prefixCodePoint = i.codePointAt(0), this.baseDecode = r;
    }
    decode(t) {
      if (typeof t == "string") {
        if (t.codePointAt(0) !== this.prefixCodePoint)
          throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        return this.baseDecode(t.slice(this.prefix.length));
      } else
        throw Error("Can only multibase decode strings");
    }
    or(t) {
      return vi(this, t);
    }
  }, Df = class {
    constructor(t) {
      this.decoders = t;
    }
    or(t) {
      return vi(this, t);
    }
    decode(t) {
      const i = t[0], r = this.decoders[i];
      if (r)
        return r.decode(t);
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }, vi = (t, i) => new Df({
    ...t.decoders || { [t.prefix]: t },
    ...i.decoders || { [i.prefix]: i }
  }), Pf = class {
    constructor(t, i, r, n) {
      this.name = t, this.prefix = i, this.baseEncode = r, this.baseDecode = n, this.encoder = new Uf(t, i, r), this.decoder = new Vf(t, i, n);
    }
    encode(t) {
      return this.encoder.encode(t);
    }
    decode(t) {
      return this.decoder.decode(t);
    }
  }, nr = ({ name: t, prefix: i, encode: r, decode: n }) => new Pf(t, i, r, n), wt = ({ prefix: t, name: i, alphabet: r }) => {
    const { encode: n, decode: s } = Kf(r, i);
    return nr({
      prefix: t,
      name: i,
      encode: n,
      decode: (u) => rr(s(u))
    });
  }, Nf = (t, i, r, n) => {
    const s = {};
    for (let L = 0; L < i.length; ++L)
      s[i[L]] = L;
    let u = t.length;
    for (; t[u - 1] === "="; )
      --u;
    const e = new Uint8Array(u * r / 8 | 0);
    let d = 0, y = 0, T = 0;
    for (let L = 0; L < u; ++L) {
      const S = s[t[L]];
      if (S === void 0)
        throw new SyntaxError(`Non-${n} character`);
      y = y << r | S, d += r, d >= 8 && (d -= 8, e[T++] = 255 & y >> d);
    }
    if (d >= r || 255 & y << 8 - d)
      throw new SyntaxError("Unexpected end of data");
    return e;
  }, If = (t, i, r) => {
    const n = i[i.length - 1] === "=", s = (1 << r) - 1;
    let u = "", e = 0, d = 0;
    for (let y = 0; y < t.length; ++y)
      for (d = d << 8 | t[y], e += 8; e > r; )
        e -= r, u += i[s & d >> e];
    if (e && (u += i[s & d << r - e]), n)
      for (; u.length * r & 7; )
        u += "=";
    return u;
  }, pe = ({ name: t, prefix: i, bitsPerChar: r, alphabet: n }) => nr({
    prefix: i,
    name: t,
    encode(s) {
      return If(s, n, r);
    },
    decode(s) {
      return Nf(s, n, r, t);
    }
  }), Ne = wt({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  }), jf = wt({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  }), wi = {};
  f(wi, {
    base32: () => Lt,
    base32hex: () => $f,
    base32hexpad: () => Gf,
    base32hexpadupper: () => Xf,
    base32hexupper: () => Of,
    base32pad: () => qf,
    base32padupper: () => Mf,
    base32upper: () => Ff,
    base32z: () => Hf
  });
  var Lt = pe({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  }), Ff = pe({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  }), qf = pe({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  }), Mf = pe({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  }), $f = pe({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  }), Of = pe({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  }), Gf = pe({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  }), Xf = pe({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  }), Hf = pe({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  }), Q = class {
    constructor(t, i, r, n) {
      this.code = i, this.version = t, this.multihash = r, this.bytes = n, this.byteOffset = n.byteOffset, this.byteLength = n.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, {
        byteOffset: ar,
        byteLength: ar,
        code: sr,
        version: sr,
        multihash: sr,
        bytes: sr,
        _baseCache: ar,
        asCID: ar
      });
    }
    toV0() {
      switch (this.version) {
        case 0:
          return this;
        default: {
          const { code: t, multihash: i } = this;
          if (t !== _t)
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          if (i.code !== Jf)
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          return Q.createV0(i);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: t, digest: i } = this.multihash, r = ir(t, i);
          return Q.createV1(this.code, r);
        }
        case 1:
          return this;
        default:
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
    equals(t) {
      return t && this.code === t.code && this.version === t.version && Sf(this.multihash, t.multihash);
    }
    toString(t) {
      const { bytes: i, version: r, _baseCache: n } = this;
      switch (r) {
        case 0:
          return Zf(i, n, t || Ne.encoder);
        default:
          return Wf(i, n, t || Lt.encoder);
      }
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes
      };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(t) {
      return Yf(/^0\.0/, ec), !!(t && (t[_i] || t.asCID === t));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(t) {
      if (t instanceof Q)
        return t;
      if (t != null && t.asCID === t) {
        const { version: i, code: r, multihash: n, bytes: s } = t;
        return new Q(i, r, n, s || Li(i, r, n.bytes));
      } else if (t != null && t[_i] === !0) {
        const { version: i, multihash: r, code: n } = t, s = Cf(r);
        return Q.create(i, n, s);
      } else
        return null;
    }
    static create(t, i, r) {
      if (typeof i != "number")
        throw new Error("String codecs are no longer supported");
      switch (t) {
        case 0: {
          if (i !== _t)
            throw new Error(`Version 0 CID must use dag-pb (code: ${_t}) block encoding`);
          return new Q(t, i, r, r.bytes);
        }
        case 1: {
          const n = Li(t, i, r.bytes);
          return new Q(t, i, r, n);
        }
        default:
          throw new Error("Invalid version");
      }
    }
    static createV0(t) {
      return Q.create(0, _t, t);
    }
    static createV1(t, i) {
      return Q.create(1, t, i);
    }
    static decode(t) {
      const [i, r] = Q.decodeFirst(t);
      if (r.length)
        throw new Error("Incorrect length");
      return i;
    }
    static decodeFirst(t) {
      const i = Q.inspectBytes(t), r = i.size - i.multihashSize, n = rr(t.subarray(r, r + i.multihashSize));
      if (n.byteLength !== i.multihashSize)
        throw new Error("Incorrect length");
      const s = n.subarray(i.multihashSize - i.digestSize), u = new kr(i.multihashCode, i.digestSize, s, n);
      return [
        i.version === 0 ? Q.createV0(u) : Q.createV1(i.codec, u),
        t.subarray(i.size)
      ];
    }
    static inspectBytes(t) {
      let i = 0;
      const r = () => {
        const [L, S] = Br(t.subarray(i));
        return i += S, L;
      };
      let n = r(), s = _t;
      if (n === 18 ? (n = 0, i = 0) : n === 1 && (s = r()), n !== 0 && n !== 1)
        throw new RangeError(`Invalid CID version ${n}`);
      const u = i, e = r(), d = r(), y = i + d, T = y - u;
      return {
        version: n,
        codec: s,
        multihashCode: e,
        digestSize: d,
        multihashSize: T,
        size: y
      };
    }
    static parse(t, i) {
      const [r, n] = zf(t, i), s = Q.decode(n);
      return s._baseCache.set(r, t), s;
    }
  }, zf = (t, i) => {
    switch (t[0]) {
      case "Q": {
        const r = i || Ne;
        return [
          Ne.prefix,
          r.decode(`${Ne.prefix}${t}`)
        ];
      }
      case Ne.prefix: {
        const r = i || Ne;
        return [
          Ne.prefix,
          r.decode(t)
        ];
      }
      case Lt.prefix: {
        const r = i || Lt;
        return [
          Lt.prefix,
          r.decode(t)
        ];
      }
      default: {
        if (i == null)
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        return [
          t[0],
          i.decode(t)
        ];
      }
    }
  }, Zf = (t, i, r) => {
    const { prefix: n } = r;
    if (n !== Ne.prefix)
      throw Error(`Cannot string encode V0 in ${r.name} encoding`);
    const s = i.get(n);
    if (s == null) {
      const u = r.encode(t).slice(1);
      return i.set(n, u), u;
    } else
      return s;
  }, Wf = (t, i, r) => {
    const { prefix: n } = r, s = i.get(n);
    if (s == null) {
      const u = r.encode(t);
      return i.set(n, u), u;
    } else
      return s;
  }, _t = 112, Jf = 18, Li = (t, i, r) => {
    const n = tr(t), s = n + tr(i), u = new Uint8Array(s + r.byteLength);
    return er(t, u, 0), er(i, u, n), u.set(r, s), u;
  }, _i = Symbol.for("@ipld/js-cid/CID"), sr = {
    writable: !1,
    configurable: !1,
    enumerable: !0
  }, ar = {
    writable: !1,
    enumerable: !1,
    configurable: !1
  }, Qf = "0.0.0-dev", Yf = (t, i) => {
    if (t.test(Qf))
      console.warn(i);
    else
      throw new Error(i);
  }, ec = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`, Ci = {};
  f(Ci, {
    identity: () => tc
  });
  var tc = nr({
    prefix: "\0",
    name: "identity",
    encode: (t) => _f(t),
    decode: (t) => Lf(t)
  }), Si = {};
  f(Si, {
    base2: () => rc
  });
  var rc = pe({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
  }), xi = {};
  f(xi, {
    base8: () => ic
  });
  var ic = pe({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
  }), Bi = {};
  f(Bi, {
    base10: () => nc
  });
  var nc = wt({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
  }), ki = {};
  f(ki, {
    base16: () => sc,
    base16upper: () => ac
  });
  var sc = pe({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
  }), ac = pe({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
  }), Ki = {};
  f(Ki, {
    base36: () => oc,
    base36upper: () => pc
  });
  var oc = wt({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
  }), pc = wt({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }), Ui = {};
  f(Ui, {
    base64: () => uc,
    base64pad: () => lc,
    base64url: () => fc,
    base64urlpad: () => cc
  });
  var uc = pe({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  }), lc = pe({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  }), fc = pe({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  }), cc = pe({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  }), Vi = {};
  f(Vi, {
    base256emoji: () => Ec
  });
  var Di = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), dc = Di.reduce((t, i, r) => (t[r] = i, t), []), mc = Di.reduce((t, i, r) => (t[i.codePointAt(0)] = r, t), []);
  function hc(t) {
    return t.reduce((i, r) => (i += dc[r], i), "");
  }
  function yc(t) {
    const i = [];
    for (const r of t) {
      const n = mc[r.codePointAt(0)];
      if (n === void 0)
        throw new Error(`Non-base256emoji character: ${r}`);
      i.push(n);
    }
    return new Uint8Array(i);
  }
  var Ec = nr({
    prefix: "🚀",
    name: "base256emoji",
    encode: hc,
    decode: yc
  }), Pi = {};
  f(Pi, {
    sha256: () => Rc,
    sha512: () => bc
  });
  var Ni = ({ name: t, code: i, encode: r }) => new gc(t, i, r), gc = class {
    constructor(t, i, r) {
      this.name = t, this.code = i, this.encode = r;
    }
    digest(t) {
      if (t instanceof Uint8Array) {
        const i = this.encode(t);
        return i instanceof Uint8Array ? ir(this.code, i) : i.then((r) => ir(this.code, r));
      } else
        throw Error("Unknown type, must be binary type");
    }
  }, Ii = (t) => async (i) => new Uint8Array(await crypto.subtle.digest(t, i)), Rc = Ni({
    name: "sha2-256",
    code: 18,
    encode: Ii("SHA-256")
  }), bc = Ni({
    name: "sha2-512",
    code: 19,
    encode: Ii("SHA-512")
  }), ji = {};
  f(ji, {
    identity: () => vc
  });
  var Fi = 0, Ac = "identity", qi = rr, Tc = (t) => ir(Fi, qi(t)), vc = {
    code: Fi,
    name: Ac,
    encode: qi,
    digest: Tc
  };
  new TextEncoder(), new TextDecoder();
  var Mi = {
    ...Ci,
    ...Si,
    ...xi,
    ...Bi,
    ...ki,
    ...wi,
    ...Ki,
    ...Ti,
    ...Ui,
    ...Vi
  };
  ({
    ...Pi,
    ...ji
  });
  function $i(t, i, r, n) {
    return {
      name: t,
      prefix: i,
      encoder: {
        name: t,
        prefix: i,
        encode: r
      },
      decoder: { decode: n }
    };
  }
  var Oi = $i("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), Kr = $i("ascii", "a", (t) => {
    let i = "a";
    for (let r = 0; r < t.length; r++)
      i += String.fromCharCode(t[r]);
    return i;
  }, (t) => {
    t = t.substring(1);
    const i = new Uint8Array(t.length);
    for (let r = 0; r < t.length; r++)
      i[r] = t.charCodeAt(r);
    return i;
  }), wc = {
    utf8: Oi,
    "utf-8": Oi,
    hex: Mi.base16,
    latin1: Kr,
    ascii: Kr,
    binary: Kr,
    ...Mi
  }, Gi = wc;
  function Lc(t, i = "utf8") {
    const r = Gi[i];
    if (!r)
      throw new Error(`Unsupported encoding "${i}"`);
    return r.decoder.decode(`${r.prefix}${t}`);
  }
  function _c(t, i = "utf8") {
    const r = Gi[i];
    if (!r)
      throw new Error(`Unsupported encoding "${i}"`);
    return r.encoder.encode(t).substring(1);
  }
  var Ur = (t) => {
    if (Array.isArray(t))
      return t.map((i) => Ur(i));
    if (t && typeof t == "object") {
      if (typeof t.$link == "string" && Object.keys(t).length === 1)
        return Q.parse(t.$link);
      if (typeof t.$bytes == "string" && Object.keys(t).length === 1)
        return Lc(t.$bytes, "base64");
      const i = {};
      for (const r of Object.keys(t))
        i[r] = Ur(t[r]);
      return i;
    }
    return t;
  }, or = (t) => {
    if (Array.isArray(t))
      return t.map((i) => or(i));
    if (t && typeof t == "object") {
      if (t instanceof Uint8Array)
        return {
          $bytes: _c(t, "base64")
        };
      if (Q.asCID(t))
        return {
          $link: t.toString()
        };
      const i = {};
      for (const r of Object.keys(t))
        i[r] = or(t[r]);
      return i;
    }
    return t;
  }, Cc = h.any().refine((t) => Q.asCID(t) !== null, {
    message: "Not a CID"
  }).transform((t) => Q.asCID(t)), Sc = {
    cid: Cc,
    bytes: h.instanceof(Uint8Array),
    string: h.string(),
    array: h.array(h.unknown()),
    map: h.record(h.string(), h.unknown()),
    unknown: h.unknown()
  }, xc = V(ee()), Xi = (t) => new TextEncoder().encode(t).byteLength, Vr = (t) => new xc.default().countGraphemes(t), Bc = (t) => {
    const i = t.match(Hi);
    if (!i?.groups)
      return null;
    const r = i.groups;
    return {
      grandfathered: r.grandfathered,
      language: r.language,
      extlang: r.extlang,
      script: r.script,
      region: r.region,
      variant: r.variant,
      extension: r.extension,
      privateUse: r.privateUseA || r.privateUseB
    };
  }, kc = (t) => Hi.test(t), Hi = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUseA>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUseB>x(-[A-Za-z0-9]{1,8})+))$/, Kc = (t) => jc.safeParse(t).success, Uc = (t) => {
    const i = t.id;
    if (typeof i != "string")
      throw new Error("No `id` on document");
    return i;
  }, Vc = (t) => Dc(t, {
    id: "#atproto_pds",
    type: "AtprotoPersonalDataServer"
  }), Dc = (t, i) => {
    const r = Uc(t);
    let n = t.service;
    if (!n || typeof n != "object")
      return;
    Array.isArray(n) || (n = [n]);
    const s = n.find((u) => u.id === i.id || u.id === `${r}${i.id}`);
    if (s && s.type === i.type && typeof s.serviceEndpoint == "string")
      return Pc(s.serviceEndpoint);
  }, Pc = (t) => {
    let i;
    try {
      i = new URL(t);
    } catch {
      return;
    }
    if (["http:", "https:"].includes(i.protocol))
      return i.hostname ? t : void 0;
  }, Nc = h.object({
    id: h.string(),
    type: h.string(),
    controller: h.string(),
    publicKeyMultibase: h.string().optional()
  }), Ic = h.object({
    id: h.string(),
    type: h.string(),
    serviceEndpoint: h.union([h.string(), h.record(h.unknown())])
  }), jc = h.object({
    id: h.string(),
    alsoKnownAs: h.array(h.string()).optional(),
    verificationMethod: h.array(Nc).optional(),
    service: h.array(Ic).optional()
  }), Fc = V(j());
  function qc(t, i) {
    try {
      if (!(0, Fc.isValidISODateString)(i))
        throw new Error();
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be an valid atproto datetime (both RFC-3339 and ISO-8601)`)
      };
    }
    return { success: !0, value: i };
  }
  function Mc(t, i) {
    return i.match(/^\w+:(?:\/\/)?[^\s/][^\s]*$/) !== null ? { success: !0, value: i } : {
      success: !1,
      error: new U(`${t} must be a uri`)
    };
  }
  function $c(t, i) {
    try {
      jt(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid at-uri`)
      };
    }
    return { success: !0, value: i };
  }
  function zi(t, i) {
    try {
      Ae(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid did`)
      };
    }
    return { success: !0, value: i };
  }
  function Zi(t, i) {
    try {
      se(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid handle`)
      };
    }
    return { success: !0, value: i };
  }
  function Oc(t, i) {
    return !zi(t, i).success && !Zi(t, i).success ? {
      success: !1,
      error: new U(`${t} must be a valid did or a handle`)
    } : { success: !0, value: i };
  }
  function Gc(t, i) {
    try {
      Te(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid nsid`)
      };
    }
    return { success: !0, value: i };
  }
  function Xc(t, i) {
    try {
      Q.parse(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a cid string`)
      };
    }
    return { success: !0, value: i };
  }
  function Hc(t, i) {
    return kc(i) ? { success: !0, value: i } : {
      success: !1,
      error: new U(`${t} must be a well-formed BCP 47 language tag`)
    };
  }
  function zc(t, i, r, n) {
    switch (r.type) {
      case "boolean":
        return Wi(t, i, r, n);
      case "integer":
        return Ji(t, i, r, n);
      case "string":
        return Qi(t, i, r, n);
      case "bytes":
        return Yi(t, i, r, n);
      case "cid-link":
        return en(t, i, r, n);
      case "unknown":
        return tn(t, i, r, n);
      default:
        return {
          success: !1,
          error: new U(`Unexpected lexicon type: ${r.type}`)
        };
    }
  }
  function Wi(t, i, r, n) {
    r = r;
    const s = typeof n;
    return s === "undefined" ? typeof r.default == "boolean" ? { success: !0, value: r.default } : {
      success: !1,
      error: new U(`${i} must be a boolean`)
    } : s !== "boolean" ? {
      success: !1,
      error: new U(`${i} must be a boolean`)
    } : typeof r.const == "boolean" && n !== r.const ? {
      success: !1,
      error: new U(`${i} must be ${r.const}`)
    } : { success: !0, value: n };
  }
  function Ji(t, i, r, n) {
    return r = r, typeof n === "undefined" ? typeof r.default == "number" ? { success: !0, value: r.default } : {
      success: !1,
      error: new U(`${i} must be an integer`)
    } : Number.isInteger(n) ? typeof r.const == "number" && n !== r.const ? {
      success: !1,
      error: new U(`${i} must be ${r.const}`)
    } : Array.isArray(r.enum) && !r.enum.includes(n) ? {
      success: !1,
      error: new U(`${i} must be one of (${r.enum.join("|")})`)
    } : typeof r.maximum == "number" && n > r.maximum ? {
      success: !1,
      error: new U(`${i} can not be greater than ${r.maximum}`)
    } : typeof r.minimum == "number" && n < r.minimum ? {
      success: !1,
      error: new U(`${i} can not be less than ${r.minimum}`)
    } : { success: !0, value: n } : {
      success: !1,
      error: new U(`${i} must be an integer`)
    };
  }
  function Qi(t, i, r, n) {
    if (r = r, typeof n > "u")
      return typeof r.default == "string" ? { success: !0, value: r.default } : {
        success: !1,
        error: new U(`${i} must be a string`)
      };
    if (typeof n != "string")
      return {
        success: !1,
        error: new U(`${i} must be a string`)
      };
    if (typeof r.const == "string" && n !== r.const)
      return {
        success: !1,
        error: new U(`${i} must be ${r.const}`)
      };
    if (Array.isArray(r.enum) && !r.enum.includes(n))
      return {
        success: !1,
        error: new U(`${i} must be one of (${r.enum.join("|")})`)
      };
    if (typeof r.maxLength == "number" && Xi(n) > r.maxLength)
      return {
        success: !1,
        error: new U(`${i} must not be longer than ${r.maxLength} characters`)
      };
    if (typeof r.minLength == "number" && Xi(n) < r.minLength)
      return {
        success: !1,
        error: new U(`${i} must not be shorter than ${r.minLength} characters`)
      };
    if (typeof r.maxGraphemes == "number" && Vr(n) > r.maxGraphemes)
      return {
        success: !1,
        error: new U(`${i} must not be longer than ${r.maxGraphemes} graphemes`)
      };
    if (typeof r.minGraphemes == "number" && Vr(n) < r.minGraphemes)
      return {
        success: !1,
        error: new U(`${i} must not be shorter than ${r.minGraphemes} graphemes`)
      };
    if (typeof r.format == "string")
      switch (r.format) {
        case "datetime":
          return qc(i, n);
        case "uri":
          return Mc(i, n);
        case "at-uri":
          return $c(i, n);
        case "did":
          return zi(i, n);
        case "handle":
          return Zi(i, n);
        case "at-identifier":
          return Oc(i, n);
        case "nsid":
          return Gc(i, n);
        case "cid":
          return Xc(i, n);
        case "language":
          return Hc(i, n);
      }
    return { success: !0, value: n };
  }
  function Yi(t, i, r, n) {
    return r = r, !n || !(n instanceof Uint8Array) ? {
      success: !1,
      error: new U(`${i} must be a byte array`)
    } : typeof r.maxLength == "number" && n.byteLength > r.maxLength ? {
      success: !1,
      error: new U(`${i} must not be larger than ${r.maxLength} bytes`)
    } : typeof r.minLength == "number" && n.byteLength < r.minLength ? {
      success: !1,
      error: new U(`${i} must not be smaller than ${r.minLength} bytes`)
    } : { success: !0, value: n };
  }
  function en(t, i, r, n) {
    return Q.asCID(n) === null ? {
      success: !1,
      error: new U(`${i} must be a CID`)
    } : { success: !0, value: n };
  }
  function tn(t, i, r, n) {
    return !n || typeof n != "object" ? {
      success: !1,
      error: new U(`${i} must be an object`)
    } : { success: !0, value: n };
  }
  var rn = h.object({
    $type: h.literal("blob"),
    ref: Sc.cid,
    mimeType: h.string(),
    size: h.number()
  }).strict(), Zc = h.object({
    cid: h.string(),
    mimeType: h.string()
  }).strict(), nn = h.union([rn, Zc]), Ye = class {
    constructor(t, i, r, n) {
      this.ref = t, this.mimeType = i, this.size = r, this.original = n ?? {
        $type: "blob",
        ref: t,
        mimeType: i,
        size: r
      };
    }
    static asBlobRef(t) {
      return Qt.is(t, nn) ? Ye.fromJsonRef(t) : null;
    }
    static fromJsonRef(t) {
      return Qt.is(t, rn) ? new Ye(t.ref, t.mimeType, t.size) : new Ye(Q.parse(t.cid), t.mimeType, -1, t);
    }
    ipld() {
      return {
        $type: "blob",
        ref: this.ref,
        mimeType: this.mimeType,
        size: this.size
      };
    }
    toJSON() {
      return or(this.ipld());
    }
  };
  function Wc(t, i, r, n) {
    return !n || !(n instanceof Ye) ? {
      success: !1,
      error: new U(`${i} should be a blob ref`)
    } : { success: !0, value: n };
  }
  function Jc(t, i, r, n) {
    switch (r.type) {
      case "boolean":
        return Wi(t, i, r, n);
      case "integer":
        return Ji(t, i, r, n);
      case "string":
        return Qi(t, i, r, n);
      case "bytes":
        return Yi(t, i, r, n);
      case "cid-link":
        return en(t, i, r, n);
      case "unknown":
        return tn(t, i, r, n);
      case "object":
        return Ct(t, i, r, n);
      case "array":
        return sn(t, i, r, n);
      case "blob":
        return Wc(t, i, r, n);
      default:
        return {
          success: !1,
          error: new U(`Unexpected lexicon type: ${r.type}`)
        };
    }
  }
  function sn(t, i, r, n) {
    if (!Array.isArray(n))
      return {
        success: !1,
        error: new U(`${i} must be an array`)
      };
    if (typeof r.maxLength == "number" && n.length > r.maxLength)
      return {
        success: !1,
        error: new U(`${i} must not have more than ${r.maxLength} elements`)
      };
    if (typeof r.minLength == "number" && n.length < r.minLength)
      return {
        success: !1,
        error: new U(`${i} must not have fewer than ${r.minLength} elements`)
      };
    const s = r.items;
    for (let u = 0; u < n.length; u++) {
      const e = n[u], d = `${i}/${u}`, y = Dr(t, d, s, e);
      if (!y.success)
        return y;
    }
    return { success: !0, value: n };
  }
  function Ct(t, i, r, n) {
    if (r = r, !n || typeof n != "object")
      return {
        success: !1,
        error: new U(`${i} must be an object`)
      };
    const s = new Set(r.required), u = new Set(r.nullable);
    let e = n;
    if (typeof r.properties == "object")
      for (const d in r.properties) {
        if (n[d] === null && u.has(d))
          continue;
        const y = r.properties[d], T = `${i}/${d}`, L = Dr(t, T, y, n[d]), S = L.success ? L.value : n[d], X = typeof S > "u";
        if (X && s.has(d))
          return {
            success: !1,
            error: new U(`${i} must have the property "${d}"`)
          };
        if (!X && !L.success)
          return L;
        S !== n[d] && (e === n && (e = { ...n }), e[d] = S);
      }
    return { success: !0, value: e };
  }
  function ue(t, i) {
    if (t.split("#").length > 2)
      throw new Error("Uri can only have one hash segment");
    if (t.startsWith("lex:"))
      return t;
    if (t.startsWith("#")) {
      if (!i)
        throw new Error(`Unable to resolve uri without anchor: ${t}`);
      return `${i}${t}`;
    }
    return `lex:${t}`;
  }
  function Dr(t, i, r, n, s = !1) {
    let u, e;
    if (r.type === "union") {
      if (!cd(n))
        return {
          success: !1,
          error: new U(`${i} must be an object which includes the "$type" property`)
        };
      if (Qc(r.refs, n.$type))
        e = an(t, {
          type: "ref",
          ref: n.$type
        });
      else
        return r.closed ? {
          success: !1,
          error: new U(`${i} $type must be one of ${r.refs.join(", ")}`)
        } : { success: !0, value: n };
    } else
      e = an(t, r);
    for (const d of e) {
      const y = s ? Ct(t, i, d, n) : Jc(t, i, d, n);
      if (y.success)
        return y;
      u ?? (u = y.error);
    }
    return e.length > 1 ? {
      success: !1,
      error: new U(`${i} did not match any of the expected definitions`)
    } : { success: !1, error: u };
  }
  function Pr(t, i, r, n, s = !1) {
    const u = Dr(t, i, r, n, s);
    if (!u.success)
      throw u.error;
    return u.value;
  }
  function an(t, i) {
    return i.type === "ref" ? [t.getDefOrThrow(i.ref)] : i.type === "union" ? i.refs.map((r) => t.getDefOrThrow(r)).flat() : [i];
  }
  function on(t, i) {
    if (t.required !== void 0) {
      if (!Array.isArray(t.required)) {
        i.addIssue({
          code: h.ZodIssueCode.invalid_type,
          received: typeof t.required,
          expected: "array"
        });
        return;
      }
      if (t.properties === void 0) {
        t.required.length > 0 && i.addIssue({
          code: h.ZodIssueCode.custom,
          message: "Required fields defined but no properties defined"
        });
        return;
      }
      for (const r of t.required)
        t.properties[r] === void 0 && i.addIssue({
          code: h.ZodIssueCode.custom,
          message: `Required field "${r}" not defined`
        });
    }
  }
  var Qc = (t, i) => {
    const r = ue(i);
    return t.includes(r) ? !0 : r.endsWith("#main") ? t.includes(r.replace("#main", "")) : t.includes(r + "#main");
  }, pn = h.object({
    type: h.literal("boolean"),
    description: h.string().optional(),
    default: h.boolean().optional(),
    const: h.boolean().optional()
  }).strict(), un = h.object({
    type: h.literal("integer"),
    description: h.string().optional(),
    default: h.number().int().optional(),
    minimum: h.number().int().optional(),
    maximum: h.number().int().optional(),
    enum: h.number().int().array().optional(),
    const: h.number().int().optional()
  }).strict(), Yc = h.enum([
    "datetime",
    "uri",
    "at-uri",
    "did",
    "handle",
    "at-identifier",
    "nsid",
    "cid",
    "language"
  ]), ln = h.object({
    type: h.literal("string"),
    format: Yc.optional(),
    description: h.string().optional(),
    default: h.string().optional(),
    minLength: h.number().int().optional(),
    maxLength: h.number().int().optional(),
    minGraphemes: h.number().int().optional(),
    maxGraphemes: h.number().int().optional(),
    enum: h.string().array().optional(),
    const: h.string().optional(),
    knownValues: h.string().array().optional()
  }).strict(), fn = h.object({
    type: h.literal("unknown"),
    description: h.string().optional()
  }).strict(), pr = h.discriminatedUnion("type", [
    pn,
    un,
    ln,
    fn
  ]), cn = h.object({
    type: h.literal("bytes"),
    description: h.string().optional(),
    maxLength: h.number().optional(),
    minLength: h.number().optional()
  }).strict(), dn = h.object({
    type: h.literal("cid-link"),
    description: h.string().optional()
  }).strict(), mn = h.discriminatedUnion("type", [cn, dn]), ed = h.object({
    type: h.literal("ref"),
    description: h.string().optional(),
    ref: h.string()
  }).strict(), td = h.object({
    type: h.literal("union"),
    description: h.string().optional(),
    refs: h.string().array(),
    closed: h.boolean().optional()
  }).strict(), ur = h.discriminatedUnion("type", [ed, td]), Nr = h.object({
    type: h.literal("blob"),
    description: h.string().optional(),
    accept: h.string().array().optional(),
    maxSize: h.number().optional()
  }).strict(), Ir = h.object({
    type: h.literal("array"),
    description: h.string().optional(),
    items: h.union([pr, mn, Nr, ur]),
    minLength: h.number().int().optional(),
    maxLength: h.number().int().optional()
  }).strict(), rd = Ir.merge(h.object({
    items: pr
  }).strict()), id = h.object({
    type: h.literal("token"),
    description: h.string().optional()
  }).strict(), lr = h.object({
    type: h.literal("object"),
    description: h.string().optional(),
    required: h.string().array().optional(),
    nullable: h.string().array().optional(),
    properties: h.record(h.union([ur, mn, Ir, Nr, pr]))
  }).strict().superRefine(on), jr = h.object({
    type: h.literal("params"),
    description: h.string().optional(),
    required: h.string().array().optional(),
    properties: h.record(h.union([pr, rd]))
  }).strict().superRefine(on), Fr = h.object({
    description: h.string().optional(),
    encoding: h.string(),
    schema: h.union([ur, lr]).optional()
  }).strict(), nd = h.object({
    description: h.string().optional(),
    schema: h.union([ur, lr]).optional()
  }).strict(), qr = h.object({
    name: h.string(),
    description: h.string().optional()
  }).strict(), sd = h.object({
    type: h.literal("query"),
    description: h.string().optional(),
    parameters: jr.optional(),
    output: Fr.optional(),
    errors: qr.array().optional()
  }).strict(), ad = h.object({
    type: h.literal("procedure"),
    description: h.string().optional(),
    parameters: jr.optional(),
    input: Fr.optional(),
    output: Fr.optional(),
    errors: qr.array().optional()
  }).strict(), od = h.object({
    type: h.literal("subscription"),
    description: h.string().optional(),
    parameters: jr.optional(),
    message: nd.optional(),
    errors: qr.array().optional()
  }).strict(), pd = h.object({
    type: h.literal("record"),
    description: h.string().optional(),
    key: h.string().optional(),
    record: lr
  }).strict(), ud = h.custom((t) => {
    if (!(!t || typeof t != "object") && t.type !== void 0)
      switch (t.type) {
        case "record":
          return pd.parse(t);
        case "query":
          return sd.parse(t);
        case "procedure":
          return ad.parse(t);
        case "subscription":
          return od.parse(t);
        case "blob":
          return Nr.parse(t);
        case "array":
          return Ir.parse(t);
        case "token":
          return id.parse(t);
        case "object":
          return lr.parse(t);
        case "boolean":
          return pn.parse(t);
        case "integer":
          return un.parse(t);
        case "string":
          return ln.parse(t);
        case "bytes":
          return cn.parse(t);
        case "cid-link":
          return dn.parse(t);
        case "unknown":
          return fn.parse(t);
      }
  }, (t) => !t || typeof t != "object" ? {
    message: "Must be an object",
    fatal: !0
  } : t.type === void 0 ? {
    message: "Must have a type",
    fatal: !0
  } : {
    message: `Invalid type: ${t.type} must be one of: record, query, procedure, subscription, blob, array, token, object, boolean, integer, string, bytes, cid-link, unknown`,
    fatal: !0
  });
  h.object({
    lexicon: h.literal(1),
    id: h.string().refine((t) => Ue.isValid(t), {
      message: "Must be a valid NSID"
    }),
    revision: h.number().optional(),
    description: h.string().optional(),
    defs: h.record(ud)
  }).strict().superRefine((t, i) => {
    for (const r in t.defs) {
      const n = t.defs[r];
      r !== "main" && (n.type === "record" || n.type === "procedure" || n.type === "query" || n.type === "subscription") && i.addIssue({
        code: h.ZodIssueCode.custom,
        message: "Records, procedures, queries, and subscriptions must be the main definition."
      });
    }
  });
  function hn(t) {
    return t !== null && typeof t == "object";
  }
  function ld(t, i) {
    return i in t;
  }
  var fd = h.object({ $type: h.string() });
  function cd(t) {
    return fd.safeParse(t).success;
  }
  var U = class extends Error {
  }, yn = class extends Error {
  }, dd = class extends Error {
  };
  function md(t, i, r, n) {
    const s = n && typeof n == "object" ? n : {}, u = new Set(r.required ?? []);
    let e = s;
    if (typeof r.properties == "object")
      for (const d in r.properties) {
        const y = r.properties[d], T = y.type === "array" ? sn(t, d, y, s[d]) : zc(t, d, y, s[d]), L = T.success ? T.value : s[d], S = typeof L > "u";
        if (S && u.has(d))
          return {
            success: !1,
            error: new U(`${i} must have the property "${d}"`)
          };
        if (!S && !T.success)
          return T;
        L !== s[d] && (e === s && (e = { ...s }), e[d] = L);
      }
    return { success: !0, value: e };
  }
  function hd(t, i, r) {
    const n = Ct(t, "Record", i.record, r);
    if (!n.success)
      throw n.error;
    return n.value;
  }
  function yd(t, i, r) {
    if (i.parameters) {
      const n = md(t, "Params", i.parameters, r);
      if (!n.success)
        throw n.error;
      return n.value;
    }
  }
  function Ed(t, i, r) {
    if (i.input?.schema)
      return Pr(t, "Input", i.input.schema, r, !0);
  }
  function gd(t, i, r) {
    if (i.output?.schema)
      return Pr(t, "Output", i.output.schema, r, !0);
  }
  function Rd(t, i, r) {
    if (i.message?.schema)
      return Pr(t, "Message", i.message.schema, r, !0);
  }
  var En = class {
    constructor(t) {
      if (this.docs = /* @__PURE__ */ new Map(), this.defs = /* @__PURE__ */ new Map(), t?.length)
        for (const i of t)
          this.add(i);
    }
    add(t) {
      const i = ue(t.id);
      if (this.docs.has(i))
        throw new Error(`${i} has already been registered`);
      Mr(t, i), this.docs.set(i, t);
      for (const [r, n] of gn(t))
        this.defs.set(r, n);
    }
    remove(t) {
      t = ue(t);
      const i = this.docs.get(t);
      if (!i)
        throw new Error(`Unable to remove "${t}": does not exist`);
      for (const [r, n] of gn(i))
        this.defs.delete(r);
      this.docs.delete(t);
    }
    get(t) {
      return t = ue(t), this.docs.get(t);
    }
    getDef(t) {
      return t = ue(t), this.defs.get(t);
    }
    getDefOrThrow(t, i) {
      const r = this.getDef(t);
      if (!r)
        throw new dd(`Lexicon not found: ${t}`);
      if (i && !i.includes(r.type))
        throw new yn(`Not a ${i.join(" or ")} lexicon: ${t}`);
      return r;
    }
    validate(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, ["record", "object"]);
      if (!hn(i))
        throw new U("Value must be an object");
      if (r.type === "record")
        return Ct(this, "Record", r.record, i);
      if (r.type === "object")
        return Ct(this, "Object", r, i);
      throw new yn("Definition must be a record or object");
    }
    assertValidRecord(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, ["record"]);
      if (!hn(i))
        throw new U("Record must be an object");
      if (!ld(i, "$type") || typeof i.$type != "string")
        throw new U("Record/$type must be a string");
      const n = i.$type || "";
      if (ue(n) !== t)
        throw new U(`Invalid $type: must be ${t}, got ${n}`);
      return hd(this, r, i);
    }
    assertValidXrpcParams(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, [
        "query",
        "procedure",
        "subscription"
      ]);
      return yd(this, r, i);
    }
    assertValidXrpcInput(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, ["procedure"]);
      return Ed(this, r, i);
    }
    assertValidXrpcOutput(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, ["query", "procedure"]);
      return gd(this, r, i);
    }
    assertValidXrpcMessage(t, i) {
      t = ue(t);
      const r = this.getDefOrThrow(t, ["subscription"]);
      return Rd(this, r, i);
    }
    resolveLexUri(t, i) {
      return t = ue(t), ue(i, t);
    }
  };
  function* gn(t) {
    for (const i in t.defs)
      yield [`lex:${t.id}#${i}`, t.defs[i]], i === "main" && (yield [`lex:${t.id}`, t.defs[i]]);
  }
  function Mr(t, i) {
    for (const r in t)
      t.type === "ref" ? t.ref = ue(t.ref, i) : t.type === "union" ? t.refs = t.refs.map((n) => ue(n, i)) : Array.isArray(t[r]) ? t[r] = t[r].map((n) => typeof n == "string" ? n.startsWith("#") ? ue(n, i) : n : n && typeof n == "object" ? Mr(n, i) : n) : t[r] && typeof t[r] == "object" && (t[r] = Mr(t[r], i));
    return t;
  }
  var $r = (t) => {
    if (Array.isArray(t))
      return t.map((i) => $r(i));
    if (t && typeof t == "object") {
      if (t instanceof Ye)
        return t.original;
      if (Q.asCID(t) || t instanceof Uint8Array)
        return t;
      const i = {};
      for (const r of Object.keys(t))
        i[r] = $r(t[r]);
      return i;
    }
    return t;
  }, Or = (t) => {
    if (Array.isArray(t))
      return t.map((i) => Or(i));
    if (t && typeof t == "object") {
      if ((t.$type === "blob" || typeof t.cid == "string" && typeof t.mimeType == "string") && Qt.is(t, nn))
        return Ye.fromJsonRef(t);
      if (Q.asCID(t) || t instanceof Uint8Array)
        return t;
      const i = {};
      for (const r of Object.keys(t))
        i[r] = Or(t[r]);
      return i;
    }
    return t;
  }, Rn = (t) => or($r(t)), bn = (t) => JSON.stringify(Rn(t)), An = (t) => Or(Ur(t)), Tn = (t) => An(JSON.parse(t)), vn = h.object({
    error: h.string().optional(),
    message: h.string().optional()
  }), wn = /* @__PURE__ */ ((t) => (t[t.Unknown = 1] = "Unknown", t[t.InvalidResponse = 2] = "InvalidResponse", t[t.Success = 200] = "Success", t[t.InvalidRequest = 400] = "InvalidRequest", t[t.AuthRequired = 401] = "AuthRequired", t[t.Forbidden = 403] = "Forbidden", t[t.XRPCNotSupported = 404] = "XRPCNotSupported", t[t.PayloadTooLarge = 413] = "PayloadTooLarge", t[t.RateLimitExceeded = 429] = "RateLimitExceeded", t[t.InternalServerError = 500] = "InternalServerError", t[t.MethodNotImplemented = 501] = "MethodNotImplemented", t[t.UpstreamFailure = 502] = "UpstreamFailure", t[t.NotEnoughResources = 503] = "NotEnoughResources", t[t.UpstreamTimeout = 504] = "UpstreamTimeout", t))(wn || {}), bd = {
    2: "InvalidResponse",
    200: "Success",
    400: "InvalidRequest",
    401: "AuthenticationRequired",
    403: "Forbidden",
    404: "XRPCNotSupported",
    413: "PayloadTooLarge",
    429: "RateLimitExceeded",
    500: "InternalServerError",
    501: "MethodNotImplemented",
    502: "UpstreamFailure",
    503: "NotEnoughResources",
    504: "UpstreamTimeout"
  }, Ln = {
    2: "Invalid Response",
    200: "Success",
    400: "Invalid Request",
    401: "Authentication Required",
    403: "Forbidden",
    404: "XRPC Not Supported",
    413: "Payload Too Large",
    429: "Rate Limit Exceeded",
    500: "Internal Server Error",
    501: "Method Not Implemented",
    502: "Upstream Failure",
    503: "Not Enough Resources",
    504: "Upstream Timeout"
  }, Ad = class {
    constructor(t, i) {
      this.data = t, this.headers = i, this.success = !0;
    }
  }, w = class extends Error {
    constructor(t, i, r, n) {
      super(r || i || Ln[t]), this.status = t, this.error = i, this.success = !1, this.error || (this.error = bd[t]), this.headers = n;
    }
  }, Td = class extends w {
    constructor(t, i, r) {
      super(2, Ln[
        2
        /* InvalidResponse */
      ], "The server gave an invalid response and may be out of date."), this.lexiconNsid = t, this.validationError = i, this.responseBody = r;
    }
  };
  function vd(t) {
    return t.type === "procedure" ? "post" : "get";
  }
  function wd(t, i, r, n) {
    const s = new URL(r);
    if (s.pathname = `/xrpc/${t}`, n)
      for (const [u, e] of Object.entries(n)) {
        const d = i.parameters?.properties?.[u];
        if (!d)
          throw new Error(`Invalid query parameter: ${u}`);
        e !== void 0 && (d.type === "array" ? [].concat(e).forEach((T) => {
          s.searchParams.append(u, _n(d.items.type, T));
        }) : s.searchParams.set(u, _n(d.type, e)));
      }
    return s.toString();
  }
  function _n(t, i) {
    if (t === "string" || t === "unknown")
      return String(i);
    if (t === "float")
      return String(Number(i));
    if (t === "integer")
      return String(Number(i) | 0);
    if (t === "boolean")
      return i ? "true" : "false";
    if (t === "datetime")
      return i instanceof Date ? i.toISOString() : String(i);
    throw new Error(`Unsupported query param type: ${t}`);
  }
  function Ld(t) {
    const i = {};
    for (const [r, n] of Object.entries(t))
      i[r.toLowerCase()] = n;
    return i;
  }
  function _d(t, i, r) {
    const n = r?.headers || {};
    return t.type === "procedure" && (r?.encoding && (n["Content-Type"] = r.encoding), i && typeof i == "object" && (n["Content-Type"] || (n["Content-Type"] = "application/json"))), n;
  }
  function Cd(t, i) {
    if (!(!t["content-type"] || typeof i > "u"))
      return i instanceof ArrayBuffer ? i : t["content-type"].startsWith("text/") ? new TextEncoder().encode(i.toString()) : t["content-type"].startsWith("application/json") ? new TextEncoder().encode(bn(i)) : i;
  }
  function Sd(t) {
    let i;
    return t in wn ? i = t : t >= 100 && t < 200 ? i = 404 : t >= 200 && t < 300 ? i = 200 : t >= 300 && t < 400 ? i = 404 : t >= 400 && t < 500 ? i = 400 : i = 500, i;
  }
  function xd(t, i) {
    if (t) {
      if (t.includes("application/json") && i?.byteLength)
        try {
          const r = new TextDecoder().decode(i);
          return Tn(r);
        } catch (r) {
          throw new w(2, `Failed to parse response body: ${String(r)}`);
        }
      if (t.startsWith("text/") && i?.byteLength)
        try {
          return new TextDecoder().decode(i);
        } catch (r) {
          throw new w(2, `Failed to parse response body: ${String(r)}`);
        }
    }
    return i instanceof ArrayBuffer ? new Uint8Array(i) : i;
  }
  var Cn = class {
    constructor() {
      this.fetch = Sn, this.lex = new En();
    }
    async call(t, i, r, n, s) {
      return this.service(t).call(i, r, n, s);
    }
    service(t) {
      return new Bd(this, t);
    }
    addLexicon(t) {
      this.lex.add(t);
    }
    addLexicons(t) {
      for (const i of t)
        this.addLexicon(i);
    }
    removeLexicon(t) {
      this.lex.remove(t);
    }
  }, Bd = class {
    constructor(t, i) {
      this.headers = {}, this.baseClient = t, this.uri = typeof i == "string" ? new URL(i) : i;
    }
    setHeader(t, i) {
      this.headers[t] = i;
    }
    unsetHeader(t) {
      delete this.headers[t];
    }
    async call(t, i, r, n) {
      const s = this.baseClient.lex.getDefOrThrow(t);
      if (!s || s.type !== "query" && s.type !== "procedure")
        throw new Error(`Invalid lexicon: ${t}. Must be a query or procedure.`);
      const u = vd(s), e = wd(t, s, this.uri, i), d = _d(s, r, {
        headers: {
          ...this.headers,
          ...n?.headers
        },
        encoding: n?.encoding
      }), y = await this.baseClient.fetch(e, u, d, r), T = Sd(y.status);
      if (T === 200) {
        try {
          this.baseClient.lex.assertValidXrpcOutput(t, y.body);
        } catch (L) {
          throw L instanceof U ? new Td(t, L, y.body) : L;
        }
        return new Ad(y.body, y.headers);
      } else
        throw y.body && kd(y.body) ? new w(T, y.body.error, y.body.message, y.headers) : new w(T);
    }
  };
  async function Sn(t, i, r, n) {
    try {
      const s = Ld(r), u = {
        method: i,
        headers: s,
        body: Cd(s, n),
        duplex: "half"
      }, e = await fetch(t, u), d = await e.arrayBuffer();
      return {
        status: e.status,
        headers: Object.fromEntries(e.headers.entries()),
        body: xd(e.headers.get("content-type"), d)
      };
    } catch (s) {
      throw new w(1, String(s));
    }
  }
  function kd(t) {
    return vn.safeParse(t).success;
  }
  new Cn();
  var Kd = {
    ComAtprotoAdminCreateCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.createCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to create a new, re-usable communication (email for now) template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "contentMarkdown", "name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                createdBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is creating the template."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#communicationTemplateView"
            }
          }
        }
      }
    },
    ComAtprotoAdminDefs: {
      lexicon: 1,
      id: "com.atproto.admin.defs",
      defs: {
        statusAttr: {
          type: "object",
          required: ["applied"],
          properties: {
            applied: {
              type: "boolean"
            },
            ref: {
              type: "string"
            }
          }
        },
        modEventView: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobCids",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#modEventTakedown",
                "lex:com.atproto.admin.defs#modEventReverseTakedown",
                "lex:com.atproto.admin.defs#modEventComment",
                "lex:com.atproto.admin.defs#modEventReport",
                "lex:com.atproto.admin.defs#modEventLabel",
                "lex:com.atproto.admin.defs#modEventAcknowledge",
                "lex:com.atproto.admin.defs#modEventEscalate",
                "lex:com.atproto.admin.defs#modEventMute",
                "lex:com.atproto.admin.defs#modEventEmail",
                "lex:com.atproto.admin.defs#modEventResolveAppeal"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            creatorHandle: {
              type: "string"
            },
            subjectHandle: {
              type: "string"
            }
          }
        },
        modEventViewDetail: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobs",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#modEventTakedown",
                "lex:com.atproto.admin.defs#modEventReverseTakedown",
                "lex:com.atproto.admin.defs#modEventComment",
                "lex:com.atproto.admin.defs#modEventReport",
                "lex:com.atproto.admin.defs#modEventLabel",
                "lex:com.atproto.admin.defs#modEventAcknowledge",
                "lex:com.atproto.admin.defs#modEventEscalate",
                "lex:com.atproto.admin.defs#modEventMute",
                "lex:com.atproto.admin.defs#modEventEmail",
                "lex:com.atproto.admin.defs#modEventResolveAppeal"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoView",
                "lex:com.atproto.admin.defs#repoViewNotFound",
                "lex:com.atproto.admin.defs#recordView",
                "lex:com.atproto.admin.defs#recordViewNotFound"
              ]
            },
            subjectBlobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#blobView"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        reportView: {
          type: "object",
          required: [
            "id",
            "reasonType",
            "subject",
            "reportedBy",
            "createdAt",
            "resolvedByActionIds"
          ],
          properties: {
            id: {
              type: "integer"
            },
            reasonType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            },
            comment: {
              type: "string"
            },
            subjectRepoHandle: {
              type: "string"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            reportedBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            resolvedByActionIds: {
              type: "array",
              items: {
                type: "integer"
              }
            }
          }
        },
        subjectStatusView: {
          type: "object",
          required: ["id", "subject", "createdAt", "updatedAt", "reviewState"],
          properties: {
            id: {
              type: "integer"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            subjectRepoHandle: {
              type: "string"
            },
            updatedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the last update was made to the moderation status of the subject"
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing the first moderation status impacting event was emitted on the subject"
            },
            reviewState: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectReviewState"
            },
            comment: {
              type: "string",
              description: "Sticky comment on the subject."
            },
            muteUntil: {
              type: "string",
              format: "datetime"
            },
            lastReviewedBy: {
              type: "string",
              format: "did"
            },
            lastReviewedAt: {
              type: "string",
              format: "datetime"
            },
            lastReportedAt: {
              type: "string",
              format: "datetime"
            },
            lastAppealedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the author of the subject appealed a moderation action"
            },
            takendown: {
              type: "boolean"
            },
            appealed: {
              type: "boolean",
              description: "True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators."
            },
            suspendUntil: {
              type: "string",
              format: "datetime"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        reportViewDetail: {
          type: "object",
          required: [
            "id",
            "reasonType",
            "subject",
            "reportedBy",
            "createdAt",
            "resolvedByActions"
          ],
          properties: {
            id: {
              type: "integer"
            },
            reasonType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            },
            comment: {
              type: "string"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoView",
                "lex:com.atproto.admin.defs#repoViewNotFound",
                "lex:com.atproto.admin.defs#recordView",
                "lex:com.atproto.admin.defs#recordViewNotFound"
              ]
            },
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            },
            reportedBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            resolvedByActions: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#modEventView"
              }
            }
          }
        },
        repoView: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoViewDetail: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderationDetail"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        accountView: {
          type: "object",
          required: ["did", "handle", "indexedAt"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoViewNotFound: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        repoRef: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        repoBlobRef: {
          type: "object",
          required: ["did", "cid"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        recordView: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobCids",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            },
            repo: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoView"
            }
          }
        },
        recordViewDetail: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobs",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#blobView"
              }
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderationDetail"
            },
            repo: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoView"
            }
          }
        },
        recordViewNotFound: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        moderation: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            }
          }
        },
        moderationDetail: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            }
          }
        },
        blobView: {
          type: "object",
          required: ["cid", "mimeType", "size", "createdAt"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            mimeType: {
              type: "string"
            },
            size: {
              type: "integer"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            details: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#imageDetails",
                "lex:com.atproto.admin.defs#videoDetails"
              ]
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            }
          }
        },
        imageDetails: {
          type: "object",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            }
          }
        },
        videoDetails: {
          type: "object",
          required: ["width", "height", "length"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            },
            length: {
              type: "integer"
            }
          }
        },
        subjectReviewState: {
          type: "string",
          knownValues: [
            "lex:com.atproto.admin.defs#reviewOpen",
            "lex:com.atproto.admin.defs#reviewEscalated",
            "lex:com.atproto.admin.defs#reviewClosed"
          ]
        },
        reviewOpen: {
          type: "token",
          description: "Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator"
        },
        reviewEscalated: {
          type: "token",
          description: "Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator"
        },
        reviewClosed: {
          type: "token",
          description: "Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator"
        },
        modEventTakedown: {
          type: "object",
          description: "Take down a subject permanently or temporarily",
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the takedown should be in effect before automatically expiring."
            }
          }
        },
        modEventReverseTakedown: {
          type: "object",
          description: "Revert take down action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventResolveAppeal: {
          type: "object",
          description: "Resolve appeal on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe resolution."
            }
          }
        },
        modEventComment: {
          type: "object",
          description: "Add a comment to a subject",
          required: ["comment"],
          properties: {
            comment: {
              type: "string"
            },
            sticky: {
              type: "boolean",
              description: "Make the comment persistent on the subject"
            }
          }
        },
        modEventReport: {
          type: "object",
          description: "Report a subject",
          required: ["reportType"],
          properties: {
            comment: {
              type: "string"
            },
            reportType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            }
          }
        },
        modEventLabel: {
          type: "object",
          description: "Apply/Negate labels on a subject",
          required: ["createLabelVals", "negateLabelVals"],
          properties: {
            comment: {
              type: "string"
            },
            createLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            },
            negateLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        modEventAcknowledge: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventEscalate: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventMute: {
          type: "object",
          description: "Mute incoming reports on a subject",
          required: ["durationInHours"],
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the subject should remain muted."
            }
          }
        },
        modEventUnmute: {
          type: "object",
          description: "Unmute action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventEmail: {
          type: "object",
          description: "Keep a log of outgoing email to a user",
          required: ["subjectLine"],
          properties: {
            subjectLine: {
              type: "string",
              description: "The subject line of the email sent to the user."
            },
            comment: {
              type: "string",
              description: "Additional comment about the outgoing comm."
            }
          }
        },
        modEventTag: {
          type: "object",
          description: "Add/Remove a tag on a subject",
          required: ["add", "remove"],
          properties: {
            add: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be added to the subject. If already exists, won't be duplicated."
            },
            remove: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated."
            },
            comment: {
              type: "string",
              description: "Additional comment about added/removed tags."
            }
          }
        },
        communicationTemplateView: {
          type: "object",
          required: [
            "id",
            "name",
            "contentMarkdown",
            "disabled",
            "lastUpdatedBy",
            "createdAt",
            "updatedAt"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string",
              description: "Name of the template."
            },
            subject: {
              type: "string",
              description: "Content of the template, can contain markdown and variable placeholders."
            },
            contentMarkdown: {
              type: "string",
              description: "Subject of the message, used in emails."
            },
            disabled: {
              type: "boolean"
            },
            lastUpdatedBy: {
              type: "string",
              format: "did",
              description: "DID of the user who last updated the template."
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            updatedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoAdminDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.admin.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDeleteCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.deleteCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a communication template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.disableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Disable an account from receiving new invite codes, but does not invalidate existing codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for disabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.disableInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Disable some set of codes and/or all codes associated with a set of users.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                accounts: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminEmitModerationEvent: {
      lexicon: 1,
      id: "com.atproto.admin.emitModerationEvent",
      defs: {
        main: {
          type: "procedure",
          description: "Take a moderation action on an actor.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["event", "subject", "createdBy"],
              properties: {
                event: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#modEventTakedown",
                    "lex:com.atproto.admin.defs#modEventAcknowledge",
                    "lex:com.atproto.admin.defs#modEventEscalate",
                    "lex:com.atproto.admin.defs#modEventComment",
                    "lex:com.atproto.admin.defs#modEventLabel",
                    "lex:com.atproto.admin.defs#modEventReport",
                    "lex:com.atproto.admin.defs#modEventMute",
                    "lex:com.atproto.admin.defs#modEventReverseTakedown",
                    "lex:com.atproto.admin.defs#modEventUnmute",
                    "lex:com.atproto.admin.defs#modEventEmail",
                    "lex:com.atproto.admin.defs#modEventTag"
                  ]
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                subjectBlobCids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                },
                createdBy: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#modEventView"
            }
          },
          errors: [
            {
              name: "SubjectHasAction"
            }
          ]
        }
      }
    },
    ComAtprotoAdminEnableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.enableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Re-enable an account's ability to receive invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for enabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfo: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfo",
      defs: {
        main: {
          type: "query",
          description: "Get details about an account.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#accountView"
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfos: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfos",
      defs: {
        main: {
          type: "query",
          description: "Get details about some accounts.",
          parameters: {
            type: "params",
            required: ["dids"],
            properties: {
              dids: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["infos"],
              properties: {
                infos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#accountView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.getInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get an admin view of invite codes.",
          parameters: {
            type: "params",
            properties: {
              sort: {
                type: "string",
                knownValues: ["recent", "usage"],
                default: "recent"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 500,
                default: 100
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                cursor: {
                  type: "string"
                },
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetModerationEvent: {
      lexicon: 1,
      id: "com.atproto.admin.getModerationEvent",
      defs: {
        main: {
          type: "query",
          description: "Get details about a moderation event.",
          parameters: {
            type: "params",
            required: ["id"],
            properties: {
              id: {
                type: "integer"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#modEventViewDetail"
            }
          }
        }
      }
    },
    ComAtprotoAdminGetRecord: {
      lexicon: 1,
      id: "com.atproto.admin.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get details about a record.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#recordViewDetail"
            }
          },
          errors: [
            {
              name: "RecordNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoAdminGetRepo: {
      lexicon: 1,
      id: "com.atproto.admin.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Get details about a repository.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoViewDetail"
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoAdminGetSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.getSubjectStatus",
      defs: {
        main: {
          type: "query",
          description: "Get the service-specific admin status of a subject (account, record, or blob).",
          parameters: {
            type: "params",
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              uri: {
                type: "string",
                format: "at-uri"
              },
              blob: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminListCommunicationTemplates: {
      lexicon: 1,
      id: "com.atproto.admin.listCommunicationTemplates",
      defs: {
        main: {
          type: "query",
          description: "Get list of all communication templates.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["communicationTemplates"],
              properties: {
                communicationTemplates: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#communicationTemplateView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminQueryModerationEvents: {
      lexicon: 1,
      id: "com.atproto.admin.queryModerationEvents",
      defs: {
        main: {
          type: "query",
          description: "List moderation events related to a subject.",
          parameters: {
            type: "params",
            properties: {
              types: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "The types of events (fully qualified string in the format of com.atproto.admin#modEvent<name>) to filter by. If not specified, all events are returned."
              },
              createdBy: {
                type: "string",
                format: "did"
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"],
                description: "Sort direction for the events. Defaults to descending order of created at timestamp."
              },
              createdAfter: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created after a given timestamp"
              },
              createdBefore: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created before a given timestamp"
              },
              subject: {
                type: "string",
                format: "uri"
              },
              includeAllUserRecords: {
                type: "boolean",
                default: !1,
                description: "If true, events on all record types (posts, lists, profile etc.) owned by the did are returned"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              hasComment: {
                type: "boolean",
                description: "If true, only events with comments are returned"
              },
              comment: {
                type: "string",
                description: "If specified, only events with comments containing the keyword are returned"
              },
              addedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were added are returned"
              },
              removedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were removed are returned"
              },
              addedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were added are returned"
              },
              removedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were removed are returned"
              },
              reportTypes: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["events"],
              properties: {
                cursor: {
                  type: "string"
                },
                events: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#modEventView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminQueryModerationStatuses: {
      lexicon: 1,
      id: "com.atproto.admin.queryModerationStatuses",
      defs: {
        main: {
          type: "query",
          description: "View moderation statuses of subjects (record or repo).",
          parameters: {
            type: "params",
            properties: {
              subject: {
                type: "string",
                format: "uri"
              },
              comment: {
                type: "string",
                description: "Search subjects by keyword from comments"
              },
              reportedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported after a given timestamp"
              },
              reportedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported before a given timestamp"
              },
              reviewedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed after a given timestamp"
              },
              reviewedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed before a given timestamp"
              },
              includeMuted: {
                type: "boolean",
                description: "By default, we don't include muted subjects in the results. Set this to true to include them."
              },
              reviewState: {
                type: "string",
                description: "Specify when fetching subjects in a certain state"
              },
              ignoreSubjects: {
                type: "array",
                items: {
                  type: "string",
                  format: "uri"
                }
              },
              lastReviewedBy: {
                type: "string",
                format: "did",
                description: "Get all subject statuses that were reviewed by a specific moderator"
              },
              sortField: {
                type: "string",
                default: "lastReportedAt",
                enum: ["lastReviewedAt", "lastReportedAt"]
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"]
              },
              takendown: {
                type: "boolean",
                description: "Get subjects that were taken down"
              },
              appealed: {
                type: "boolean",
                description: "Get subjects in unresolved appealed status"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              tags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              excludeTags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subjectStatuses"],
              properties: {
                cursor: {
                  type: "string"
                },
                subjectStatuses: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#subjectStatusView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminSearchRepos: {
      lexicon: 1,
      id: "com.atproto.admin.searchRepos",
      defs: {
        main: {
          type: "query",
          description: "Find repositories based on a search term.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead"
              },
              q: {
                type: "string"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#repoView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminSendEmail: {
      lexicon: 1,
      id: "com.atproto.admin.sendEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Send email to a user's account email address.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["recipientDid", "content", "senderDid"],
              properties: {
                recipientDid: {
                  type: "string",
                  format: "did"
                },
                content: {
                  type: "string"
                },
                subject: {
                  type: "string"
                },
                senderDid: {
                  type: "string",
                  format: "did"
                },
                comment: {
                  type: "string",
                  description: "Additional comment by the sender that won't be used in the email itself but helpful to provide more context for moderators/reviewers"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["sent"],
              properties: {
                sent: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountEmail: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account", "email"],
              properties: {
                account: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo."
                },
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountHandle: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's handle.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "handle"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                handle: {
                  type: "string",
                  format: "handle"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountPassword: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Update the password for a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.updateCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string",
                  description: "ID of the template to be updated."
                },
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                updatedBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is updating the template."
                },
                disabled: {
                  type: "boolean"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#communicationTemplateView"
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.updateSubjectStatus",
      defs: {
        main: {
          type: "procedure",
          description: "Update the service-specific admin status of a subject (account, record, or blob).",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityGetRecommendedDidCredentials: {
      lexicon: 1,
      id: "com.atproto.identity.getRecommendedDidCredentials",
      defs: {
        main: {
          type: "query",
          description: "Describe the credentials that should be included in the DID doc of an account that is migrating to this service.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                rotationKeys: {
                  description: "Recommended rotation keys for PLC dids. Should be undefined (or ignored) for did:webs.",
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityRequestPlcOperationSignature: {
      lexicon: 1,
      id: "com.atproto.identity.requestPlcOperationSignature",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to in order to request a signed PLC operation. Requires Auth."
        }
      }
    },
    ComAtprotoIdentityResolveHandle: {
      lexicon: 1,
      id: "com.atproto.identity.resolveHandle",
      defs: {
        main: {
          type: "query",
          description: "Resolves a handle (domain name) to a DID.",
          parameters: {
            type: "params",
            required: ["handle"],
            properties: {
              handle: {
                type: "string",
                format: "handle",
                description: "The handle to resolve."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySignPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.signPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Signs a PLC operation to update some value(s) in the requesting DID's document.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                token: {
                  description: "A token received through com.atproto.identity.requestPlcOperationSignature",
                  type: "string"
                },
                rotationKeys: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown",
                  description: "A signed DID PLC operation."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySubmitPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.submitPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Validates a PLC operation to ensure that it doesn't violate a service's constraints or get the identity into a bad state, then submits it to the PLC registry",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityUpdateHandle: {
      lexicon: 1,
      id: "com.atproto.identity.updateHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Updates the current account's handle. Verifies handle validity, and updates did:plc document if necessary. Implemented by PDS, and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle",
                  description: "The new handle."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelDefs: {
      lexicon: 1,
      id: "com.atproto.label.defs",
      defs: {
        label: {
          type: "object",
          description: "Metadata tag on an atproto resource (eg, repo or record).",
          required: ["src", "uri", "val", "cts"],
          properties: {
            src: {
              type: "string",
              format: "did",
              description: "DID of the actor who created this label."
            },
            uri: {
              type: "string",
              format: "uri",
              description: "AT URI of the record, repository (account), or other resource that this label applies to."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "Optionally, CID specifying the specific version of 'uri' resource this label applies to."
            },
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            },
            neg: {
              type: "boolean",
              description: "If true, this is a negation label, overwriting a previous label."
            },
            cts: {
              type: "string",
              format: "datetime",
              description: "Timestamp when this label was created."
            }
          }
        },
        selfLabels: {
          type: "object",
          description: "Metadata tags on an atproto record, published by the author within the record.",
          required: ["values"],
          properties: {
            values: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#selfLabel"
              },
              maxLength: 10
            }
          }
        },
        selfLabel: {
          type: "object",
          description: "Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel.",
          required: ["val"],
          properties: {
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            }
          }
        }
      }
    },
    ComAtprotoLabelQueryLabels: {
      lexicon: 1,
      id: "com.atproto.label.queryLabels",
      defs: {
        main: {
          type: "query",
          description: "Find labels relevant to the provided AT-URI patterns. Public endpoint for moderation services, though may return different or additional results with auth.",
          parameters: {
            type: "params",
            required: ["uriPatterns"],
            properties: {
              uriPatterns: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI."
              },
              sources: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                },
                description: "Optional list of label sources (DIDs) to filter on."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                cursor: {
                  type: "string"
                },
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelSubscribeLabels: {
      lexicon: 1,
      id: "com.atproto.label.subscribeLabels",
      defs: {
        main: {
          type: "subscription",
          description: "Subscribe to stream of labels (and negations). Public endpoint implemented by mod services. Uses same sequencing scheme as repo event stream.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.label.subscribeLabels#labels",
                "lex:com.atproto.label.subscribeLabels#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            }
          ]
        },
        labels: {
          type: "object",
          required: ["seq", "labels"],
          properties: {
            seq: {
              type: "integer"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoModerationCreateReport: {
      lexicon: 1,
      id: "com.atproto.moderation.createReport",
      defs: {
        main: {
          type: "procedure",
          description: "Submit a moderation report regarding an atproto account or record. Implemented by moderation services (with PDS proxying), and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["reasonType", "subject"],
              properties: {
                reasonType: {
                  type: "ref",
                  description: "Indicates the broad category of violation the report is for.",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  description: "Additional context about the content and violation."
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "id",
                "reasonType",
                "subject",
                "reportedBy",
                "createdAt"
              ],
              properties: {
                id: {
                  type: "integer"
                },
                reasonType: {
                  type: "ref",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  maxGraphemes: 2e3,
                  maxLength: 2e4
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                reportedBy: {
                  type: "string",
                  format: "did"
                },
                createdAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoModerationDefs: {
      lexicon: 1,
      id: "com.atproto.moderation.defs",
      defs: {
        reasonType: {
          type: "string",
          knownValues: [
            "com.atproto.moderation.defs#reasonSpam",
            "com.atproto.moderation.defs#reasonViolation",
            "com.atproto.moderation.defs#reasonMisleading",
            "com.atproto.moderation.defs#reasonSexual",
            "com.atproto.moderation.defs#reasonRude",
            "com.atproto.moderation.defs#reasonOther",
            "com.atproto.moderation.defs#reasonAppeal"
          ]
        },
        reasonSpam: {
          type: "token",
          description: "Spam: frequent unwanted promotion, replies, mentions"
        },
        reasonViolation: {
          type: "token",
          description: "Direct violation of server rules, laws, terms of service"
        },
        reasonMisleading: {
          type: "token",
          description: "Misleading identity, affiliation, or content"
        },
        reasonSexual: {
          type: "token",
          description: "Unwanted or mislabeled sexual content"
        },
        reasonRude: {
          type: "token",
          description: "Rude, harassing, explicit, or otherwise unwelcoming behavior"
        },
        reasonOther: {
          type: "token",
          description: "Other: reports not falling under another report category"
        },
        reasonAppeal: {
          type: "token",
          description: "Appeal: appeal a previously taken moderation action"
        }
      }
    },
    ComAtprotoRepoApplyWrites: {
      lexicon: 1,
      id: "com.atproto.repo.applyWrites",
      defs: {
        main: {
          type: "procedure",
          description: "Apply a batch transaction of repository creates, updates, and deletes. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "writes"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data, for all operations."
                },
                writes: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:com.atproto.repo.applyWrites#create",
                      "lex:com.atproto.repo.applyWrites#update",
                      "lex:com.atproto.repo.applyWrites#delete"
                    ],
                    closed: !0
                  }
                },
                swapCommit: {
                  type: "string",
                  description: "If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations.",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that the 'swapCommit' parameter did not match current commit."
            }
          ]
        },
        create: {
          type: "object",
          description: "Operation which creates a new record.",
          required: ["collection", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string",
              maxLength: 15
            },
            value: {
              type: "unknown"
            }
          }
        },
        update: {
          type: "object",
          description: "Operation which updates an existing record.",
          required: ["collection", "rkey", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            },
            value: {
              type: "unknown"
            }
          }
        },
        delete: {
          type: "object",
          description: "Operation which deletes an existing record.",
          required: ["collection", "rkey"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoRepoCreateRecord: {
      lexicon: 1,
      id: "com.atproto.repo.createRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Create a single new repository record. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "record"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record itself. Must contain a $type field."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that 'swapCommit' didn't match current repo commit."
            }
          ]
        }
      }
    },
    ComAtprotoRepoDeleteRecord: {
      lexicon: 1,
      id: "com.atproto.repo.deleteRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoDescribeRepo: {
      lexicon: 1,
      id: "com.atproto.repo.describeRepo",
      defs: {
        main: {
          type: "query",
          description: "Get information about an account and repository, including the list of collections. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "handle",
                "did",
                "didDoc",
                "collections",
                "handleIsCorrect"
              ],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown",
                  description: "The complete DID document for this account."
                },
                collections: {
                  type: "array",
                  description: "List of all the collections (NSIDs) for which this repo contains at least one record.",
                  items: {
                    type: "string",
                    format: "nsid"
                  }
                },
                handleIsCorrect: {
                  type: "boolean",
                  description: "Indicates if handle is currently valid (resolves bi-directionally)"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoGetRecord: {
      lexicon: 1,
      id: "com.atproto.repo.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get a single record from a repository. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection", "rkey"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The Record Key."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the version of the record. If not specified, then return the most recent version."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "value"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                value: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoImportRepo: {
      lexicon: 1,
      id: "com.atproto.repo.importRepo",
      defs: {
        main: {
          type: "procedure",
          description: "Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set.",
          input: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoRepoListMissingBlobs: {
      lexicon: 1,
      id: "com.atproto.repo.listMissingBlobs",
      defs: {
        main: {
          type: "query",
          description: "Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blobs"],
              properties: {
                cursor: {
                  type: "string"
                },
                blobs: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listMissingBlobs#recordBlob"
                  }
                }
              }
            }
          }
        },
        recordBlob: {
          type: "object",
          required: ["cid", "recordUri"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    ComAtprotoRepoListRecords: {
      lexicon: 1,
      id: "com.atproto.repo.listRecords",
      defs: {
        main: {
          type: "query",
          description: "List a range of records in a repository, matching a specific collection. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record type."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50,
                description: "The number of records to return."
              },
              cursor: {
                type: "string"
              },
              rkeyStart: {
                type: "string",
                description: "DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)"
              },
              rkeyEnd: {
                type: "string",
                description: "DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)"
              },
              reverse: {
                type: "boolean",
                description: "Flag to reverse the order of the returned records."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["records"],
              properties: {
                cursor: {
                  type: "string"
                },
                records: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listRecords#record"
                  }
                }
              }
            }
          }
        },
        record: {
          type: "object",
          required: ["uri", "cid", "value"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            }
          }
        }
      }
    },
    ComAtprotoRepoPutRecord: {
      lexicon: 1,
      id: "com.atproto.repo.putRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Write a repository record, creating or updating it as needed. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey", "record"],
              nullable: ["swapRecord"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record to write."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID. WARNING: nullable and optional field; may cause problems with golang implementation"
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoStrongRef: {
      lexicon: 1,
      id: "com.atproto.repo.strongRef",
      description: "A URI with a content-hash fingerprint.",
      defs: {
        main: {
          type: "object",
          required: ["uri", "cid"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            }
          }
        }
      }
    },
    ComAtprotoRepoUploadBlob: {
      lexicon: 1,
      id: "com.atproto.repo.uploadBlob",
      defs: {
        main: {
          type: "procedure",
          description: "Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS.",
          input: {
            encoding: "*/*"
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blob"],
              properties: {
                blob: {
                  type: "blob"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerActivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.activateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Activates a currently deactivated account. Used to finalize account migration after the account's repo is imported and identity is setup."
        }
      }
    },
    ComAtprotoServerCheckAccountStatus: {
      lexicon: 1,
      id: "com.atproto.server.checkAccountStatus",
      defs: {
        main: {
          type: "query",
          description: "Returns the status of an account, especially as pertaining to import or recovery. Can be called many times over the course of an account migration. Requires auth and can only be called pertaining to oneself.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "activated",
                "validDid",
                "repoCommit",
                "repoRev",
                "repoBlocks",
                "indexedRecords",
                "privateStateValues",
                "expectedBlobs",
                "importedBlobs"
              ],
              properties: {
                activated: {
                  type: "boolean"
                },
                validDid: {
                  type: "boolean"
                },
                repoCommit: {
                  type: "string",
                  format: "cid"
                },
                repoRev: {
                  type: "string"
                },
                repoBlocks: {
                  type: "integer"
                },
                indexedRecords: {
                  type: "integer"
                },
                privateStateValues: {
                  type: "integer"
                },
                expectedBlobs: {
                  type: "integer"
                },
                importedBlobs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerConfirmEmail: {
      lexicon: 1,
      id: "com.atproto.server.confirmEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Confirm an email using a token from com.atproto.server.requestEmailConfirmation.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email", "token"],
              properties: {
                email: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountNotFound"
            },
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "InvalidEmail"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAccount: {
      lexicon: 1,
      id: "com.atproto.server.createAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Create an account. Implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                email: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle",
                  description: "Requested handle for the account."
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "Pre-existing atproto DID, being imported to a new account."
                },
                inviteCode: {
                  type: "string"
                },
                verificationCode: {
                  type: "string"
                },
                verificationPhone: {
                  type: "string"
                },
                password: {
                  type: "string",
                  description: "Initial account password. May need to meet instance-specific password strength requirements."
                },
                recoveryKey: {
                  type: "string",
                  description: "DID PLC rotation key (aka, recovery key) to be included in PLC creation operation."
                },
                plcOp: {
                  type: "unknown",
                  description: "A signed DID PLC operation to be submitted as part of importing an existing account to this instance. NOTE: this optional field may be updated when full account migration is implemented."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              description: "Account login session returned on successful account creation.",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID of the new account."
                },
                didDoc: {
                  type: "unknown",
                  description: "Complete DID document."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidHandle"
            },
            {
              name: "InvalidPassword"
            },
            {
              name: "InvalidInviteCode"
            },
            {
              name: "HandleNotAvailable"
            },
            {
              name: "UnsupportedDomain"
            },
            {
              name: "UnresolvableDid"
            },
            {
              name: "IncompatibleDidDoc"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.createAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Create an App Password.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "A short name for the App Password, to help distinguish them."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.server.createAppPassword#appPassword"
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "password", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            password: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCode: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCode",
      defs: {
        main: {
          type: "procedure",
          description: "Create an invite code.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["useCount"],
              properties: {
                useCount: {
                  type: "integer"
                },
                forAccount: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["code"],
              properties: {
                code: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Create invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codeCount", "useCount"],
              properties: {
                codeCount: {
                  type: "integer",
                  default: 1
                },
                useCount: {
                  type: "integer"
                },
                forAccounts: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "did"
                  }
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.createInviteCodes#accountCodes"
                  }
                }
              }
            }
          }
        },
        accountCodes: {
          type: "object",
          required: ["account", "codes"],
          properties: {
            account: {
              type: "string"
            },
            codes: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateSession: {
      lexicon: 1,
      id: "com.atproto.server.createSession",
      defs: {
        main: {
          type: "procedure",
          description: "Create an authentication session.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["identifier", "password"],
              properties: {
                identifier: {
                  type: "string",
                  description: "Handle or other identifier supported by the server for the authenticating user."
                },
                password: {
                  type: "string"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeactivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.deactivateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Deactivates a currently active account. Stops serving of repo, and future writes to repo until reactivated. Used to finalize account migration with the old host after the account has been activated on the new host.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                deleteAfter: {
                  type: "string",
                  format: "datetime",
                  description: "A recommendation to server as to how long they should hold onto the deactivated account before deleting."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerDefs: {
      lexicon: 1,
      id: "com.atproto.server.defs",
      defs: {
        inviteCode: {
          type: "object",
          required: [
            "code",
            "available",
            "disabled",
            "forAccount",
            "createdBy",
            "createdAt",
            "uses"
          ],
          properties: {
            code: {
              type: "string"
            },
            available: {
              type: "integer"
            },
            disabled: {
              type: "boolean"
            },
            forAccount: {
              type: "string"
            },
            createdBy: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            uses: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCodeUse"
              }
            }
          }
        },
        inviteCodeUse: {
          type: "object",
          required: ["usedBy", "usedAt"],
          properties: {
            usedBy: {
              type: "string",
              format: "did"
            },
            usedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.server.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete an actor's account with a token and password. Can only be called after requesting a deletion token. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password", "token"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeleteSession: {
      lexicon: 1,
      id: "com.atproto.server.deleteSession",
      defs: {
        main: {
          type: "procedure",
          description: "Delete the current session. Requires auth."
        }
      }
    },
    ComAtprotoServerDescribeServer: {
      lexicon: 1,
      id: "com.atproto.server.describeServer",
      defs: {
        main: {
          type: "query",
          description: "Describes the server's account creation requirements and capabilities. Implemented by PDS.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "availableUserDomains"],
              properties: {
                inviteCodeRequired: {
                  type: "boolean",
                  description: "If true, an invite code must be supplied to create an account on this instance."
                },
                phoneVerificationRequired: {
                  type: "boolean",
                  description: "If true, a phone verification token must be supplied to create an account on this instance."
                },
                availableUserDomains: {
                  type: "array",
                  description: "List of domain suffixes that can be used in account handles.",
                  items: {
                    type: "string"
                  }
                },
                links: {
                  type: "ref",
                  description: "URLs of service policy documents.",
                  ref: "lex:com.atproto.server.describeServer#links"
                },
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string"
            },
            termsOfService: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoServerGetAccountInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.getAccountInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get all invite codes for the current account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              includeUsed: {
                type: "boolean",
                default: !0
              },
              createAvailable: {
                type: "boolean",
                default: !0,
                description: "Controls whether any new 'earned' but not 'created' invites should be created."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "DuplicateCreate"
            }
          ]
        }
      }
    },
    ComAtprotoServerGetServiceAuth: {
      lexicon: 1,
      id: "com.atproto.server.getServiceAuth",
      defs: {
        main: {
          type: "query",
          description: "Get a signed token on behalf of the requesting DID for the requested service.",
          parameters: {
            type: "params",
            required: ["aud"],
            properties: {
              aud: {
                type: "string",
                format: "did",
                description: "The DID of the service that the token will be used to authenticate with"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token"],
              properties: {
                token: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerGetSession: {
      lexicon: 1,
      id: "com.atproto.server.getSession",
      defs: {
        main: {
          type: "query",
          description: "Get information about the current auth session. Requires auth.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle", "did"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerListAppPasswords: {
      lexicon: 1,
      id: "com.atproto.server.listAppPasswords",
      defs: {
        main: {
          type: "query",
          description: "List all App Passwords.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["passwords"],
              properties: {
                passwords: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.listAppPasswords#appPassword"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerRefreshSession: {
      lexicon: 1,
      id: "com.atproto.server.refreshSession",
      defs: {
        main: {
          type: "procedure",
          description: "Refresh an authentication session. Requires auth using the 'refreshJwt' (not the 'accessJwt').",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        }
      }
    },
    ComAtprotoServerRequestAccountDelete: {
      lexicon: 1,
      id: "com.atproto.server.requestAccountDelete",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account deletion via email."
        }
      }
    },
    ComAtprotoServerRequestEmailConfirmation: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailConfirmation",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to confirm ownership of email."
        }
      }
    },
    ComAtprotoServerRequestEmailUpdate: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Request a token in order to update email.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["tokenRequired"],
              properties: {
                tokenRequired: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerRequestPasswordReset: {
      lexicon: 1,
      id: "com.atproto.server.requestPasswordReset",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account password reset via email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerReserveSigningKey: {
      lexicon: 1,
      id: "com.atproto.server.reserveSigningKey",
      defs: {
        main: {
          type: "procedure",
          description: "Reserve a repo signing key, for use with account creation. Necessary so that a DID PLC update operation can be constructed during an account migraiton. Public and does not require auth; implemented by PDS. NOTE: this endpoint may change when full account migration is implemented.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID to reserve a key for."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["signingKey"],
              properties: {
                signingKey: {
                  type: "string",
                  description: "The public key for the reserved signing key, in did:key serialization."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerResetPassword: {
      lexicon: 1,
      id: "com.atproto.server.resetPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Reset a user account password using a token.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token", "password"],
              properties: {
                token: {
                  type: "string"
                },
                password: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerRevokeAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.revokeAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Revoke an App Password by name.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerUpdateEmail: {
      lexicon: 1,
      id: "com.atproto.server.updateEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                },
                token: {
                  type: "string",
                  description: "Requires a token from com.atproto.sever.requestEmailUpdate if the account's email has been confirmed."
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "TokenRequired"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetBlob: {
      lexicon: 1,
      id: "com.atproto.sync.getBlob",
      defs: {
        main: {
          type: "query",
          description: "Get a blob associated with a given account. Returns the full blob as originally uploaded. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cid"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the account."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the blob to fetch"
              }
            }
          },
          output: {
            encoding: "*/*"
          }
        }
      }
    },
    ComAtprotoSyncGetBlocks: {
      lexicon: 1,
      id: "com.atproto.sync.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks from a given repo, by CID. For example, intermediate MST nodes, or records. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cids"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              cids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetCheckout: {
      lexicon: 1,
      id: "com.atproto.sync.getCheckout",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getRepo instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetHead: {
      lexicon: 1,
      id: "com.atproto.sync.getHead",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getLatestCommit instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["root"],
              properties: {
                root: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "HeadNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetLatestCommit: {
      lexicon: 1,
      id: "com.atproto.sync.getLatestCommit",
      defs: {
        main: {
          type: "query",
          description: "Get the current commit CID & revision of the specified repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cid", "rev"],
              properties: {
                cid: {
                  type: "string",
                  format: "cid"
                },
                rev: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetRecord: {
      lexicon: 1,
      id: "com.atproto.sync.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did", "collection", "rkey"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid"
              },
              rkey: {
                type: "string",
                description: "Record Key"
              },
              commit: {
                type: "string",
                format: "cid",
                description: "An optional past commit CID."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetRepo: {
      lexicon: 1,
      id: "com.atproto.sync.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Download a repository export as CAR file. Optionally only a 'diff' since a previous revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "The revision ('rev') of the repo to create a diff from."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncListBlobs: {
      lexicon: 1,
      id: "com.atproto.sync.listBlobs",
      defs: {
        main: {
          type: "query",
          description: "List blob CIDso for an account, since some repo revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "Optional revision of the repo to list blobs since."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cids"],
              properties: {
                cursor: {
                  type: "string"
                },
                cids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncListRepos: {
      lexicon: 1,
      id: "com.atproto.sync.listRepos",
      defs: {
        main: {
          type: "query",
          description: "Enumerates all the DID, rev, and commit CID for all repos hosted by this service. Does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.sync.listRepos#repo"
                  }
                }
              }
            }
          }
        },
        repo: {
          type: "object",
          required: ["did", "head", "rev"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            head: {
              type: "string",
              format: "cid",
              description: "Current repo commit CID"
            },
            rev: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoSyncNotifyOfUpdate: {
      lexicon: 1,
      id: "com.atproto.sync.notifyOfUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Notify a crawling service of a recent update, and that crawling should resume. Intended use is after a gap between repo stream events caused the crawling service to disconnect. Does not require auth; implemented by Relay.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (usually a PDS) that is notifying of update."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncRequestCrawl: {
      lexicon: 1,
      id: "com.atproto.sync.requestCrawl",
      defs: {
        main: {
          type: "procedure",
          description: "Request a service to persistently crawl hosted repos. Expected use is new PDS instances declaring their existence to Relays. Does not require auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (eg, PDS) that is requesting to be crawled."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncSubscribeRepos: {
      lexicon: 1,
      id: "com.atproto.sync.subscribeRepos",
      defs: {
        main: {
          type: "subscription",
          description: "Repository event stream, aka Firehose endpoint. Outputs repo commits with diff data, and identity update events, for all repositories on the current server. See the atproto specifications for details around stream sequencing, repo versioning, CAR diff format, and more. Public and does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.sync.subscribeRepos#commit",
                "lex:com.atproto.sync.subscribeRepos#identity",
                "lex:com.atproto.sync.subscribeRepos#handle",
                "lex:com.atproto.sync.subscribeRepos#migrate",
                "lex:com.atproto.sync.subscribeRepos#tombstone",
                "lex:com.atproto.sync.subscribeRepos#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            },
            {
              name: "ConsumerTooSlow",
              description: "If the consumer of the stream can not keep up with events, and a backlog gets too large, the server will drop the connection."
            }
          ]
        },
        commit: {
          type: "object",
          description: "Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature.",
          required: [
            "seq",
            "rebase",
            "tooBig",
            "repo",
            "commit",
            "rev",
            "since",
            "blocks",
            "ops",
            "blobs",
            "time"
          ],
          nullable: ["prev", "since"],
          properties: {
            seq: {
              type: "integer",
              description: "The stream sequence number of this message."
            },
            rebase: {
              type: "boolean",
              description: "DEPRECATED -- unused"
            },
            tooBig: {
              type: "boolean",
              description: "Indicates that this commit contained too many ops, or data size was too large. Consumers will need to make a separate request to get missing data."
            },
            repo: {
              type: "string",
              format: "did",
              description: "The repo this event comes from."
            },
            commit: {
              type: "cid-link",
              description: "Repo commit object CID."
            },
            prev: {
              type: "cid-link",
              description: "DEPRECATED -- unused. WARNING -- nullable and optional; stick with optional to ensure golang interoperability."
            },
            rev: {
              type: "string",
              description: "The rev of the emitted commit. Note that this information is also in the commit object included in blocks, unless this is a tooBig event."
            },
            since: {
              type: "string",
              description: "The rev of the last emitted commit from this repo (if any)."
            },
            blocks: {
              type: "bytes",
              description: "CAR file containing relevant blocks, as a diff since the previous repo state.",
              maxLength: 1e6
            },
            ops: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.sync.subscribeRepos#repoOp",
                description: "List of repo mutation operations in this commit (eg, records created, updated, or deleted)."
              },
              maxLength: 200
            },
            blobs: {
              type: "array",
              items: {
                type: "cid-link",
                description: "List of new blobs (by CID) referenced by records in this commit."
              }
            },
            time: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this message was originally broadcast."
            }
          }
        },
        identity: {
          type: "object",
          description: "Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache.",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        handle: {
          type: "object",
          description: "Represents an update of the account's handle, or transition to/from invalid state. NOTE: Will be deprecated in favor of #identity.",
          required: ["seq", "did", "handle", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        migrate: {
          type: "object",
          description: "Represents an account moving from one PDS instance to another. NOTE: not implemented; account migration uses #identity instead",
          required: ["seq", "did", "migrateTo", "time"],
          nullable: ["migrateTo"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            migrateTo: {
              type: "string"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        tombstone: {
          type: "object",
          description: "Indicates that an account has been deleted. NOTE: may be deprecated in favor of #identity or a future #account event",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        },
        repoOp: {
          type: "object",
          description: "A repo operation, ie a mutation of a single record.",
          required: ["action", "path", "cid"],
          nullable: ["cid"],
          properties: {
            action: {
              type: "string",
              knownValues: ["create", "update", "delete"]
            },
            path: {
              type: "string"
            },
            cid: {
              type: "cid-link",
              description: "For creates and updates, the new record CID. For deletions, null."
            }
          }
        }
      }
    },
    ComAtprotoTempCheckSignupQueue: {
      lexicon: 1,
      id: "com.atproto.temp.checkSignupQueue",
      defs: {
        main: {
          type: "query",
          description: "Check accounts location in signup queue.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["activated"],
              properties: {
                activated: {
                  type: "boolean"
                },
                placeInQueue: {
                  type: "integer"
                },
                estimatedTimeMs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempFetchLabels: {
      lexicon: 1,
      id: "com.atproto.temp.fetchLabels",
      defs: {
        main: {
          type: "query",
          description: "Fetch all labels from a labeler created after a certain date. DEPRECATED: use queryLabels or subscribeLabels instead",
          parameters: {
            type: "params",
            properties: {
              since: {
                type: "integer"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempRequestPhoneVerification: {
      lexicon: 1,
      id: "com.atproto.temp.requestPhoneVerification",
      defs: {
        main: {
          type: "procedure",
          description: "Request a verification code to be sent to the supplied phone number",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["phoneNumber"],
              properties: {
                phoneNumber: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorDefs: {
      lexicon: 1,
      id: "app.bsky.actor.defs",
      defs: {
        profileViewBasic: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileView: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileViewDetailed: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string"
            },
            banner: {
              type: "string"
            },
            followersCount: {
              type: "integer"
            },
            followsCount: {
              type: "integer"
            },
            postsCount: {
              type: "integer"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests.",
          properties: {
            muted: {
              type: "boolean"
            },
            mutedByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            blockedBy: {
              type: "boolean"
            },
            blocking: {
              type: "string",
              format: "at-uri"
            },
            blockingByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            following: {
              type: "string",
              format: "at-uri"
            },
            followedBy: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        preferences: {
          type: "array",
          items: {
            type: "union",
            refs: [
              "lex:app.bsky.actor.defs#adultContentPref",
              "lex:app.bsky.actor.defs#contentLabelPref",
              "lex:app.bsky.actor.defs#savedFeedsPref",
              "lex:app.bsky.actor.defs#personalDetailsPref",
              "lex:app.bsky.actor.defs#feedViewPref",
              "lex:app.bsky.actor.defs#threadViewPref",
              "lex:app.bsky.actor.defs#interestsPref",
              "lex:app.bsky.actor.defs#mutedWordsPref",
              "lex:app.bsky.actor.defs#hiddenPostsPref"
            ]
          }
        },
        adultContentPref: {
          type: "object",
          required: ["enabled"],
          properties: {
            enabled: {
              type: "boolean",
              default: !1
            }
          }
        },
        contentLabelPref: {
          type: "object",
          required: ["label", "visibility"],
          properties: {
            label: {
              type: "string"
            },
            visibility: {
              type: "string",
              knownValues: ["show", "warn", "hide"]
            }
          }
        },
        savedFeedsPref: {
          type: "object",
          required: ["pinned", "saved"],
          properties: {
            pinned: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            saved: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            timelineIndex: {
              type: "integer"
            }
          }
        },
        personalDetailsPref: {
          type: "object",
          properties: {
            birthDate: {
              type: "string",
              format: "datetime",
              description: "The birth date of account owner."
            }
          }
        },
        feedViewPref: {
          type: "object",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              description: "The URI of the feed, or an identifier which describes the feed."
            },
            hideReplies: {
              type: "boolean",
              description: "Hide replies in the feed."
            },
            hideRepliesByUnfollowed: {
              type: "boolean",
              description: "Hide replies in the feed if they are not by followed users."
            },
            hideRepliesByLikeCount: {
              type: "integer",
              description: "Hide replies in the feed if they do not have this number of likes."
            },
            hideReposts: {
              type: "boolean",
              description: "Hide reposts in the feed."
            },
            hideQuotePosts: {
              type: "boolean",
              description: "Hide quote posts in the feed."
            }
          }
        },
        threadViewPref: {
          type: "object",
          properties: {
            sort: {
              type: "string",
              description: "Sorting mode for threads.",
              knownValues: ["oldest", "newest", "most-likes", "random"]
            },
            prioritizeFollowedUsers: {
              type: "boolean",
              description: "Show followed users at the top of all replies."
            }
          }
        },
        interestsPref: {
          type: "object",
          required: ["tags"],
          properties: {
            tags: {
              type: "array",
              maxLength: 100,
              items: {
                type: "string",
                maxLength: 640,
                maxGraphemes: 64
              },
              description: "A list of tags which describe the account owner's interests gathered during onboarding."
            }
          }
        },
        mutedWordTarget: {
          type: "string",
          knownValues: ["content", "tag"],
          maxLength: 640,
          maxGraphemes: 64
        },
        mutedWord: {
          type: "object",
          description: "A word that the account owner has muted.",
          required: ["value", "targets"],
          properties: {
            value: {
              type: "string",
              description: "The muted word itself.",
              maxLength: 1e4,
              maxGraphemes: 1e3
            },
            targets: {
              type: "array",
              description: "The intended targets of the muted word.",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWordTarget"
              }
            }
          }
        },
        mutedWordsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWord"
              },
              description: "A list of words the account owner has muted."
            }
          }
        },
        hiddenPostsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              },
              description: "A list of URIs of posts the account owner has hidden."
            }
          }
        }
      }
    },
    AppBskyActorGetPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.getPreferences",
      defs: {
        main: {
          type: "query",
          description: "Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth.",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetProfile: {
      lexicon: 1,
      id: "app.bsky.actor.getProfile",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Handle or DID of account to fetch profile of."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewDetailed"
            }
          }
        }
      }
    },
    AppBskyActorGetProfiles: {
      lexicon: 1,
      id: "app.bsky.actor.getProfiles",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile views of multiple actors.",
          parameters: {
            type: "params",
            required: ["actors"],
            properties: {
              actors: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-identifier"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["profiles"],
              properties: {
                profiles: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewDetailed"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetSuggestions: {
      lexicon: 1,
      id: "app.bsky.actor.getSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested actors. Expected use is discovery of accounts to follow during new account onboarding.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorProfile: {
      lexicon: 1,
      id: "app.bsky.actor.profile",
      defs: {
        main: {
          type: "record",
          description: "A declaration of a Bluesky account profile.",
          key: "literal:self",
          record: {
            type: "object",
            properties: {
              displayName: {
                type: "string",
                maxGraphemes: 64,
                maxLength: 640
              },
              description: {
                type: "string",
                description: "Free-form profile description text.",
                maxGraphemes: 256,
                maxLength: 2560
              },
              avatar: {
                type: "blob",
                description: "Small image to be displayed next to posts from account. AKA, 'profile picture'",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              banner: {
                type: "blob",
                description: "Larger horizontal image to display behind profile view.",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                description: "Self-label values, specific to the Bluesky application, on the overall account.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              }
            }
          }
        }
      }
    },
    AppBskyActorPutPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.putPreferences",
      defs: {
        main: {
          type: "procedure",
          description: "Set the private preferences attached to the account.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActors: {
      lexicon: 1,
      id: "app.bsky.actor.searchActors",
      defs: {
        main: {
          type: "query",
          description: "Find actors (profiles) matching search criteria. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActorsTypeahead: {
      lexicon: 1,
      id: "app.bsky.actor.searchActorsTypeahead",
      defs: {
        main: {
          type: "query",
          description: "Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query prefix; not a full query string."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 10
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewBasic"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyEmbedExternal: {
      lexicon: 1,
      id: "app.bsky.embed.external",
      defs: {
        main: {
          type: "object",
          description: "A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post).",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#external"
            }
          }
        },
        external: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            }
          }
        },
        view: {
          type: "object",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#viewExternal"
            }
          }
        },
        viewExternal: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "string"
            }
          }
        }
      }
    },
    AppBskyEmbedImages: {
      lexicon: 1,
      id: "app.bsky.embed.images",
      description: "A set of images embedded in a Bluesky record (eg, a post).",
      defs: {
        main: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#image"
              },
              maxLength: 4
            }
          }
        },
        image: {
          type: "object",
          required: ["image", "alt"],
          properties: {
            image: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        },
        aspectRatio: {
          type: "object",
          description: "width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer",
              minimum: 1
            },
            height: {
              type: "integer",
              minimum: 1
            }
          }
        },
        view: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#viewImage"
              },
              maxLength: 4
            }
          }
        },
        viewImage: {
          type: "object",
          required: ["thumb", "fullsize", "alt"],
          properties: {
            thumb: {
              type: "string",
              description: "Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View."
            },
            fullsize: {
              type: "string",
              description: "Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View."
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        }
      }
    },
    AppBskyEmbedRecord: {
      lexicon: 1,
      id: "app.bsky.embed.record",
      description: "A representation of a record embedded in a Bluesky record (eg, a post). For example, a quote-post, or sharing a feed generator record.",
      defs: {
        main: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        view: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.record#viewRecord",
                "lex:app.bsky.embed.record#viewNotFound",
                "lex:app.bsky.embed.record#viewBlocked",
                "lex:app.bsky.feed.defs#generatorView",
                "lex:app.bsky.graph.defs#listView"
              ]
            }
          }
        },
        viewRecord: {
          type: "object",
          required: ["uri", "cid", "author", "value", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            value: {
              type: "unknown",
              description: "The record data itself."
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            embeds: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images#view",
                  "lex:app.bsky.embed.external#view",
                  "lex:app.bsky.embed.record#view",
                  "lex:app.bsky.embed.recordWithMedia#view"
                ]
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        viewNotFound: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        viewBlocked: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        }
      }
    },
    AppBskyEmbedRecordWithMedia: {
      lexicon: 1,
      id: "app.bsky.embed.recordWithMedia",
      description: "A representation of a record embedded in a Bluesky record (eg, a post), alongside other compatible embeds. For example, a quote post and image, or a quote post and external URL card.",
      defs: {
        main: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record"
            },
            media: {
              type: "union",
              refs: ["lex:app.bsky.embed.images", "lex:app.bsky.embed.external"]
            }
          }
        },
        view: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record#view"
            },
            media: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view"
              ]
            }
          }
        }
      }
    },
    AppBskyFeedDefs: {
      lexicon: 1,
      id: "app.bsky.feed.defs",
      defs: {
        postView: {
          type: "object",
          required: ["uri", "cid", "author", "record", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            record: {
              type: "unknown"
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view",
                "lex:app.bsky.embed.record#view",
                "lex:app.bsky.embed.recordWithMedia#view"
              ]
            },
            replyCount: {
              type: "integer"
            },
            repostCount: {
              type: "integer"
            },
            likeCount: {
              type: "integer"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            threadgate: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#threadgateView"
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests.",
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            },
            like: {
              type: "string",
              format: "at-uri"
            },
            replyDisabled: {
              type: "boolean"
            }
          }
        },
        feedViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            reply: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#replyRef"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#reasonRepost"]
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            }
          }
        },
        reasonRepost: {
          type: "object",
          required: ["by", "indexedAt"],
          properties: {
            by: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        threadViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#threadViewPost",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            replies: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.feed.defs#threadViewPost",
                  "lex:app.bsky.feed.defs#notFoundPost",
                  "lex:app.bsky.feed.defs#blockedPost"
                ]
              }
            }
          }
        },
        notFoundPost: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        blockedPost: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        },
        blockedAuthor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            }
          }
        },
        generatorView: {
          type: "object",
          required: ["uri", "cid", "did", "creator", "displayName", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            did: {
              type: "string",
              format: "did"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            displayName: {
              type: "string"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string"
            },
            likeCount: {
              type: "integer",
              minimum: 0
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#generatorViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        generatorViewerState: {
          type: "object",
          properties: {
            like: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonFeedPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "string",
              format: "at-uri"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#skeletonReasonRepost"]
            }
          }
        },
        skeletonReasonRepost: {
          type: "object",
          required: ["repost"],
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        threadgateView: {
          type: "object",
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            record: {
              type: "unknown"
            },
            lists: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.graph.defs#listViewBasic"
              }
            }
          }
        }
      }
    },
    AppBskyFeedDescribeFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.describeFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View).",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "feeds"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.describeFeedGenerator#feed"
                  }
                },
                links: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.describeFeedGenerator#links"
                }
              }
            }
          }
        },
        feed: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string"
            },
            termsOfService: {
              type: "string"
            }
          }
        }
      }
    },
    AppBskyFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.generator",
      defs: {
        main: {
          type: "record",
          description: "Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository.",
          key: "any",
          record: {
            type: "object",
            required: ["did", "displayName", "createdAt"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              displayName: {
                type: "string",
                maxGraphemes: 24,
                maxLength: 240
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                description: "Self-label values",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getActorFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of feeds (feed generator records) created by the actor (in the actor's repo).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getActorLikes",
      defs: {
        main: {
          type: "query",
          description: "Get a list of posts liked by an actor. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetAuthorFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getAuthorFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              filter: {
                type: "string",
                description: "Combinations of post/repost types to include in response.",
                knownValues: [
                  "posts_with_replies",
                  "posts_no_replies",
                  "posts_with_media",
                  "posts_and_author_threads"
                ],
                default: "posts_with_replies"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a hydrated feed from an actor's selected feed generator. Implemented by App View.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator. Implemented by AppView.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the feed generator record."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["view", "isOnline", "isValid"],
              properties: {
                view: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                },
                isOnline: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service has been online recently, or else seems to be inactive."
                },
                isValid: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service is compatible with the record declaration."
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "Get information about a list of feed generators.",
          parameters: {
            type: "params",
            required: ["feeds"],
            properties: {
              feeds: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedSkeleton: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "Reference to feed generator record describing the specific feed being requested."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#skeletonFeedPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getLikes",
      defs: {
        main: {
          type: "query",
          description: "Get like records which reference a subject (by AT-URI and CID).",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the subject (eg, a post record)."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "CID of the subject record (aka, specific version of record), to filter likes."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "likes"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                likes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.getLikes#like"
                  }
                }
              }
            }
          }
        },
        like: {
          type: "object",
          required: ["indexedAt", "createdAt", "actor"],
          properties: {
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            actor: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        }
      }
    },
    AppBskyFeedGetListFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getListFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownList"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPostThread: {
      lexicon: 1,
      id: "app.bsky.feed.getPostThread",
      defs: {
        main: {
          type: "query",
          description: "Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to post record."
              },
              depth: {
                type: "integer",
                description: "How many levels of reply depth should be included in response.",
                default: 6,
                minimum: 0,
                maximum: 1e3
              },
              parentHeight: {
                type: "integer",
                description: "How many levels of parent (and grandparent, etc) post to include.",
                default: 80,
                minimum: 0,
                maximum: 1e3
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["thread"],
              properties: {
                thread: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.defs#threadViewPost",
                    "lex:app.bsky.feed.defs#notFoundPost",
                    "lex:app.bsky.feed.defs#blockedPost"
                  ]
                }
              }
            }
          },
          errors: [
            {
              name: "NotFound"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPosts: {
      lexicon: 1,
      id: "app.bsky.feed.getPosts",
      defs: {
        main: {
          type: "query",
          description: "Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'.",
          parameters: {
            type: "params",
            required: ["uris"],
            properties: {
              uris: {
                type: "array",
                description: "List of post AT-URIs to return hydrated views for.",
                items: {
                  type: "string",
                  format: "at-uri"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetRepostedBy: {
      lexicon: 1,
      id: "app.bsky.feed.getRepostedBy",
      defs: {
        main: {
          type: "query",
          description: "Get a list of reposts for a given post.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of post record"
              },
              cid: {
                type: "string",
                format: "cid",
                description: "If supplied, filters to reposts of specific version (by CID) of the post record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "repostedBy"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                repostedBy: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetSuggestedFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getSuggestedFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested feeds (feed generators) for the requesting account.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetTimeline: {
      lexicon: 1,
      id: "app.bsky.feed.getTimeline",
      defs: {
        main: {
          type: "query",
          description: "Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.",
          parameters: {
            type: "params",
            properties: {
              algorithm: {
                type: "string",
                description: "Variant 'algorithm' for timeline. Implementation-specific. NOTE: most feed flexibility has been moved to feed generator mechanism."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedLike: {
      lexicon: 1,
      id: "app.bsky.feed.like",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'like' of a piece of subject content.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedPost: {
      lexicon: 1,
      id: "app.bsky.feed.post",
      defs: {
        main: {
          type: "record",
          description: "Record containing a Bluesky post.",
          key: "tid",
          record: {
            type: "object",
            required: ["text", "createdAt"],
            properties: {
              text: {
                type: "string",
                maxLength: 3e3,
                maxGraphemes: 300,
                description: "The primary post content. May be an empty string, if there are embeds."
              },
              entities: {
                type: "array",
                description: "DEPRECATED: replaced by app.bsky.richtext.facet.",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.post#entity"
                }
              },
              facets: {
                type: "array",
                description: "Annotations of text (mentions, URLs, hashtags, etc)",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              reply: {
                type: "ref",
                ref: "lex:app.bsky.feed.post#replyRef"
              },
              embed: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images",
                  "lex:app.bsky.embed.external",
                  "lex:app.bsky.embed.record",
                  "lex:app.bsky.embed.recordWithMedia"
                ]
              },
              langs: {
                type: "array",
                description: "Indicates human language of post primary text content.",
                maxLength: 3,
                items: {
                  type: "string",
                  format: "language"
                }
              },
              labels: {
                type: "union",
                description: "Self-label values for this post. Effectively content warnings.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              tags: {
                type: "array",
                description: "Additional hashtags, in addition to any included in post text and facets.",
                maxLength: 8,
                items: {
                  type: "string",
                  maxLength: 640,
                  maxGraphemes: 64
                }
              },
              createdAt: {
                type: "string",
                format: "datetime",
                description: "Client-declared timestamp when this post was originally created."
              }
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            parent: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        entity: {
          type: "object",
          description: "Deprecated: use facets instead.",
          required: ["index", "type", "value"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.feed.post#textSlice"
            },
            type: {
              type: "string",
              description: "Expected values are 'mention' and 'link'."
            },
            value: {
              type: "string"
            }
          }
        },
        textSlice: {
          type: "object",
          description: "Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.",
          required: ["start", "end"],
          properties: {
            start: {
              type: "integer",
              minimum: 0
            },
            end: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyFeedRepost: {
      lexicon: 1,
      id: "app.bsky.feed.repost",
      defs: {
        main: {
          description: "Record representing a 'repost' of an existing Bluesky post.",
          type: "record",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedSearchPosts: {
      lexicon: 1,
      id: "app.bsky.feed.searchPosts",
      defs: {
        main: {
          type: "query",
          description: "Find posts matching search criteria, returning views of those posts.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyFeedThreadgate: {
      lexicon: 1,
      id: "app.bsky.feed.threadgate",
      defs: {
        main: {
          type: "record",
          key: "tid",
          description: "Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository..",
          record: {
            type: "object",
            required: ["post", "createdAt"],
            properties: {
              post: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the post record."
              },
              allow: {
                type: "array",
                maxLength: 5,
                items: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.threadgate#mentionRule",
                    "lex:app.bsky.feed.threadgate#followingRule",
                    "lex:app.bsky.feed.threadgate#listRule"
                  ]
                }
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        },
        mentionRule: {
          type: "object",
          description: "Allow replies from actors mentioned in your post.",
          properties: {}
        },
        followingRule: {
          type: "object",
          description: "Allow replies from actors you follow.",
          properties: {}
        },
        listRule: {
          type: "object",
          description: "Allow replies from actors on a list.",
          required: ["list"],
          properties: {
            list: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    AppBskyGraphBlock: {
      lexicon: 1,
      id: "app.bsky.graph.block",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "DID of the account to be blocked."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphDefs: {
      lexicon: 1,
      id: "app.bsky.graph.defs",
      defs: {
        listViewBasic: {
          type: "object",
          required: ["uri", "cid", "name", "purpose"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listView: {
          type: "object",
          required: ["uri", "cid", "creator", "name", "purpose", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listItemView: {
          type: "object",
          required: ["uri", "subject"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            subject: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        },
        listPurpose: {
          type: "string",
          knownValues: [
            "app.bsky.graph.defs#modlist",
            "app.bsky.graph.defs#curatelist"
          ]
        },
        modlist: {
          type: "token",
          description: "A list of actors to apply an aggregate moderation action (mute/block) on."
        },
        curatelist: {
          type: "token",
          description: "A list of actors used for curation purposes such as list feeds or interaction gating."
        },
        listViewerState: {
          type: "object",
          properties: {
            muted: {
              type: "boolean"
            },
            blocked: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        notFoundActor: {
          type: "object",
          description: "indicates that a handle or DID could not be resolved",
          required: ["actor", "notFound"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        relationship: {
          type: "object",
          description: "lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object)",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            following: {
              type: "string",
              format: "at-uri",
              description: "if the actor follows this DID, this is the AT-URI of the follow record"
            },
            followedBy: {
              type: "string",
              format: "at-uri",
              description: "if the actor is followed by this DID, contains the AT-URI of the follow record"
            }
          }
        }
      }
    },
    AppBskyGraphFollow: {
      lexicon: 1,
      id: "app.bsky.graph.follow",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Enumerates which accounts the requesting account is currently blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blocks"],
              properties: {
                cursor: {
                  type: "string"
                },
                blocks: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollowers: {
      lexicon: 1,
      id: "app.bsky.graph.getFollowers",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which follow a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "followers"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                followers: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollows: {
      lexicon: 1,
      id: "app.bsky.graph.getFollows",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which a specified account (actor) follows.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "follows"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                follows: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetList: {
      lexicon: 1,
      id: "app.bsky.graph.getList",
      defs: {
        main: {
          type: "query",
          description: "Gets a 'view' (with additional context) of a specified list.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of the list record to hydrate."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list", "items"],
              properties: {
                cursor: {
                  type: "string"
                },
                list: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listView"
                },
                items: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listItemView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getListBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get mod lists that the requesting account (actor) is blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getListMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetLists: {
      lexicon: 1,
      id: "app.bsky.graph.getLists",
      defs: {
        main: {
          type: "query",
          description: "Enumerates the lists created by a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "The account (actor) to enumerate lists from."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["mutes"],
              properties: {
                cursor: {
                  type: "string"
                },
                mutes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetRelationships: {
      lexicon: 1,
      id: "app.bsky.graph.getRelationships",
      defs: {
        main: {
          type: "query",
          description: "Enumerates public relationships between one account, and a list of other accounts. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Primary account requesting relationships for."
              },
              others: {
                type: "array",
                description: "List of 'other' accounts to be related back to the primary.",
                maxLength: 30,
                items: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["relationships"],
              properties: {
                actor: {
                  type: "string",
                  format: "did"
                },
                relationships: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:app.bsky.graph.defs#relationship",
                      "lex:app.bsky.graph.defs#notFoundActor"
                    ]
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "ActorNotFound",
              description: "the primary actor at-identifier could not be resolved"
            }
          ]
        }
      }
    },
    AppBskyGraphGetSuggestedFollowsByActor: {
      lexicon: 1,
      id: "app.bsky.graph.getSuggestedFollowsByActor",
      defs: {
        main: {
          type: "query",
          description: "Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphList: {
      lexicon: 1,
      id: "app.bsky.graph.list",
      defs: {
        main: {
          type: "record",
          description: "Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists.",
          key: "tid",
          record: {
            type: "object",
            required: ["name", "purpose", "createdAt"],
            properties: {
              purpose: {
                type: "ref",
                description: "Defines the purpose of the list (aka, moderation-oriented or curration-oriented)",
                ref: "lex:app.bsky.graph.defs#listPurpose"
              },
              name: {
                type: "string",
                maxLength: 64,
                minLength: 1,
                description: "Display name for list; can not be empty."
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListblock: {
      lexicon: 1,
      id: "app.bsky.graph.listblock",
      defs: {
        main: {
          type: "record",
          description: "Record representing a block relationship against an entire an entire list of accounts (actors).",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the mod list record."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListitem: {
      lexicon: 1,
      id: "app.bsky.graph.listitem",
      defs: {
        main: {
          type: "record",
          description: "Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "list", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "The account which is included on the list."
              },
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record (app.bsky.graph.list)."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.muteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified account. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.muteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified list of accounts. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified list of accounts. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationGetUnreadCount: {
      lexicon: 1,
      id: "app.bsky.notification.getUnreadCount",
      defs: {
        main: {
          type: "query",
          description: "Count the number of unread notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["count"],
              properties: {
                count: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationListNotifications: {
      lexicon: 1,
      id: "app.bsky.notification.listNotifications",
      defs: {
        main: {
          type: "query",
          description: "Enumerate notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["notifications"],
              properties: {
                cursor: {
                  type: "string"
                },
                notifications: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.notification.listNotifications#notification"
                  }
                },
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        },
        notification: {
          type: "object",
          required: [
            "uri",
            "cid",
            "author",
            "reason",
            "record",
            "isRead",
            "indexedAt"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            reason: {
              type: "string",
              description: "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', and 'quote'.",
              knownValues: [
                "like",
                "repost",
                "follow",
                "mention",
                "reply",
                "quote"
              ]
            },
            reasonSubject: {
              type: "string",
              format: "at-uri"
            },
            record: {
              type: "unknown"
            },
            isRead: {
              type: "boolean"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        }
      }
    },
    AppBskyNotificationRegisterPush: {
      lexicon: 1,
      id: "app.bsky.notification.registerPush",
      defs: {
        main: {
          type: "procedure",
          description: "Register to receive push notifications, via a specified service, for the requesting account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["serviceDid", "token", "platform", "appId"],
              properties: {
                serviceDid: {
                  type: "string",
                  format: "did"
                },
                token: {
                  type: "string"
                },
                platform: {
                  type: "string",
                  knownValues: ["ios", "android", "web"]
                },
                appId: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationUpdateSeen: {
      lexicon: 1,
      id: "app.bsky.notification.updateSeen",
      defs: {
        main: {
          type: "procedure",
          description: "Notify server that the requesting account has seen notifications. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["seenAt"],
              properties: {
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    AppBskyRichtextFacet: {
      lexicon: 1,
      id: "app.bsky.richtext.facet",
      defs: {
        main: {
          type: "object",
          description: "Annotation of a sub-string within rich text.",
          required: ["index", "features"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.richtext.facet#byteSlice"
            },
            features: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.richtext.facet#mention",
                  "lex:app.bsky.richtext.facet#link",
                  "lex:app.bsky.richtext.facet#tag"
                ]
              }
            }
          }
        },
        mention: {
          type: "object",
          description: "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        link: {
          type: "object",
          description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            }
          }
        },
        tag: {
          type: "object",
          description: "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
          required: ["tag"],
          properties: {
            tag: {
              type: "string",
              maxLength: 640,
              maxGraphemes: 64
            }
          }
        },
        byteSlice: {
          type: "object",
          description: "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
          required: ["byteStart", "byteEnd"],
          properties: {
            byteStart: {
              type: "integer",
              minimum: 0
            },
            byteEnd: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyUnspeccedDefs: {
      lexicon: 1,
      id: "app.bsky.unspecced.defs",
      defs: {
        skeletonSearchPost: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonSearchActor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetPopularFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.unspecced.getPopularFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "An unspecced view of globally popular feed generators.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              query: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetTaggedSuggestions: {
      lexicon: 1,
      id: "app.bsky.unspecced.getTaggedSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggestions (feeds and users) tagged with categories",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.getTaggedSuggestions#suggestion"
                  }
                }
              }
            }
          }
        },
        suggestion: {
          type: "object",
          required: ["tag", "subjectType", "subject"],
          properties: {
            tag: {
              type: "string"
            },
            subjectType: {
              type: "string",
              knownValues: ["actor", "feed"]
            },
            subject: {
              type: "string",
              format: "uri"
            }
          }
        }
      }
    },
    AppBskyUnspeccedSearchActorsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchActorsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Actors (profile) search, returns only skeleton.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended. For typeahead search, only simple term match is supported, not full syntax."
              },
              typeahead: {
                type: "boolean",
                description: "If true, acts as fast/simple 'typeahead' query."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchActor"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyUnspeccedSearchPostsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchPostsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Posts search, returns only skeleton",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    }
  }, xn = Object.values(Kd), R = new En(xn), Bn = {};
  f(Bn, {
    toKnownErr: () => Ud
  });
  function Ud(t) {
    return t;
  }
  var kn = {};
  f(kn, {
    toKnownErr: () => Vd
  });
  function Vd(t) {
    return t;
  }
  var Kn = {};
  f(Kn, {
    toKnownErr: () => Dd
  });
  function Dd(t) {
    return t;
  }
  var Un = {};
  f(Un, {
    toKnownErr: () => Pd
  });
  function Pd(t) {
    return t;
  }
  var Vn = {};
  f(Vn, {
    toKnownErr: () => Nd
  });
  function Nd(t) {
    return t;
  }
  var Dn = {};
  f(Dn, {
    SubjectHasActionError: () => Pn,
    toKnownErr: () => Nn
  });
  var Pn = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Nn(t) {
    return t instanceof w && t.error === "SubjectHasAction" ? new Pn(t) : t;
  }
  var In = {};
  f(In, {
    toKnownErr: () => Id
  });
  function Id(t) {
    return t;
  }
  var jn = {};
  f(jn, {
    toKnownErr: () => jd
  });
  function jd(t) {
    return t;
  }
  var Fn = {};
  f(Fn, {
    toKnownErr: () => Fd
  });
  function Fd(t) {
    return t;
  }
  var qn = {};
  f(qn, {
    toKnownErr: () => qd
  });
  function qd(t) {
    return t;
  }
  var Mn = {};
  f(Mn, {
    toKnownErr: () => Md
  });
  function Md(t) {
    return t;
  }
  var $n = {};
  f($n, {
    RecordNotFoundError: () => On,
    toKnownErr: () => Gn
  });
  var On = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Gn(t) {
    return t instanceof w && t.error === "RecordNotFound" ? new On(t) : t;
  }
  var Xn = {};
  f(Xn, {
    RepoNotFoundError: () => Hn,
    toKnownErr: () => zn
  });
  var Hn = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function zn(t) {
    return t instanceof w && t.error === "RepoNotFound" ? new Hn(t) : t;
  }
  var Zn = {};
  f(Zn, {
    toKnownErr: () => $d
  });
  function $d(t) {
    return t;
  }
  var Wn = {};
  f(Wn, {
    toKnownErr: () => Od
  });
  function Od(t) {
    return t;
  }
  var Jn = {};
  f(Jn, {
    toKnownErr: () => Gd
  });
  function Gd(t) {
    return t;
  }
  var Qn = {};
  f(Qn, {
    toKnownErr: () => Xd
  });
  function Xd(t) {
    return t;
  }
  var Yn = {};
  f(Yn, {
    toKnownErr: () => Hd
  });
  function Hd(t) {
    return t;
  }
  var es = {};
  f(es, {
    toKnownErr: () => zd
  });
  function zd(t) {
    return t;
  }
  var ts = {};
  f(ts, {
    toKnownErr: () => Zd
  });
  function Zd(t) {
    return t;
  }
  var rs = {};
  f(rs, {
    toKnownErr: () => Wd
  });
  function Wd(t) {
    return t;
  }
  var is = {};
  f(is, {
    toKnownErr: () => Jd
  });
  function Jd(t) {
    return t;
  }
  var ns = {};
  f(ns, {
    toKnownErr: () => Qd
  });
  function Qd(t) {
    return t;
  }
  var ss = {};
  f(ss, {
    toKnownErr: () => Yd
  });
  function Yd(t) {
    return t;
  }
  var as = {};
  f(as, {
    toKnownErr: () => em
  });
  function em(t) {
    return t;
  }
  var os = {};
  f(os, {
    toKnownErr: () => tm
  });
  function tm(t) {
    return t;
  }
  var ps = {};
  f(ps, {
    toKnownErr: () => rm
  });
  function rm(t) {
    return t;
  }
  var us = {};
  f(us, {
    toKnownErr: () => im
  });
  function im(t) {
    return t;
  }
  var ls = {};
  f(ls, {
    toKnownErr: () => nm
  });
  function nm(t) {
    return t;
  }
  var fs = {};
  f(fs, {
    toKnownErr: () => sm
  });
  function sm(t) {
    return t;
  }
  var cs = {};
  f(cs, {
    toKnownErr: () => am
  });
  function am(t) {
    return t;
  }
  var ds = {};
  f(ds, {
    toKnownErr: () => om
  });
  function om(t) {
    return t;
  }
  var ms = {};
  f(ms, {
    InvalidSwapError: () => hs,
    isCreate: () => pm,
    isDelete: () => cm,
    isUpdate: () => lm,
    toKnownErr: () => ys,
    validateCreate: () => um,
    validateDelete: () => dm,
    validateUpdate: () => fm
  });
  function b(t) {
    return typeof t == "object" && t !== null;
  }
  function A(t, i) {
    return i in t;
  }
  var hs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ys(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new hs(t) : t;
  }
  function pm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.repo.applyWrites#create";
  }
  function um(t) {
    return R.validate("com.atproto.repo.applyWrites#create", t);
  }
  function lm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.repo.applyWrites#update";
  }
  function fm(t) {
    return R.validate("com.atproto.repo.applyWrites#update", t);
  }
  function cm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.repo.applyWrites#delete";
  }
  function dm(t) {
    return R.validate("com.atproto.repo.applyWrites#delete", t);
  }
  var Es = {};
  f(Es, {
    InvalidSwapError: () => gs,
    toKnownErr: () => Rs
  });
  var gs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Rs(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new gs(t) : t;
  }
  var bs = {};
  f(bs, {
    InvalidSwapError: () => As,
    toKnownErr: () => Ts
  });
  var As = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ts(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new As(t) : t;
  }
  var vs = {};
  f(vs, {
    toKnownErr: () => mm
  });
  function mm(t) {
    return t;
  }
  var ws = {};
  f(ws, {
    toKnownErr: () => hm
  });
  function hm(t) {
    return t;
  }
  var Ls = {};
  f(Ls, {
    toKnownErr: () => ym
  });
  function ym(t) {
    return t;
  }
  var _s = {};
  f(_s, {
    isRecordBlob: () => gm,
    toKnownErr: () => Em,
    validateRecordBlob: () => Rm
  });
  function Em(t) {
    return t;
  }
  function gm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.repo.listMissingBlobs#recordBlob";
  }
  function Rm(t) {
    return R.validate("com.atproto.repo.listMissingBlobs#recordBlob", t);
  }
  var Cs = {};
  f(Cs, {
    isRecord: () => Am,
    toKnownErr: () => bm,
    validateRecord: () => Tm
  });
  function bm(t) {
    return t;
  }
  function Am(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.repo.listRecords#record";
  }
  function Tm(t) {
    return R.validate("com.atproto.repo.listRecords#record", t);
  }
  var Gr = {};
  f(Gr, {
    InvalidSwapError: () => Ss,
    toKnownErr: () => xs
  });
  var Ss = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function xs(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new Ss(t) : t;
  }
  var Bs = {};
  f(Bs, {
    toKnownErr: () => vm
  });
  function vm(t) {
    return t;
  }
  var ks = {};
  f(ks, {
    toKnownErr: () => wm
  });
  function wm(t) {
    return t;
  }
  var Ks = {};
  f(Ks, {
    toKnownErr: () => Lm
  });
  function Lm(t) {
    return t;
  }
  var Us = {};
  f(Us, {
    AccountNotFoundError: () => Vs,
    ExpiredTokenError: () => Ds,
    InvalidEmailError: () => Ns,
    InvalidTokenError: () => Ps,
    toKnownErr: () => Is
  });
  var Vs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ds = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ps = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ns = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Is(t) {
    if (t instanceof w) {
      if (t.error === "AccountNotFound")
        return new Vs(t);
      if (t.error === "ExpiredToken")
        return new Ds(t);
      if (t.error === "InvalidToken")
        return new Ps(t);
      if (t.error === "InvalidEmail")
        return new Ns(t);
    }
    return t;
  }
  var js = {};
  f(js, {
    HandleNotAvailableError: () => $s,
    IncompatibleDidDocError: () => Xs,
    InvalidHandleError: () => Fs,
    InvalidInviteCodeError: () => Ms,
    InvalidPasswordError: () => qs,
    UnresolvableDidError: () => Gs,
    UnsupportedDomainError: () => Os,
    toKnownErr: () => Hs
  });
  var Fs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, qs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ms = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, $s = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Os = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Gs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Xs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Hs(t) {
    if (t instanceof w) {
      if (t.error === "InvalidHandle")
        return new Fs(t);
      if (t.error === "InvalidPassword")
        return new qs(t);
      if (t.error === "InvalidInviteCode")
        return new Ms(t);
      if (t.error === "HandleNotAvailable")
        return new $s(t);
      if (t.error === "UnsupportedDomain")
        return new Os(t);
      if (t.error === "UnresolvableDid")
        return new Gs(t);
      if (t.error === "IncompatibleDidDoc")
        return new Xs(t);
    }
    return t;
  }
  var zs = {};
  f(zs, {
    AccountTakedownError: () => Zs,
    isAppPassword: () => _m,
    toKnownErr: () => Ws,
    validateAppPassword: () => Cm
  });
  var Zs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ws(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new Zs(t) : t;
  }
  function _m(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.createAppPassword#appPassword";
  }
  function Cm(t) {
    return R.validate("com.atproto.server.createAppPassword#appPassword", t);
  }
  var Js = {};
  f(Js, {
    toKnownErr: () => Sm
  });
  function Sm(t) {
    return t;
  }
  var Qs = {};
  f(Qs, {
    isAccountCodes: () => Bm,
    toKnownErr: () => xm,
    validateAccountCodes: () => km
  });
  function xm(t) {
    return t;
  }
  function Bm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.createInviteCodes#accountCodes";
  }
  function km(t) {
    return R.validate("com.atproto.server.createInviteCodes#accountCodes", t);
  }
  var Ys = {};
  f(Ys, {
    AccountTakedownError: () => ea,
    toKnownErr: () => ta
  });
  var ea = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ta(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new ea(t) : t;
  }
  var ra = {};
  f(ra, {
    toKnownErr: () => Km
  });
  function Km(t) {
    return t;
  }
  var ia = {};
  f(ia, {
    ExpiredTokenError: () => na,
    InvalidTokenError: () => sa,
    toKnownErr: () => aa
  });
  var na = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, sa = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function aa(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new na(t);
      if (t.error === "InvalidToken")
        return new sa(t);
    }
    return t;
  }
  var oa = {};
  f(oa, {
    toKnownErr: () => Um
  });
  function Um(t) {
    return t;
  }
  var pa = {};
  f(pa, {
    isLinks: () => Dm,
    toKnownErr: () => Vm,
    validateLinks: () => Pm
  });
  function Vm(t) {
    return t;
  }
  function Dm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.describeServer#links";
  }
  function Pm(t) {
    return R.validate("com.atproto.server.describeServer#links", t);
  }
  var ua = {};
  f(ua, {
    DuplicateCreateError: () => la,
    toKnownErr: () => fa
  });
  var la = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function fa(t) {
    return t instanceof w && t.error === "DuplicateCreate" ? new la(t) : t;
  }
  var ca = {};
  f(ca, {
    toKnownErr: () => Nm
  });
  function Nm(t) {
    return t;
  }
  var da = {};
  f(da, {
    toKnownErr: () => Im
  });
  function Im(t) {
    return t;
  }
  var ma = {};
  f(ma, {
    AccountTakedownError: () => ha,
    isAppPassword: () => jm,
    toKnownErr: () => ya,
    validateAppPassword: () => Fm
  });
  var ha = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ya(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new ha(t) : t;
  }
  function jm(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.listAppPasswords#appPassword";
  }
  function Fm(t) {
    return R.validate("com.atproto.server.listAppPasswords#appPassword", t);
  }
  var Ea = {};
  f(Ea, {
    AccountTakedownError: () => ga,
    toKnownErr: () => Ra
  });
  var ga = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ra(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new ga(t) : t;
  }
  var ba = {};
  f(ba, {
    toKnownErr: () => qm
  });
  function qm(t) {
    return t;
  }
  var Aa = {};
  f(Aa, {
    toKnownErr: () => Mm
  });
  function Mm(t) {
    return t;
  }
  var Ta = {};
  f(Ta, {
    toKnownErr: () => $m
  });
  function $m(t) {
    return t;
  }
  var va = {};
  f(va, {
    toKnownErr: () => Om
  });
  function Om(t) {
    return t;
  }
  var wa = {};
  f(wa, {
    toKnownErr: () => Gm
  });
  function Gm(t) {
    return t;
  }
  var La = {};
  f(La, {
    ExpiredTokenError: () => _a,
    InvalidTokenError: () => Ca,
    toKnownErr: () => Sa
  });
  var _a = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ca = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Sa(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new _a(t);
      if (t.error === "InvalidToken")
        return new Ca(t);
    }
    return t;
  }
  var xa = {};
  f(xa, {
    toKnownErr: () => Xm
  });
  function Xm(t) {
    return t;
  }
  var Ba = {};
  f(Ba, {
    ExpiredTokenError: () => ka,
    InvalidTokenError: () => Ka,
    TokenRequiredError: () => Ua,
    toKnownErr: () => Va
  });
  var ka = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ka = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ua = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Va(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new ka(t);
      if (t.error === "InvalidToken")
        return new Ka(t);
      if (t.error === "TokenRequired")
        return new Ua(t);
    }
    return t;
  }
  var Da = {};
  f(Da, {
    toKnownErr: () => Hm
  });
  function Hm(t) {
    return t;
  }
  var Pa = {};
  f(Pa, {
    toKnownErr: () => zm
  });
  function zm(t) {
    return t;
  }
  var Na = {};
  f(Na, {
    toKnownErr: () => Zm
  });
  function Zm(t) {
    return t;
  }
  var Ia = {};
  f(Ia, {
    HeadNotFoundError: () => ja,
    toKnownErr: () => Fa
  });
  var ja = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Fa(t) {
    return t instanceof w && t.error === "HeadNotFound" ? new ja(t) : t;
  }
  var qa = {};
  f(qa, {
    RepoNotFoundError: () => Ma,
    toKnownErr: () => $a
  });
  var Ma = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function $a(t) {
    return t instanceof w && t.error === "RepoNotFound" ? new Ma(t) : t;
  }
  var Oa = {};
  f(Oa, {
    toKnownErr: () => Wm
  });
  function Wm(t) {
    return t;
  }
  var Ga = {};
  f(Ga, {
    toKnownErr: () => Jm
  });
  function Jm(t) {
    return t;
  }
  var Xa = {};
  f(Xa, {
    toKnownErr: () => Qm
  });
  function Qm(t) {
    return t;
  }
  var Ha = {};
  f(Ha, {
    isRepo: () => eh,
    toKnownErr: () => Ym,
    validateRepo: () => th
  });
  function Ym(t) {
    return t;
  }
  function eh(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.listRepos#repo";
  }
  function th(t) {
    return R.validate("com.atproto.sync.listRepos#repo", t);
  }
  var za = {};
  f(za, {
    toKnownErr: () => rh
  });
  function rh(t) {
    return t;
  }
  var Za = {};
  f(Za, {
    toKnownErr: () => ih
  });
  function ih(t) {
    return t;
  }
  var Wa = {};
  f(Wa, {
    toKnownErr: () => nh
  });
  function nh(t) {
    return t;
  }
  var Ja = {};
  f(Ja, {
    toKnownErr: () => sh
  });
  function sh(t) {
    return t;
  }
  var Qa = {};
  f(Qa, {
    toKnownErr: () => ah
  });
  function ah(t) {
    return t;
  }
  var Ya = {};
  f(Ya, {
    toKnownErr: () => oh
  });
  function oh(t) {
    return t;
  }
  var eo = {};
  f(eo, {
    toKnownErr: () => ph
  });
  function ph(t) {
    return t;
  }
  var to = {};
  f(to, {
    toKnownErr: () => uh
  });
  function uh(t) {
    return t;
  }
  var ro = {};
  f(ro, {
    toKnownErr: () => lh
  });
  function lh(t) {
    return t;
  }
  var io = {};
  f(io, {
    toKnownErr: () => fh
  });
  function fh(t) {
    return t;
  }
  var no = {};
  f(no, {
    toKnownErr: () => ch
  });
  function ch(t) {
    return t;
  }
  var so = {};
  f(so, {
    toKnownErr: () => dh
  });
  function dh(t) {
    return t;
  }
  var ao = {};
  f(ao, {
    isFeed: () => hh,
    isLinks: () => Eh,
    toKnownErr: () => mh,
    validateFeed: () => yh,
    validateLinks: () => gh
  });
  function mh(t) {
    return t;
  }
  function hh(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#feed";
  }
  function yh(t) {
    return R.validate("app.bsky.feed.describeFeedGenerator#feed", t);
  }
  function Eh(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#links";
  }
  function gh(t) {
    return R.validate("app.bsky.feed.describeFeedGenerator#links", t);
  }
  var oo = {};
  f(oo, {
    toKnownErr: () => Rh
  });
  function Rh(t) {
    return t;
  }
  var po = {};
  f(po, {
    BlockedActorError: () => uo,
    BlockedByActorError: () => lo,
    toKnownErr: () => fo
  });
  var uo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, lo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function fo(t) {
    if (t instanceof w) {
      if (t.error === "BlockedActor")
        return new uo(t);
      if (t.error === "BlockedByActor")
        return new lo(t);
    }
    return t;
  }
  var co = {};
  f(co, {
    BlockedActorError: () => mo,
    BlockedByActorError: () => ho,
    toKnownErr: () => yo
  });
  var mo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, ho = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function yo(t) {
    if (t instanceof w) {
      if (t.error === "BlockedActor")
        return new mo(t);
      if (t.error === "BlockedByActor")
        return new ho(t);
    }
    return t;
  }
  var Eo = {};
  f(Eo, {
    UnknownFeedError: () => go,
    toKnownErr: () => Ro
  });
  var go = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ro(t) {
    return t instanceof w && t.error === "UnknownFeed" ? new go(t) : t;
  }
  var bo = {};
  f(bo, {
    toKnownErr: () => bh
  });
  function bh(t) {
    return t;
  }
  var Ao = {};
  f(Ao, {
    toKnownErr: () => Ah
  });
  function Ah(t) {
    return t;
  }
  var To = {};
  f(To, {
    UnknownFeedError: () => vo,
    toKnownErr: () => wo
  });
  var vo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function wo(t) {
    return t instanceof w && t.error === "UnknownFeed" ? new vo(t) : t;
  }
  var Lo = {};
  f(Lo, {
    isLike: () => vh,
    toKnownErr: () => Th,
    validateLike: () => wh
  });
  function Th(t) {
    return t;
  }
  function vh(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.getLikes#like";
  }
  function wh(t) {
    return R.validate("app.bsky.feed.getLikes#like", t);
  }
  var _o = {};
  f(_o, {
    UnknownListError: () => Co,
    toKnownErr: () => So
  });
  var Co = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function So(t) {
    return t instanceof w && t.error === "UnknownList" ? new Co(t) : t;
  }
  var xo = {};
  f(xo, {
    NotFoundError: () => Bo,
    toKnownErr: () => ko
  });
  var Bo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ko(t) {
    return t instanceof w && t.error === "NotFound" ? new Bo(t) : t;
  }
  var Ko = {};
  f(Ko, {
    toKnownErr: () => Lh
  });
  function Lh(t) {
    return t;
  }
  var Uo = {};
  f(Uo, {
    toKnownErr: () => _h
  });
  function _h(t) {
    return t;
  }
  var Vo = {};
  f(Vo, {
    toKnownErr: () => Ch
  });
  function Ch(t) {
    return t;
  }
  var Do = {};
  f(Do, {
    toKnownErr: () => Sh
  });
  function Sh(t) {
    return t;
  }
  var Po = {};
  f(Po, {
    BadQueryStringError: () => No,
    toKnownErr: () => Io
  });
  var No = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Io(t) {
    return t instanceof w && t.error === "BadQueryString" ? new No(t) : t;
  }
  var jo = {};
  f(jo, {
    toKnownErr: () => xh
  });
  function xh(t) {
    return t;
  }
  var Fo = {};
  f(Fo, {
    toKnownErr: () => Bh
  });
  function Bh(t) {
    return t;
  }
  var qo = {};
  f(qo, {
    toKnownErr: () => kh
  });
  function kh(t) {
    return t;
  }
  var Mo = {};
  f(Mo, {
    toKnownErr: () => Kh
  });
  function Kh(t) {
    return t;
  }
  var $o = {};
  f($o, {
    toKnownErr: () => Uh
  });
  function Uh(t) {
    return t;
  }
  var Oo = {};
  f(Oo, {
    toKnownErr: () => Vh
  });
  function Vh(t) {
    return t;
  }
  var Go = {};
  f(Go, {
    toKnownErr: () => Dh
  });
  function Dh(t) {
    return t;
  }
  var Xo = {};
  f(Xo, {
    toKnownErr: () => Ph
  });
  function Ph(t) {
    return t;
  }
  var Ho = {};
  f(Ho, {
    ActorNotFoundError: () => zo,
    toKnownErr: () => Zo
  });
  var zo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Zo(t) {
    return t instanceof w && t.error === "ActorNotFound" ? new zo(t) : t;
  }
  var Wo = {};
  f(Wo, {
    toKnownErr: () => Nh
  });
  function Nh(t) {
    return t;
  }
  var Jo = {};
  f(Jo, {
    toKnownErr: () => Ih
  });
  function Ih(t) {
    return t;
  }
  var Qo = {};
  f(Qo, {
    toKnownErr: () => jh
  });
  function jh(t) {
    return t;
  }
  var Yo = {};
  f(Yo, {
    toKnownErr: () => Fh
  });
  function Fh(t) {
    return t;
  }
  var ep = {};
  f(ep, {
    toKnownErr: () => qh
  });
  function qh(t) {
    return t;
  }
  var tp = {};
  f(tp, {
    toKnownErr: () => Mh
  });
  function Mh(t) {
    return t;
  }
  var rp = {};
  f(rp, {
    isNotification: () => Oh,
    toKnownErr: () => $h,
    validateNotification: () => Gh
  });
  function $h(t) {
    return t;
  }
  function Oh(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.notification.listNotifications#notification";
  }
  function Gh(t) {
    return R.validate("app.bsky.notification.listNotifications#notification", t);
  }
  var ip = {};
  f(ip, {
    toKnownErr: () => Xh
  });
  function Xh(t) {
    return t;
  }
  var np = {};
  f(np, {
    toKnownErr: () => Hh
  });
  function Hh(t) {
    return t;
  }
  var sp = {};
  f(sp, {
    toKnownErr: () => zh
  });
  function zh(t) {
    return t;
  }
  var ap = {};
  f(ap, {
    isSuggestion: () => Wh,
    toKnownErr: () => Zh,
    validateSuggestion: () => Jh
  });
  function Zh(t) {
    return t;
  }
  function Wh(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.unspecced.getTaggedSuggestions#suggestion";
  }
  function Jh(t) {
    return R.validate("app.bsky.unspecced.getTaggedSuggestions#suggestion", t);
  }
  var op = {};
  f(op, {
    BadQueryStringError: () => pp,
    toKnownErr: () => up
  });
  var pp = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function up(t) {
    return t instanceof w && t.error === "BadQueryString" ? new pp(t) : t;
  }
  var lp = {};
  f(lp, {
    BadQueryStringError: () => fp,
    toKnownErr: () => cp
  });
  var fp = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function cp(t) {
    return t instanceof w && t.error === "BadQueryString" ? new fp(t) : t;
  }
  var dp = {};
  f(dp, {
    REVIEWCLOSED: () => Fy,
    REVIEWESCALATED: () => jy,
    REVIEWOPEN: () => Iy,
    isAccountView: () => my,
    isBlobView: () => Ky,
    isCommunicationTemplateView: () => fE,
    isImageDetails: () => Vy,
    isModEventAcknowledge: () => Yy,
    isModEventComment: () => Hy,
    isModEventEmail: () => oE,
    isModEventEscalate: () => tE,
    isModEventLabel: () => Jy,
    isModEventMute: () => iE,
    isModEventReport: () => Zy,
    isModEventResolveAppeal: () => Gy,
    isModEventReverseTakedown: () => $y,
    isModEventTag: () => uE,
    isModEventTakedown: () => qy,
    isModEventUnmute: () => sE,
    isModEventView: () => ey,
    isModEventViewDetail: () => ry,
    isModeration: () => Sy,
    isModerationDetail: () => By,
    isRecordView: () => Ty,
    isRecordViewDetail: () => wy,
    isRecordViewNotFound: () => _y,
    isRepoBlobRef: () => by,
    isRepoRef: () => gy,
    isRepoView: () => ly,
    isRepoViewDetail: () => cy,
    isRepoViewNotFound: () => yy,
    isReportView: () => ny,
    isReportViewDetail: () => py,
    isStatusAttr: () => Qh,
    isSubjectStatusView: () => ay,
    isVideoDetails: () => Py,
    validateAccountView: () => hy,
    validateBlobView: () => Uy,
    validateCommunicationTemplateView: () => cE,
    validateImageDetails: () => Dy,
    validateModEventAcknowledge: () => eE,
    validateModEventComment: () => zy,
    validateModEventEmail: () => pE,
    validateModEventEscalate: () => rE,
    validateModEventLabel: () => Qy,
    validateModEventMute: () => nE,
    validateModEventReport: () => Wy,
    validateModEventResolveAppeal: () => Xy,
    validateModEventReverseTakedown: () => Oy,
    validateModEventTag: () => lE,
    validateModEventTakedown: () => My,
    validateModEventUnmute: () => aE,
    validateModEventView: () => ty,
    validateModEventViewDetail: () => iy,
    validateModeration: () => xy,
    validateModerationDetail: () => ky,
    validateRecordView: () => vy,
    validateRecordViewDetail: () => Ly,
    validateRecordViewNotFound: () => Cy,
    validateRepoBlobRef: () => Ay,
    validateRepoRef: () => Ry,
    validateRepoView: () => fy,
    validateRepoViewDetail: () => dy,
    validateRepoViewNotFound: () => Ey,
    validateReportView: () => sy,
    validateReportViewDetail: () => uy,
    validateStatusAttr: () => Yh,
    validateSubjectStatusView: () => oy,
    validateVideoDetails: () => Ny
  });
  function Qh(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#statusAttr";
  }
  function Yh(t) {
    return R.validate("com.atproto.admin.defs#statusAttr", t);
  }
  function ey(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventView";
  }
  function ty(t) {
    return R.validate("com.atproto.admin.defs#modEventView", t);
  }
  function ry(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventViewDetail";
  }
  function iy(t) {
    return R.validate("com.atproto.admin.defs#modEventViewDetail", t);
  }
  function ny(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#reportView";
  }
  function sy(t) {
    return R.validate("com.atproto.admin.defs#reportView", t);
  }
  function ay(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#subjectStatusView";
  }
  function oy(t) {
    return R.validate("com.atproto.admin.defs#subjectStatusView", t);
  }
  function py(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#reportViewDetail";
  }
  function uy(t) {
    return R.validate("com.atproto.admin.defs#reportViewDetail", t);
  }
  function ly(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#repoView";
  }
  function fy(t) {
    return R.validate("com.atproto.admin.defs#repoView", t);
  }
  function cy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#repoViewDetail";
  }
  function dy(t) {
    return R.validate("com.atproto.admin.defs#repoViewDetail", t);
  }
  function my(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#accountView";
  }
  function hy(t) {
    return R.validate("com.atproto.admin.defs#accountView", t);
  }
  function yy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#repoViewNotFound";
  }
  function Ey(t) {
    return R.validate("com.atproto.admin.defs#repoViewNotFound", t);
  }
  function gy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#repoRef";
  }
  function Ry(t) {
    return R.validate("com.atproto.admin.defs#repoRef", t);
  }
  function by(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#repoBlobRef";
  }
  function Ay(t) {
    return R.validate("com.atproto.admin.defs#repoBlobRef", t);
  }
  function Ty(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#recordView";
  }
  function vy(t) {
    return R.validate("com.atproto.admin.defs#recordView", t);
  }
  function wy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#recordViewDetail";
  }
  function Ly(t) {
    return R.validate("com.atproto.admin.defs#recordViewDetail", t);
  }
  function _y(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#recordViewNotFound";
  }
  function Cy(t) {
    return R.validate("com.atproto.admin.defs#recordViewNotFound", t);
  }
  function Sy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#moderation";
  }
  function xy(t) {
    return R.validate("com.atproto.admin.defs#moderation", t);
  }
  function By(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#moderationDetail";
  }
  function ky(t) {
    return R.validate("com.atproto.admin.defs#moderationDetail", t);
  }
  function Ky(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#blobView";
  }
  function Uy(t) {
    return R.validate("com.atproto.admin.defs#blobView", t);
  }
  function Vy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#imageDetails";
  }
  function Dy(t) {
    return R.validate("com.atproto.admin.defs#imageDetails", t);
  }
  function Py(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#videoDetails";
  }
  function Ny(t) {
    return R.validate("com.atproto.admin.defs#videoDetails", t);
  }
  var Iy = "com.atproto.admin.defs#reviewOpen", jy = "com.atproto.admin.defs#reviewEscalated", Fy = "com.atproto.admin.defs#reviewClosed";
  function qy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventTakedown";
  }
  function My(t) {
    return R.validate("com.atproto.admin.defs#modEventTakedown", t);
  }
  function $y(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventReverseTakedown";
  }
  function Oy(t) {
    return R.validate("com.atproto.admin.defs#modEventReverseTakedown", t);
  }
  function Gy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventResolveAppeal";
  }
  function Xy(t) {
    return R.validate("com.atproto.admin.defs#modEventResolveAppeal", t);
  }
  function Hy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventComment";
  }
  function zy(t) {
    return R.validate("com.atproto.admin.defs#modEventComment", t);
  }
  function Zy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventReport";
  }
  function Wy(t) {
    return R.validate("com.atproto.admin.defs#modEventReport", t);
  }
  function Jy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventLabel";
  }
  function Qy(t) {
    return R.validate("com.atproto.admin.defs#modEventLabel", t);
  }
  function Yy(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventAcknowledge";
  }
  function eE(t) {
    return R.validate("com.atproto.admin.defs#modEventAcknowledge", t);
  }
  function tE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventEscalate";
  }
  function rE(t) {
    return R.validate("com.atproto.admin.defs#modEventEscalate", t);
  }
  function iE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventMute";
  }
  function nE(t) {
    return R.validate("com.atproto.admin.defs#modEventMute", t);
  }
  function sE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventUnmute";
  }
  function aE(t) {
    return R.validate("com.atproto.admin.defs#modEventUnmute", t);
  }
  function oE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventEmail";
  }
  function pE(t) {
    return R.validate("com.atproto.admin.defs#modEventEmail", t);
  }
  function uE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#modEventTag";
  }
  function lE(t) {
    return R.validate("com.atproto.admin.defs#modEventTag", t);
  }
  function fE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.admin.defs#communicationTemplateView";
  }
  function cE(t) {
    return R.validate("com.atproto.admin.defs#communicationTemplateView", t);
  }
  var mp = {};
  f(mp, {
    isLabel: () => dE,
    isSelfLabel: () => EE,
    isSelfLabels: () => hE,
    validateLabel: () => mE,
    validateSelfLabel: () => gE,
    validateSelfLabels: () => yE
  });
  function dE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.label.defs#label";
  }
  function mE(t) {
    return R.validate("com.atproto.label.defs#label", t);
  }
  function hE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.label.defs#selfLabels";
  }
  function yE(t) {
    return R.validate("com.atproto.label.defs#selfLabels", t);
  }
  function EE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.label.defs#selfLabel";
  }
  function gE(t) {
    return R.validate("com.atproto.label.defs#selfLabel", t);
  }
  var hp = {};
  f(hp, {
    isInfo: () => AE,
    isLabels: () => RE,
    validateInfo: () => TE,
    validateLabels: () => bE
  });
  function RE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#labels";
  }
  function bE(t) {
    return R.validate("com.atproto.label.subscribeLabels#labels", t);
  }
  function AE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#info";
  }
  function TE(t) {
    return R.validate("com.atproto.label.subscribeLabels#info", t);
  }
  var yp = {};
  f(yp, {
    REASONAPPEAL: () => xE,
    REASONMISLEADING: () => LE,
    REASONOTHER: () => SE,
    REASONRUDE: () => CE,
    REASONSEXUAL: () => _E,
    REASONSPAM: () => vE,
    REASONVIOLATION: () => wE
  });
  var vE = "com.atproto.moderation.defs#reasonSpam", wE = "com.atproto.moderation.defs#reasonViolation", LE = "com.atproto.moderation.defs#reasonMisleading", _E = "com.atproto.moderation.defs#reasonSexual", CE = "com.atproto.moderation.defs#reasonRude", SE = "com.atproto.moderation.defs#reasonOther", xE = "com.atproto.moderation.defs#reasonAppeal", Ep = {};
  f(Ep, {
    isMain: () => BE,
    validateMain: () => kE
  });
  function BE(t) {
    return b(t) && A(t, "$type") && (t.$type === "com.atproto.repo.strongRef#main" || t.$type === "com.atproto.repo.strongRef");
  }
  function kE(t) {
    return R.validate("com.atproto.repo.strongRef#main", t);
  }
  var gp = {};
  f(gp, {
    isInviteCode: () => KE,
    isInviteCodeUse: () => VE,
    validateInviteCode: () => UE,
    validateInviteCodeUse: () => DE
  });
  function KE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.defs#inviteCode";
  }
  function UE(t) {
    return R.validate("com.atproto.server.defs#inviteCode", t);
  }
  function VE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.server.defs#inviteCodeUse";
  }
  function DE(t) {
    return R.validate("com.atproto.server.defs#inviteCodeUse", t);
  }
  var Rp = {};
  f(Rp, {
    isCommit: () => PE,
    isHandle: () => FE,
    isIdentity: () => IE,
    isInfo: () => XE,
    isMigrate: () => ME,
    isRepoOp: () => zE,
    isTombstone: () => OE,
    validateCommit: () => NE,
    validateHandle: () => qE,
    validateIdentity: () => jE,
    validateInfo: () => HE,
    validateMigrate: () => $E,
    validateRepoOp: () => ZE,
    validateTombstone: () => GE
  });
  function PE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#commit";
  }
  function NE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#commit", t);
  }
  function IE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#identity";
  }
  function jE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#identity", t);
  }
  function FE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#handle";
  }
  function qE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#handle", t);
  }
  function ME(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#migrate";
  }
  function $E(t) {
    return R.validate("com.atproto.sync.subscribeRepos#migrate", t);
  }
  function OE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#tombstone";
  }
  function GE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#tombstone", t);
  }
  function XE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#info";
  }
  function HE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#info", t);
  }
  function zE(t) {
    return b(t) && A(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#repoOp";
  }
  function ZE(t) {
    return R.validate("com.atproto.sync.subscribeRepos#repoOp", t);
  }
  var k = {};
  f(k, {
    isAdultContentPref: () => ng,
    isContentLabelPref: () => ag,
    isFeedViewPref: () => cg,
    isHiddenPostsPref: () => Tg,
    isInterestsPref: () => yg,
    isMutedWord: () => gg,
    isMutedWordsPref: () => bg,
    isPersonalDetailsPref: () => lg,
    isProfileView: () => QE,
    isProfileViewBasic: () => WE,
    isProfileViewDetailed: () => eg,
    isSavedFeedsPref: () => pg,
    isThreadViewPref: () => mg,
    isViewerState: () => rg,
    validateAdultContentPref: () => sg,
    validateContentLabelPref: () => og,
    validateFeedViewPref: () => dg,
    validateHiddenPostsPref: () => vg,
    validateInterestsPref: () => Eg,
    validateMutedWord: () => Rg,
    validateMutedWordsPref: () => Ag,
    validatePersonalDetailsPref: () => fg,
    validateProfileView: () => YE,
    validateProfileViewBasic: () => JE,
    validateProfileViewDetailed: () => tg,
    validateSavedFeedsPref: () => ug,
    validateThreadViewPref: () => hg,
    validateViewerState: () => ig
  });
  function WE(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewBasic";
  }
  function JE(t) {
    return R.validate("app.bsky.actor.defs#profileViewBasic", t);
  }
  function QE(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#profileView";
  }
  function YE(t) {
    return R.validate("app.bsky.actor.defs#profileView", t);
  }
  function eg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewDetailed";
  }
  function tg(t) {
    return R.validate("app.bsky.actor.defs#profileViewDetailed", t);
  }
  function rg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#viewerState";
  }
  function ig(t) {
    return R.validate("app.bsky.actor.defs#viewerState", t);
  }
  function ng(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#adultContentPref";
  }
  function sg(t) {
    return R.validate("app.bsky.actor.defs#adultContentPref", t);
  }
  function ag(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#contentLabelPref";
  }
  function og(t) {
    return R.validate("app.bsky.actor.defs#contentLabelPref", t);
  }
  function pg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#savedFeedsPref";
  }
  function ug(t) {
    return R.validate("app.bsky.actor.defs#savedFeedsPref", t);
  }
  function lg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#personalDetailsPref";
  }
  function fg(t) {
    return R.validate("app.bsky.actor.defs#personalDetailsPref", t);
  }
  function cg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#feedViewPref";
  }
  function dg(t) {
    return R.validate("app.bsky.actor.defs#feedViewPref", t);
  }
  function mg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#threadViewPref";
  }
  function hg(t) {
    return R.validate("app.bsky.actor.defs#threadViewPref", t);
  }
  function yg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#interestsPref";
  }
  function Eg(t) {
    return R.validate("app.bsky.actor.defs#interestsPref", t);
  }
  function gg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWord";
  }
  function Rg(t) {
    return R.validate("app.bsky.actor.defs#mutedWord", t);
  }
  function bg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWordsPref";
  }
  function Ag(t) {
    return R.validate("app.bsky.actor.defs#mutedWordsPref", t);
  }
  function Tg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.actor.defs#hiddenPostsPref";
  }
  function vg(t) {
    return R.validate("app.bsky.actor.defs#hiddenPostsPref", t);
  }
  var Xr = {};
  f(Xr, {
    isRecord: () => wg,
    validateRecord: () => Lg
  });
  function wg(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.actor.profile#main" || t.$type === "app.bsky.actor.profile");
  }
  function Lg(t) {
    return R.validate("app.bsky.actor.profile#main", t);
  }
  var bp = {};
  f(bp, {
    isExternal: () => Sg,
    isMain: () => _g,
    isView: () => Bg,
    isViewExternal: () => Kg,
    validateExternal: () => xg,
    validateMain: () => Cg,
    validateView: () => kg,
    validateViewExternal: () => Ug
  });
  function _g(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.embed.external#main" || t.$type === "app.bsky.embed.external");
  }
  function Cg(t) {
    return R.validate("app.bsky.embed.external#main", t);
  }
  function Sg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.external#external";
  }
  function xg(t) {
    return R.validate("app.bsky.embed.external#external", t);
  }
  function Bg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.external#view";
  }
  function kg(t) {
    return R.validate("app.bsky.embed.external#view", t);
  }
  function Kg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.external#viewExternal";
  }
  function Ug(t) {
    return R.validate("app.bsky.embed.external#viewExternal", t);
  }
  var Ap = {};
  f(Ap, {
    isAspectRatio: () => Ig,
    isImage: () => Pg,
    isMain: () => Vg,
    isView: () => Fg,
    isViewImage: () => Mg,
    validateAspectRatio: () => jg,
    validateImage: () => Ng,
    validateMain: () => Dg,
    validateView: () => qg,
    validateViewImage: () => $g
  });
  function Vg(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.embed.images#main" || t.$type === "app.bsky.embed.images");
  }
  function Dg(t) {
    return R.validate("app.bsky.embed.images#main", t);
  }
  function Pg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.images#image";
  }
  function Ng(t) {
    return R.validate("app.bsky.embed.images#image", t);
  }
  function Ig(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.images#aspectRatio";
  }
  function jg(t) {
    return R.validate("app.bsky.embed.images#aspectRatio", t);
  }
  function Fg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.images#view";
  }
  function qg(t) {
    return R.validate("app.bsky.embed.images#view", t);
  }
  function Mg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.images#viewImage";
  }
  function $g(t) {
    return R.validate("app.bsky.embed.images#viewImage", t);
  }
  var Ie = {};
  f(Ie, {
    isMain: () => Og,
    isView: () => Xg,
    isViewBlocked: () => Qg,
    isViewNotFound: () => Wg,
    isViewRecord: () => zg,
    validateMain: () => Gg,
    validateView: () => Hg,
    validateViewBlocked: () => Yg,
    validateViewNotFound: () => Jg,
    validateViewRecord: () => Zg
  });
  function Og(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.embed.record#main" || t.$type === "app.bsky.embed.record");
  }
  function Gg(t) {
    return R.validate("app.bsky.embed.record#main", t);
  }
  function Xg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.record#view";
  }
  function Hg(t) {
    return R.validate("app.bsky.embed.record#view", t);
  }
  function zg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.record#viewRecord";
  }
  function Zg(t) {
    return R.validate("app.bsky.embed.record#viewRecord", t);
  }
  function Wg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.record#viewNotFound";
  }
  function Jg(t) {
    return R.validate("app.bsky.embed.record#viewNotFound", t);
  }
  function Qg(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.record#viewBlocked";
  }
  function Yg(t) {
    return R.validate("app.bsky.embed.record#viewBlocked", t);
  }
  var Hr = {};
  f(Hr, {
    isMain: () => eR,
    isView: () => rR,
    validateMain: () => tR,
    validateView: () => iR
  });
  function eR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.embed.recordWithMedia#main" || t.$type === "app.bsky.embed.recordWithMedia");
  }
  function tR(t) {
    return R.validate("app.bsky.embed.recordWithMedia#main", t);
  }
  function rR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.embed.recordWithMedia#view";
  }
  function iR(t) {
    return R.validate("app.bsky.embed.recordWithMedia#view", t);
  }
  var Tp = {};
  f(Tp, {
    isBlockedAuthor: () => bR,
    isBlockedPost: () => gR,
    isFeedViewPost: () => pR,
    isGeneratorView: () => TR,
    isGeneratorViewerState: () => wR,
    isNotFoundPost: () => yR,
    isPostView: () => nR,
    isReasonRepost: () => cR,
    isReplyRef: () => lR,
    isSkeletonFeedPost: () => _R,
    isSkeletonReasonRepost: () => SR,
    isThreadViewPost: () => mR,
    isThreadgateView: () => BR,
    isViewerState: () => aR,
    validateBlockedAuthor: () => AR,
    validateBlockedPost: () => RR,
    validateFeedViewPost: () => uR,
    validateGeneratorView: () => vR,
    validateGeneratorViewerState: () => LR,
    validateNotFoundPost: () => ER,
    validatePostView: () => sR,
    validateReasonRepost: () => dR,
    validateReplyRef: () => fR,
    validateSkeletonFeedPost: () => CR,
    validateSkeletonReasonRepost: () => xR,
    validateThreadViewPost: () => hR,
    validateThreadgateView: () => kR,
    validateViewerState: () => oR
  });
  function nR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#postView";
  }
  function sR(t) {
    return R.validate("app.bsky.feed.defs#postView", t);
  }
  function aR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#viewerState";
  }
  function oR(t) {
    return R.validate("app.bsky.feed.defs#viewerState", t);
  }
  function pR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#feedViewPost";
  }
  function uR(t) {
    return R.validate("app.bsky.feed.defs#feedViewPost", t);
  }
  function lR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#replyRef";
  }
  function fR(t) {
    return R.validate("app.bsky.feed.defs#replyRef", t);
  }
  function cR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#reasonRepost";
  }
  function dR(t) {
    return R.validate("app.bsky.feed.defs#reasonRepost", t);
  }
  function mR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#threadViewPost";
  }
  function hR(t) {
    return R.validate("app.bsky.feed.defs#threadViewPost", t);
  }
  function yR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#notFoundPost";
  }
  function ER(t) {
    return R.validate("app.bsky.feed.defs#notFoundPost", t);
  }
  function gR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#blockedPost";
  }
  function RR(t) {
    return R.validate("app.bsky.feed.defs#blockedPost", t);
  }
  function bR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#blockedAuthor";
  }
  function AR(t) {
    return R.validate("app.bsky.feed.defs#blockedAuthor", t);
  }
  function TR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#generatorView";
  }
  function vR(t) {
    return R.validate("app.bsky.feed.defs#generatorView", t);
  }
  function wR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#generatorViewerState";
  }
  function LR(t) {
    return R.validate("app.bsky.feed.defs#generatorViewerState", t);
  }
  function _R(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonFeedPost";
  }
  function CR(t) {
    return R.validate("app.bsky.feed.defs#skeletonFeedPost", t);
  }
  function SR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonReasonRepost";
  }
  function xR(t) {
    return R.validate("app.bsky.feed.defs#skeletonReasonRepost", t);
  }
  function BR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.defs#threadgateView";
  }
  function kR(t) {
    return R.validate("app.bsky.feed.defs#threadgateView", t);
  }
  var vp = {};
  f(vp, {
    isRecord: () => KR,
    validateRecord: () => UR
  });
  function KR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.feed.generator#main" || t.$type === "app.bsky.feed.generator");
  }
  function UR(t) {
    return R.validate("app.bsky.feed.generator#main", t);
  }
  var wp = {};
  f(wp, {
    isRecord: () => VR,
    validateRecord: () => DR
  });
  function VR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.feed.like#main" || t.$type === "app.bsky.feed.like");
  }
  function DR(t) {
    return R.validate("app.bsky.feed.like#main", t);
  }
  var Lp = {};
  f(Lp, {
    isEntity: () => FR,
    isRecord: () => PR,
    isReplyRef: () => IR,
    isTextSlice: () => MR,
    validateEntity: () => qR,
    validateRecord: () => NR,
    validateReplyRef: () => jR,
    validateTextSlice: () => $R
  });
  function PR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.feed.post#main" || t.$type === "app.bsky.feed.post");
  }
  function NR(t) {
    return R.validate("app.bsky.feed.post#main", t);
  }
  function IR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.post#replyRef";
  }
  function jR(t) {
    return R.validate("app.bsky.feed.post#replyRef", t);
  }
  function FR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.post#entity";
  }
  function qR(t) {
    return R.validate("app.bsky.feed.post#entity", t);
  }
  function MR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.post#textSlice";
  }
  function $R(t) {
    return R.validate("app.bsky.feed.post#textSlice", t);
  }
  var _p = {};
  f(_p, {
    isRecord: () => OR,
    validateRecord: () => GR
  });
  function OR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.feed.repost#main" || t.$type === "app.bsky.feed.repost");
  }
  function GR(t) {
    return R.validate("app.bsky.feed.repost#main", t);
  }
  var Cp = {};
  f(Cp, {
    isFollowingRule: () => WR,
    isListRule: () => QR,
    isMentionRule: () => zR,
    isRecord: () => XR,
    validateFollowingRule: () => JR,
    validateListRule: () => YR,
    validateMentionRule: () => ZR,
    validateRecord: () => HR
  });
  function XR(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.feed.threadgate#main" || t.$type === "app.bsky.feed.threadgate");
  }
  function HR(t) {
    return R.validate("app.bsky.feed.threadgate#main", t);
  }
  function zR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.threadgate#mentionRule";
  }
  function ZR(t) {
    return R.validate("app.bsky.feed.threadgate#mentionRule", t);
  }
  function WR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.threadgate#followingRule";
  }
  function JR(t) {
    return R.validate("app.bsky.feed.threadgate#followingRule", t);
  }
  function QR(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.feed.threadgate#listRule";
  }
  function YR(t) {
    return R.validate("app.bsky.feed.threadgate#listRule", t);
  }
  var Sp = {};
  f(Sp, {
    isRecord: () => eb,
    validateRecord: () => tb
  });
  function eb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.graph.block#main" || t.$type === "app.bsky.graph.block");
  }
  function tb(t) {
    return R.validate("app.bsky.graph.block#main", t);
  }
  var xp = {};
  f(xp, {
    CURATELIST: () => ub,
    MODLIST: () => pb,
    isListItemView: () => ab,
    isListView: () => nb,
    isListViewBasic: () => rb,
    isListViewerState: () => lb,
    isNotFoundActor: () => cb,
    isRelationship: () => mb,
    validateListItemView: () => ob,
    validateListView: () => sb,
    validateListViewBasic: () => ib,
    validateListViewerState: () => fb,
    validateNotFoundActor: () => db,
    validateRelationship: () => hb
  });
  function rb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#listViewBasic";
  }
  function ib(t) {
    return R.validate("app.bsky.graph.defs#listViewBasic", t);
  }
  function nb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#listView";
  }
  function sb(t) {
    return R.validate("app.bsky.graph.defs#listView", t);
  }
  function ab(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#listItemView";
  }
  function ob(t) {
    return R.validate("app.bsky.graph.defs#listItemView", t);
  }
  var pb = "app.bsky.graph.defs#modlist", ub = "app.bsky.graph.defs#curatelist";
  function lb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#listViewerState";
  }
  function fb(t) {
    return R.validate("app.bsky.graph.defs#listViewerState", t);
  }
  function cb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#notFoundActor";
  }
  function db(t) {
    return R.validate("app.bsky.graph.defs#notFoundActor", t);
  }
  function mb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.graph.defs#relationship";
  }
  function hb(t) {
    return R.validate("app.bsky.graph.defs#relationship", t);
  }
  var Bp = {};
  f(Bp, {
    isRecord: () => yb,
    validateRecord: () => Eb
  });
  function yb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.graph.follow#main" || t.$type === "app.bsky.graph.follow");
  }
  function Eb(t) {
    return R.validate("app.bsky.graph.follow#main", t);
  }
  var kp = {};
  f(kp, {
    isRecord: () => gb,
    validateRecord: () => Rb
  });
  function gb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.graph.list#main" || t.$type === "app.bsky.graph.list");
  }
  function Rb(t) {
    return R.validate("app.bsky.graph.list#main", t);
  }
  var Kp = {};
  f(Kp, {
    isRecord: () => bb,
    validateRecord: () => Ab
  });
  function bb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.graph.listblock#main" || t.$type === "app.bsky.graph.listblock");
  }
  function Ab(t) {
    return R.validate("app.bsky.graph.listblock#main", t);
  }
  var Up = {};
  f(Up, {
    isRecord: () => Tb,
    validateRecord: () => vb
  });
  function Tb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.graph.listitem#main" || t.$type === "app.bsky.graph.listitem");
  }
  function vb(t) {
    return R.validate("app.bsky.graph.listitem#main", t);
  }
  var je = {};
  f(je, {
    isByteSlice: () => Kb,
    isLink: () => Sb,
    isMain: () => wb,
    isMention: () => _b,
    isTag: () => Bb,
    validateByteSlice: () => Ub,
    validateLink: () => xb,
    validateMain: () => Lb,
    validateMention: () => Cb,
    validateTag: () => kb
  });
  function wb(t) {
    return b(t) && A(t, "$type") && (t.$type === "app.bsky.richtext.facet#main" || t.$type === "app.bsky.richtext.facet");
  }
  function Lb(t) {
    return R.validate("app.bsky.richtext.facet#main", t);
  }
  function _b(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.richtext.facet#mention";
  }
  function Cb(t) {
    return R.validate("app.bsky.richtext.facet#mention", t);
  }
  function Sb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.richtext.facet#link";
  }
  function xb(t) {
    return R.validate("app.bsky.richtext.facet#link", t);
  }
  function Bb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.richtext.facet#tag";
  }
  function kb(t) {
    return R.validate("app.bsky.richtext.facet#tag", t);
  }
  function Kb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.richtext.facet#byteSlice";
  }
  function Ub(t) {
    return R.validate("app.bsky.richtext.facet#byteSlice", t);
  }
  var Vp = {};
  f(Vp, {
    isSkeletonSearchActor: () => Pb,
    isSkeletonSearchPost: () => Vb,
    validateSkeletonSearchActor: () => Nb,
    validateSkeletonSearchPost: () => Db
  });
  function Vb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchPost";
  }
  function Db(t) {
    return R.validate("app.bsky.unspecced.defs#skeletonSearchPost", t);
  }
  function Pb(t) {
    return b(t) && A(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchActor";
  }
  function Nb(t) {
    return R.validate("app.bsky.unspecced.defs#skeletonSearchActor", t);
  }
  var Ib = {
    DefsReviewOpen: "com.atproto.admin.defs#reviewOpen",
    DefsReviewEscalated: "com.atproto.admin.defs#reviewEscalated",
    DefsReviewClosed: "com.atproto.admin.defs#reviewClosed"
  }, jb = {
    DefsReasonSpam: "com.atproto.moderation.defs#reasonSpam",
    DefsReasonViolation: "com.atproto.moderation.defs#reasonViolation",
    DefsReasonMisleading: "com.atproto.moderation.defs#reasonMisleading",
    DefsReasonSexual: "com.atproto.moderation.defs#reasonSexual",
    DefsReasonRude: "com.atproto.moderation.defs#reasonRude",
    DefsReasonOther: "com.atproto.moderation.defs#reasonOther",
    DefsReasonAppeal: "com.atproto.moderation.defs#reasonAppeal"
  }, Fb = {
    DefsModlist: "app.bsky.graph.defs#modlist",
    DefsCuratelist: "app.bsky.graph.defs#curatelist"
  }, Dp = class {
    constructor() {
      this.xrpc = new Cn(), this.xrpc.addLexicons(xn);
    }
    service(t) {
      return new Pp(this, this.xrpc.service(t));
    }
  }, Pp = class {
    constructor(t, i) {
      this._baseClient = t, this.xrpc = i, this.com = new Np(this), this.app = new Hp(this);
    }
    setHeader(t, i) {
      this.xrpc.setHeader(t, i);
    }
  }, Np = class {
    constructor(t) {
      this._service = t, this.atproto = new Ip(t);
    }
  }, Ip = class {
    constructor(t) {
      this._service = t, this.admin = new jp(t), this.identity = new Fp(t), this.label = new qp(t), this.moderation = new Mp(t), this.repo = new $p(t), this.server = new Op(t), this.sync = new Gp(t), this.temp = new Xp(t);
    }
  }, jp = class {
    constructor(t) {
      this._service = t;
    }
    createCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.createCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteAccount(t, i) {
      return this._service.xrpc.call("com.atproto.admin.deleteAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.deleteCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    disableAccountInvites(t, i) {
      return this._service.xrpc.call("com.atproto.admin.disableAccountInvites", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    disableInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.admin.disableInviteCodes", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    emitModerationEvent(t, i) {
      return this._service.xrpc.call("com.atproto.admin.emitModerationEvent", i?.qp, t, i).catch((r) => {
        throw Nn(r);
      });
    }
    enableAccountInvites(t, i) {
      return this._service.xrpc.call("com.atproto.admin.enableAccountInvites", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    getAccountInfo(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getAccountInfo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getAccountInfos(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getAccountInfos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getInviteCodes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getModerationEvent(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getModerationEvent", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getRecord", t, void 0, i).catch((r) => {
        throw Gn(r);
      });
    }
    getRepo(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getRepo", t, void 0, i).catch((r) => {
        throw zn(r);
      });
    }
    getSubjectStatus(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getSubjectStatus", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listCommunicationTemplates(t, i) {
      return this._service.xrpc.call("com.atproto.admin.listCommunicationTemplates", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    queryModerationEvents(t, i) {
      return this._service.xrpc.call("com.atproto.admin.queryModerationEvents", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    queryModerationStatuses(t, i) {
      return this._service.xrpc.call("com.atproto.admin.queryModerationStatuses", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchRepos(t, i) {
      return this._service.xrpc.call("com.atproto.admin.searchRepos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    sendEmail(t, i) {
      return this._service.xrpc.call("com.atproto.admin.sendEmail", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountEmail(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountEmail", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountHandle(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountHandle", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountPassword(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountPassword", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateSubjectStatus(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateSubjectStatus", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Fp = class {
    constructor(t) {
      this._service = t;
    }
    getRecommendedDidCredentials(t, i) {
      return this._service.xrpc.call("com.atproto.identity.getRecommendedDidCredentials", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    requestPlcOperationSignature(t, i) {
      return this._service.xrpc.call("com.atproto.identity.requestPlcOperationSignature", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    resolveHandle(t, i) {
      return this._service.xrpc.call("com.atproto.identity.resolveHandle", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    signPlcOperation(t, i) {
      return this._service.xrpc.call("com.atproto.identity.signPlcOperation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    submitPlcOperation(t, i) {
      return this._service.xrpc.call("com.atproto.identity.submitPlcOperation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateHandle(t, i) {
      return this._service.xrpc.call("com.atproto.identity.updateHandle", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, qp = class {
    constructor(t) {
      this._service = t;
    }
    queryLabels(t, i) {
      return this._service.xrpc.call("com.atproto.label.queryLabels", t, void 0, i).catch((r) => {
        throw r;
      });
    }
  }, Mp = class {
    constructor(t) {
      this._service = t;
    }
    createReport(t, i) {
      return this._service.xrpc.call("com.atproto.moderation.createReport", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, $p = class {
    constructor(t) {
      this._service = t;
    }
    applyWrites(t, i) {
      return this._service.xrpc.call("com.atproto.repo.applyWrites", i?.qp, t, i).catch((r) => {
        throw ys(r);
      });
    }
    createRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.createRecord", i?.qp, t, i).catch((r) => {
        throw Rs(r);
      });
    }
    deleteRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.deleteRecord", i?.qp, t, i).catch((r) => {
        throw Ts(r);
      });
    }
    describeRepo(t, i) {
      return this._service.xrpc.call("com.atproto.repo.describeRepo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.getRecord", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    importRepo(t, i) {
      return this._service.xrpc.call("com.atproto.repo.importRepo", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    listMissingBlobs(t, i) {
      return this._service.xrpc.call("com.atproto.repo.listMissingBlobs", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listRecords(t, i) {
      return this._service.xrpc.call("com.atproto.repo.listRecords", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    putRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.putRecord", i?.qp, t, i).catch((r) => {
        throw xs(r);
      });
    }
    uploadBlob(t, i) {
      return this._service.xrpc.call("com.atproto.repo.uploadBlob", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Op = class {
    constructor(t) {
      this._service = t;
    }
    activateAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.activateAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    checkAccountStatus(t, i) {
      return this._service.xrpc.call("com.atproto.server.checkAccountStatus", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    confirmEmail(t, i) {
      return this._service.xrpc.call("com.atproto.server.confirmEmail", i?.qp, t, i).catch((r) => {
        throw Is(r);
      });
    }
    createAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.createAccount", i?.qp, t, i).catch((r) => {
        throw Hs(r);
      });
    }
    createAppPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.createAppPassword", i?.qp, t, i).catch((r) => {
        throw Ws(r);
      });
    }
    createInviteCode(t, i) {
      return this._service.xrpc.call("com.atproto.server.createInviteCode", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    createInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.server.createInviteCodes", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    createSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.createSession", i?.qp, t, i).catch((r) => {
        throw ta(r);
      });
    }
    deactivateAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.deactivateAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.deleteAccount", i?.qp, t, i).catch((r) => {
        throw aa(r);
      });
    }
    deleteSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.deleteSession", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    describeServer(t, i) {
      return this._service.xrpc.call("com.atproto.server.describeServer", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getAccountInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.server.getAccountInviteCodes", t, void 0, i).catch((r) => {
        throw fa(r);
      });
    }
    getServiceAuth(t, i) {
      return this._service.xrpc.call("com.atproto.server.getServiceAuth", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.getSession", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listAppPasswords(t, i) {
      return this._service.xrpc.call("com.atproto.server.listAppPasswords", t, void 0, i).catch((r) => {
        throw ya(r);
      });
    }
    refreshSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.refreshSession", i?.qp, t, i).catch((r) => {
        throw Ra(r);
      });
    }
    requestAccountDelete(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestAccountDelete", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestEmailConfirmation(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestEmailConfirmation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestEmailUpdate(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestEmailUpdate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestPasswordReset(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestPasswordReset", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    reserveSigningKey(t, i) {
      return this._service.xrpc.call("com.atproto.server.reserveSigningKey", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    resetPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.resetPassword", i?.qp, t, i).catch((r) => {
        throw Sa(r);
      });
    }
    revokeAppPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.revokeAppPassword", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateEmail(t, i) {
      return this._service.xrpc.call("com.atproto.server.updateEmail", i?.qp, t, i).catch((r) => {
        throw Va(r);
      });
    }
  }, Gp = class {
    constructor(t) {
      this._service = t;
    }
    getBlob(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getBlob", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getBlocks(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getCheckout(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getCheckout", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getHead(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getHead", t, void 0, i).catch((r) => {
        throw Fa(r);
      });
    }
    getLatestCommit(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getLatestCommit", t, void 0, i).catch((r) => {
        throw $a(r);
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getRecord", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRepo(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getRepo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listBlobs(t, i) {
      return this._service.xrpc.call("com.atproto.sync.listBlobs", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listRepos(t, i) {
      return this._service.xrpc.call("com.atproto.sync.listRepos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    notifyOfUpdate(t, i) {
      return this._service.xrpc.call("com.atproto.sync.notifyOfUpdate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestCrawl(t, i) {
      return this._service.xrpc.call("com.atproto.sync.requestCrawl", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Xp = class {
    constructor(t) {
      this._service = t;
    }
    checkSignupQueue(t, i) {
      return this._service.xrpc.call("com.atproto.temp.checkSignupQueue", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    fetchLabels(t, i) {
      return this._service.xrpc.call("com.atproto.temp.fetchLabels", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    requestPhoneVerification(t, i) {
      return this._service.xrpc.call("com.atproto.temp.requestPhoneVerification", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Hp = class {
    constructor(t) {
      this._service = t, this.bsky = new zp(t);
    }
  }, zp = class {
    constructor(t) {
      this._service = t, this.actor = new Zp(t), this.embed = new Jp(t), this.feed = new Qp(t), this.graph = new nu(t), this.notification = new lu(t), this.richtext = new fu(t), this.unspecced = new cu(t);
    }
  }, Zp = class {
    constructor(t) {
      this._service = t, this.profile = new Wp(t);
    }
    getPreferences(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getPreferences", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getProfile(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getProfile", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getProfiles(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getProfiles", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSuggestions(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getSuggestions", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    putPreferences(t, i) {
      return this._service.xrpc.call("app.bsky.actor.putPreferences", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    searchActors(t, i) {
      return this._service.xrpc.call("app.bsky.actor.searchActors", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchActorsTypeahead(t, i) {
      return this._service.xrpc.call("app.bsky.actor.searchActorsTypeahead", t, void 0, i).catch((r) => {
        throw r;
      });
    }
  }, Wp = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.actor.profile",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.actor.profile",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.actor.profile", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.actor.profile", rkey: "self", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.actor.profile", ...t }, { headers: i });
    }
  }, Jp = class {
    constructor(t) {
      this._service = t;
    }
  }, Qp = class {
    constructor(t) {
      this._service = t, this.generator = new Yp(t), this.like = new eu(t), this.post = new tu(t), this.repost = new ru(t), this.threadgate = new iu(t);
    }
    describeFeedGenerator(t, i) {
      return this._service.xrpc.call("app.bsky.feed.describeFeedGenerator", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getActorFeeds(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getActorFeeds", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getActorLikes(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getActorLikes", t, void 0, i).catch((r) => {
        throw fo(r);
      });
    }
    getAuthorFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getAuthorFeed", t, void 0, i).catch((r) => {
        throw yo(r);
      });
    }
    getFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeed", t, void 0, i).catch((r) => {
        throw Ro(r);
      });
    }
    getFeedGenerator(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedGenerator", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFeedGenerators(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedGenerators", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFeedSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedSkeleton", t, void 0, i).catch((r) => {
        throw wo(r);
      });
    }
    getLikes(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getLikes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getListFeed", t, void 0, i).catch((r) => {
        throw So(r);
      });
    }
    getPostThread(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getPostThread", t, void 0, i).catch((r) => {
        throw ko(r);
      });
    }
    getPosts(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getPosts", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRepostedBy(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getRepostedBy", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSuggestedFeeds(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getSuggestedFeeds", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getTimeline(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getTimeline", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchPosts(t, i) {
      return this._service.xrpc.call("app.bsky.feed.searchPosts", t, void 0, i).catch((r) => {
        throw Io(r);
      });
    }
  }, Yp = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.generator",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.generator",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.generator", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.generator", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.generator", ...t }, { headers: i });
    }
  }, eu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.like",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.like",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.like", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.like", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.like", ...t }, { headers: i });
    }
  }, tu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.post",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.post",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.post", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.post", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.post", ...t }, { headers: i });
    }
  }, ru = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.repost",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.repost",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.repost", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.repost", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.repost", ...t }, { headers: i });
    }
  }, iu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.threadgate",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.threadgate",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.threadgate", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.threadgate", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.threadgate", ...t }, { headers: i });
    }
  }, nu = class {
    constructor(t) {
      this._service = t, this.block = new su(t), this.follow = new au(t), this.list = new ou(t), this.listblock = new pu(t), this.listitem = new uu(t);
    }
    getBlocks(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFollowers(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getFollowers", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFollows(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getFollows", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getList", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListBlocks(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getListBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListMutes(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getListMutes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getLists(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getLists", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getMutes(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getMutes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRelationships(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getRelationships", t, void 0, i).catch((r) => {
        throw Zo(r);
      });
    }
    getSuggestedFollowsByActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getSuggestedFollowsByActor", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    muteActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.muteActor", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    muteActorList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.muteActorList", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    unmuteActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.unmuteActor", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    unmuteActorList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.unmuteActorList", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, su = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.block",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.block",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.block", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.block", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.block", ...t }, { headers: i });
    }
  }, au = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.follow",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.follow",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.follow", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.follow", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.follow", ...t }, { headers: i });
    }
  }, ou = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.list",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.list",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.list", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.list", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.list", ...t }, { headers: i });
    }
  }, pu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.listblock",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.listblock",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.listblock", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listblock", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listblock", ...t }, { headers: i });
    }
  }, uu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.listitem",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.listitem",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.listitem", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listitem", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listitem", ...t }, { headers: i });
    }
  }, lu = class {
    constructor(t) {
      this._service = t;
    }
    getUnreadCount(t, i) {
      return this._service.xrpc.call("app.bsky.notification.getUnreadCount", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listNotifications(t, i) {
      return this._service.xrpc.call("app.bsky.notification.listNotifications", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    registerPush(t, i) {
      return this._service.xrpc.call("app.bsky.notification.registerPush", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateSeen(t, i) {
      return this._service.xrpc.call("app.bsky.notification.updateSeen", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, fu = class {
    constructor(t) {
      this._service = t;
    }
  }, cu = class {
    constructor(t) {
      this._service = t;
    }
    getPopularFeedGenerators(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.getPopularFeedGenerators", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getTaggedSuggestions(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.getTaggedSuggestions", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchActorsSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.searchActorsSkeleton", t, void 0, i).catch((r) => {
        throw up(r);
      });
    }
    searchPostsSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.searchPostsSkeleton", t, void 0, i).catch((r) => {
        throw cp(r);
      });
    }
  }, qb = "com.atproto.server.refreshSession", et = class {
    constructor(t) {
      this.uploadBlob = (i, r) => this.api.com.atproto.repo.uploadBlob(i, r), this.resolveHandle = (i, r) => this.api.com.atproto.identity.resolveHandle(i, r), this.updateHandle = (i, r) => this.api.com.atproto.identity.updateHandle(i, r), this.createModerationReport = (i, r) => this.api.com.atproto.moderation.createReport(i, r), this.service = t.service instanceof URL ? t.service : new URL(t.service), this._persistSession = t.persistSession, this._baseClient = new Dp(), this._baseClient.xrpc.fetch = this._fetch.bind(this), this.api = this._baseClient.service(t.service);
    }
    get com() {
      return this.api.com;
    }
    static configure(t) {
      et.fetch = t.fetch;
    }
    get hasSession() {
      return !!this.session;
    }
    setPersistSessionHandler(t) {
      this._persistSession = t;
    }
    async createAccount(t) {
      try {
        const i = await this.api.com.atproto.server.createAccount(t);
        return this.session = {
          accessJwt: i.data.accessJwt,
          refreshJwt: i.data.refreshJwt,
          handle: i.data.handle,
          did: i.data.did,
          email: t.email,
          emailConfirmed: !1
        }, this._updateApiEndpoint(i.data.didDoc), i;
      } catch (i) {
        throw this.session = void 0, i;
      } finally {
        this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
      }
    }
    async login(t) {
      try {
        const i = await this.api.com.atproto.server.createSession({
          identifier: t.identifier,
          password: t.password
        });
        return this.session = {
          accessJwt: i.data.accessJwt,
          refreshJwt: i.data.refreshJwt,
          handle: i.data.handle,
          did: i.data.did,
          email: i.data.email,
          emailConfirmed: i.data.emailConfirmed
        }, this._updateApiEndpoint(i.data.didDoc), i;
      } catch (i) {
        throw this.session = void 0, i;
      } finally {
        this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
      }
    }
    async resumeSession(t) {
      try {
        this.session = t;
        const i = await this.api.com.atproto.server.getSession();
        if (i.data.did !== this.session.did)
          throw new w(400, "Invalid session", "InvalidDID");
        return this.session.email = i.data.email, this.session.handle = i.data.handle, this.session.emailConfirmed = i.data.emailConfirmed, this._updateApiEndpoint(i.data.didDoc), this._persistSession?.("update", this.session), i;
      } catch (i) {
        throw this.session = void 0, i instanceof w ? [1, 408, 425, 429, 500, 502, 503, 504, 522, 524].includes(i.status) ? this._persistSession?.("network-error", void 0) : this._persistSession?.("expired", void 0) : this._persistSession?.("network-error", void 0), i;
      }
    }
    _addAuthHeader(t) {
      return !t.authorization && this.session?.accessJwt ? {
        ...t,
        authorization: `Bearer ${this.session.accessJwt}`
      } : t;
    }
    async _fetch(t, i, r, n) {
      if (!et.fetch)
        throw new Error("AtpAgent fetch() method not configured");
      await this._refreshSessionPromise;
      let s = await et.fetch(t, i, this._addAuthHeader(r), n);
      return du(s, ["ExpiredToken"]) && this.session?.refreshJwt && (await this.refreshSession(), s = await et.fetch(t, i, this._addAuthHeader(r), n)), s;
    }
    async refreshSession() {
      if (this._refreshSessionPromise)
        return this._refreshSessionPromise;
      this._refreshSessionPromise = this._refreshSessionInner();
      try {
        await this._refreshSessionPromise;
      } finally {
        this._refreshSessionPromise = void 0;
      }
    }
    async _refreshSessionInner() {
      if (!et.fetch)
        throw new Error("AtpAgent fetch() method not configured");
      if (!this.session?.refreshJwt)
        return;
      const t = new URL((this.pdsUrl || this.service).origin);
      t.pathname = `/xrpc/${qb}`;
      const i = await et.fetch(t.toString(), "POST", {
        authorization: `Bearer ${this.session.refreshJwt}`
      }, void 0);
      du(i, ["ExpiredToken", "InvalidToken"]) ? (this.session = void 0, this._persistSession?.("expired", void 0)) : $b(this._baseClient, i.body) && (this.session = {
        ...this.session || {},
        accessJwt: i.body.accessJwt,
        refreshJwt: i.body.refreshJwt,
        handle: i.body.handle,
        did: i.body.did
      }, this._updateApiEndpoint(i.body.didDoc), this._persistSession?.("update", this.session));
    }
    _updateApiEndpoint(t) {
      if (Kc(t)) {
        const i = Vc(t);
        this.pdsUrl = i ? new URL(i) : void 0;
      }
      this.api.xrpc.uri = this.pdsUrl || this.service;
    }
  }, fr = et;
  fr.fetch = Sn;
  function Mb(t) {
    return vn.safeParse(t).success;
  }
  function du(t, i) {
    return t.status !== 400 || !Mb(t.body) ? !1 : typeof t.body.error == "string" && i.includes(t.body.error);
  }
  function $b(t, i) {
    try {
      return t.xrpc.lex.assertValidXrpcOutput("com.atproto.server.refreshSession", i), !0;
    } catch {
      return !1;
    }
  }
  var mu = new TextEncoder(), Ob = new TextDecoder(), St = class {
    constructor(t) {
      this.utf16 = t, this.utf8 = mu.encode(t);
    }
    get length() {
      return this.utf8.byteLength;
    }
    get graphemeLength() {
      return this._graphemeLen || (this._graphemeLen = Vr(this.utf16)), this._graphemeLen;
    }
    slice(t, i) {
      return Ob.decode(this.utf8.slice(t, i));
    }
    utf16IndexToUtf8Index(t) {
      return mu.encode(this.utf16.slice(0, t)).byteLength;
    }
    toString() {
      return this.utf16;
    }
  }, Gb = /[\r\n]([\u00AD\u2060\u200D\u200C\u200B\s]*[\r\n]){2,}/, Xb = `

`;
  function hu(t, i) {
    return i.cleanNewlines && (t = Hb(t, Gb, Xb)), t;
  }
  function Hb(t, i, r) {
    t = t.clone();
    let n = t.unicodeText.utf16.match(i);
    for (; n && typeof n.index < "u"; ) {
      const s = t.unicodeText, u = t.unicodeText.utf16IndexToUtf8Index(n.index), e = u + new St(n[0]).length;
      if (t.delete(u, e), t.unicodeText.utf16 === s.utf16)
        break;
      t.insert(u, r), n = t.unicodeText.utf16.match(i);
    }
    return t;
  }
  var zb = [
    "aaa",
    "aarp",
    "abarth",
    "abb",
    "abbott",
    "abbvie",
    "abc",
    "able",
    "abogado",
    "abudhabi",
    "ac",
    "academy",
    "accenture",
    "accountant",
    "accountants",
    "aco",
    "actor",
    "ad",
    "ads",
    "adult",
    "ae",
    "aeg",
    "aero",
    "aetna",
    "af",
    "afl",
    "africa",
    "ag",
    "agakhan",
    "agency",
    "ai",
    "aig",
    "airbus",
    "airforce",
    "airtel",
    "akdn",
    "al",
    "alfaromeo",
    "alibaba",
    "alipay",
    "allfinanz",
    "allstate",
    "ally",
    "alsace",
    "alstom",
    "am",
    "amazon",
    "americanexpress",
    "americanfamily",
    "amex",
    "amfam",
    "amica",
    "amsterdam",
    "analytics",
    "android",
    "anquan",
    "anz",
    "ao",
    "aol",
    "apartments",
    "app",
    "apple",
    "aq",
    "aquarelle",
    "ar",
    "arab",
    "aramco",
    "archi",
    "army",
    "arpa",
    "art",
    "arte",
    "as",
    "asda",
    "asia",
    "associates",
    "at",
    "athleta",
    "attorney",
    "au",
    "auction",
    "audi",
    "audible",
    "audio",
    "auspost",
    "author",
    "auto",
    "autos",
    "avianca",
    "aw",
    "aws",
    "ax",
    "axa",
    "az",
    "azure",
    "ba",
    "baby",
    "baidu",
    "banamex",
    "bananarepublic",
    "band",
    "bank",
    "bar",
    "barcelona",
    "barclaycard",
    "barclays",
    "barefoot",
    "bargains",
    "baseball",
    "basketball",
    "bauhaus",
    "bayern",
    "bb",
    "bbc",
    "bbt",
    "bbva",
    "bcg",
    "bcn",
    "bd",
    "be",
    "beats",
    "beauty",
    "beer",
    "bentley",
    "berlin",
    "best",
    "bestbuy",
    "bet",
    "bf",
    "bg",
    "bh",
    "bharti",
    "bi",
    "bible",
    "bid",
    "bike",
    "bing",
    "bingo",
    "bio",
    "biz",
    "bj",
    "black",
    "blackfriday",
    "blockbuster",
    "blog",
    "bloomberg",
    "blue",
    "bm",
    "bms",
    "bmw",
    "bn",
    "bnpparibas",
    "bo",
    "boats",
    "boehringer",
    "bofa",
    "bom",
    "bond",
    "boo",
    "book",
    "booking",
    "bosch",
    "bostik",
    "boston",
    "bot",
    "boutique",
    "box",
    "br",
    "bradesco",
    "bridgestone",
    "broadway",
    "broker",
    "brother",
    "brussels",
    "bs",
    "bt",
    "build",
    "builders",
    "business",
    "buy",
    "buzz",
    "bv",
    "bw",
    "by",
    "bz",
    "bzh",
    "ca",
    "cab",
    "cafe",
    "cal",
    "call",
    "calvinklein",
    "cam",
    "camera",
    "camp",
    "canon",
    "capetown",
    "capital",
    "capitalone",
    "car",
    "caravan",
    "cards",
    "care",
    "career",
    "careers",
    "cars",
    "casa",
    "case",
    "cash",
    "casino",
    "cat",
    "catering",
    "catholic",
    "cba",
    "cbn",
    "cbre",
    "cbs",
    "cc",
    "cd",
    "center",
    "ceo",
    "cern",
    "cf",
    "cfa",
    "cfd",
    "cg",
    "ch",
    "chanel",
    "channel",
    "charity",
    "chase",
    "chat",
    "cheap",
    "chintai",
    "christmas",
    "chrome",
    "church",
    "ci",
    "cipriani",
    "circle",
    "cisco",
    "citadel",
    "citi",
    "citic",
    "city",
    "cityeats",
    "ck",
    "cl",
    "claims",
    "cleaning",
    "click",
    "clinic",
    "clinique",
    "clothing",
    "cloud",
    "club",
    "clubmed",
    "cm",
    "cn",
    "co",
    "coach",
    "codes",
    "coffee",
    "college",
    "cologne",
    "com",
    "comcast",
    "commbank",
    "community",
    "company",
    "compare",
    "computer",
    "comsec",
    "condos",
    "construction",
    "consulting",
    "contact",
    "contractors",
    "cooking",
    "cookingchannel",
    "cool",
    "coop",
    "corsica",
    "country",
    "coupon",
    "coupons",
    "courses",
    "cpa",
    "cr",
    "credit",
    "creditcard",
    "creditunion",
    "cricket",
    "crown",
    "crs",
    "cruise",
    "cruises",
    "cu",
    "cuisinella",
    "cv",
    "cw",
    "cx",
    "cy",
    "cymru",
    "cyou",
    "cz",
    "dabur",
    "dad",
    "dance",
    "data",
    "date",
    "dating",
    "datsun",
    "day",
    "dclk",
    "dds",
    "de",
    "deal",
    "dealer",
    "deals",
    "degree",
    "delivery",
    "dell",
    "deloitte",
    "delta",
    "democrat",
    "dental",
    "dentist",
    "desi",
    "design",
    "dev",
    "dhl",
    "diamonds",
    "diet",
    "digital",
    "direct",
    "directory",
    "discount",
    "discover",
    "dish",
    "diy",
    "dj",
    "dk",
    "dm",
    "dnp",
    "do",
    "docs",
    "doctor",
    "dog",
    "domains",
    "dot",
    "download",
    "drive",
    "dtv",
    "dubai",
    "dunlop",
    "dupont",
    "durban",
    "dvag",
    "dvr",
    "dz",
    "earth",
    "eat",
    "ec",
    "eco",
    "edeka",
    "edu",
    "education",
    "ee",
    "eg",
    "email",
    "emerck",
    "energy",
    "engineer",
    "engineering",
    "enterprises",
    "epson",
    "equipment",
    "er",
    "ericsson",
    "erni",
    "es",
    "esq",
    "estate",
    "et",
    "etisalat",
    "eu",
    "eurovision",
    "eus",
    "events",
    "exchange",
    "expert",
    "exposed",
    "express",
    "extraspace",
    "fage",
    "fail",
    "fairwinds",
    "faith",
    "family",
    "fan",
    "fans",
    "farm",
    "farmers",
    "fashion",
    "fast",
    "fedex",
    "feedback",
    "ferrari",
    "ferrero",
    "fi",
    "fiat",
    "fidelity",
    "fido",
    "film",
    "final",
    "finance",
    "financial",
    "fire",
    "firestone",
    "firmdale",
    "fish",
    "fishing",
    "fit",
    "fitness",
    "fj",
    "fk",
    "flickr",
    "flights",
    "flir",
    "florist",
    "flowers",
    "fly",
    "fm",
    "fo",
    "foo",
    "food",
    "foodnetwork",
    "football",
    "ford",
    "forex",
    "forsale",
    "forum",
    "foundation",
    "fox",
    "fr",
    "free",
    "fresenius",
    "frl",
    "frogans",
    "frontdoor",
    "frontier",
    "ftr",
    "fujitsu",
    "fun",
    "fund",
    "furniture",
    "futbol",
    "fyi",
    "ga",
    "gal",
    "gallery",
    "gallo",
    "gallup",
    "game",
    "games",
    "gap",
    "garden",
    "gay",
    "gb",
    "gbiz",
    "gd",
    "gdn",
    "ge",
    "gea",
    "gent",
    "genting",
    "george",
    "gf",
    "gg",
    "ggee",
    "gh",
    "gi",
    "gift",
    "gifts",
    "gives",
    "giving",
    "gl",
    "glass",
    "gle",
    "global",
    "globo",
    "gm",
    "gmail",
    "gmbh",
    "gmo",
    "gmx",
    "gn",
    "godaddy",
    "gold",
    "goldpoint",
    "golf",
    "goo",
    "goodyear",
    "goog",
    "google",
    "gop",
    "got",
    "gov",
    "gp",
    "gq",
    "gr",
    "grainger",
    "graphics",
    "gratis",
    "green",
    "gripe",
    "grocery",
    "group",
    "gs",
    "gt",
    "gu",
    "guardian",
    "gucci",
    "guge",
    "guide",
    "guitars",
    "guru",
    "gw",
    "gy",
    "hair",
    "hamburg",
    "hangout",
    "haus",
    "hbo",
    "hdfc",
    "hdfcbank",
    "health",
    "healthcare",
    "help",
    "helsinki",
    "here",
    "hermes",
    "hgtv",
    "hiphop",
    "hisamitsu",
    "hitachi",
    "hiv",
    "hk",
    "hkt",
    "hm",
    "hn",
    "hockey",
    "holdings",
    "holiday",
    "homedepot",
    "homegoods",
    "homes",
    "homesense",
    "honda",
    "horse",
    "hospital",
    "host",
    "hosting",
    "hot",
    "hoteles",
    "hotels",
    "hotmail",
    "house",
    "how",
    "hr",
    "hsbc",
    "ht",
    "hu",
    "hughes",
    "hyatt",
    "hyundai",
    "ibm",
    "icbc",
    "ice",
    "icu",
    "id",
    "ie",
    "ieee",
    "ifm",
    "ikano",
    "il",
    "im",
    "imamat",
    "imdb",
    "immo",
    "immobilien",
    "in",
    "inc",
    "industries",
    "infiniti",
    "info",
    "ing",
    "ink",
    "institute",
    "insurance",
    "insure",
    "int",
    "international",
    "intuit",
    "investments",
    "io",
    "ipiranga",
    "iq",
    "ir",
    "irish",
    "is",
    "ismaili",
    "ist",
    "istanbul",
    "it",
    "itau",
    "itv",
    "jaguar",
    "java",
    "jcb",
    "je",
    "jeep",
    "jetzt",
    "jewelry",
    "jio",
    "jll",
    "jm",
    "jmp",
    "jnj",
    "jo",
    "jobs",
    "joburg",
    "jot",
    "joy",
    "jp",
    "jpmorgan",
    "jprs",
    "juegos",
    "juniper",
    "kaufen",
    "kddi",
    "ke",
    "kerryhotels",
    "kerrylogistics",
    "kerryproperties",
    "kfh",
    "kg",
    "kh",
    "ki",
    "kia",
    "kids",
    "kim",
    "kinder",
    "kindle",
    "kitchen",
    "kiwi",
    "km",
    "kn",
    "koeln",
    "komatsu",
    "kosher",
    "kp",
    "kpmg",
    "kpn",
    "kr",
    "krd",
    "kred",
    "kuokgroup",
    "kw",
    "ky",
    "kyoto",
    "kz",
    "la",
    "lacaixa",
    "lamborghini",
    "lamer",
    "lancaster",
    "lancia",
    "land",
    "landrover",
    "lanxess",
    "lasalle",
    "lat",
    "latino",
    "latrobe",
    "law",
    "lawyer",
    "lb",
    "lc",
    "lds",
    "lease",
    "leclerc",
    "lefrak",
    "legal",
    "lego",
    "lexus",
    "lgbt",
    "li",
    "lidl",
    "life",
    "lifeinsurance",
    "lifestyle",
    "lighting",
    "like",
    "lilly",
    "limited",
    "limo",
    "lincoln",
    "linde",
    "link",
    "lipsy",
    "live",
    "living",
    "lk",
    "llc",
    "llp",
    "loan",
    "loans",
    "locker",
    "locus",
    "loft",
    "lol",
    "london",
    "lotte",
    "lotto",
    "love",
    "lpl",
    "lplfinancial",
    "lr",
    "ls",
    "lt",
    "ltd",
    "ltda",
    "lu",
    "lundbeck",
    "luxe",
    "luxury",
    "lv",
    "ly",
    "ma",
    "macys",
    "madrid",
    "maif",
    "maison",
    "makeup",
    "man",
    "management",
    "mango",
    "map",
    "market",
    "marketing",
    "markets",
    "marriott",
    "marshalls",
    "maserati",
    "mattel",
    "mba",
    "mc",
    "mckinsey",
    "md",
    "me",
    "med",
    "media",
    "meet",
    "melbourne",
    "meme",
    "memorial",
    "men",
    "menu",
    "merckmsd",
    "mg",
    "mh",
    "miami",
    "microsoft",
    "mil",
    "mini",
    "mint",
    "mit",
    "mitsubishi",
    "mk",
    "ml",
    "mlb",
    "mls",
    "mm",
    "mma",
    "mn",
    "mo",
    "mobi",
    "mobile",
    "moda",
    "moe",
    "moi",
    "mom",
    "monash",
    "money",
    "monster",
    "mormon",
    "mortgage",
    "moscow",
    "moto",
    "motorcycles",
    "mov",
    "movie",
    "mp",
    "mq",
    "mr",
    "ms",
    "msd",
    "mt",
    "mtn",
    "mtr",
    "mu",
    "museum",
    "music",
    "mutual",
    "mv",
    "mw",
    "mx",
    "my",
    "mz",
    "na",
    "nab",
    "nagoya",
    "name",
    "natura",
    "navy",
    "nba",
    "nc",
    "ne",
    "nec",
    "net",
    "netbank",
    "netflix",
    "network",
    "neustar",
    "new",
    "news",
    "next",
    "nextdirect",
    "nexus",
    "nf",
    "nfl",
    "ng",
    "ngo",
    "nhk",
    "ni",
    "nico",
    "nike",
    "nikon",
    "ninja",
    "nissan",
    "nissay",
    "nl",
    "no",
    "nokia",
    "northwesternmutual",
    "norton",
    "now",
    "nowruz",
    "nowtv",
    "np",
    "nr",
    "nra",
    "nrw",
    "ntt",
    "nu",
    "nyc",
    "nz",
    "obi",
    "observer",
    "office",
    "okinawa",
    "olayan",
    "olayangroup",
    "oldnavy",
    "ollo",
    "om",
    "omega",
    "one",
    "ong",
    "onl",
    "online",
    "ooo",
    "open",
    "oracle",
    "orange",
    "org",
    "organic",
    "origins",
    "osaka",
    "otsuka",
    "ott",
    "ovh",
    "pa",
    "page",
    "panasonic",
    "paris",
    "pars",
    "partners",
    "parts",
    "party",
    "passagens",
    "pay",
    "pccw",
    "pe",
    "pet",
    "pf",
    "pfizer",
    "pg",
    "ph",
    "pharmacy",
    "phd",
    "philips",
    "phone",
    "photo",
    "photography",
    "photos",
    "physio",
    "pics",
    "pictet",
    "pictures",
    "pid",
    "pin",
    "ping",
    "pink",
    "pioneer",
    "pizza",
    "pk",
    "pl",
    "place",
    "play",
    "playstation",
    "plumbing",
    "plus",
    "pm",
    "pn",
    "pnc",
    "pohl",
    "poker",
    "politie",
    "porn",
    "post",
    "pr",
    "pramerica",
    "praxi",
    "press",
    "prime",
    "pro",
    "prod",
    "productions",
    "prof",
    "progressive",
    "promo",
    "properties",
    "property",
    "protection",
    "pru",
    "prudential",
    "ps",
    "pt",
    "pub",
    "pw",
    "pwc",
    "py",
    "qa",
    "qpon",
    "quebec",
    "quest",
    "racing",
    "radio",
    "re",
    "read",
    "realestate",
    "realtor",
    "realty",
    "recipes",
    "red",
    "redstone",
    "redumbrella",
    "rehab",
    "reise",
    "reisen",
    "reit",
    "reliance",
    "ren",
    "rent",
    "rentals",
    "repair",
    "report",
    "republican",
    "rest",
    "restaurant",
    "review",
    "reviews",
    "rexroth",
    "rich",
    "richardli",
    "ricoh",
    "ril",
    "rio",
    "rip",
    "ro",
    "rocher",
    "rocks",
    "rodeo",
    "rogers",
    "room",
    "rs",
    "rsvp",
    "ru",
    "rugby",
    "ruhr",
    "run",
    "rw",
    "rwe",
    "ryukyu",
    "sa",
    "saarland",
    "safe",
    "safety",
    "sakura",
    "sale",
    "salon",
    "samsclub",
    "samsung",
    "sandvik",
    "sandvikcoromant",
    "sanofi",
    "sap",
    "sarl",
    "sas",
    "save",
    "saxo",
    "sb",
    "sbi",
    "sbs",
    "sc",
    "sca",
    "scb",
    "schaeffler",
    "schmidt",
    "scholarships",
    "school",
    "schule",
    "schwarz",
    "science",
    "scot",
    "sd",
    "se",
    "search",
    "seat",
    "secure",
    "security",
    "seek",
    "select",
    "sener",
    "services",
    "ses",
    "seven",
    "sew",
    "sex",
    "sexy",
    "sfr",
    "sg",
    "sh",
    "shangrila",
    "sharp",
    "shaw",
    "shell",
    "shia",
    "shiksha",
    "shoes",
    "shop",
    "shopping",
    "shouji",
    "show",
    "showtime",
    "si",
    "silk",
    "sina",
    "singles",
    "site",
    "sj",
    "sk",
    "ski",
    "skin",
    "sky",
    "skype",
    "sl",
    "sling",
    "sm",
    "smart",
    "smile",
    "sn",
    "sncf",
    "so",
    "soccer",
    "social",
    "softbank",
    "software",
    "sohu",
    "solar",
    "solutions",
    "song",
    "sony",
    "soy",
    "spa",
    "space",
    "sport",
    "spot",
    "sr",
    "srl",
    "ss",
    "st",
    "stada",
    "staples",
    "star",
    "statebank",
    "statefarm",
    "stc",
    "stcgroup",
    "stockholm",
    "storage",
    "store",
    "stream",
    "studio",
    "study",
    "style",
    "su",
    "sucks",
    "supplies",
    "supply",
    "support",
    "surf",
    "surgery",
    "suzuki",
    "sv",
    "swatch",
    "swiss",
    "sx",
    "sy",
    "sydney",
    "systems",
    "sz",
    "tab",
    "taipei",
    "talk",
    "taobao",
    "target",
    "tatamotors",
    "tatar",
    "tattoo",
    "tax",
    "taxi",
    "tc",
    "tci",
    "td",
    "tdk",
    "team",
    "tech",
    "technology",
    "tel",
    "temasek",
    "tennis",
    "teva",
    "tf",
    "tg",
    "th",
    "thd",
    "theater",
    "theatre",
    "tiaa",
    "tickets",
    "tienda",
    "tiffany",
    "tips",
    "tires",
    "tirol",
    "tj",
    "tjmaxx",
    "tjx",
    "tk",
    "tkmaxx",
    "tl",
    "tm",
    "tmall",
    "tn",
    "to",
    "today",
    "tokyo",
    "tools",
    "top",
    "toray",
    "toshiba",
    "total",
    "tours",
    "town",
    "toyota",
    "toys",
    "tr",
    "trade",
    "trading",
    "training",
    "travel",
    "travelchannel",
    "travelers",
    "travelersinsurance",
    "trust",
    "trv",
    "tt",
    "tube",
    "tui",
    "tunes",
    "tushu",
    "tv",
    "tvs",
    "tw",
    "tz",
    "ua",
    "ubank",
    "ubs",
    "ug",
    "uk",
    "unicom",
    "university",
    "uno",
    "uol",
    "ups",
    "us",
    "uy",
    "uz",
    "va",
    "vacations",
    "vana",
    "vanguard",
    "vc",
    "ve",
    "vegas",
    "ventures",
    "verisign",
    "vermögensberater",
    "vermögensberatung",
    "versicherung",
    "vet",
    "vg",
    "vi",
    "viajes",
    "video",
    "vig",
    "viking",
    "villas",
    "vin",
    "vip",
    "virgin",
    "visa",
    "vision",
    "viva",
    "vivo",
    "vlaanderen",
    "vn",
    "vodka",
    "volkswagen",
    "volvo",
    "vote",
    "voting",
    "voto",
    "voyage",
    "vu",
    "vuelos",
    "wales",
    "walmart",
    "walter",
    "wang",
    "wanggou",
    "watch",
    "watches",
    "weather",
    "weatherchannel",
    "webcam",
    "weber",
    "website",
    "wed",
    "wedding",
    "weibo",
    "weir",
    "wf",
    "whoswho",
    "wien",
    "wiki",
    "williamhill",
    "win",
    "windows",
    "wine",
    "winners",
    "wme",
    "wolterskluwer",
    "woodside",
    "work",
    "works",
    "world",
    "wow",
    "ws",
    "wtc",
    "wtf",
    "xbox",
    "xerox",
    "xfinity",
    "xihuan",
    "xin",
    "xxx",
    "xyz",
    "yachts",
    "yahoo",
    "yamaxun",
    "yandex",
    "ye",
    "yodobashi",
    "yoga",
    "yokohama",
    "you",
    "youtube",
    "yt",
    "yun",
    "za",
    "zappos",
    "zara",
    "zero",
    "zip",
    "zm",
    "zone",
    "zuerich",
    "zw",
    "ελ",
    "ευ",
    "бг",
    "бел",
    "дети",
    "ею",
    "католик",
    "ком",
    "мкд",
    "мон",
    "москва",
    "онлайн",
    "орг",
    "рус",
    "рф",
    "сайт",
    "срб",
    "укр",
    "қаз",
    "հայ",
    "ישראל",
    "קום",
    "ابوظبي",
    "اتصالات",
    "ارامكو",
    "الاردن",
    "البحرين",
    "الجزائر",
    "السعودية",
    "العليان",
    "المغرب",
    "امارات",
    "ایران",
    "بارت",
    "بازار",
    "بيتك",
    "بھارت",
    "تونس",
    "سودان",
    "سورية",
    "شبكة",
    "عراق",
    "عرب",
    "عمان",
    "فلسطين",
    "قطر",
    "كاثوليك",
    "كوم",
    "مصر",
    "مليسيا",
    "موريتانيا",
    "موقع",
    "همراه",
    "پاکستان",
    "ڀارت",
    "कॉम",
    "नेट",
    "भारत",
    "भारतम्",
    "भारोत",
    "संगठन",
    "বাংলা",
    "ভারত",
    "ভাৰত",
    "ਭਾਰਤ",
    "ભારત",
    "ଭାରତ",
    "இந்தியா",
    "இலங்கை",
    "சிங்கப்பூர்",
    "భారత్",
    "ಭಾರತ",
    "ഭാരതം",
    "ලංකා",
    "คอม",
    "ไทย",
    "ລາວ",
    "გე",
    "みんな",
    "アマゾン",
    "クラウド",
    "グーグル",
    "コム",
    "ストア",
    "セール",
    "ファッション",
    "ポイント",
    "世界",
    "中信",
    "中国",
    "中國",
    "中文网",
    "亚马逊",
    "企业",
    "佛山",
    "信息",
    "健康",
    "八卦",
    "公司",
    "公益",
    "台湾",
    "台灣",
    "商城",
    "商店",
    "商标",
    "嘉里",
    "嘉里大酒店",
    "在线",
    "大拿",
    "天主教",
    "娱乐",
    "家電",
    "广东",
    "微博",
    "慈善",
    "我爱你",
    "手机",
    "招聘",
    "政务",
    "政府",
    "新加坡",
    "新闻",
    "时尚",
    "書籍",
    "机构",
    "淡马锡",
    "游戏",
    "澳門",
    "点看",
    "移动",
    "组织机构",
    "网址",
    "网店",
    "网站",
    "网络",
    "联通",
    "诺基亚",
    "谷歌",
    "购物",
    "通販",
    "集团",
    "電訊盈科",
    "飞利浦",
    "食品",
    "餐厅",
    "香格里拉",
    "香港",
    "닷넷",
    "닷컴",
    "삼성",
    "한국"
  ];
  function yu(t) {
    let i;
    const r = [];
    {
      const n = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g;
      for (; i = n.exec(t.utf16); ) {
        if (!Eu(i[3]) && !i[3].endsWith(".test"))
          continue;
        const s = t.utf16.indexOf(i[3], i.index) - 1;
        r.push({
          $type: "app.bsky.richtext.facet",
          index: {
            byteStart: t.utf16IndexToUtf8Index(s),
            byteEnd: t.utf16IndexToUtf8Index(s + i[3].length + 1)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#mention",
              did: i[3]
            }
          ]
        });
      }
    }
    {
      const n = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim;
      for (; i = n.exec(t.utf16); ) {
        let s = i[2];
        if (!s.startsWith("http")) {
          const d = i.groups?.domain;
          if (!d || !Eu(d))
            continue;
          s = `https://${s}`;
        }
        const u = t.utf16.indexOf(i[2], i.index), e = { start: u, end: u + i[2].length };
        /[.,;:!?]$/.test(s) && (s = s.slice(0, -1), e.end--), /[)]$/.test(s) && !s.includes("(") && (s = s.slice(0, -1), e.end--), r.push({
          index: {
            byteStart: t.utf16IndexToUtf8Index(e.start),
            byteEnd: t.utf16IndexToUtf8Index(e.end)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#link",
              uri: s
            }
          ]
        });
      }
    }
    {
      const n = /(?:^|\s)(#[^\d\s]\S*)(?=\s)?/g;
      for (; i = n.exec(t.utf16); ) {
        let [s] = i;
        const u = /^\s/.test(s);
        if (s = s.trim().replace(/\p{P}+$/gu, ""), s.length > 66)
          continue;
        const e = i.index + (u ? 1 : 0);
        r.push({
          index: {
            byteStart: t.utf16IndexToUtf8Index(e),
            byteEnd: t.utf16IndexToUtf8Index(e + s.length)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#tag",
              tag: s.replace(/^#/, "")
            }
          ]
        });
      }
    }
    return r.length > 0 ? r : void 0;
  }
  function Eu(t) {
    return !!zb.find((i) => {
      const r = t.lastIndexOf(i);
      return r === -1 ? !1 : t.charAt(r - 1) === "." && r === t.length - i.length;
    });
  }
  var ut = class {
    constructor(t, i) {
      this.text = t, this.facet = i;
    }
    get link() {
      const t = this.facet?.features.find(je.isLink);
      if (je.isLink(t))
        return t;
    }
    isLink() {
      return !!this.link;
    }
    get mention() {
      const t = this.facet?.features.find(je.isMention);
      if (je.isMention(t))
        return t;
    }
    isMention() {
      return !!this.mention;
    }
    get tag() {
      const t = this.facet?.features.find(je.isTag);
      if (je.isTag(t))
        return t;
    }
    isTag() {
      return !!this.tag;
    }
  }, gu = class {
    constructor(t, i) {
      this.unicodeText = new St(t.text), this.facets = t.facets, !this.facets?.length && t.entities?.length && (this.facets = Zb(this.unicodeText, t.entities)), this.facets && this.facets.sort(zr), i?.cleanNewlines && hu(this, { cleanNewlines: !0 }).copyInto(this);
    }
    get text() {
      return this.unicodeText.toString();
    }
    get length() {
      return this.unicodeText.length;
    }
    get graphemeLength() {
      return this.unicodeText.graphemeLength;
    }
    clone() {
      return new gu({
        text: this.unicodeText.utf16,
        facets: Ru(this.facets)
      });
    }
    copyInto(t) {
      t.unicodeText = this.unicodeText, t.facets = Ru(this.facets);
    }
    *segments() {
      const t = this.facets || [];
      if (!t.length) {
        yield new ut(this.unicodeText.utf16);
        return;
      }
      let i = 0, r = 0;
      do {
        const n = t[r];
        if (i < n.index.byteStart)
          yield new ut(this.unicodeText.slice(i, n.index.byteStart));
        else if (i > n.index.byteStart) {
          r++;
          continue;
        }
        if (n.index.byteStart < n.index.byteEnd) {
          const s = this.unicodeText.slice(n.index.byteStart, n.index.byteEnd);
          s.trim() ? yield new ut(s, n) : yield new ut(s);
        }
        i = n.index.byteEnd, r++;
      } while (r < t.length);
      i < this.unicodeText.length && (yield new ut(this.unicodeText.slice(i, this.unicodeText.length)));
    }
    insert(t, i) {
      if (this.unicodeText = new St(this.unicodeText.slice(0, t) + i + this.unicodeText.slice(t)), !this.facets?.length)
        return this;
      const r = i.length;
      for (const n of this.facets)
        t <= n.index.byteStart ? (n.index.byteStart += r, n.index.byteEnd += r) : t >= n.index.byteStart && t < n.index.byteEnd && (n.index.byteEnd += r);
      return this;
    }
    delete(t, i) {
      if (this.unicodeText = new St(this.unicodeText.slice(0, t) + this.unicodeText.slice(i)), !this.facets?.length)
        return this;
      const r = i - t;
      for (const n of this.facets)
        t <= n.index.byteStart && i >= n.index.byteEnd ? (n.index.byteStart = 0, n.index.byteEnd = 0) : t > n.index.byteEnd || (t > n.index.byteStart && t <= n.index.byteEnd && i > n.index.byteEnd ? n.index.byteEnd = t : t >= n.index.byteStart && i <= n.index.byteEnd ? n.index.byteEnd -= r : t < n.index.byteStart && i >= n.index.byteStart && i <= n.index.byteEnd ? (n.index.byteStart = t, n.index.byteEnd -= r) : i < n.index.byteStart && (n.index.byteStart -= r, n.index.byteEnd -= r));
      return this.facets = this.facets.filter((n) => n.index.byteStart < n.index.byteEnd), this;
    }
    async detectFacets(t) {
      if (this.facets = yu(this.unicodeText), this.facets) {
        for (const i of this.facets)
          for (const r of i.features)
            if (je.isMention(r)) {
              const n = await t.resolveHandle({ handle: r.did }).catch((s) => {
              }).then((s) => s?.data.did);
              r.did = n || "";
            }
        this.facets.sort(zr);
      }
    }
    detectFacetsWithoutResolution() {
      this.facets = yu(this.unicodeText), this.facets && this.facets.sort(zr);
    }
  }, zr = (t, i) => t.index.byteStart - i.index.byteStart;
  function Zb(t, i) {
    const r = [];
    for (const n of i)
      n.type === "link" ? r.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: t.utf16IndexToUtf8Index(n.index.start),
          byteEnd: t.utf16IndexToUtf8Index(n.index.end)
        },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: n.value }]
      }) : n.type === "mention" && r.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: t.utf16IndexToUtf8Index(n.index.start),
          byteEnd: t.utf16IndexToUtf8Index(n.index.end)
        },
        features: [
          { $type: "app.bsky.richtext.facet#mention", did: n.value }
        ]
      });
    return r;
  }
  function Ru(t) {
    return typeof t > "u" ? t : JSON.parse(JSON.stringify(t));
  }
  var Ke = class {
    constructor(t = void 0, i = !1, r = !1, n = !1, s = !1, u = !1, e = [], d = "") {
      this.cause = t, this.alert = i, this.blur = r, this.blurMedia = n, this.filter = s, this.noOverride = u, this.additionalCauses = e, this.did = d;
    }
    static noop() {
      return new Ke();
    }
  }, O = {
    "!hide": {
      id: "!hide",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Hide",
            description: "Moderator has chosen to hide the content."
          }
        },
        account: {
          en: {
            name: "Content Blocked",
            description: "This account has been hidden by the moderators."
          }
        },
        content: {
          en: {
            name: "Content Blocked",
            description: "This content has been hidden by the moderators."
          }
        }
      }
    },
    "!no-promote": {
      id: "!no-promote",
      preferences: ["hide"],
      flags: [],
      onwarn: null,
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Filter",
            description: "Moderator has chosen to filter the content from feeds."
          }
        },
        account: {
          en: {
            name: "N/A",
            description: "N/A"
          }
        },
        content: {
          en: {
            name: "N/A",
            description: "N/A"
          }
        }
      }
    },
    "!warn": {
      id: "!warn",
      preferences: ["warn"],
      flags: [],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Warn",
            description: "Moderator has chosen to set a general warning on the content."
          }
        },
        account: {
          en: {
            name: "Content Warning",
            description: "This account has received a general warning from moderators."
          }
        },
        content: {
          en: {
            name: "Content Warning",
            description: "This content has received a general warning from moderators."
          }
        }
      }
    },
    "!no-unauthenticated": {
      id: "!no-unauthenticated",
      preferences: ["hide"],
      flags: ["no-override", "unauthed"],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their account only be shown to signed-in users."
          }
        },
        account: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their account only be shown to signed-in users."
          }
        },
        content: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their content only be shown to signed-in users."
          }
        }
      }
    },
    "dmca-violation": {
      id: "dmca-violation",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "legal",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Copyright Violation",
            description: "The content has received a DMCA takedown request."
          }
        },
        account: {
          en: {
            name: "Copyright Violation",
            description: "This account has received a DMCA takedown request. It will be restored if the concerns can be resolved."
          }
        },
        content: {
          en: {
            name: "Copyright Violation",
            description: "This content has received a DMCA takedown request. It will be restored if the concerns can be resolved."
          }
        }
      }
    },
    doxxing: {
      id: "doxxing",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "legal",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Doxxing",
            description: "Information that reveals private information about someone which has been shared without the consent of the subject."
          }
        },
        account: {
          en: {
            name: "Doxxing",
            description: "This account has been reported to publish private information about someone without their consent. This report is currently under review."
          }
        },
        content: {
          en: {
            name: "Doxxing",
            description: "This content has been reported to include private information about someone without their consent."
          }
        }
      }
    },
    porn: {
      id: "porn",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Pornography",
            description: "Images of full-frontal nudity (genitalia) in any sexualized context, or explicit sexual activity (meaning contact with genitalia or breasts) even if partially covered. Includes graphic sexual cartoons (often jokes/memes)."
          }
        },
        account: {
          en: {
            name: "Adult Content",
            description: "This account contains imagery of full-frontal nudity or explicit sexual activity."
          }
        },
        content: {
          en: {
            name: "Adult Content",
            description: "This content contains imagery of full-frontal nudity or explicit sexual activity."
          }
        }
      }
    },
    sexual: {
      id: "sexual",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Sexually Suggestive",
            description: 'Content that does not meet the level of "pornography", but is still sexual. Some common examples have been selfies and "hornyposting" with underwear on, or partially naked (naked but covered, eg with hands or from side perspective). Sheer/see-through nipples may end up in this category.'
          }
        },
        account: {
          en: {
            name: "Suggestive Content",
            description: "This account contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
          }
        },
        content: {
          en: {
            name: "Suggestive Content",
            description: "This content contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
          }
        }
      }
    },
    nudity: {
      id: "nudity",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Nudity",
            description: 'Nudity which is not sexual, or that is primarily "artistic" in nature. For example: breastfeeding; classic art paintings and sculptures; newspaper images with some nudity; fashion modeling. "Erotic photography" is likely to end up in sexual or porn.'
          }
        },
        account: {
          en: {
            name: "Adult Content",
            description: "This account contains imagery which portrays nudity in a non-sexual or artistic setting."
          }
        },
        content: {
          en: {
            name: "Adult Content",
            description: "This content contains imagery which portrays nudity in a non-sexual or artistic setting."
          }
        }
      }
    },
    nsfl: {
      id: "nsfl",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "NSFL",
            description: `"Not Suitable For Life." This includes graphic images like the infamous "goatse" (don't look it up).`
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (NSFL)",
            description: 'This account contains graphic images which are often referred to as "Not Suitable For Life."'
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (NSFL)",
            description: 'This content contains graphic images which are often referred to as "Not Suitable For Life."'
          }
        }
      }
    },
    corpse: {
      id: "corpse",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Corpse",
            description: "Visual image of a dead human body in any context. Includes war images, hanging, funeral caskets. Does not include all figurative cases (cartoons), but can include realistic figurative images or renderings."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Corpse)",
            description: "This account contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Corpse)",
            description: "This content contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
          }
        }
      }
    },
    gore: {
      id: "gore",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Gore",
            description: "Intended for shocking images, typically involving blood or visible wounds."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Gore)",
            description: "This account contains shocking images involving blood or visible wounds."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Gore)",
            description: "This content contains shocking images involving blood or visible wounds."
          }
        }
      }
    },
    torture: {
      id: "torture",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Torture",
            description: "Depictions of torture of a human or animal (animal cruelty)."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Torture)",
            description: "This account contains depictions of torture of a human or animal."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Torture)",
            description: "This content contains depictions of torture of a human or animal."
          }
        }
      }
    },
    "self-harm": {
      id: "self-harm",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Self-Harm",
            description: "A visual depiction (photo or figurative) of cutting, suicide, or similar."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Self-Harm)",
            description: "This account includes depictions of cutting, suicide, or other forms of self-harm."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Self-Harm)",
            description: "This content includes depictions of cutting, suicide, or other forms of self-harm."
          }
        }
      }
    },
    "intolerant-race": {
      id: "intolerant-race",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Racial Intolerance",
            description: "Hateful or intolerant content related to race."
          }
        },
        account: {
          en: {
            name: "Intolerance (Racial)",
            description: "This account includes hateful or intolerant content related to race."
          }
        },
        content: {
          en: {
            name: "Intolerance (Racial)",
            description: "This content includes hateful or intolerant views related to race."
          }
        }
      }
    },
    "intolerant-gender": {
      id: "intolerant-gender",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Gender Intolerance",
            description: "Hateful or intolerant content related to gender or gender identity."
          }
        },
        account: {
          en: {
            name: "Intolerance (Gender)",
            description: "This account includes hateful or intolerant content related to gender or gender identity."
          }
        },
        content: {
          en: {
            name: "Intolerance (Gender)",
            description: "This content includes hateful or intolerant views related to gender or gender identity."
          }
        }
      }
    },
    "intolerant-sexual-orientation": {
      id: "intolerant-sexual-orientation",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Sexual Orientation Intolerance",
            description: "Hateful or intolerant content related to sexual preferences."
          }
        },
        account: {
          en: {
            name: "Intolerance (Orientation)",
            description: "This account includes hateful or intolerant content related to sexual preferences."
          }
        },
        content: {
          en: {
            name: "Intolerance (Orientation)",
            description: "This content includes hateful or intolerant views related to sexual preferences."
          }
        }
      }
    },
    "intolerant-religion": {
      id: "intolerant-religion",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Religious Intolerance",
            description: "Hateful or intolerant content related to religious views or practices."
          }
        },
        account: {
          en: {
            name: "Intolerance (Religious)",
            description: "This account includes hateful or intolerant content related to religious views or practices."
          }
        },
        content: {
          en: {
            name: "Intolerance (Religious)",
            description: "This content includes hateful or intolerant views related to religious views or practices."
          }
        }
      }
    },
    intolerant: {
      id: "intolerant",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Intolerance",
            description: "A catchall for hateful or intolerant content which is not covered elsewhere."
          }
        },
        account: {
          en: {
            name: "Intolerance",
            description: "This account includes hateful or intolerant content."
          }
        },
        content: {
          en: {
            name: "Intolerance",
            description: "This content includes hateful or intolerant views."
          }
        }
      }
    },
    "icon-intolerant": {
      id: "icon-intolerant",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur-media",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Intolerant Iconography",
            description: "Visual imagery associated with a hate group, such as the KKK or Nazi, in any context (supportive, critical, documentary, etc)."
          }
        },
        account: {
          en: {
            name: "Intolerant Iconography",
            description: "This account includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
          }
        },
        content: {
          en: {
            name: "Intolerant Iconography",
            description: "This content includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
          }
        }
      }
    },
    threat: {
      id: "threat",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "rude",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Threats",
            description: "Statements or imagery published with the intent to threaten, intimidate, or harm."
          }
        },
        account: {
          en: {
            name: "Threats",
            description: "The moderators believe this account has published statements or imagery with the intent to threaten, intimidate, or harm others."
          }
        },
        content: {
          en: {
            name: "Threats",
            description: "The moderators believe this content was published with the intent to threaten, intimidate, or harm others."
          }
        }
      }
    },
    spoiler: {
      id: "spoiler",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "curation",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Spoiler",
            description: "Discussion about film, TV, etc which gives away plot points."
          }
        },
        account: {
          en: {
            name: "Spoiler Warning",
            description: "This account contains discussion about film, TV, etc which gives away plot points."
          }
        },
        content: {
          en: {
            name: "Spoiler Warning",
            description: "This content contains discussion about film, TV, etc which gives away plot points."
          }
        }
      }
    },
    spam: {
      id: "spam",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "spam",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Spam",
            description: "Repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        },
        account: {
          en: {
            name: "Spam",
            description: "This account publishes repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        },
        content: {
          en: {
            name: "Spam",
            description: "This content is a part of repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        }
      }
    },
    "account-security": {
      id: "account-security",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Security Concerns",
            description: "Content designed to hijack user accounts such as a phishing attack."
          }
        },
        account: {
          en: {
            name: "Security Warning",
            description: "This account has published content designed to hijack user accounts such as a phishing attack."
          }
        },
        content: {
          en: {
            name: "Security Warning",
            description: "This content is designed to hijack user accounts such as a phishing attack."
          }
        }
      }
    },
    "net-abuse": {
      id: "net-abuse",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Network Attacks",
            description: "Content designed to attack network systems such as denial-of-service attacks."
          }
        },
        account: {
          en: {
            name: "Network Attack Warning",
            description: "This account has published content designed to attack network systems such as denial-of-service attacks."
          }
        },
        content: {
          en: {
            name: "Network Attack Warning",
            description: "This content is designed to attack network systems such as denial-of-service attacks."
          }
        }
      }
    },
    impersonation: {
      id: "impersonation",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Impersonation",
            description: "Accounts which falsely assert some identity."
          }
        },
        account: {
          en: {
            name: "Impersonation Warning",
            description: "The moderators believe this account is lying about their identity."
          }
        },
        content: {
          en: {
            name: "Impersonation Warning",
            description: "The moderators believe this account is lying about their identity."
          }
        }
      }
    },
    scam: {
      id: "scam",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Scam",
            description: "Fraudulent content."
          }
        },
        account: {
          en: {
            name: "Scam Warning",
            description: "The moderators believe this account publishes fraudulent content."
          }
        },
        content: {
          en: {
            name: "Scam Warning",
            description: "The moderators believe this is fraudulent content."
          }
        }
      }
    },
    misleading: {
      id: "misleading",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Misleading",
            description: "Accounts which share misleading information."
          }
        },
        account: {
          en: {
            name: "Misleading",
            description: "The moderators believe this account is spreading misleading information."
          }
        },
        content: {
          en: {
            name: "Misleading",
            description: "The moderators believe this account is spreading misleading information."
          }
        }
      }
    }
  }, xt = class {
    constructor() {
      this.did = "", this.causes = [];
    }
    setDid(t) {
      this.did = t;
    }
    addBlocking(t) {
      t && this.causes.push({
        type: "blocking",
        source: { type: "user" },
        priority: 3
      });
    }
    addBlockingByList(t) {
      t && this.causes.push({
        type: "blocking",
        source: { type: "list", list: t },
        priority: 3
      });
    }
    addBlockedBy(t) {
      t && this.causes.push({
        type: "blocked-by",
        source: { type: "user" },
        priority: 4
      });
    }
    addBlockOther(t) {
      t && this.causes.push({
        type: "block-other",
        source: { type: "user" },
        priority: 4
      });
    }
    addLabel(t, i) {
      const r = O[t.val];
      if (!r)
        return;
      const n = t.src === this.did, s = n ? void 0 : i.labelers.find((d) => d.labeler.did === t.src);
      let u = "ignore";
      if (r.configurable ? r.flags.includes("adult") && !i.adultContentEnabled ? u = "hide" : s?.labels[t.val] ? u = s.labels[t.val] : i.labels[t.val] && (u = i.labels[t.val]) : u = r.preferences[0], u === "ignore" || r.flags.includes("unauthed") && i.userDid)
        return;
      let e;
      r.flags.includes("no-override") ? e = 1 : u === "hide" ? e = 2 : r.onwarn === "blur" ? e = 5 : r.onwarn === "blur-media" ? e = 7 : e = 8, this.causes.push({
        type: "label",
        source: n || !s ? { type: "user" } : { type: "labeler", labeler: s.labeler },
        label: t,
        labelDef: r,
        setting: u,
        priority: e
      });
    }
    addMuted(t) {
      t && this.causes.push({
        type: "muted",
        source: { type: "user" },
        priority: 6
      });
    }
    addMutedByList(t) {
      t && this.causes.push({
        type: "muted",
        source: { type: "list", list: t },
        priority: 6
      });
    }
    finalizeDecision(t) {
      const i = new Ke();
      if (i.did = this.did, !this.causes.length)
        return i;
      if (this.causes.sort((r, n) => r.priority - n.priority), i.cause = this.causes[0], i.additionalCauses = this.causes.slice(1), i.cause.type === "blocking" || i.cause.type === "blocked-by" || i.cause.type === "block-other")
        i.filter = !0, i.blur = !0, i.noOverride = !0;
      else if (i.cause.type === "muted")
        i.filter = !0, i.blur = !0;
      else if (i.cause.type === "label") {
        switch (i.cause.setting === "hide" && (i.filter = !0), i.cause.labelDef.onwarn) {
          case "alert":
            i.alert = !0;
            break;
          case "blur":
            i.blur = !0;
            break;
          case "blur-media":
            i.blurMedia = !0;
            break;
        }
        (i.cause.labelDef.flags.includes("no-override") || i.cause.labelDef.flags.includes("adult") && !t.adultContentEnabled) && (i.noOverride = !0);
      }
      return i;
    }
  };
  function lt(t, i) {
    const r = new xt();
    r.setDid(t.did), t.viewer?.muted && (t.viewer?.mutedByList ? r.addMutedByList(t.viewer?.mutedByList) : r.addMuted(t.viewer?.muted)), t.viewer?.blocking && (t.viewer?.blockingByList ? r.addBlockingByList(t.viewer?.blockingByList) : r.addBlocking(t.viewer?.blocking)), r.addBlockedBy(t.viewer?.blockedBy);
    for (const n of Wb(t.labels))
      r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Wb(t) {
    return t ? t.filter((i) => !i.uri.endsWith("/app.bsky.actor.profile/self") || i.val === "!no-unauthenticated") : [];
  }
  function cr(t, i) {
    const r = new xt();
    r.setDid(t.did);
    for (const n of Jb(t.labels))
      r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Jb(t) {
    return t ? t.filter((i) => i.uri.endsWith("/app.bsky.actor.profile/self")) : [];
  }
  function Qb(t, i) {
    const r = new xt();
    if (r.setDid(t.author.did), t.labels?.length)
      for (const n of t.labels)
        r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Yb(t, i) {
    const r = new xt();
    if (Ie.isViewRecord(t.record)) {
      if (r.setDid(t.record.author.did), t.record.labels?.length)
        for (const n of t.record.labels)
          r.addLabel(n, i);
    } else
      Ie.isViewBlocked(t.record) && (r.setDid(t.record.author.did), t.record.author.viewer?.blocking ? r.addBlocking(t.record.author.viewer?.blocking) : t.record.author.viewer?.blockedBy ? r.addBlockedBy(t.record.author.viewer?.blockedBy) : r.addBlockOther(!0));
    return r.finalizeDecision(i);
  }
  function e4(t, i) {
    return Ie.isViewRecord(t.record) ? lt(t.record.author, i) : Ke.noop();
  }
  function t4(t, i) {
    const r = new xt();
    if (Ie.isViewRecord(t.record.record)) {
      if (r.setDid(t.record.record.author.did), t.record.record.labels?.length)
        for (const n of t.record.record.labels)
          r.addLabel(n, i);
    } else
      Ie.isViewBlocked(t.record.record) && (r.setDid(t.record.record.author.did), t.record.record.author.viewer?.blocking ? r.addBlocking(t.record.record.author.viewer?.blocking) : t.record.record.author.viewer?.blockedBy ? r.addBlockedBy(t.record.record.author.viewer?.blockedBy) : r.addBlockOther(!0));
    return r.finalizeDecision(i);
  }
  function r4(t, i) {
    return Ie.isViewRecord(t.record.record) ? lt(t.record.record.author, i) : Ke.noop();
  }
  function i4(t, i) {
    return Ke.noop();
  }
  function n4(t, i) {
    return Ke.noop();
  }
  function Bt(...t) {
    const i = t.filter((r) => !!r);
    return i.length === 0 ? Ke.noop() : (i.sort((r, n) => r.cause && n.cause ? r.cause.priority - n.cause.priority : r.cause ? -1 : n.cause ? 1 : 0), i[0]);
  }
  function tt(t, i) {
    t.filter = !1, t.noOverride = !1, i === "noop" ? (t.blur = !1, t.blurMedia = !1, t.alert = !1, delete t.cause) : i === "alert" && (t.blur = !1, t.blurMedia = !1, t.alert = !0);
  }
  function Fe(t, { ignoreFilter: i } = { ignoreFilter: !1 }) {
    return t ? !(t.alert || t.blur || t.filter && !i) : !0;
  }
  function s4(t) {
    return !!(t && Ie.isView(t));
  }
  function a4(t) {
    return !!(t && Hr.isView(t));
  }
  function bu(t) {
    return {
      cause: t.cause,
      filter: t.filter,
      blur: t.blur,
      alert: t.alert,
      noOverride: t.noOverride
    };
  }
  function o4(t, i) {
    const r = lt(t, i), n = cr(t, i);
    r.blurMedia && (r.blur = !0), n.filter = !1, !Fe(r) && r.did === i.userDid && tt(r, "alert"), !Fe(n) && n.did === i.userDid && tt(n, "alert");
    let s = !1, u = !1;
    return ((r.blur || r.blurMedia) && r.cause?.type !== "muted" || n.blur || n.blurMedia) && (s = !0, u = r.noOverride || n.noOverride), (r.cause?.type === "blocking" || r.cause?.type === "blocked-by" || r.cause?.type === "muted") && (r.blur = !1, r.noOverride = !1), {
      decisions: { account: r, profile: n },
      account: r.filter || r.blur || r.alert ? bu(r) : {},
      profile: n.filter || n.blur || n.alert ? bu(n) : {},
      avatar: {
        blur: s,
        alert: r.alert || n.alert,
        noOverride: u
      }
    };
  }
  function p4(t, i) {
    const r = Qb(t, i), n = lt(t.author, i), s = cr(t.author, i);
    let u, e;
    s4(t.embed) ? (u = Yb(t.embed, i), e = e4(t.embed, i)) : a4(t.embed) && (u = t4(t.embed, i), e = r4(t.embed, i)), u?.blurMedia && (u.blur = !0), !Fe(r) && r.did === i.userDid && tt(r, "blur"), n.cause && n.did === i.userDid && tt(n, "noop"), s.cause && s.did === i.userDid && tt(s, "noop"), u && !Fe(u) && u.did === i.userDid && tt(u, "blur"), e && !Fe(e) && e.did === i.userDid && tt(e, "noop");
    const d = Bt(r, n, u, e), y = Bt(r, n), T = Bt(u, e);
    let L = !1;
    return ((n.blur || n.blurMedia) && n.cause?.type !== "muted" || (s.blur || s.blurMedia) && s.cause?.type !== "muted") && (L = !0), {
      decisions: { post: r, account: n, profile: s, quote: u, quotedAccount: e },
      content: {
        cause: Fe(y) ? d.filter ? d.cause : void 0 : y.cause,
        filter: d.filter,
        blur: y.blur,
        alert: y.alert,
        noOverride: y.noOverride
      },
      avatar: {
        blur: L,
        alert: n.alert || s.alert,
        noOverride: n.noOverride || s.noOverride
      },
      embed: Fe(T, { ignoreFilter: !0 }) ? n.blurMedia ? {
        cause: n.cause,
        blur: !0,
        noOverride: n.noOverride
      } : r.blurMedia ? {
        cause: r.cause,
        blur: !0,
        noOverride: r.noOverride
      } : {} : {
        cause: T.cause,
        blur: T.blur,
        alert: T.alert,
        noOverride: T.noOverride
      }
    };
  }
  function u4(t, i) {
    const r = i4(), n = lt(t.creator, i), s = cr(t.creator, i), u = Bt(r, n);
    return {
      decisions: { feedGenerator: r, account: n, profile: s },
      content: {
        cause: Fe(u) ? void 0 : u.cause,
        filter: u.filter,
        blur: u.blur,
        alert: u.alert,
        noOverride: u.noOverride
      },
      avatar: {
        blur: n.blurMedia || s.blurMedia,
        alert: n.alert,
        noOverride: n.noOverride || s.noOverride
      }
    };
  }
  function l4(t, i) {
    const r = n4(), n = k.isProfileViewBasic(t.creator) ? lt(t.creator, i) : Ke.noop(), s = k.isProfileViewBasic(t.creator) ? cr(t.creator, i) : Ke.noop(), u = Bt(r, n);
    return {
      decisions: { userList: r, account: n, profile: s },
      content: {
        cause: Fe(u) ? void 0 : u.cause,
        filter: u.filter,
        blur: u.blur,
        alert: u.alert,
        noOverride: u.noOverride
      },
      avatar: {
        blur: n.blurMedia || s.blurMedia,
        alert: n.alert,
        noOverride: n.noOverride || s.noOverride
      }
    };
  }
  var f4 = {
    system: {
      id: "system",
      configurable: !1,
      labels: [
        O["!hide"],
        O["!no-promote"],
        O["!warn"],
        O["!no-unauthenticated"]
      ],
      strings: {
        settings: {
          en: {
            name: "System",
            description: "Moderator overrides for special cases."
          }
        }
      }
    },
    legal: {
      id: "legal",
      configurable: !1,
      labels: [O["dmca-violation"], O.doxxing],
      strings: {
        settings: {
          en: {
            name: "Legal",
            description: "Content removed for legal reasons."
          }
        }
      }
    },
    sexual: {
      id: "sexual",
      configurable: !0,
      labels: [O.porn, O.sexual, O.nudity],
      strings: {
        settings: {
          en: {
            name: "Adult Content",
            description: "Content which is sexual in nature."
          }
        }
      }
    },
    violence: {
      id: "violence",
      configurable: !0,
      labels: [
        O.nsfl,
        O.corpse,
        O.gore,
        O.torture,
        O["self-harm"]
      ],
      strings: {
        settings: {
          en: {
            name: "Violence",
            description: "Content which is violent or deeply disturbing."
          }
        }
      }
    },
    intolerance: {
      id: "intolerance",
      configurable: !0,
      labels: [
        O["intolerant-race"],
        O["intolerant-gender"],
        O["intolerant-sexual-orientation"],
        O["intolerant-religion"],
        O.intolerant,
        O["icon-intolerant"]
      ],
      strings: {
        settings: {
          en: {
            name: "Intolerance",
            description: "Content or behavior which is hateful or intolerant toward a group of people."
          }
        }
      }
    },
    rude: {
      id: "rude",
      configurable: !0,
      labels: [O.threat],
      strings: {
        settings: {
          en: {
            name: "Rude",
            description: "Behavior which is rude toward other users."
          }
        }
      }
    },
    curation: {
      id: "curation",
      configurable: !0,
      labels: [O.spoiler],
      strings: {
        settings: {
          en: {
            name: "Curational",
            description: "Subjective moderation geared towards curating a more positive environment."
          }
        }
      }
    },
    spam: {
      id: "spam",
      configurable: !0,
      labels: [O.spam],
      strings: {
        settings: {
          en: {
            name: "Spam",
            description: "Content which doesn't add to the conversation."
          }
        }
      }
    },
    misinfo: {
      id: "misinfo",
      configurable: !0,
      labels: [
        O["account-security"],
        O["net-abuse"],
        O.impersonation,
        O.scam,
        O.misleading
      ],
      strings: {
        settings: {
          en: {
            name: "Misinformation",
            description: "Content which misleads or defrauds users."
          }
        }
      }
    }
  }, Au = {
    hideReplies: !1,
    hideRepliesByUnfollowed: !1,
    hideRepliesByLikeCount: 0,
    hideReposts: !1,
    hideQuotePosts: !1
  }, c4 = {
    sort: "oldest",
    prioritizeFollowedUsers: !0
  }, d4 = class extends fr {
    constructor() {
      super(...arguments), this.getTimeline = (t, i) => this.api.app.bsky.feed.getTimeline(t, i), this.getAuthorFeed = (t, i) => this.api.app.bsky.feed.getAuthorFeed(t, i), this.getActorLikes = (t, i) => this.api.app.bsky.feed.getActorLikes(t, i), this.getPostThread = (t, i) => this.api.app.bsky.feed.getPostThread(t, i), this.getPost = (t) => this.api.app.bsky.feed.post.get(t), this.getPosts = (t, i) => this.api.app.bsky.feed.getPosts(t, i), this.getLikes = (t, i) => this.api.app.bsky.feed.getLikes(t, i), this.getRepostedBy = (t, i) => this.api.app.bsky.feed.getRepostedBy(t, i), this.getFollows = (t, i) => this.api.app.bsky.graph.getFollows(t, i), this.getFollowers = (t, i) => this.api.app.bsky.graph.getFollowers(t, i), this.getProfile = (t, i) => this.api.app.bsky.actor.getProfile(t, i), this.getProfiles = (t, i) => this.api.app.bsky.actor.getProfiles(t, i), this.getSuggestions = (t, i) => this.api.app.bsky.actor.getSuggestions(t, i), this.searchActors = (t, i) => this.api.app.bsky.actor.searchActors(t, i), this.searchActorsTypeahead = (t, i) => this.api.app.bsky.actor.searchActorsTypeahead(t, i), this.listNotifications = (t, i) => this.api.app.bsky.notification.listNotifications(t, i), this.countUnreadNotifications = (t, i) => this.api.app.bsky.notification.getUnreadCount(t, i);
    }
    get app() {
      return this.api.app;
    }
    async post(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return t.createdAt = t.createdAt || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.feed.post.create({ repo: this.session.did }, t);
    }
    async deletePost(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new He(t);
      return await this.api.app.bsky.feed.post.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async like(t, i) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.feed.like.create({ repo: this.session.did }, {
        subject: { uri: t, cid: i },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteLike(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new He(t);
      return await this.api.app.bsky.feed.like.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async repost(t, i) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.feed.repost.create({ repo: this.session.did }, {
        subject: { uri: t, cid: i },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteRepost(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new He(t);
      return await this.api.app.bsky.feed.repost.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async follow(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.graph.follow.create({ repo: this.session.did }, {
        subject: t,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteFollow(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new He(t);
      return await this.api.app.bsky.graph.follow.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async upsertProfile(t) {
      if (!this.session)
        throw new Error("Not logged in");
      let i = 5;
      for (; i >= 0; ) {
        const r = await this.com.atproto.repo.getRecord({
          repo: this.session.did,
          collection: "app.bsky.actor.profile",
          rkey: "self"
        }).catch((u) => {
        }), n = await t(r?.data.value);
        n && (n.$type = "app.bsky.actor.profile");
        const s = Xr.validateRecord(n);
        if (!s.success)
          throw s.error;
        try {
          await this.com.atproto.repo.putRecord({
            repo: this.session.did,
            collection: "app.bsky.actor.profile",
            rkey: "self",
            record: n,
            swapRecord: r?.data.cid || null
          });
        } catch (u) {
          if (i > 0 && u instanceof Gr.InvalidSwapError) {
            i--;
            continue;
          } else
            throw u;
        }
        break;
      }
    }
    async mute(t) {
      return this.api.app.bsky.graph.muteActor({ actor: t });
    }
    async unmute(t) {
      return this.api.app.bsky.graph.unmuteActor({ actor: t });
    }
    async muteModList(t) {
      return this.api.app.bsky.graph.muteActorList({
        list: t
      });
    }
    async unmuteModList(t) {
      return this.api.app.bsky.graph.unmuteActorList({
        list: t
      });
    }
    async blockModList(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.graph.listblock.create({ repo: this.session.did }, {
        subject: t,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async unblockModList(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = await this.api.app.bsky.graph.getList({
        list: t,
        limit: 1
      });
      if (!i.data.list.viewer?.blocked)
        return;
      const { rkey: r } = new He(i.data.list.viewer.blocked);
      return await this.api.app.bsky.graph.listblock.delete({
        repo: this.session.did,
        rkey: r
      });
    }
    async updateSeenNotifications(t) {
      return t = t || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.notification.updateSeen({
        seenAt: t
      });
    }
    async getPreferences() {
      const t = {
        feeds: {
          saved: void 0,
          pinned: void 0
        },
        feedViewPrefs: {
          home: {
            ...Au
          }
        },
        threadViewPrefs: { ...c4 },
        adultContentEnabled: !1,
        contentLabels: {},
        birthDate: void 0,
        interests: {
          tags: []
        },
        mutedWords: [],
        hiddenPosts: []
      }, i = await this.app.bsky.actor.getPreferences({});
      for (const r of i.data.preferences)
        if (k.isAdultContentPref(r) && k.validateAdultContentPref(r).success)
          t.adultContentEnabled = r.enabled;
        else if (k.isContentLabelPref(r) && k.validateAdultContentPref(r).success) {
          let n = r.visibility;
          n === "show" && (n = "ignore"), (n === "ignore" || n === "warn" || n === "hide") && (t.contentLabels[r.label] = n);
        } else if (k.isSavedFeedsPref(r) && k.validateSavedFeedsPref(r).success)
          t.feeds.saved = r.saved, t.feeds.pinned = r.pinned;
        else if (k.isPersonalDetailsPref(r) && k.validatePersonalDetailsPref(r).success)
          r.birthDate && (t.birthDate = new Date(r.birthDate));
        else if (k.isFeedViewPref(r) && k.validateFeedViewPref(r).success) {
          const { $type: n, feed: s, ...u } = r;
          t.feedViewPrefs[r.feed] = { ...Au, ...u };
        } else if (k.isThreadViewPref(r) && k.validateThreadViewPref(r).success) {
          const { $type: n, ...s } = r;
          t.threadViewPrefs = { ...t.threadViewPrefs, ...s };
        } else if (k.isInterestsPref(r) && k.validateInterestsPref(r).success) {
          const { $type: n, ...s } = r;
          t.interests = { ...t.interests, ...s };
        } else if (k.isMutedWordsPref(r) && k.validateMutedWordsPref(r).success) {
          const { $type: n, ...s } = r;
          t.mutedWords = s.items;
        } else if (k.isHiddenPostsPref(r) && k.validateHiddenPostsPref(r).success) {
          const { $type: n, ...s } = r;
          t.hiddenPosts = s.items;
        }
      return t;
    }
    async setSavedFeeds(t, i) {
      return kt(this, () => ({
        saved: t,
        pinned: i
      }));
    }
    async addSavedFeed(t) {
      return kt(this, (i, r) => ({
        saved: [...i.filter((n) => n !== t), t],
        pinned: r
      }));
    }
    async removeSavedFeed(t) {
      return kt(this, (i, r) => ({
        saved: i.filter((n) => n !== t),
        pinned: r.filter((n) => n !== t)
      }));
    }
    async addPinnedFeed(t) {
      return kt(this, (i, r) => ({
        saved: [...i.filter((n) => n !== t), t],
        pinned: [...r.filter((n) => n !== t), t]
      }));
    }
    async removePinnedFeed(t) {
      return kt(this, (i, r) => ({
        saved: i,
        pinned: r.filter((n) => n !== t)
      }));
    }
    async setAdultContentEnabled(t) {
      await qe(this, (i) => {
        let r = i.findLast((n) => k.isAdultContentPref(n) && k.validateAdultContentPref(n).success);
        return r ? r.enabled = t : r = {
          $type: "app.bsky.actor.defs#adultContentPref",
          enabled: t
        }, i.filter((n) => !k.isAdultContentPref(n)).concat([r]);
      });
    }
    async setContentLabelPref(t, i) {
      i === "show" && (i = "ignore"), await qe(this, (r) => {
        let n = r.findLast((s) => k.isContentLabelPref(s) && k.validateAdultContentPref(s).success && s.label === t);
        return n ? n.visibility = i : n = {
          $type: "app.bsky.actor.defs#contentLabelPref",
          label: t,
          visibility: i
        }, r.filter((s) => !k.isContentLabelPref(s) || s.label !== t).concat([n]);
      });
    }
    async setPersonalDetails({
      birthDate: t
    }) {
      t = t instanceof Date ? t.toISOString() : t, await qe(this, (i) => {
        let r = i.findLast((n) => k.isPersonalDetailsPref(n) && k.validatePersonalDetailsPref(n).success);
        return r ? r.birthDate = t : r = {
          $type: "app.bsky.actor.defs#personalDetailsPref",
          birthDate: t
        }, i.filter((n) => !k.isPersonalDetailsPref(n)).concat([r]);
      });
    }
    async setFeedViewPrefs(t, i) {
      await qe(this, (r) => {
        const n = r.findLast((s) => k.isFeedViewPref(s) && k.validateFeedViewPref(s).success && s.feed === t);
        return n && (i = { ...n, ...i }), r.filter((s) => !k.isFeedViewPref(i) || s.feed !== t).concat([{ ...i, $type: "app.bsky.actor.defs#feedViewPref", feed: t }]);
      });
    }
    async setThreadViewPrefs(t) {
      await qe(this, (i) => {
        const r = i.findLast((n) => k.isThreadViewPref(n) && k.validateThreadViewPref(n).success);
        return r && (t = { ...r, ...t }), i.filter((n) => !k.isThreadViewPref(n)).concat([{ ...t, $type: "app.bsky.actor.defs#threadViewPref" }]);
      });
    }
    async setInterestsPref(t) {
      await qe(this, (i) => {
        const r = i.findLast((n) => k.isInterestsPref(n) && k.validateInterestsPref(n).success);
        return r && (t = { ...r, ...t }), i.filter((n) => !k.isInterestsPref(n)).concat([{ ...t, $type: "app.bsky.actor.defs#interestsPref" }]);
      });
    }
    async upsertMutedWords(t) {
      await Zr(this, t, "upsert");
    }
    async updateMutedWord(t) {
      await Zr(this, [t], "update");
    }
    async removeMutedWord(t) {
      await Zr(this, [t], "remove");
    }
    async hidePost(t) {
      await Tu(this, t, "hide");
    }
    async unhidePost(t) {
      await Tu(this, t, "unhide");
    }
  };
  async function qe(t, i) {
    const r = await t.app.bsky.actor.getPreferences({}), n = i(r.data.preferences);
    n !== !1 && await t.app.bsky.actor.putPreferences({
      preferences: n
    });
  }
  async function kt(t, i) {
    let r;
    return await qe(t, (n) => {
      let s = n.findLast((u) => k.isSavedFeedsPref(u) && k.validateSavedFeedsPref(u).success);
      return s ? (r = i(s.saved, s.pinned), s.saved = r.saved, s.pinned = r.pinned) : (r = i([], []), s = {
        $type: "app.bsky.actor.defs#savedFeedsPref",
        saved: r.saved,
        pinned: r.pinned
      }), n.filter((u) => !k.isSavedFeedsPref(u)).concat([s]);
    }), r;
  }
  async function Zr(t, i, r) {
    const n = (s) => ({
      value: s.value.replace(/^#/, ""),
      targets: s.targets
    });
    await qe(t, (s) => {
      let u = s.findLast((e) => k.isMutedWordsPref(e) && k.validateMutedWordsPref(e).success);
      if (u && k.isMutedWordsPref(u)) {
        if (r === "upsert" || r === "update")
          for (const e of i) {
            let d = !1;
            for (const y of u.items)
              if (y.value === e.value) {
                y.targets = r === "upsert" ? Array.from(/* @__PURE__ */ new Set([...y.targets, ...e.targets])) : e.targets, d = !0;
                break;
              }
            r === "upsert" && !d && u.items.push(n(e));
          }
        else if (r === "remove") {
          for (const e of i)
            for (let d = 0; d < u.items.length; d++)
              if (u.items[d].value === n(e).value) {
                u.items.splice(d, 1);
                break;
              }
        }
      } else
        r === "upsert" && (u = {
          items: i.map(n)
        });
      return s.filter((e) => !k.isMutedWordsPref(e)).concat([
        { ...u, $type: "app.bsky.actor.defs#mutedWordsPref" }
      ]);
    });
  }
  async function Tu(t, i, r) {
    await qe(t, (n) => {
      let s = n.findLast((u) => k.isHiddenPostsPref(u) && k.validateHiddenPostsPref(u).success);
      return s && k.isHiddenPostsPref(s) ? s.items = r === "hide" ? Array.from(/* @__PURE__ */ new Set([...s.items, i])) : s.items.filter((u) => u !== i) : r === "hide" && (s = {
        $type: "app.bsky.actor.defs#hiddenPostsPref",
        items: [i]
      }), n.filter((u) => !k.isInterestsPref(u)).concat([{ ...s, $type: "app.bsky.actor.defs#hiddenPostsPref" }]);
    });
  }
})(Gu);
var Xu = Gu.exports;
const Yr = new Xu.BskyAgent({
  service: "https://api.bsky.app"
}), Hu = ({
  post: o,
  reason: a,
  isRoot: p
}) => {
  const l = o.record.facets || [], c = o.record.text, g = new Xu.RichText({
    text: c,
    facets: l
  }), m = [];
  for (const x of g.segments())
    x.isLink() ? m.push({
      val: `<a href="${x.link?.uri}" target="_blank" rel="noopener" class="text-cyan-200 underline">${x.text}</a>`,
      setInnerHtml: !0
    }) : x.isMention() ? m.push({
      val: `<a href="https://bsky.app/profile/${x.mention?.did}" target="_blank" rel="noopener" class="text-cyan-200 underline">${x.text}</a>`,
      setInnerHtml: !0
    }) : x.isTag() ? m.push({
      val: `<a href="https://bsky.app/hashtag/${x.tag?.tag}" target="_blank" rel="noopener" class="text-cyan-200 underline">${x.text}</a>`,
      setInnerHtml: !0
    }) : m.push({
      val: x.text,
      setInnerHtml: !1
    });
  o.embed?.$type === "app.bsky.embed.recordWithMedia#view" && console.log(o.embed.record.record);
  const E = o.embed?.$type === "app.bsky.embed.record#view" ? o.embed.record : o.embed?.record?.record?.$type === "app.bsky.embed.record#viewRecord" && o.embed.record.record, f = E && {
    ...E,
    record: E.value,
    embed: E?.embeds[0]
  };
  return {
    username: o.author.displayName,
    handle: o.author.handle,
    avatar: o.author.avatar,
    // todo fallback
    text: m,
    createdAt: o.record.createdAt,
    uri: o.uri,
    images: [...o.embed?.images || [], ...o.embed?.media?.images || []],
    card: o.embed?.$type === "app.bsky.embed.external#view" && o.embed?.external,
    replyPost: p && f && Hu({
      post: f,
      isRoot: !1
    }),
    isRepost: a?.$type === "app.bsky.feed.defs#reasonRepost",
    repostBy: a?.by?.displayName
  };
}, ei = (o) => (o.feed || []).map((a) => Hu({
  ...a,
  isRoot: !0
})), Cu = (o) => {
  const a = o.lastIndexOf("/");
  return a !== -1 ? o.substring(a + 1) : o;
};
var $4 = function(o, a, p, l, c) {
  if (l === "m")
    throw new TypeError("Private method is not writable");
  if (l === "a" && !c)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof a == "function" ? o !== a || !c : !a.has(o))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return l === "a" ? c.call(o, p) : c ? c.value = p : a.set(o, p), p;
}, Su = function(o, a, p, l) {
  if (p === "a" && !l)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof a == "function" ? o !== a || !l : !a.has(o))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return p === "m" ? l : p === "a" ? l.call(o) : l ? l.value : a.get(o);
}, Ut;
class O4 {
  formatToParts(a) {
    const p = [];
    for (const l of a)
      p.push({ type: "element", value: l }), p.push({ type: "literal", value: ", " });
    return p.slice(0, -1);
  }
}
const G4 = typeof Intl < "u" && Intl.ListFormat || O4, X4 = [
  ["years", "year"],
  ["months", "month"],
  ["weeks", "week"],
  ["days", "day"],
  ["hours", "hour"],
  ["minutes", "minute"],
  ["seconds", "second"],
  ["milliseconds", "millisecond"]
], H4 = { minimumIntegerDigits: 2 };
class z4 {
  constructor(a, p = {}) {
    Ut.set(this, void 0);
    let l = String(p.style || "short");
    l !== "long" && l !== "short" && l !== "narrow" && l !== "digital" && (l = "short");
    let c = l === "digital" ? "numeric" : l;
    const g = p.hours || c;
    c = g === "2-digit" ? "numeric" : g;
    const m = p.minutes || c;
    c = m === "2-digit" ? "numeric" : m;
    const E = p.seconds || c;
    c = E === "2-digit" ? "numeric" : E;
    const f = p.milliseconds || c;
    $4(this, Ut, {
      locale: a,
      style: l,
      years: p.years || l === "digital" ? "short" : l,
      yearsDisplay: p.yearsDisplay === "always" ? "always" : "auto",
      months: p.months || l === "digital" ? "short" : l,
      monthsDisplay: p.monthsDisplay === "always" ? "always" : "auto",
      weeks: p.weeks || l === "digital" ? "short" : l,
      weeksDisplay: p.weeksDisplay === "always" ? "always" : "auto",
      days: p.days || l === "digital" ? "short" : l,
      daysDisplay: p.daysDisplay === "always" ? "always" : "auto",
      hours: g,
      hoursDisplay: p.hoursDisplay === "always" || l === "digital" ? "always" : "auto",
      minutes: m,
      minutesDisplay: p.minutesDisplay === "always" || l === "digital" ? "always" : "auto",
      seconds: E,
      secondsDisplay: p.secondsDisplay === "always" || l === "digital" ? "always" : "auto",
      milliseconds: f,
      millisecondsDisplay: p.millisecondsDisplay === "always" ? "always" : "auto"
    }, "f");
  }
  resolvedOptions() {
    return Su(this, Ut, "f");
  }
  formatToParts(a) {
    const p = [], l = Su(this, Ut, "f"), c = l.style, g = l.locale;
    for (const [m, E] of X4) {
      const f = a[m];
      if (l[`${m}Display`] === "auto" && !f)
        continue;
      const x = l[m], V = x === "2-digit" ? H4 : x === "numeric" ? {} : { style: "unit", unit: E, unitDisplay: x };
      p.push(new Intl.NumberFormat(g, V).format(f));
    }
    return new G4(g, {
      type: "unit",
      style: c === "digital" ? "short" : c
    }).formatToParts(p);
  }
  format(a) {
    return this.formatToParts(a).map((p) => p.value).join("");
  }
}
Ut = /* @__PURE__ */ new WeakMap();
const zu = /^[-+]?P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/, Ar = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"], Z4 = (o) => zu.test(o);
class Re {
  constructor(a = 0, p = 0, l = 0, c = 0, g = 0, m = 0, E = 0, f = 0) {
    this.years = a, this.months = p, this.weeks = l, this.days = c, this.hours = g, this.minutes = m, this.seconds = E, this.milliseconds = f, this.years || (this.years = 0), this.sign || (this.sign = Math.sign(this.years)), this.months || (this.months = 0), this.sign || (this.sign = Math.sign(this.months)), this.weeks || (this.weeks = 0), this.sign || (this.sign = Math.sign(this.weeks)), this.days || (this.days = 0), this.sign || (this.sign = Math.sign(this.days)), this.hours || (this.hours = 0), this.sign || (this.sign = Math.sign(this.hours)), this.minutes || (this.minutes = 0), this.sign || (this.sign = Math.sign(this.minutes)), this.seconds || (this.seconds = 0), this.sign || (this.sign = Math.sign(this.seconds)), this.milliseconds || (this.milliseconds = 0), this.sign || (this.sign = Math.sign(this.milliseconds)), this.blank = this.sign === 0;
  }
  abs() {
    return new Re(Math.abs(this.years), Math.abs(this.months), Math.abs(this.weeks), Math.abs(this.days), Math.abs(this.hours), Math.abs(this.minutes), Math.abs(this.seconds), Math.abs(this.milliseconds));
  }
  static from(a) {
    var p;
    if (typeof a == "string") {
      const l = String(a).trim(), c = l.startsWith("-") ? -1 : 1, g = (p = l.match(zu)) === null || p === void 0 ? void 0 : p.slice(1).map((m) => (Number(m) || 0) * c);
      return g ? new Re(...g) : new Re();
    } else if (typeof a == "object") {
      const { years: l, months: c, weeks: g, days: m, hours: E, minutes: f, seconds: x, milliseconds: V } = a;
      return new Re(l, c, g, m, E, f, x, V);
    }
    throw new RangeError("invalid duration");
  }
  static compare(a, p) {
    const l = Date.now(), c = Math.abs(xu(l, Re.from(a)).getTime() - l), g = Math.abs(xu(l, Re.from(p)).getTime() - l);
    return c > g ? -1 : c < g ? 1 : 0;
  }
  toLocaleString(a, p) {
    return new z4(a, p).format(this);
  }
}
function xu(o, a) {
  const p = new Date(o);
  return p.setFullYear(p.getFullYear() + a.years), p.setMonth(p.getMonth() + a.months), p.setDate(p.getDate() + a.weeks * 7 + a.days), p.setHours(p.getHours() + a.hours), p.setMinutes(p.getMinutes() + a.minutes), p.setSeconds(p.getSeconds() + a.seconds), p;
}
function W4(o, a = "second", p = Date.now()) {
  const l = o.getTime() - p;
  if (l === 0)
    return new Re();
  const c = Math.sign(l), g = Math.abs(l), m = Math.floor(g / 1e3), E = Math.floor(m / 60), f = Math.floor(E / 60), x = Math.floor(f / 24), V = Math.floor(x / 30), q = Math.floor(V / 12), Z = Ar.indexOf(a) || Ar.length;
  return new Re(Z >= 0 ? q * c : 0, Z >= 1 ? (V - q * 12) * c : 0, 0, Z >= 3 ? (x - V * 30) * c : 0, Z >= 4 ? (f - x * 24) * c : 0, Z >= 5 ? (E - f * 60) * c : 0, Z >= 6 ? (m - E * 60) * c : 0, Z >= 7 ? (g - m * 1e3) * c : 0);
}
function Zu(o, { relativeTo: a = Date.now() } = {}) {
  if (a = new Date(a), o.blank)
    return o;
  const p = o.sign;
  let l = Math.abs(o.years), c = Math.abs(o.months), g = Math.abs(o.weeks), m = Math.abs(o.days), E = Math.abs(o.hours), f = Math.abs(o.minutes), x = Math.abs(o.seconds), V = Math.abs(o.milliseconds);
  V >= 900 && (x += Math.round(V / 1e3)), (x || f || E || m || g || c || l) && (V = 0), x >= 55 && (f += Math.round(x / 60)), (f || E || m || g || c || l) && (x = 0), f >= 55 && (E += Math.round(f / 60)), (E || m || g || c || l) && (f = 0), m && E >= 12 && (m += Math.round(E / 24)), !m && E >= 21 && (m += Math.round(E / 24)), (m || g || c || l) && (E = 0);
  const q = a.getFullYear();
  let Z = a.getMonth();
  const be = a.getDate();
  if (m >= 27 || l + c + m) {
    const oe = new Date(a);
    oe.setFullYear(q + l * p), oe.setMonth(Z + c * p), oe.setDate(be + m * p);
    const W = oe.getFullYear() - a.getFullYear(), ee = oe.getMonth() - a.getMonth(), j = Math.abs(Math.round((Number(oe) - Number(a)) / 864e5)), F = Math.abs(W * 12 + ee);
    j < 27 ? (m >= 6 ? (g += Math.round(m / 7), m = 0) : m = j, c = l = 0) : F < 11 ? (c = F, l = 0) : (c = 0, l = W * p), (c || l) && (m = 0), Z = a.getMonth();
  }
  return l && (c = 0), g >= 4 && (c += Math.round(g / 4)), (c || l) && (g = 0), m && g && !c && !l && (g += Math.round(m / 7), m = 0), new Re(l * p, c * p, g * p, m * p, E * p, f * p, x * p, V * p);
}
function J4(o, a) {
  const p = Zu(o, a);
  if (p.blank)
    return [0, "second"];
  for (const l of Ar) {
    if (l === "millisecond")
      continue;
    const c = p[`${l}s`];
    if (c)
      return [c, l];
  }
  return [0, "second"];
}
var re = function(o, a, p, l) {
  if (p === "a" && !l)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof a == "function" ? o !== a || !l : !a.has(o))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return p === "m" ? l : p === "a" ? l.call(o) : l ? l.value : a.get(o);
}, hr = function(o, a, p, l, c) {
  if (l === "m")
    throw new TypeError("Private method is not writable");
  if (l === "a" && !c)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof a == "function" ? o !== a || !c : !a.has(o))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return l === "a" ? c.call(o, p) : c ? c.value = p : a.set(o, p), p;
}, ve, Vt, Dt, Kt, rt, ai, Wu, Ju, Qu, Yu, ct;
const Q4 = globalThis.HTMLElement || null, ti = new Re(), Bu = new Re(0, 0, 0, 0, 0, 1);
class Y4 extends Event {
  constructor(a, p, l, c) {
    super("relative-time-updated", { bubbles: !0, composed: !0 }), this.oldText = a, this.newText = p, this.oldTitle = l, this.newTitle = c;
  }
}
function ku(o) {
  if (!o.date)
    return 1 / 0;
  if (o.format === "duration" || o.format === "elapsed") {
    const p = o.precision;
    if (p === "second")
      return 1e3;
    if (p === "minute")
      return 60 * 1e3;
  }
  const a = Math.abs(Date.now() - o.date.getTime());
  return a < 60 * 1e3 ? 1e3 : a < 60 * 60 * 1e3 ? 60 * 1e3 : 60 * 60 * 1e3;
}
const ri = new class {
  constructor() {
    this.elements = /* @__PURE__ */ new Set(), this.time = 1 / 0, this.timer = -1;
  }
  observe(o) {
    if (this.elements.has(o))
      return;
    this.elements.add(o);
    const a = o.date;
    if (a && a.getTime()) {
      const p = ku(o), l = Date.now() + p;
      l < this.time && (clearTimeout(this.timer), this.timer = setTimeout(() => this.update(), p), this.time = l);
    }
  }
  unobserve(o) {
    this.elements.has(o) && this.elements.delete(o);
  }
  update() {
    if (clearTimeout(this.timer), !this.elements.size)
      return;
    let o = 1 / 0;
    for (const a of this.elements)
      o = Math.min(o, ku(a)), a.update();
    this.time = Math.min(60 * 60 * 1e3, o), this.timer = setTimeout(() => this.update(), this.time), this.time += Date.now();
  }
}();
class eA extends Q4 {
  constructor() {
    super(...arguments), ve.add(this), Vt.set(this, !1), Dt.set(this, !1), rt.set(this, this.shadowRoot ? this.shadowRoot : this.attachShadow ? this.attachShadow({ mode: "open" }) : this), ct.set(this, null);
  }
  static define(a = "relative-time", p = customElements) {
    return p.define(a, this), this;
  }
  static get observedAttributes() {
    return [
      "second",
      "minute",
      "hour",
      "weekday",
      "day",
      "month",
      "year",
      "time-zone-name",
      "prefix",
      "threshold",
      "tense",
      "precision",
      "format",
      "format-style",
      "datetime",
      "lang",
      "title"
    ];
  }
  get onRelativeTimeUpdated() {
    return re(this, ct, "f");
  }
  set onRelativeTimeUpdated(a) {
    re(this, ct, "f") && this.removeEventListener("relative-time-updated", re(this, ct, "f")), hr(this, ct, typeof a == "object" || typeof a == "function" ? a : null, "f"), typeof a == "function" && this.addEventListener("relative-time-updated", a);
  }
  get second() {
    const a = this.getAttribute("second");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set second(a) {
    this.setAttribute("second", a || "");
  }
  get minute() {
    const a = this.getAttribute("minute");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set minute(a) {
    this.setAttribute("minute", a || "");
  }
  get hour() {
    const a = this.getAttribute("hour");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set hour(a) {
    this.setAttribute("hour", a || "");
  }
  get weekday() {
    const a = this.getAttribute("weekday");
    if (a === "long" || a === "short" || a === "narrow")
      return a;
    if (this.format === "datetime" && a !== "")
      return this.formatStyle;
  }
  set weekday(a) {
    this.setAttribute("weekday", a || "");
  }
  get day() {
    var a;
    const p = (a = this.getAttribute("day")) !== null && a !== void 0 ? a : "numeric";
    if (p === "numeric" || p === "2-digit")
      return p;
  }
  set day(a) {
    this.setAttribute("day", a || "");
  }
  get month() {
    const a = this.format;
    let p = this.getAttribute("month");
    if (p !== "" && (p ?? (p = a === "datetime" ? this.formatStyle : "short"), p === "numeric" || p === "2-digit" || p === "short" || p === "long" || p === "narrow"))
      return p;
  }
  set month(a) {
    this.setAttribute("month", a || "");
  }
  get year() {
    var a;
    const p = this.getAttribute("year");
    if (p === "numeric" || p === "2-digit")
      return p;
    if (!this.hasAttribute("year") && (/* @__PURE__ */ new Date()).getUTCFullYear() !== ((a = this.date) === null || a === void 0 ? void 0 : a.getUTCFullYear()))
      return "numeric";
  }
  set year(a) {
    this.setAttribute("year", a || "");
  }
  get timeZoneName() {
    const a = this.getAttribute("time-zone-name");
    if (a === "long" || a === "short" || a === "shortOffset" || a === "longOffset" || a === "shortGeneric" || a === "longGeneric")
      return a;
  }
  set timeZoneName(a) {
    this.setAttribute("time-zone-name", a || "");
  }
  get prefix() {
    var a;
    return (a = this.getAttribute("prefix")) !== null && a !== void 0 ? a : this.format === "datetime" ? "" : "on";
  }
  set prefix(a) {
    this.setAttribute("prefix", a);
  }
  get threshold() {
    const a = this.getAttribute("threshold");
    return a && Z4(a) ? a : "P30D";
  }
  set threshold(a) {
    this.setAttribute("threshold", a);
  }
  get tense() {
    const a = this.getAttribute("tense");
    return a === "past" ? "past" : a === "future" ? "future" : "auto";
  }
  set tense(a) {
    this.setAttribute("tense", a);
  }
  get precision() {
    const a = this.getAttribute("precision");
    return Ar.includes(a) ? a : this.format === "micro" ? "minute" : "second";
  }
  set precision(a) {
    this.setAttribute("precision", a);
  }
  get format() {
    const a = this.getAttribute("format");
    return a === "datetime" ? "datetime" : a === "relative" ? "relative" : a === "duration" ? "duration" : a === "micro" ? "micro" : a === "elapsed" ? "elapsed" : "auto";
  }
  set format(a) {
    this.setAttribute("format", a);
  }
  get formatStyle() {
    const a = this.getAttribute("format-style");
    if (a === "long")
      return "long";
    if (a === "short")
      return "short";
    if (a === "narrow")
      return "narrow";
    const p = this.format;
    return p === "elapsed" || p === "micro" ? "narrow" : p === "datetime" ? "short" : "long";
  }
  set formatStyle(a) {
    this.setAttribute("format-style", a);
  }
  get datetime() {
    return this.getAttribute("datetime") || "";
  }
  set datetime(a) {
    this.setAttribute("datetime", a);
  }
  get date() {
    const a = Date.parse(this.datetime);
    return Number.isNaN(a) ? null : new Date(a);
  }
  set date(a) {
    this.datetime = a?.toISOString() || "";
  }
  connectedCallback() {
    this.update();
  }
  disconnectedCallback() {
    ri.unobserve(this);
  }
  attributeChangedCallback(a, p, l) {
    p !== l && (a === "title" && hr(this, Vt, l !== null && (this.date && re(this, ve, "m", ai).call(this, this.date)) !== l, "f"), !re(this, Dt, "f") && !(a === "title" && re(this, Vt, "f")) && hr(this, Dt, (async () => {
      await Promise.resolve(), this.update();
    })(), "f"));
  }
  update() {
    const a = re(this, rt, "f").textContent || this.textContent || "", p = this.getAttribute("title") || "";
    let l = p;
    const c = this.date;
    if (typeof Intl > "u" || !Intl.DateTimeFormat || !c) {
      re(this, rt, "f").textContent = a;
      return;
    }
    const g = Date.now();
    re(this, Vt, "f") || (l = re(this, ve, "m", ai).call(this, c) || "", l && this.setAttribute("title", l));
    const m = W4(c, this.precision, g), E = re(this, ve, "m", Wu).call(this, m);
    let f = a;
    E === "duration" ? f = re(this, ve, "m", Ju).call(this, m) : E === "relative" ? f = re(this, ve, "m", Qu).call(this, m) : f = re(this, ve, "m", Yu).call(this, c), f ? re(this, rt, "f").textContent = f : this.shadowRoot === re(this, rt, "f") && this.textContent && (re(this, rt, "f").textContent = this.textContent), (f !== a || l !== p) && this.dispatchEvent(new Y4(a, f, p, l)), E === "relative" || E === "duration" ? ri.observe(this) : ri.unobserve(this), hr(this, Dt, !1, "f");
  }
}
Vt = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakSet(), Kt = function() {
  var a;
  return ((a = this.closest("[lang]")) === null || a === void 0 ? void 0 : a.getAttribute("lang")) || this.ownerDocument.documentElement.getAttribute("lang") || "default";
}, ai = function(a) {
  return new Intl.DateTimeFormat(re(this, ve, "a", Kt), {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(a);
}, Wu = function(a) {
  const p = this.format;
  if (p === "datetime")
    return "datetime";
  if (p === "duration" || p === "elapsed" || p === "micro")
    return "duration";
  if ((p === "auto" || p === "relative") && typeof Intl < "u" && Intl.RelativeTimeFormat) {
    const l = this.tense;
    if (l === "past" || l === "future" || Re.compare(a, this.threshold) === 1)
      return "relative";
  }
  return "datetime";
}, Ju = function(a) {
  const p = re(this, ve, "a", Kt), l = this.format, c = this.formatStyle, g = this.tense;
  let m = ti;
  l === "micro" ? (a = Zu(a), m = Bu, (this.tense === "past" && a.sign !== -1 || this.tense === "future" && a.sign !== 1) && (a = Bu)) : (g === "past" && a.sign !== -1 || g === "future" && a.sign !== 1) && (a = m);
  const E = `${this.precision}sDisplay`;
  return a.blank ? m.toLocaleString(p, { style: c, [E]: "always" }) : a.abs().toLocaleString(p, { style: c });
}, Qu = function(a) {
  const p = new Intl.RelativeTimeFormat(re(this, ve, "a", Kt), {
    numeric: "auto",
    style: this.formatStyle
  }), l = this.tense;
  l === "future" && a.sign !== 1 && (a = ti), l === "past" && a.sign !== -1 && (a = ti);
  const [c, g] = J4(a);
  return g === "second" && c < 10 ? p.format(0, "second") : p.format(c, g);
}, Yu = function(a) {
  const p = new Intl.DateTimeFormat(re(this, ve, "a", Kt), {
    second: this.second,
    minute: this.minute,
    hour: this.hour,
    weekday: this.weekday,
    day: this.day,
    month: this.month,
    year: this.year,
    timeZoneName: this.timeZoneName
  });
  return `${this.prefix} ${p.format(a)}`.trim();
};
const Ku = typeof globalThis < "u" ? globalThis : window;
try {
  Ku.RelativeTimeElement = eA.define();
} catch (o) {
  if (!(Ku.DOMException && o instanceof DOMException && o.name === "NotSupportedError") && !(o instanceof ReferenceError))
    throw o;
}
var tA = /* @__PURE__ */ we('<article class="p-4 border-b border-white dark:border-white"><div class="flex gap-2"><div><div class="flex max-w-[calc(100vw-96px)] items-center"><a class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white"><span class="font-bold dark:text-white"></span><span> </span><span class="text-cyan-200 dark:textwhite text-sm">@</span></a><span class="text-cyan-200 dark:textwhite text-sm"><span class=mx-1>·</span><a class=hover:underline><relative-time format=micro threshold=P30D></relative-time></a></span></div><p class="whitespace-pre-wrap dark:text-white">', !0, !1), rA = /* @__PURE__ */ we('<p class="flex gap-1 items-center ml-10 textwhite dark:textwhite"><svg viewBox="0 0 576 512"height=16 width=16 tabindex=-1 class=mr-1><path fill=currentColor d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg><span class="text-sm text-white font-semibold">Reposted by '), iA = /* @__PURE__ */ we('<img alt="profile picture"class="w-14 h-14 rounded-full">'), nA = /* @__PURE__ */ we('<img alt="profile picture"class="w-4 h-4 mr-1 rounded-full">'), Uu = /* @__PURE__ */ we("<span>"), sA = /* @__PURE__ */ we("<div>"), aA = /* @__PURE__ */ we("<a><img class=rounded-md>"), oA = /* @__PURE__ */ we('<a target=_blank rel=noopener class="mt-4 rounded-md border border-white block"><img class=rounded-t-md><div class=p-3><p class="textwhite dark:textwhite text-sm"></p><p class="font-bold dark:text-white mb-1"></p><p class="whitespace-pre-wrap dark:text-white">'), pA = /* @__PURE__ */ we('<a target=_blank rel=noopener class="mt-4 rounded-md border border-white block">');
const el = ({
  linkTarget: o = "_self",
  post: a,
  handleModalContent: p,
  isCard: l = !1
}) => (() => {
  var c = tA(), g = c.firstChild, m = g.firstChild, E = m.firstChild, f = E.firstChild, x = f.firstChild, V = x.nextSibling, q = V.nextSibling;
  q.firstChild;
  var Z = f.nextSibling, be = Z.firstChild, oe = be.nextSibling, W = oe.firstChild, ee = E.nextSibling;
  return ie(c, (() => {
    var j = it(() => !!a.isRepost);
    return () => j() && (() => {
      var F = rA(), se = F.firstChild, J = se.nextSibling;
      return J.firstChild, ie(J, () => a.repostBy, null), F;
    })();
  })(), g), ie(g, !l && (() => {
    var j = iA();
    return Se(() => fe(j, "src", a.avatar)), j;
  })(), m), ie(E, l && (() => {
    var j = nA();
    return Se(() => fe(j, "src", a.avatar)), j;
  })(), f), fe(f, "target", o), fe(f, "rel", o === "_blank" ? "noopeener" : ""), ie(x, () => a.username), ie(q, () => a.handle, null), fe(oe, "target", o), fe(oe, "rel", o === "_blank" ? "noopeener" : ""), W._$owner = C4(), ie(ee, () => a.text.map((j) => j.setInnerHtml ? (() => {
    var F = Uu();
    return Se(() => F.innerHTML = j.val), F;
  })() : (() => {
    var F = Uu();
    return ie(F, () => j.val), F;
  })())), ie(m, (() => {
    var j = it(() => a.images.length > 0);
    return () => j() && (() => {
      var F = sA();
      return ie(F, () => a.images.map((se) => (() => {
        var J = aA(), Ae = J.firstChild;
        return J.$$click = (te) => p(te, se), fe(J, "target", o), fe(J, "rel", o === "_blank" ? "noopeener" : ""), Se((te) => {
          var Ue = `https://bsky.app/profile/${a.handle}/post/${Cu(a.uri)}`, Te = se.thumb, Ee = se.alt;
          return Ue !== te.e && fe(J, "href", te.e = Ue), Te !== te.t && fe(Ae, "src", te.t = Te), Ee !== te.a && fe(Ae, "alt", te.a = Ee), te;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), J;
      })())), Se(() => Ou(F, a.images.length > 1 ? "mt-4 grid grid-cols-2 gap-2" : "mt-4")), F;
    })();
  })(), null), ie(m, (() => {
    var j = it(() => !!a.card);
    return () => j() && (() => {
      var F = oA(), se = F.firstChild, J = se.nextSibling, Ae = J.firstChild, te = Ae.nextSibling, Ue = te.nextSibling;
      return ie(Ae, () => new URL(a.card.uri).hostname), ie(te, () => a.card.title), ie(Ue, () => a.card.description), Se((Te) => {
        var Ee = a.card.uri, jt = a.card.thumb;
        return Ee !== Te.e && fe(F, "href", Te.e = Ee), jt !== Te.t && fe(se, "src", Te.t = jt), Te;
      }, {
        e: void 0,
        t: void 0
      }), F;
    })();
  })(), null), ie(m, (() => {
    var j = it(() => !!a.replyPost);
    return () => j() && (() => {
      var F = pA();
      return ie(F, $u(el, V4({
        linkTarget: o,
        handleModalContent: p
      }, {
        get post() {
          return a.replyPost;
        },
        isCard: !0
      }))), Se(() => fe(F, "href", a.card.uri)), F;
    })();
  })(), null), Se((j) => {
    var F = `https://bsky.app/profile/${a.handle}`, se = `https://bsky.app/profile/${a.handle}/post/${Cu(a.uri)}`, J = a.createdAt;
    return F !== j.e && fe(f, "href", j.e = F), se !== j.t && fe(oe, "href", j.t = se), J !== j.a && (W.datetime = j.a = J), j;
  }, {
    e: void 0,
    t: void 0,
    a: void 0
  }), c;
})();
P4(["click"]);
var uA = /* @__PURE__ */ we("<style>"), lA = /* @__PURE__ */ we('<section><dialog class="backdrop:bg-cyan-200 backdrop:opacity-100"><form class="fixed top-5 right-5"><button type=submit aria-label=close formmethod=dialog formnovalidate class="bg-cyan-200 rounded-full w-10 h-10 text-cyan-200 flex items-center justify-center">X</button></form><img src=""alt=""class=max-h-[90vh]>'), fA = /* @__PURE__ */ we('<article class="flex gap-2 p-4 border-b border-white dark:border-white animate-pulse"><div class="bgwhite w-14 h-14 rounded-full dark:bgwhite"></div><div class="flex-1 space-y-2 py-1"><div class="grid grid-cols-4 gap-4"><div class="h-2 bgwhite rounded col-span-2 dark:bgwhite"></div></div><div class="h-2 bgwhite rounded dark:bgwhite"></div><div class="h-2 bgwhite rounded dark:bgwhite"></div><div class="h-2 bgwhite rounded dark:bgwhite">');
const cA = ({
  username: o,
  feed: a,
  limit: p = 10,
  mode: l = "",
  linkTarget: c = "_self",
  linkImage: g = !1,
  customStyles: m = "",
  search: E
}) => {
  let f, x;
  const [V, q] = ni(!1), [Z, be] = ni([]);
  _4(() => {
    q(!0), o ? Yr.app.bsky.feed.getAuthorFeed({
      limit: p,
      actor: o,
      filter: "posts_no_replies"
    }).then(({
      success: W,
      data: ee
    }) => {
      if (W) {
        const j = ei(ee);
        be(j), q(!1);
      }
    }) : a ? Yr.app.bsky.feed.getFeed({
      limit: p,
      feed: a
    }).then(({
      success: W,
      data: ee
    }) => {
      if (W) {
        const j = ei(ee);
        be(j), q(!1);
      }
    }) : E && Yr.app.bsky.feed.searchPosts({
      limit: p,
      q: E
    }).then(({
      success: W,
      data: ee
    }) => {
      if (W) {
        const j = {
          ...ee,
          feed: ee.posts.map((se) => ({
            post: se
          }))
        }, F = ei(j);
        be(F), q(!1);
      }
    });
  });
  const oe = (W, ee) => {
    g || (W.preventDefault(), x.src = ee.fullsize, x.alt = ee.alt, f.showModal());
  };
  return [(() => {
    var W = uA();
    return ie(W, M4, null), ie(W, m, null), W;
  })(), (() => {
    var W = lA(), ee = W.firstChild, j = ee.firstChild, F = j.nextSibling;
    Ou(W, `${l} max-w-screen-sm mx-auto`), ie(W, (() => {
      var Ae = it(() => !!V());
      return () => Ae() && Array.from(Array(p)).map(() => fA());
    })(), ee), ie(W, (() => {
      var Ae = it(() => !V());
      return () => Ae() && Z().map((te) => $u(el, {
        post: te,
        handleModalContent: oe,
        linkTarget: c
      }));
    })(), ee);
    var se = f;
    typeof se == "function" ? Lu(se, ee) : f = ee;
    var J = x;
    return typeof J == "function" ? Lu(J, F) : x = F, W;
  })()];
};
q4("bsky-embed", {
  username: "",
  feed: "",
  limit: 10,
  mode: "",
  linkTarget: "_self",
  linkImage: !1,
  customStyles: "",
  search: ""
}, cA);
