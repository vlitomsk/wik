// Обработчик готовности DOM
$(function ()
{
  sort.totaltask   = tasks.length;  // Всего заданий
  sort.ntask       = 0;             // Число решённых заданий 
  sort.numAllDrop  = 0;  // Общее число сбросов
  sort.numAllDropI  = 0;  // Общее число сбросов для текущего задания
  sort.numTrueDrop = 0;  // Число правильных сбросов 
  sort.begin(); 
  
  $("#sort_clear")
    .mouseup(function () 
      {
        sort.totaltask   = tasks.length;  // Всего заданий
        sort.ntask       = 0;             // Число решённых заданий 
        sort.numAllDrop  = 0;  // Общее число сбросов
        sort.numTrueDrop = 0;  // Число правильных сбросов
        sort.numAllDropI  = 0;  // Общее число сбросов для текущего задания 
        sort.begin(); 
        this.src='pic/clear1.png';
      })
    .mousedown(function () 
      {
        this.src='pic/clear3.png';
      })
    .mouseover(function () 
      {
        this.src='pic/clear2.png';
      })
    .mouseout(function () 
      {
        this.src='pic/clear1.png';
      })


    $("#index").mouseup(function () {
        this.src = 'pic/index1.png';
        location = 'index.htm';
    }).mousedown(function () {
        this.src = 'pic/index3.png';
    }).mouseover(function () {
        this.src = 'pic/index2.png';
    }).mouseout(function () {
        this.src = 'pic/index1.png';
    })

    $("#game").mouseup(function () {
        this.src = 'pic/game1.png';
        location = 'game.htm';
    }).mousedown(function () {
        this.src = 'pic/game3.png';
    }).mouseover(function () {
        this.src = 'pic/game2.png';
    }).mouseout(function () {
        this.src = 'pic/game1.png';
    })

});


// Глобальное имя исполнителя
// --------------------------
var sort = {};

// Константы
// ===================================================================
sort.mess = [
"<SPAN>Игра:<BR>Сортировка<BR>Задание:<BR>Поместите<BR>каждый объект<BR>в&nbsp;свой&nbsp;бокс</SPAN>",
"<SPAN>Задание<BR>выполнено!</SPAN>",
"<SPAN>Игра<BR>закончена!</SPAN>"
            ];

sort.picStatus = ['pic/z.png', 'pic/bad.png', 'pic/middle.png',
                  'pic/middle.png', 'pic/good.png'
                 ];
sort.picStatus1 = ['pic/z.png', 'pic/bad.png', 'pic/middle.png',
                  'pic/middle.png', 'pic/good.png'
                 ];
// Функции
// ===================================================================

// Набор заданий
var tasks = [                                      
{ // Первое задание
  // Сортировочные ящики
  boxes: ["существующие<BR>планеты", "несуществующие<BR>планеты"],
  // Объекты
  оbjects:
        [
          {                       // Первый объект
            numberBox:1,          // Номер бокса 
            pic:"pic/grezol.png",  // Путь к картинке
            left:10, top:10       // Координаты картинки 
          },
          {                       // Второй объект
            numberBox:0,          // Номер бокса 
            pic:"pic/greli.png",  // Путь к картинке
            left:320, top:130     // Координаты картинки 
          },
          {                       // Третий объект
            numberBox:1,          // Номер бокса 
            pic:"pic/bygon.png",  // Путь к картинке
            left:30, top:240      // Координаты картинки 
          },
          {                       // Четвёртый объект
            numberBox:0,          // Номер бокса 
            pic:"pic/kalen.png",  // Путь к картинке
            left:280, top:300     // Координаты картинки 
          },
          {                       // пятый объект
            numberBox:0,          // Номер бокса 
            pic:"pic/orion.png",  // Путь к картинке
            left:100, top:400     // Координаты картинки 
          }
        ]
},
{ // Второе задание
  // Сортировочные ящики
  boxes: ["<BR>ДА", "<BR>НЕТ"],
  // Объекты
  оbjects:
        [
          {                       // Первый объект
            numberBox:1,          // Номер бокса 
            pic:"pic/deva.png",  // Путь к картинке
            left:5, top:5       // Координаты картинки 
          },
          {                       // Второй объект
            numberBox:0,          // Номер бокса 
            pic:"pic/proff.png",  // Путь к картинке
            left:240, top:100     // Координаты картинки 
          },
          {                       // Третий объект
            numberBox:1,          // Номер бокса 
            pic:"pic/rol.png",  // Путь к картинке
            left:10, top:200      // Координаты картинки 
          },
          {                       // пятый объект
            numberBox:0,          // Номер бокса 
            pic:"pic/eagl.png",  // Путь к картинке
            left:10, top:370     // Координаты картинки 
          },
          {                       // Четвёртый объект
            numberBox:0,          // Номер бокса 
            pic:"pic/dance.png",  // Путь к картинке
            left:240, top:280     // Координаты картинки 
          }

        ]
}                                       
            ];

