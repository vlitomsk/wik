/// Обработчик готовности DOM
$(function () {
    test.totaltask = test.tasks.length; // Всего заданий
    test.ntask = 0; // Число решённых заданий 
    $("#test_big_picture_div").hide();
//    $("#but").click(test.check);

    $("#but_check").mouseup(function () {      // Кнопка Проверить
        $("#inp").focus();        
        test.check();
        this.src = 'pic/check1.png';
    }).mousedown(function () {
        this.src = 'pic/check3.png';
    }).mouseover(function () {
        this.src = 'pic/check2.png';
    }).mouseout(function () {
        this.src = 'pic/check1.png';
    })

    $("#inp").focus().keypress( function (event)  // Ввод по Enter
    {
      if (event.which == 13) test.check();
    })

    $("#test_clear").mouseup(function () {
        test.totaltask = test.tasks.length; // Всего заданий
        test.ntask = 0; // Число решённых заданий 
        test.taskNumber = 0;
        test.bad = 0;
        test.begin();
        this.src = 'pic/clear1.png';
    }).mousedown(function () {
        this.src = 'pic/clear3.png';
    }).mouseover(function () {
        this.src = 'pic/clear2.png';
    }).mouseout(function () {
        this.src = 'pic/clear1.png';
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

    test.begin();
});


var test = {};
test.taskNumber = 0;
test.bad = 0;
// Константы
// ===================================================================
test.mess = [
"<SPAN>Игра:<BR>Расшифровка<BR><BR>Задание:<BR>Введите ответ<BR> в поле ввода</SPAN>",
"<SPAN>Задание<BR>выполнено!</SPAN>",
"<SPAN>Игра<BR>закончена!</SPAN>"
            ];

// Функции
// ===================================================================
// Набор заданий
test.tasks = [
  {
    answer: "Продолжение следует",
    picturePrefix: "pic/nomer",
    pictureExt: ".png",
    pictureCount: 18,
    groups: [{
               begin: 0,
               end: 10,
               position: {
                           x: 0,
                           y: 240
                         }
             }, 
             {
               begin: 11,
               end: 17,
               position: {
                           x: 0,
                           y: 340
                         }
             }],
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Назовите первый спектакль<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Омского ТЮЗа<BR><DFN>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(введите первые буквы картинок).<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Картинки можно увеличивать щелчком мышки.</DFN>"
  }, 
  {
    answer: "Дворжецкий Вацлав Янович",
    picturePrefix: "pic/zадание",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Кто сыграл в 13&nbsp;спектаклях и<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;поставил «Снежную королеву»?<BR> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(введите фамилию, имя, отчество актёра)</DFN>"
  }, 
  {
    answer: "Российской, федерации, разнообразие",
    picturePrefix: "pic/premia",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Какой премии удостоен ТЮЗ<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;в 2007 году?<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(введите пропущенные слова)</DFN> "
  },
  {
    answer: "Пивоваров",
    picturePrefix : "pic/rebus",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Разгадать ребус<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(введите фамилию исполнителя роли <BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;профессора Тарантоги)</DFN>"
  },
  { 
    answer:"Странствователь",
    picturePrefix : "pic/ctranst",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Разгадать, что изобрел <BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;профессор Тарантога<BR> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(введите слово)</DFN>"
  }
];

// ===================================================================
// Начало работы
//---------------
test.begin = function () {
    // Восстановим исходную картинку на месте показа звания
  //  $("#test_z").html("<IMG src='pic/fon-ocenka.png' alt=''>");
  $("#test_z").html("");

  // Восстановим исходное сообщение
  $("#test_mess").html(test.mess[0]);

  // Сброс картинок предыдущего задания
    $("#test_area_оbjects").html("");   //----------------------
    $("#inp").val("");                        //-----------------------
    $("#inp").show();
    $("#but_check").show();

    $("#test_ntask").html("Решено<BR>заданий:<BR><SPAN>&nbsp;</SPAN> из <SPAN>&nbsp;</SPAN>");
    test.numOfSolve();
    test.showPictures();
}

test.numOfSolve = function () {
    $("#test_ntask SPAN:first").html(test.ntask);
    $("#test_ntask SPAN:last").html(test.totaltask);
}

test.showPictures = function () {

    var task = test.tasks[test.taskNumber];
    $('<p class="test_area_msg">' + task.question + '</p>').appendTo("#test_area_оbjects");
    if (task.groups) {
        for (var g = 0; g < task.groups.length; g++) {
            var group = task.groups[g]
            var dv = $('<div class="pict_group"></div>')
                     .appendTo("#test_area_оbjects")
                     .css({
                            left: group.position.x,
                            top: group.position.y
                          });
            for (var i = group.begin; i <= group.end; i++) {
                $('<img idx="' + i + '"  src="' + task.picturePrefix + i + task.pictureExt + '">').appendTo(dv);
            }
        }

    } else {
            $("#test_area_оbjects").css({"text-align":"center"});   
            var dv = $('<div class="pict_single"></div>').appendTo("#test_area_оbjects");
            $('<img idx="0"  src="' + task.picturePrefix + 0 + task.pictureExt + '">').appendTo(dv).css({width:"auto",height:"auto"});

        
    }
    $("img", "#test_area_оbjects").mousedown(function () {
        var task = test.tasks[test.taskNumber];
        var s = task.picturePrefix + $(this).attr("idx") + "_" + task.pictureExt;
        $("#test_big_picture_div").html('<img src="' + s + '">').show();
        $("img", "#test_big_picture_div").bind("load", function () {
            var b1 = $("#test_area_оbjects").get(0).getBoundingClientRect();
            var b2 = $("img", "#test_big_picture_div").get(0).getBoundingClientRect();
            $("#test_big_picture_div").offset({
                left: (b1.left + b1.right) / 2 - (b2.right - b2.left) / 2,
                top: (b1.top + b1.bottom) / 2 - (b2.bottom - b2.top) / 2
            });
        });
    })

    $("#test_big_picture_div").mousedown(function () {
        $("#test_big_picture_div").hide();
    })

}

test.check = function () {
    var replacePattern = /[,. ]/g;
    var s1 = $("#inp").val().toLowerCase().replace(replacePattern, "");
    var s2 = test.tasks[test.taskNumber].answer.toLowerCase().replace(replacePattern, "");
    if (s1 == "")
    {
       $("#inp").val("Ничего не введено"); 
    }
    if (s1 == s2) 
    {
        $("#test_z").html("<IMG id=good src='pic/prav30.gif'>");
           var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_z #good").hide('slow', test.begin);
            }, 3500);
        test.ntask++;

        // Решено заданий:
        test.numOfSolve();
        if (test.ntask >= test.totaltask) 
        {
            // Покажем завершающее сообщение -- конец игры
            $("#test_mess").html(test.mess[2]);
            // Покажем завершающую картинку на поле объектов

            $("#test_area_оbjects").html("");   //----------------------
            $("<IMG id=testfin src='pic/end1.png' width=420 height=400 alt=''>") 
            .css('position', 'absolute')
            .css('left', 140)
            .css('top', 130)
            .css('width', 420) // и выводим    
            .css('height', 400) // её на пустое поле,  
            .appendTo("#test_area_оbjects")
            .fadeIn('slow');
            

            // добавить оценку за всю игру: 
            // профессор, если верно выполнены все задания
            if (test.bad == 0) {
               $("#test_z").html("<IMG id=bad src='pic/good.png'>");           
            }
            else 
             if (test.bad <= test.totaltask) {
               $("#test_z").html("<IMG id=bad src='pic/middle.png'>");
              }           
             else {
              $("#test_z").html("<IMG id=bad src='pic/bad.png'>");
             } 



            $("#inp").val("");
            $("#inp").hide();
            $("#but_check").hide();

// не сработал этот вариант
//            $("<IMG id=sortfin src='pic/end1.png' alt=''>")
//            .css('position', 'absolute')
//            .css('left', 0)
//            .css('top', 0)
//            .css('width', 550)
//            .css('height', 474)
//            .wrap("<A></A>")
//            .attr('href','end.htm')
//            .appendTo("#test_area_оbjects")
//            .fadeIn('slow');

        } else {
            test.taskNumber++;
            // Нет, оно не последнее, решаем следующее
            $("#test_area_оbjects").html("");   //----------------------
            $("<IMG id=testfin src='pic/endzad.png' width=382 height=387 alt=''>") // подготовим IMG 
            .css('position', 'absolute') // Позиционируем картинку   
            .css('left', 160) // и выводим  
            .css('top', 110) // её на пустое поле,  
            .css('width', 382) // и выводим   
            .css('height', 387) // её на пустое поле,   
            .appendTo("#test_area_оbjects"); // на котором были объекты 
            // Через 500 (для 2500) миллисекунд уберём картинку с экрана
            // и запустим метод test.begin, который построит новое задание:
            var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_area_оbjects #testfin").hide('slow', test.begin);
            }, 3500);

        }
    } 
    else    // неверный ответ в поле ввода
    {
        $("#test_z").html("<IMG id=bad src='pic/prav10.gif'>");
            var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_z #bad").hide('slow', test.begin);
            }, 3500);
        test.bad++;
    }


}