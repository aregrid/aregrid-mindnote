import { u as t } from "./util.d5e42b04.js";
import {
    o as e,
    b as i,
    t as n,
    e as s,
    w as o,
    p as a,
    f as l,
    g as d,
    F as c,
    h as r,
    i as m,
    r as h,
} from "./vendor.7204fa68.js";
const p = {
        props: [
            "itemTitle",
            "itemContent",
            "itemBtn",
            "styleObject",
            "btnShowType",
        ],
        data: () => ({
            title: "title",
            content: "content",
            btn: "btn",
            showType: 0,
            btnShown: !0,
        }),
        created() {
            if (
                ((this.title = this.itemTitle || "title"),
                this.itemContent && (this.content = this.itemContent),
                this.itemBtn && (this.btn = this.itemBtn),
                this.btnShowType)
            )
                switch (this.btnShowType) {
                    case "Hover":
                        (this.showType = 1), (this.btnShown = !1);
                }
        },
        methods: {
            btnClick() {
                console.log("card click"), this.$emit("hit-click", this);
            },
            startHover() {
                this.showType && (this.btnShown = !0);
            },
            endHover() {
                this.showType && (this.btnShown = !1);
            },
        },
    },
    w = { key: 0, class: "info title" },
    b = { key: 1, class: "info content" };
p.render = function (t, a, l, d, c, r) {
    return (
        e(),
        i(
            "div",
            {
                class: "card",
                style: l.styleObject,
                onMouseenter:
                    a[2] ||
                    (a[2] = (...t) => r.startHover && r.startHover(...t)),
                onMouseleave:
                    a[3] || (a[3] = (...t) => r.endHover && r.endHover(...t)),
            },
            [
                l.itemTitle ? (e(), i("div", w, n(c.title), 1)) : s("", !0),
                l.itemContent ? (e(), i("div", b, n(c.content), 1)) : s("", !0),
                l.itemBtn
                    ? (e(),
                      i(
                          "div",
                          {
                              key: 2,
                              class: ["info btn", { shown: c.btnShown }],
                              onClick:
                                  a[1] ||
                                  (a[1] = o(
                                      (...t) => r.btnClick && r.btnClick(...t),
                                      ["stop", "prevent"]
                                  )),
                          },
                          n(c.btn),
                          3
                      ))
                    : s("", !0),
            ],
            36
        )
    );
};
const v = {
        props: ["link"],
        components: { MindnoteCard: p },
        data: () => ({
            err: null,
            msg: "no data",
            itemList: [],
            addNewBtnStr: " + 添加",
            deleteBtnStr: "删除",
            styleObj: "border-style: dashed;",
        }),
        created() {
            this.fetchData();
        },
        methods: {
            addNewMindnotePage() {
                console.log("click add new");
                const e = t.uniqueid(),
                    i = new Date(),
                    n = {
                        id: e,
                        name: window
                            .moment(new Date())
                            .format("YYYY-MM-DD日记"),
                        time: { createAt: i.toLocaleString() },
                    };
                this.itemList.push(n),
                    t.setLocalStorage("mindnoteItems", this.itemList),
                    t.setLocalStorage(e, [{ id: 1, name: "Untitled" }]),
                    this.$router.push("/mindnote/" + e);
            },
            deleteItem(e, i) {
                console.log("delete item", this, e, i),
                    this.itemList.splice(i, 1),
                    t.setLocalStorage("mindnoteItems", this.itemList),
                    localStorage.removeItem(e.toString());
            },
            fetchData() {
                const e = t.getLocalStorage("mindnoteItems");
                null == e
                    ? console.log("no local data \ncheck for cloud data")
                    : (this.itemList = e);
            },
        },
    },
    g = m("data-v-cd3312d2");
a("data-v-cd3312d2");
const u = { class: "page-space" },
    y = d("div", { class: "navbar" }, [d("h3", null, "Z Mindnote")], -1),
    k = { key: 0, class: "msg" },
    S = { class: "grid" },
    f = { key: 0, class: "itemwrapper" };
l();
const T = g((t, o, a, l, m, p) => {
    const w = h("mindnote-card"),
        b = h("router-link");
    return (
        e(),
        i("div", u, [
            y,
            m.err ? (e(), i("div", k, n(m.msg), 1)) : s("", !0),
            d("div", S, [
                d(
                    "div",
                    {
                        class: "addNewBtn",
                        onClick:
                            o[1] ||
                            (o[1] = (...t) =>
                                p.addNewMindnotePage &&
                                p.addNewMindnotePage(...t)),
                    },
                    [
                        d(
                            w,
                            { itemTitle: m.addNewBtnStr, style: m.styleObj },
                            null,
                            8,
                            ["itemTitle", "style"]
                        ),
                    ]
                ),
                m.itemList
                    ? (e(),
                      i("div", f, [
                          (e(!0),
                          i(
                              c,
                              null,
                              r(
                                  m.itemList,
                                  (t, n) => (
                                      e(),
                                      i(
                                          "div",
                                          { class: "blockwrapper", key: n },
                                          [
                                              d(
                                                  b,
                                                  {
                                                      class: "block",
                                                      to: {
                                                          name: "MindnotePage",
                                                          params: {
                                                              mindnoteId: t.id,
                                                          },
                                                      },
                                                  },
                                                  {
                                                      default: g(() => [
                                                          d(
                                                              w,
                                                              {
                                                                  itemTitle:
                                                                      t.name,
                                                                  itemContent:
                                                                      t.time
                                                                          .createAt,
                                                                  itemBtn:
                                                                      m.deleteBtnStr,
                                                                  btnShowType:
                                                                      "Hover",
                                                                  onHitClick: (
                                                                      e
                                                                  ) =>
                                                                      p.deleteItem(
                                                                          t.id,
                                                                          n
                                                                      ),
                                                              },
                                                              null,
                                                              8,
                                                              [
                                                                  "itemTitle",
                                                                  "itemContent",
                                                                  "itemBtn",
                                                                  "onHitClick",
                                                              ]
                                                          ),
                                                      ]),
                                                      _: 2,
                                                  },
                                                  1032,
                                                  ["to"]
                                              ),
                                          ]
                                      )
                                  )
                              ),
                              128
                          )),
                      ]))
                    : s("", !0),
            ]),
        ])
    );
});
(v.render = T), (v.__scopeId = "data-v-cd3312d2");
export default v;
