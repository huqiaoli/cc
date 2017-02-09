在Javascript中，可以通过 children 来获取所有子节点。

children只返回HTML节点，甚至不返回文本节点，虽然不是标准的DOM属性，但是得到了几乎所有浏览器的支持。

语法：
    nodeObject.children
其中，nodeObject 为节点对象（元素节点），返回值为所有子节点的集合（数组）。

注意：在IE中，children包含注释节点。

例如，获取 id="demo" 的节点的所有子节点：
document.getElementById("demo").children;

一般情况下，我们是希望获取元素节点，可以通过 nodeType 属性来进行刷选，nodeType==1 的节点为元素节点。


另外，在W3C规范中，是通过 childNodes 来获取子节点的，它是一个标准属性，返回指定元素的子节点的集合，包括HTML节点、文本节点、注释节点等，比 children 返回的节点类型更加广泛。


为了提高代码的兼容性，避免个别浏览器不支持 children 或 childNodes 的情况，可以这样编写代码：
var childArr=ele.children || ele.childNodes





javascript中children和childNodes的区别

1，childNodes：它是标准属性，它返回指定元素的子元素集合，包括HTML节点，所有属性，文本节点。
可以通过nodeType来判断是哪种类型的节点，只有当nodeType==1时才是元素节点，2是属性节点，3是文本节点。

有些人错误的使用()去取该集合元素，下表列出各浏览器对childNodes(i)的支持情况：
IE6/7/8/Safari/Chrome/Opera	IE9/Firefox
childNodes(i)	支持	不支持

有时候需要获取指定元素的第一个HTML子节点（非属性/文本节点），最容易想到的就是firstChild 属性。代码中第一个HTML节点前如果有换行，空格，那么firstChild返回的就不是你想要的了。可以使用nodeType来判断下。

function getFirst(elem){
    for(var i=0,e;e=elem.childNodes[i++];){
        if(e.nodeType==1)
            return e;
    }
}

2，children：非标准属性，它返回指定元素的子元素集合。

但它只返回HTML节点，甚至不返回文本节点，虽然不是标准的DOM属性，但它和innerHTML方法一样，得到了几乎所有浏览器的支持。

和childNodes 一样，在Firefox下不支持()取集合元素。因此如果想获取指定元素的第一个HTML节点，可以使用children[0]来替代上面的getFirst函数。

这里需要注意的是children在IE中包含注释节点。