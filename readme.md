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

###### 1：childNodes属性:
标准的，它返回指定元素的子元素集合，包括html节点，所有属性，文本。可以通过nodeType来判断是哪种类型的节点，只有当nodeType==1时才是元素节点，2是属性节点，3是文本节点。如果代码中有换行、空格就会增加文本节点，这样用它来返回真正的子节点就会不准确，具体见下面的例子。

除了IE9和Firefox，其他浏览器都支持通过childNodes[i]获取第i个子节点。

如果一定要用这个方法（毕竟他是W3C标准），就要增加一个判断子节点类型过程：


```
function getFirst(elem){
    for(var i=0,e;e=elem.childNodes[i++];){
        if(e.nodeType==1)
            return e;
    }
}
```


###### 2：children属性:
非标准的，它返回指定元素的子元素集合。经测试，它只返回html节点，甚至不返回文本节点。且在所有浏览器下表现惊人的一致。和childNodes一样，在firefox下不支持()取集合元素。因此如果想获取指定元素的第一个html节点，可以使用children[0]来替代上面的getFirst函数。需注意children在IE中包含注释节点。

返回指定元素的子元素集合，只包括元素节点，不包括文本节点。

除了IE9和Firefox，其他浏览器都支持通过children[i]获取第i个子节点。

注意：children在IE中包含注释节点。

###### 3、firstChild属性：


获取指定元素的第一个子节点，可以是元素节点，也可以是文本节点。

问题：若父元素与第一个子元素之间存在空白节点，firstChild获取到的将是空白节点而不是第一个子元素。

解决：使用firstElementChild属性。

问题：IE6/7/8中不支持firstElementChild属性。

解决：使用children[0]属性。

###### 4、firstElementChild属性：



获取指定元素的第一个子元素节点，不会检测到文本节点。
