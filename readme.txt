��Javascript�У�����ͨ�� children ����ȡ�����ӽڵ㡣

childrenֻ����HTML�ڵ㣬�����������ı��ڵ㣬��Ȼ���Ǳ�׼��DOM���ԣ����ǵõ��˼��������������֧�֡�

�﷨��
    nodeObject.children
���У�nodeObject Ϊ�ڵ����Ԫ�ؽڵ㣩������ֵΪ�����ӽڵ�ļ��ϣ����飩��

ע�⣺��IE�У�children����ע�ͽڵ㡣

���磬��ȡ id="demo" �Ľڵ�������ӽڵ㣺
document.getElementById("demo").children;

һ������£�������ϣ����ȡԪ�ؽڵ㣬����ͨ�� nodeType ����������ˢѡ��nodeType==1 �Ľڵ�ΪԪ�ؽڵ㡣


���⣬��W3C�淶�У���ͨ�� childNodes ����ȡ�ӽڵ�ģ�����һ����׼���ԣ�����ָ��Ԫ�ص��ӽڵ�ļ��ϣ�����HTML�ڵ㡢�ı��ڵ㡢ע�ͽڵ�ȣ��� children ���صĽڵ����͸��ӹ㷺��


Ϊ����ߴ���ļ����ԣ���������������֧�� children �� childNodes �����������������д���룺
var childArr=ele.children || ele.childNodes





javascript��children��childNodes������

1��childNodes�����Ǳ�׼���ԣ�������ָ��Ԫ�ص���Ԫ�ؼ��ϣ�����HTML�ڵ㣬�������ԣ��ı��ڵ㡣
����ͨ��nodeType���ж����������͵Ľڵ㣬ֻ�е�nodeType==1ʱ����Ԫ�ؽڵ㣬2�����Խڵ㣬3���ı��ڵ㡣

��Щ�˴����ʹ��()ȥȡ�ü���Ԫ�أ��±��г����������childNodes(i)��֧�������
IE6/7/8/Safari/Chrome/Opera	IE9/Firefox
childNodes(i)	֧��	��֧��

��ʱ����Ҫ��ȡָ��Ԫ�صĵ�һ��HTML�ӽڵ㣨������/�ı��ڵ㣩���������뵽�ľ���firstChild ���ԡ������е�һ��HTML�ڵ�ǰ����л��У��ո���ôfirstChild���صľͲ�������Ҫ���ˡ�����ʹ��nodeType���ж��¡�

function getFirst(elem){
    for(var i=0,e;e=elem.childNodes[i++];){
        if(e.nodeType==1)
            return e;
    }
}

2��children���Ǳ�׼���ԣ�������ָ��Ԫ�ص���Ԫ�ؼ��ϡ�

����ֻ����HTML�ڵ㣬�����������ı��ڵ㣬��Ȼ���Ǳ�׼��DOM���ԣ�������innerHTML����һ�����õ��˼��������������֧�֡�

��childNodes һ������Firefox�²�֧��()ȡ����Ԫ�ء����������ȡָ��Ԫ�صĵ�һ��HTML�ڵ㣬����ʹ��children[0]����������getFirst������

������Ҫע�����children��IE�а���ע�ͽڵ㡣