// ===================================================================

// Начало работы
//---------------
sort.begin = function ()                    
{
  // Восстановим исходную картинку на месте показа звания
//  $("#sort_z").html("<IMG src='pic/fon-ocenka.png' alt=''>");
    $("#sort_z").html("");


  // Восстановим исходное сообщение
  $("#sort_mess").html(sort.mess[0]);
  
  // Создадим сообщение о числе решённых заданий
  $("#sort_ntask").html("Решено<BR>заданий:<BR><SPAN>&nbsp;</SPAN> из <SPAN>&nbsp;</SPAN>");

  sort.numTrueDropI = 0; // Число правильных сбросов для текущей задачи 
  sort.numAllDropI  = 0;  // Общее число сбросов для текущего задания

  // Решено заданий:
  sort.numOfSolve();

  // Удаляем функциональность перетаскивания 
  $('#sort_area_оbjects IMG').draggable('destroy');
  $("#sort_area_boxes DIV").droppable('destroy');
  $("#sort_area_boxes").show();

  // Сброс картинок предыдущего задания
  $("#sort_area_оbjects").html("&nbsp;");  
  // Вывод картинок на поле для текущего задания
  sort.showPictures();

  // Сброс ящиков предыдущего задания
  $("#sort_area_boxes").html("&nbsp;");  
  // Вывод ящиков сортировки для текущего задания
  sort.showBoxes();
}

// Решено заданий:  
// ---------------
sort.numOfSolve = function ()
{
  $("#sort_ntask SPAN:first").html(sort.ntask);
  $("#sort_ntask SPAN:last").html(sort.totaltask);
}

// Вывод картинок на поле
// ----------------------
sort.showPictures = function ()
{
  for (var i=0; i<tasks[sort.ntask].оbjects.length; i++)
  { 
    $('<IMG src="'+tasks[sort.ntask].оbjects[i].pic+'">') // создаём
      .attr('numberBox',tasks[sort.ntask].оbjects[i].numberBox)
      .css('left',tasks[sort.ntask].оbjects[i].left) // позиционируем    
      .css('top',tasks[sort.ntask].оbjects[i].top)   // ...
      .appendTo("#sort_area_оbjects");               // добавляем
  }    

  // перетаскивание всех картинок в области sort_area_оbjects
  $('#sort_area_оbjects IMG').draggable(
    {
      cursor:"move",     // Изменим вид курсора
    // revert:'invalid',  // Возврат объекта в исходную позицию
     revert:true, 
     scroll:false,      // Запретить скролл страницы при перетаскивании
      zIndex:50,         // Поднять картинку над другими элементами 
      stop:sort.stop     // Предмет сброшен 
    });
}

// Предмет сброшен 
// ----------------------------
sort.stop = function(event, ui)
{
  sort.numAllDrop++; // Увеличим счетчик сбросов на 1 глобально
  sort.numAllDropI++; // Увеличим счетчик сбросов на 1 для текущего задания

}

// Вывод ящиков для сортировки
// ---------------------------
sort.showBoxes = function ()
{
  var d = 10;                               // расстояние между ящиками
  var n = tasks[sort.ntask].boxes.length;   // количество ящиков
  var w = Math.round((parseInt($("#sort_area_boxes").css('width'))-d*(n-1))/n);       
  var h = $("#sort_area_boxes").css('height');

  for (var i=0; i<n; i++)
    $('<DIV></DIV>')                        // создаём ящик
      .attr('numberBox',i)
      .css('left',i*(w + d)+'px')           // позиционируем    
      .css('width',w+'px')                  // ширина ящика
      .css('height',h)                      // высота ящика
      .css('font-size',(26-2*n)+'px')       // размер шрифта
      .html(tasks[sort.ntask].boxes[i])     // надпись
      .appendTo("#sort_area_boxes")         // добавляем
      .droppable(
        {                           // связь ящика с картинками
         hoverClass: 'boxhover',  // Предмет над ящиком          
   /*      accept: function (pic){
                   if ($(pic).attr('numberBox') == 
                        $(this).attr('numberBox')) return true;
                    else                           return false;
                  },*/
         
          
          drop: sort.drop // Предмет сброшен в свой ящик  
        }
                );
}

