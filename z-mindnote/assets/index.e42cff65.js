import {
    c as e,
    a as t,
    r as n,
    o,
    b as r,
    d as s,
} from "./vendor.7204fa68.js";
let a;
!(function (e = ".", t = "__import__") {
    try {
        self[t] = new Function("u", "return import(u)");
    } catch (n) {
        const o = new URL(e, location),
            r = (e) => {
                URL.revokeObjectURL(e.src), e.remove();
            };
        (self[t] = (e) =>
            new Promise((n, s) => {
                const a = new URL(e, o);
                if (self[t].moduleMap[a]) return n(self[t].moduleMap[a]);
                const i = new Blob(
                        [
                            `import * as m from '${a}';`,
                            `${t}.moduleMap['${a}']=m;`,
                        ],
                        { type: "text/javascript" }
                    ),
                    c = Object.assign(document.createElement("script"), {
                        type: "module",
                        src: URL.createObjectURL(i),
                        onerror() {
                            s(new Error(`Failed to import: ${e}`)), r(c);
                        },
                        onload() {
                            n(self[t].moduleMap[a]), r(c);
                        },
                    });
                document.head.appendChild(c);
            })),
            (self[t].moduleMap = {});
    }
})("/mindnote/assets/");
const i = {},
    c = function (e, t) {
        if (!t) return e();
        if (void 0 === a) {
            const e = document.createElement("link").relList;
            a =
                e && e.supports && e.supports("modulepreload")
                    ? "modulepreload"
                    : "preload";
        }
        return Promise.all(
            t.map((e) => {
                if (e in i) return;
                i[e] = !0;
                const t = e.endsWith(".css"),
                    n = t ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${e}"]${n}`)) return;
                const o = document.createElement("link");
                return (
                    (o.rel = t ? "stylesheet" : a),
                    t || ((o.as = "script"), (o.crossOrigin = "")),
                    (o.href = e),
                    document.head.appendChild(o),
                    t
                        ? new Promise((e, t) => {
                              o.addEventListener("load", e),
                                  o.addEventListener("error", t);
                          })
                        : void 0
                );
            })
        ).then(() => e());
    },
    d = [
        {
            path: "/",
            name: "SpacePage",
            component: () =>
                c(
                    () => __import__("./SpacePage.6610279a.js"),
                    [
                        "/mindnote/assets/SpacePage.6610279a.js",
                        "/mindnote/assets/SpacePage.5dc83f02.css",
                        "/mindnote/assets/util.d5e42b04.js",
                        "/mindnote/assets/vendor.7204fa68.js",
                    ]
                ),
        },
        {
            path: "/mindnote/:mindnoteId",
            name: "MindnotePage",
            component: () =>
                c(
                    () => __import__("./MindnotePage.7a068a0c.js"),
                    [
                        "/mindnote/assets/MindnotePage.7a068a0c.js",
                        "/mindnote/assets/MindnotePage.ea3601b1.css",
                        "/mindnote/assets/vendor.7204fa68.js",
                        "/mindnote/assets/util.d5e42b04.js",
                    ]
                ),
        },
    ];
var m = e({ history: t("/mindnote/"), routes: d });
const l = { name: "App" };
l.render = function (e, t, s, a, i, c) {
    const d = n("router-view");
    return o(), r(d);
};
var p = s(l);
p.use(m), p.mount("#app");
