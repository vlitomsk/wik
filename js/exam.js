function getXmlHttp() {
	if (typeof XMLHttpRequest === 'undefined') {
		XMLHttpRequest = function() {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
			catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
			catch(e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e) {}
			try { return new ActiveXObject("Microsoft.XMLHTTP"); }
			catch(e) {}
			throw new Error("This browser does not support XMLHttpRequest.");
		};
	}
	return new XMLHttpRequest();
}

// Обработчик готовности DOM
$(function ()
		{
			// Подгрузим в кеш 2 картинки. Одна (fin.png) появляется при смене  
			// заданий, вторая (finf.gif) -- завершающая, когда все решено. 
			// Подгрузим их заранее в кеш, чтобы они быстрее выводились на экран.
			// Это особенно актуально, если Исполнитель загружается по сети
			(new Image()).src = exam.pathPic+"fin.png";
			(new Image()).src = exam.pathPic+"finf.gif";

			// Инициализация переменных
			exam.ini();
			// Построение текущего задания
			exam.begin(); 

			// Кнопка Сброс -- навесим обработчики событий
			$("#exam_clear")
	.mouseup(function ()   // Событие: кнопка отпущена ---------------
		{
			exam.ini();   // Инициализация переменных
			exam.begin(); // Построение текущего задания
			this.src='pic/clear.gif';  // Смена картинки 
		})
			.mousedown(function () // Событие: кнопка нажата -----------------
					{
						this.src='pic/clear2.gif'; // Смена картинки
					})
			.mouseover(function () // Событие: курсор зашел на кнопку --------
					{
						this.src='pic/clear1.gif'; // Смена картинки
					})
			.mouseout(function ()  // Событие: курсор ушел с кнопки ----------
					{
						this.src='pic/clear.gif';  // Смена картинки
					});

			// ---- Кнопка Далее -- навесим обработчики событий

			$("#exam_next")
				.mouseup(function ()   // Событие: кнопка отпущена ---------------
						{
							exam.begin(); // Построение текущего задания
							this.src='pic/next.gif';  // Смена картинки 
						})
			.mousedown(function () // Событие: кнопка нажата -----------------
					{
						this.src='pic/next2.gif'; // Смена картинки
					})
			.mouseover(function () // Событие: курсор зашел на кнопку --------
					{
						this.src='pic/next1.gif'; // Смена картинки
					})
			.mouseout(function ()  // Событие: курсор ушел с кнопки ----------
					{
						this.src='pic/next.gif';  // Смена картинки
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

			exam.begin();
		});


// Глобальное имя исполнителя
// --------------------------
var exam = {};

// Константы
// ===================================================================

// Путь к картинкам
exam.pathPic = "pic/";

exam.mess = [
"Перетащите<BR>верные<BR>ответы<BR>на&nbsp;вопрос",
	"<SPAN>Задание<BR>выполнено!</SPAN>"
	];
	exam.picStatus = [
	"<IMG src='pic/prav00.gif' width=140 height=150 border=1 "+
	"alt=Незнайка title=Незнайка "+
	"onmouseover=\"this.src='pic/prav01.gif'\" "+
	"onmouseout=\"this.src='pic/prav00.gif'\">",
	//       "<IMG src='pic/prav00.gif' width=140 height=150 border=1 "+
	//            "alt=Незнайка title=Незнайка "+
	//            "onmouseover=\"this.src='pic/prav01.gif'\" "+
	//            "onmouseout=\"this.src='pic/prav00.gif'\">",
	//       "<IMG src='pic/prav10.gif' width=140 height=150 border=1 "+
	//            "alt=Торопыжка title=Торопыжка  "+
	//            "onmouseover=\"this.src='pic/prav11.gif'\" "+
	//            "onmouseout=\"this.src='pic/prav10.gif'\">",
	"<IMG src='pic/prav20.gif' width=140 height=150 border=1 "+
	"alt=Студент title=Студент  "+
	"onmouseover=\"this.src='pic/prav21.gif'\" "+
	"onmouseout=\"this.src='pic/prav20.gif'\">",
	"<IMG src='pic/prav30.gif' width=140 height=150 border=1 "+
	"alt=Профессор title=Профессор "+
	"onmouseover=\"this.src='pic/prav31.gif'\" "+
	"onmouseout=\"this.src='pic/prav30.gif'\">"
	];

	// Функции
	// ===================================================================

	// Инициализация переменных после загрузки или нажатия на Сброс
	// ------------------------------------------------------------
exam.ini = function ()                    
{
	exam.totaltask   = exam.tasks.length;  // Всего заданий
	exam.ntask       = 0;                  // Число решённых заданий 
	exam.numAllDrop  = 0;                  // Общее число сбросов

	exam.numTrueDrop = 0;                  // Число правильных сбросов 
	// равно числу всех ответов
	// cо свойством correct: true
	exam.ball = 0;                         // +3, если правильный ответ с 1-го раза
	// +2, если правильный ответ со 2-го раза
	// +1, если правильный ответ с 3-го раза
	exam.raz = 0;                          // с какого раза дан правильный ответ		
	exam.all = 0;                          // Общее число баллов 
	// Нахождение суммы всех правильных ответов по всем заданиям
	for (var i=0; i<exam.totaltask; i++)
		for (var j=0; j<exam.tasks[i].answers.length; j++)
			if (exam.tasks[i].answers[j].correct) exam.numTrueDrop++; 
}

// Построение очередного задания 
// -----------------------------
exam.begin = function ()                    
{
	// Восстановим исходную картинку на месте показа звания
	$("#exam_z").html("<IMG src='"+exam.pathPic+"z.png' alt=''>");

	// Восстановим исходное сообщение
	$("#exam_mess").html(exam.mess[0]);

	// Создадим сообщение о числе решённых заданий
	$("#exam_ntask").html("Решено<BR>заданий:<BR><SPAN>&nbsp;</SPAN> из <SPAN>&nbsp;</SPAN>");

	exam.numTrueDropI = 0; // Число правильных сбросов для текущей задачи 

	exam.numTrueDropForI = 0; // Число нужных сбросов для текущей задачи 
	for (var j=0; j<exam.tasks[exam.ntask].answers.length; j++)
		if (exam.tasks[exam.ntask].answers[j].correct) exam.numTrueDropForI++; 

	// Решено заданий:
	exam.numOfSolve();

	// Удаляем функциональность перетаскивания 
	$("#exam_question DIV").droppable('destroy');
	$('#exam_answers DIV').draggable('destroy');

	// Сброс вопроса предыдущего задания
	$("#exam_question").empty();  
	// Вывод вопроса для текущего задания
	exam.showQuestion();


	// Сброс ответов предыдущего задания
	$("#exam_answers").empty();  
	// Вывод ответов на поле для текущего задания
	exam.showAnswers();

}

// Решено заданий:  
// ---------------
exam.numOfSolve = function ()
{
	$("#exam_ntask SPAN:first").html(exam.ntask);
	$("#exam_ntask SPAN:last").html(exam.totaltask);
}

// Вывод ответов на поле
// ----------------------
exam.showAnswers = function ()
{
	for (var i=0; i<exam.tasks[exam.ntask].answers.length; i++)
	{ 
		$('<DIV class="one_answer">'+exam.tasks[exam.ntask].answers[i].content+'</DIV>') // создаём объект
			.attr('aid', exam.tasks[exam.ntask].answers[i].aid) // свой атрибут
			.attr('qid', exam.tasks[exam.ntask].id)
			.appendTo("#exam_answers");  // добавляем 
	}    

	// перетаскивание всех ответов в области exam_answers
	$('#exam_answers DIV').draggable(
			{
				revert:true,  // Возврат объекта в исходную позицию
	scroll:false,      // Запретить скролл страницы при перетаскивании
	zIndex:50,         // Поднять картинку над другими элементами 
	stop:exam.stop     // Предмет сброшен 
			});
}

// Предмет сброшен 
// ----------------------------
exam.stop = function(event, ui)
{
	exam.numAllDrop++; // Увеличим счетчик сбросов на 1
	exam.raz++;
	//alert(exam.raz);
}

// Вывод вопроса для экзамена 
// ---------------------------
exam.showQuestion = function ()
{

	$('<DIV class="one_question">'+exam.tasks[exam.ntask].question+'</DIV>') // создаём объект
		.appendTo("#exam_question");                    // добавляем 

	$('#exam_question DIV').droppable(
			{
				hoverClass: 'boxhover',  // Ответ над вопросом
		/*          accept: function (ob)   // Функция, задающая "свой" предмет
					{
					if ($(ob).attr('correct') == 1) return true;
					else                            return false;
					}, */
		drop:   exam.drop        // Предмет сброшен в свой ящик 
			}
			);             

}


// Сброшен ответ на вопрос 
// ----------------------------
exam.drop = function(event, ui)
{

	var xmlHttp = getXmlHttp();
	var params = 'qid=' + encodeURIComponent($(ui.draggable).attr('qid')) + '&aid=' + encodeURIComponent($(ui.draggable).attr('aid')) + '&uid=' + encodeURIComponent(document.getElementById('form_uid').value);
	//alert('Query: /check.php?' + params);
	xmlHttp.open("GET", '/check.php?' + params, true);
	xmlHttp.send(null);
	var is_correct_drop = false;
	var worked = false;
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				is_correct_drop = (xmlHttp.responseText[0] == 'y');
				worked = true;				
				//alert('Got response: ' + xmlHttp.responseText);
				
				// На вопрос сброшен правильный ответ?
				if(is_correct_drop)
				{
					//alert('true!');
					exam.raz++; 
					//   alert(exam.raz);
					if (exam.raz == 1) { exam.ball = 3; }
					if (exam.raz == 2) { exam.ball = 2; }
					if (exam.raz == 3) { exam.ball = 1; }
					//   	 alert(exam.ball); 
					exam.all = exam.all + exam.ball;
					//	 alert("конец задания всего = "+exam.all);

					// Покажем звание
					$("#exam_z").html(exam.picStatus[exam.ball-1]);

					// Добавляем правильный ответ к вопросу
					// и отменим его перетаскиваемость
					$(ui.draggable)
						.css('position', 'static')
						.draggable('disable')
						.appendTo("#exam_question");

					// Число правильных сбросов текущей задачи
					exam.numTrueDropI++;   
					// Проверим, все ли правильные ответы сброшены
					if(exam.numTrueDropI >= exam.numTrueDropForI) 
					{
						// Задание выполнено 
						exam.ntask++;

						// Уберем постановку задачи
						$("#exam_mess").empty();  
						// Неверные ответы должны пропасть
						$("#exam_answers").empty();  

						// Решено заданий:
						exam.numOfSolve(); 
						// Оно последнее в серии?
						if(exam.ntask >= exam.totaltask)
						{
							// Да, оно последнее
							// Задание выполнено, покажем оценку 
							//  exam.all = exam.all + exam.ball - 1;
							//alert("end!!!!!!!!!!!!!!!");
							//alert(exam.all);
							//       var error = exam.numAllDrop - exam.numTrueDrop + 1;
							//       if      (error == 0)                   exam.bonus = 5;
							//       else if (error < 2*exam.numTrueDrop/5) exam.bonus = 4;
							//       else if (error < exam.numTrueDrop/2)   exam.bonus = 3;
							//       else                                   exam.bonus = 2;

							if (exam.all >= 39)                            exam.bonus = 5;
							else if ((exam.all >= 34) && (exam.all <= 38)) exam.bonus = 4;
							else if ((exam.all >= 28) && (exam.all <= 33)) exam.bonus = 3;
							else                                           exam.bonus = 2;

							// Вывести кнопку Далее, если она предусмотрена 
							if(exam.tasks[exam.ntask-1].options.next) 
							{
								//         $("<BUTTON>Дальше</BOTTON>")
								//           .click(exam.showFinPic)  
								//           .appendTo("#exam_answers"); 
								$('<IMG id=next src="pic/next.gif" alt="Дальше">')
									.mouseup(function ()   // кнопка отпущена
											{
												exam.showFinPic();
												this.src='pic/next.gif';
											})
								.mousedown(function () // кнопка нажата
										{
											this.src='pic/next2.gif';
										})
								.mouseover(function () // курсор зашел на кнопку
										{
											this.src='pic/next1.gif';
										})
								.mouseout(function ()  // курсор ушел с кнопки
										{
											this.src='pic/next.gif';  // Смена картинки
										})
								.appendTo("#exam_answers");

							} 
							else exam.showFinPic();
						}
						else 
						{
							// Нет, оно не последнее, решаем следующее
							exam.ball = -1;
							exam.raz = -1;
							/*
							// Вывести сообщение "Задание закончено"
							$("<IMG id=examfin src='"+exam.pathPic+"zend.gif' alt=''>")
							.css('position','absolute')     
							.css('left',31)     
							.css('top',200)  
							.appendTo("#exam_answers"); 
							*/
							// Вывести кнопку Далее, если она предусмотрена 
							if(exam.tasks[exam.ntask-1].options.next) 
							{
								//         $("#exam_mess").html("<BUTTON>Дальше</BOTTON>");
								//         $("#exam_mess BUTTON").click(exam.begin);

								//         $("<BUTTON>Дальше</BOTTON>")
								//           .click(exam.begin)  
								//           .appendTo("#exam_answers"); 

								$('<IMG id=next src="pic/next.gif" alt="Дальше" style="margin-top:20px;margin-left:210px;">')
									.mouseup(function ()   // кнопка отпущена
											{
												exam.begin();
												this.src='pic/next.gif';
											})
								.mousedown(function () // кнопка нажата
										{
											this.src='pic/next2.gif';
										})
								.mouseover(function () // курсор зашел на кнопку
										{
											this.src='pic/next1.gif';
										})
								.mouseout(function ()  // курсор ушел с кнопки
										{
											this.src='pic/next.gif';  // Смена картинки
										})
								.appendTo("#exam_answers");
							} 
							else // иначе перейти к следующему вопросу без показа кнопки Далее
							{
								$("<IMG border=1 id=examfin src='"+exam.pathPic+"fin.png' alt=''>")
									.css('position','absolute')     
									.css('left',31)     
									.css('top',86)  
									.appendTo("#exam_answers"); 
								var t = setTimeout( function ()
										{
											clearTimeout(t);
											$("#exam_answers #examfin").hide('slow', exam.begin);
										}, 500);
							}

						}
					}
				}
			}
		}
	}
}
// Показать завершающее сообщение и картинку  
// ----------------------------------------
exam.showFinPic = function()
{
	// Очистим рабочую область
	$("#exam_question").empty();  
	$("#exam_answers").empty();  

	// Уберем разделитель между вопросом и ответами
	$('#exam_answers').css('border-top','none')

		// Покажем звание
/*		alert(exam.all);
	if (exam.bonus == 5) alert ("Магистр этикета");
	if (exam.bonus == 4) alert ("Бакалавр этикета");
	if (exam.bonus == 3) alert ("Школяр этикета");
	if (exam.bonus == 2) alert ("Надо начать заново");*/

	var userid = document.getElementById('form_uid').value;
	var xmlHttp = getXmlHttp();
	var params = 'get_score=1&uid=' + encodeURIComponent(userid);
	xmlHttp.open("GET", '/check.php?' + params, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				var res = xmlHttp.responseText;
				alert('Результат: ' + res);
				var score = parseInt(res);
				$("#exam_z").html(exam.picStatus[exam.bonus-1]);

				// Покажем завершающее сообщение
				$("#exam_mess").html(exam.mess[1]);
				// Покажем завершающую картинку
				$("<IMG border=1 id=examfin src='"+exam.pathPic+"finf.gif' alt=''>")
					.css('position','absolute')     
					.css('left',57)     
					.css('top',67)  
					.css('display','none') 
					.appendTo("#exam_answers")
					.fadeIn('slow'); 

				if (score >= 2) {					
					alert('Сертификат!!');
					$("<IMG border=1 id=examfin src='" + exam.pathPic + "cert/c_"+ userid + ".png' alt=''>")
						.appendTo("#exam_answers")
						.fadeIn('slow'); 
				}
			}
		}
	}

}
