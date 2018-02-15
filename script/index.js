function dragStart(e) {
  e.dataTransfer.setData("itemId", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dropped(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("itemId");
  if (e.target.parentNode.nodeName == "UL" || e.target.parentNode.nodeName == "ul") {  // 不能嵌入到li中
    e.target.parentNode.appendChild(document.getElementById(data));
  } else {
    e.target.appendChild(document.getElementById(data));
  }
}

function droppedDelete(e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("itemId");
  e.target.appendChild(document.getElementById(data));
  e.target.removeChild(document.getElementById(data));
}

window.onload = function() {
  // 页面刷新特效
  document.getElementsByTagName("header")[0].style.opacity = '1';
  for (var i=0; i<3; i++) {
    document.getElementsByTagName("section")[i].style.left = '0';
    document.getElementsByTagName("section")[i].style.opacity = '1';
  }



  var numOfNewLi = 0;
  var newToDoBtn = document.getElementById("newToDoBtn");
  newToDoBtn.addEventListener("click", createNewToDo, false);

  function createNewToDo() {
    var allToDoList = document.getElementById("allToDoList");
    var newToDo = document.createElement("li");
    newToDo.setAttribute("draggable", "true");
    newToDo.setAttribute("ondragstart", "dragStart(event)");
    newToDo.setAttribute("id", "new-li-" + ++numOfNewLi);
    newToDo.innerHTML = "新词条" + numOfNewLi;
    newToDo.addEventListener("dblclick", rewriteTodo, false);
    allToDoList.appendChild(newToDo);
  }

  function rewriteTodo() {
    //console.log(this); //这里的this指向被双击的元素<li>
    var element = this; // <li>
    var oldHTML = this.innerHTML;
    this.innerHTML = '<input type="text" placeholder="要做什么呢">';
    this.firstChild.focus();  // 为input获取焦点
    //console.log(this.innerHTML);
    // 当<input>失去焦点时
    this.firstChild.onblur = function() {  // 这里用dom0级事件的原因是，为了创建闭包，从而能引用oldHTML和element
      // console.log(this); // <input>
      // console.log(oldHTML, element); // 可以引用oldHTML和element
      element.innerHTML = this.value ? this.value : oldHTML;
    };
  }

};

/*
关于focus的参考：
http://blog.csdn.net/dong_pt/article/details/51205960
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/activeElement

document.activeElement属性始终会引用DOM中当前获得了焦点的【元素】。
元素获得焦点的方式有用户输入(通常是按Tab键)、在代码中调用focus()方法和页面加载。

HTML5除了新添加了 document.activeElement属性外，还添加了document.hasFocus()方法。
这个方法用于确定【文档】是否获得了焦点

focus()是获得焦点事件

(如果没有某个元素获得焦点,则该属性的值为当前页面中的<body>元素. 
很多情况下,该属性会返回一个<input>或者<textarea>元素,
于此同时,如果用户在文本输入框中选中了一些文本,
还可以使用该元素的selectionStart和selectionEnd属性获得准确的选中文本内容.)

onblur: 
onblur 事件会在对象失去焦点时发生。
*/

