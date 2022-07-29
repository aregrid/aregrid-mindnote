import * as utils from '../../utils/util';
import TreeNode from './TreeNode.js';
import treeProperties from './TreeProperties.js';
import parseList from './Parser.js';



function MindmapView(opts){
    this.el = opts.el // container 
    this.currentTree = undefined;
    this.treeProperties = {};
    this.sourceCode = opts.sourceCode;
    for (var propName in treeProperties) {
        this.treeProperties[propName] = treeProperties[propName].val;
    }
    this.parseSource();
}
MindmapView.prototype = {
    parseSource: function () {
        console.log("Parsing...");

        try {
            console.log(222)
            console.log(this.sourceCode)
            var parsed = parseList(this.sourceCode);
            console.log(parsed)
        } catch (err) {
            console.log("Error sourceCode parse fail");

            return;
        }

        if (parsed.children.length == 0) return;
        parsed = parsed.children[0];

         
        try {
            if(treeProperties["textFilter"].val != "") {
                this.textFilter = new RegExp(treeProperties["textFilter"].val);
            } else {
                this.textFilter = new RegExp(".+");
            }
        } catch (err) {
            console.log(err);
            return;
        }
     

        
        this.currentTree = this.parseObjectBranch(parsed, true);
        this.regenerateDiagram();
    },

    parseObjectBranch: function (branch, isRoot = false) {
        var node = new TreeNode(branch.label, isRoot);

        for (var child of branch.children) {
            if(this.textFilter.test(child.label)) {
                node.addChild(this.parseObjectBranch(child, false));
            }
        }

        return node;
    },

    regenerateDiagram: function () {
        var canvas = this.el;
        var ctx = canvas.getContext("2d");

        if (!(this.currentTree instanceof TreeNode)) {
            console.log("Not a valid tree", this.currentTree);
            return;
        }

        //dDraw the mindmap
        var beautifulDrawing = this.currentTree.draw();

        // resize canvas to the size of the mindmap plus some margin
        canvas.width = beautifulDrawing.width +25 ;
        canvas.height = beautifulDrawing.height+25 ;

        // console.log("Canvas", canvas.width, canvas.height);

        // draw the mindmap onto the existing canvas
        ctx.drawImage(beautifulDrawing, 25, 25);
    },

    buildGlobalProperties: function () {
        for (var propName in treeProperties) {
            if("textFilter" != propName) {
                treeProperties[propName].val = Number(this.treeProperties[propName]);
            } else {
                treeProperties[propName].val = this.treeProperties[propName];
            }
        }
        this.parseSource();
    }
}

export default MindmapView;