// Предмет сброшен в свой ящик 
// ----------------------------
sort.drop = function(event, ui)
{
  if($(ui.draggable).attr('numberBox') == $(this).attr('numberBox'))
  {
  // Уберем предмет 
  $(ui.draggable)
    .draggable('disable')
    .hide('slow');

  // Число правильных сбросов
   sort.numTrueDrop++;  // Глобально
   sort.numTrueDropI++; // Для текущей задачи 

  // Проверим, все ли предметы сброшены
  if(sort.numTrueDropI >= tasks[sort.ntask].оbjects.length) 
  {
    // Задание выполнено, все предметы сброшены 

    // tasks[sort.ntask].оbjects.length - кол-во предметов в задании
    // sort.numAllDropI - общее число сбросов для текущего задания

    // Вывод оценки за задание
    sort.numAllDropI++;
    if (sort.numAllDropI == tasks[sort.ntask].оbjects.length)
    {
       $("#sort_z").html("<IMG id=good1 src='pic/prav30.gif'>");
    }
    else
    {
       $("#sort_z").html("<IMG id=bad1 src='pic/prav10.gif'>");
    }

    sort.ntask++;

    // Решено заданий:
    sort.numOfSolve(); 

    //    $("#sort_mess").html(sort.mess[1]);


    // Оно последнее в серии?
    if(sort.ntask >= sort.totaltask)
    {
      // Да, оно последнее
      // Вывод оценки
      var error = sort.numAllDrop-sort.numTrueDrop + 1; // +1, ибо sort.stop еще  
                                                        // не сработала
      var bonus; 

      if      (error == 0)  bonus = 5;
      else if (error > 0)   bonus = 2;
      
            // добавить оценку за всю игру: 
            // профессор, если верно выполнены все задания
            if (error == 0) {
               $("#sort_z").html("<IMG id=bad src='pic/good.png'>");           
            }
            else 
             if (error < sort.totaltask) {
               $("#sort_z").html("<IMG id=bad src='pic/middle.png'>");
              }           
             else {
              $("#sort_z").html("<IMG id=bad src='pic/bad.png'>");
             } 


      // Покажем звание
      // $("#sort_z").html("<IMG src=" + sort.picStatus[bonus-1] + " alt='' border=0>");
      //--
        $("#sort_z")
          .mouseover(function () 
           {
             this.src=sort.picStatus1[bonus-1];
           })
          .mouseout(function () 
           {
             this.src=sort.picStatus[bonus-1];
           })
      //--

      // Покажем завершающее сообщение
      $("#sort_mess").html("&nbsp;");
      $("#sort_mess").html(sort.mess[2]);

      // Покажем завершающую картинку на поле объектов
      $("#sort_area_оbjects").html("");   //----------------------
      $("<IMG id=sortfin src='pic/endgame.png' alt=''>")
        .css('position','absolute')     
        .css('left',140)     
        .css('top',130) 
        .css('width', 420) // и выводим    
        .css('height', 400) // её на пустое поле,   
        .css('display','none') 
        .appendTo("#sort_area_оbjects")
        .fadeIn('slow'); 
      $("#sort_area_boxes").hide();
      // переход на Начало сайта
//      $("#sort_mess").html("<A href=index.htm><IMG src='pic/index.png' alt=''></A>");
    }
    else 
    {
      // Нет, оно не последнее, решаем следующее

      $("#sort_area_оbjects").html("");   //----------------------
      $("<IMG id=testfin src='pic/endzad.png' alt=''>")  // подготовим IMG 
        .css('position','absolute')      // Позиционируем картинку   
        .css('left',160)                  // и выводим    
        .css('top',110)                   // её на пустое поле, 
        .css('width', 382) // и выводим    
        .css('height', 387) // её на пустое поле,
        .appendTo("#sort_area_оbjects"); // на котором были объекты 

      // Через 500 миллисекунд уберём картинку с экрана
      // и запустим метод sort.begin, который построит новое задание:
      var t = setTimeout( function ()
                          {
                            clearTimeout(t);
                            $("#sort_area_оbjects #testfin").hide('slow', sort.begin);
                          }, 3500);
      }
    }
  }
}
