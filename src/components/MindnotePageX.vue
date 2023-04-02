<template>
  <div class="pape-mindnote">
    <div class="pape-mindnote__bd" id="editor-example">
      <!-- 
      <div class="page-mindnote__mindmap" v-show="!isHideMindmap">
        <canvas ref="mindmap"></canvas>
      </div>

      <a class="btn-view-mindmap" v-show="isHideMindmap" @click="viewMindmap"
        >view mindmap</a
      >
      <a
        class="btn-view-mindmap"
        v-show="!isHideMindmap"
        v-on:click="isHideMindmap = true"
        >close</a
      >
       -->
    </div>
  </div>
</template>

<script>
import Mindnote from "./MindnoteBox.vue";
import { getLocalStorage, setLocalStorage } from "../utils/util.js";
import { SimpleAffineEditor } from "@blocksuite/editor";
import "@blocksuite/editor/themes/affine.css";

import MindmapView from "./MindmapView/MindmapView";

export default {
  name: "MindnotePage",
  components: {
    Mindnote,
  },
  // props: ["mindnoteId"],
  data() {
    return {
      isHideMindmap: true,
      title: this.getDefaultTitle(),
      listItemData: [],
      rootItem: {
        name: "Untitled",
      },
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    viewMindmap() {
      this.isHideMindmap = false;
      let sourceCode = this.buildSourceCode(
        this.listItemData,
        ["- " + this.title],
        { depth: 0 }
      ).join("\n");

      new MindmapView({
        el: this.$refs.mindmap,
        sourceCode: sourceCode,
      });
    },
    buildSourceCode(data, strs, opts = {}) {
      let list = [];
      if (data instanceof Array) {
        list.push(data);
      } else {
        list.push(data);
      }

      list &&
        list.forEach((subList) => {
          subList.forEach((subNode) => {
            let prefix = "";
            if (opts.depth >= 0) {
              for (let i = 0; i <= opts.depth; i++) {
                prefix = "  " + prefix;
              }
            }
            strs.push(prefix + `- ${subNode.name}`);
            subNode.children &&
              subNode.children.length &&
              this.buildSourceCode(subNode.children, strs, {
                depth: opts.depth + 1,
              });
          });
        });

      return strs;
    },
    getData() {
      const tmp = getLocalStorage(this.getMindnoteId());
      this.listItemData = tmp;
    },
    saveMindnote() {
      console.log("saveMindnote", this.listItemData);
      setLocalStorage(this.getMindnoteId(), this.listItemData);
    },
    getMindnoteId() {
      return this.$route.params.mindnoteId;
    },
    getDefaultTitle() {
      let mindnotePage = this.fetchMindnoteById(this.getMindnoteId());
      if (mindnotePage) {
        return mindnotePage.name;
      }
      return "";
    },
    fetchMindnoteById(mindnoteId) {
      return this.fetchLocalDb().find((item) => item.id == mindnoteId);
    },
    fetchLocalDb() {
      return getLocalStorage("mindnoteItems");
    },
    onTitleChange() {
      let localDB = this.fetchLocalDb();
      let mindnotePage = this.fetchMindnoteById(this.getMindnoteId());
      let index = localDB.findIndex((item) => item.id == mindnotePage.id);

      if (mindnotePage) {
        mindnotePage.name = this.title;
        localDB[index] = mindnotePage;
        setLocalStorage("mindnoteItems", localDB);
      }
    },
    async main() {
      const { Workspace, Page, Text } = await import("@blocksuite/store");
      const { AffineSchemas } = await import("@blocksuite/blocks/models");
      const { EditorContainer } = await import("@blocksuite/editor");

      // Create a workspace with one default page
      const workspace = new Workspace({ id: "test" }).register(AffineSchemas);
      const page = workspace.createPage("page0");

      // Create default blocks in the page
      const pageBlockId = page.addBlock("affine:page", {
        title: new Text(this.getDefaultTitle()),
      });
      const frameId = page.addBlock("affine:frame", {}, pageBlockId);
      page.addBlock(
        "affine:paragraph",
        {
          text: new Text("Start editing here!"),
        },
        frameId
      );

      // Init editor with the page store
      const editor = new EditorContainer();
      editor.page = page;
      document.querySelector("#editor-example").appendChild(editor);
      this.editor = editor;
    },
  },
  mounted() {
    this.main();
  },
  unmounted() {
    if (document.querySelector("#editor-example")) {
      document.querySelector("#editor-example").innerHTML = null;
      this.editor && this.editor.destroy();
    }
  },
};
</script>

<style scoped lang="less">
.pape-mindnote {
  height: calc(100vh);
  box-shadow: var(--block-shadow);
  padding-top: 40px;
}
.pape-mindnote__bd {
  margin-bottom: 15px;
  margin: 0 auto;
  width: 796px;
  padding: 18px 36px 0 36px;
  height: 100%;
  background-color: #fff;
  border: 1px solid #efeff1;
  position: relative;
}
.btn-view-mindmap {
  background: black;
  color: #fff;
  display: inline-block;
  padding: 5px;
  position: absolute;
  right: -80px;
}
.page-mindnote__mindmap {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding-top: 100px;
  background: #fff;
  canvas {
    // width:100%;
  }
}
</style>
