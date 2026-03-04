import { defineComponent as b, ref as h, computed as o, onMounted as y, onBeforeUnmount as M, watch as T, openBlock as m, createElementBlock as f, normalizeStyle as u, createElementVNode as p, Fragment as k, renderList as I, renderSlot as S } from "vue";
const z = /* @__PURE__ */ b({
  __name: "VirtualList",
  props: {
    items: {},
    height: {},
    itemHeight: {},
    overscan: {}
  },
  setup(r) {
    const e = r, l = h(null), n = h(0), s = o(() => e.items.length * e.itemHeight), d = o(() => e.itemHeight ? Math.ceil(e.height / e.itemHeight) : 0), c = o(() => e.overscan ?? 5), i = o(() => {
      if (!e.itemHeight) return 0;
      const t = Math.floor(n.value / e.itemHeight) - c.value;
      return Math.max(0, t);
    }), g = o(() => {
      const t = i.value + d.value + c.value * 2;
      return Math.min(e.items.length, t);
    }), x = o(() => e.items.slice(i.value, g.value)), _ = o(() => i.value * e.itemHeight);
    function w() {
      l.value && (n.value = l.value.scrollTop);
    }
    let a = null;
    return y(() => {
      const t = l.value;
      t && (n.value = t.scrollTop, "ResizeObserver" in window && (a = new ResizeObserver(() => {
        n.value = t.scrollTop;
      }), a.observe(t)));
    }), M(() => {
      a && l.value && a.unobserve(l.value), a = null;
    }), T(
      () => e.items.length,
      () => {
        const t = Math.max(0, s.value - e.height);
        n.value > t && (n.value = t, l.value && (l.value.scrollTop = t));
      }
    ), (t, V) => (m(), f("div", {
      ref_key: "containerRef",
      ref: l,
      class: "virtual-list-vue-container",
      style: u({
        height: `${r.height}px`,
        overflowY: "auto",
        position: "relative"
      }),
      onScroll: w
    }, [
      p("div", {
        class: "virtual-list-vue-spacer",
        style: u({
          height: `${s.value}px`,
          position: "relative"
        })
      }, [
        p("div", {
          class: "virtual-list-vue-inner",
          style: u({
            transform: `translateY(${_.value}px)`,
            willChange: "transform"
          })
        }, [
          (m(!0), f(k, null, I(x.value, (H, v) => S(t.$slots, "default", {
            key: i.value + v,
            item: H,
            index: i.value + v
          }, void 0, !0)), 128))
        ], 4)
      ], 4)
    ], 36));
  }
}), L = (r, e) => {
  const l = r.__vccOpts || r;
  for (const [n, s] of e)
    l[n] = s;
  return l;
}, O = /* @__PURE__ */ L(z, [["__scopeId", "data-v-3494baec"]]);
function R(r) {
  r.component("VirtualList", O);
}
const B = {
  install: R
};
export {
  O as VirtualList,
  B as default,
  R as install
};
