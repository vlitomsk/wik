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

// ���������� ���������� DOM
$(function ()
		{
			// ��������� � ��� 2 ��������. ���� (fin.png) ���������� ��� �����  
			// �������, ������ (finf.gif) -- �����������, ����� ��� ������. 
			// ��������� �� ������� � ���, ����� ��� ������� ���������� �� �����.
			// ��� �������� ���������, ���� ����������� ����������� �� ����
			(new Image()).src = exam.pathPic+"fin.png";
			(new Image()).src = exam.pathPic+"finf.gif";

			// ������������� ����������
			exam.ini();
			// ���������� �������� �������
			exam.begin(); 

			// ������ ����� -- ������� ����������� �������
			$("#exam_clear")
	.mouseup(function ()   // �������: ������ �������� ---------------
		{
			exam.ini();   // ������������� ����������
			exam.begin(); // ���������� �������� �������
			this.src='pic/clear.gif';  // ����� �������� 
		})
			.mousedown(function () // �������: ������ ������ -----------------
					{
						this.src='pic/clear2.gif'; // ����� ��������
					})
			.mouseover(function () // �������: ������ ����� �� ������ --------
					{
						this.src='pic/clear1.gif'; // ����� ��������
					})
			.mouseout(function ()  // �������: ������ ���� � ������ ----------
					{
						this.src='pic/clear.gif';  // ����� ��������
					});

			// ---- ������ ����� -- ������� ����������� �������

			$("#exam_next")
				.mouseup(function ()   // �������: ������ �������� ---------------
						{
							exam.begin(); // ���������� �������� �������
							this.src='pic/next.gif';  // ����� �������� 
						})
			.mousedown(function () // �������: ������ ������ -----------------
					{
						this.src='pic/next2.gif'; // ����� ��������
					})
			.mouseover(function () // �������: ������ ����� �� ������ --------
					{
						this.src='pic/next1.gif'; // ����� ��������
					})
			.mouseout(function ()  // �������: ������ ���� � ������ ----------
					{
						this.src='pic/next.gif';  // ����� ��������
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


// ���������� ��� �����������
// --------------------------
var exam = {};

// ���������
// ===================================================================

// ���� � ���������
exam.pathPic = "pic/";

exam.mess = [
"����������<BR>������<BR>������<BR>��&nbsp;������",
	"<SPAN>�������<BR>���������!</SPAN>"
	];
	exam.picStatus = [
	"<IMG src='pic/prav00.gif' width=140 height=150 border=1 "+
	"alt=�������� title=�������� "+
	"onmouseover=\"this.src='pic/prav01.gif'\" "+
	"onmouseout=\"this.src='pic/prav00.gif'\">",
	//       "<IMG src='pic/prav00.gif' width=140 height=150 border=1 "+
	//            "alt=�������� title=�������� "+
	//            "onmouseover=\"this.src='pic/prav01.gif'\" "+
	//            "onmouseout=\"this.src='pic/prav00.gif'\">",
	//       "<IMG src='pic/prav10.gif' width=140 height=150 border=1 "+
	//            "alt=��������� title=���������  "+
	//            "onmouseover=\"this.src='pic/prav11.gif'\" "+
	//            "onmouseout=\"this.src='pic/prav10.gif'\">",
	"<IMG src='pic/prav20.gif' width=140 height=150 border=1 "+
	"alt=������� title=�������  "+
	"onmouseover=\"this.src='pic/prav21.gif'\" "+
	"onmouseout=\"this.src='pic/prav20.gif'\">",
	"<IMG src='pic/prav30.gif' width=140 height=150 border=1 "+
	"alt=��������� title=��������� "+
	"onmouseover=\"this.src='pic/prav31.gif'\" "+
	"onmouseout=\"this.src='pic/prav30.gif'\">"
	];

	// �������
	// ===================================================================

	// ������������� ���������� ����� �������� ��� ������� �� �����
	// ------------------------------------------------------------
exam.ini = function ()                    
{
	exam.totaltask   = exam.tasks.length;  // ����� �������
	exam.ntask       = 0;                  // ����� �������� ������� 
	exam.numAllDrop  = 0;                  // ����� ����� �������

	exam.numTrueDrop = 0;                  // ����� ���������� ������� 
	// ����� ����� ���� �������
	// c� ��������� correct: true
	exam.ball = 0;                         // +3, ���� ���������� ����� � 1-�� ����
	// +2, ���� ���������� ����� �� 2-�� ����
	// +1, ���� ���������� ����� � 3-�� ����
	exam.raz = 0;                          // � ������ ���� ��� ���������� �����		
	exam.all = 0;                          // ����� ����� ������ 
	// ���������� ����� ���� ���������� ������� �� ���� ��������
	for (var i=0; i<exam.totaltask; i++)
		for (var j=0; j<exam.tasks[i].answers.length; j++)
			if (exam.tasks[i].answers[j].correct) exam.numTrueDrop++; 
}

// ���������� ���������� ������� 
// -----------------------------
exam.begin = function ()                    
{
	// ����������� �������� �������� �� ����� ������ ������
	$("#exam_z").html("<IMG src='"+exam.pathPic+"z.png' alt=''>");

	// ����������� �������� ���������
	$("#exam_mess").html(exam.mess[0]);

	// �������� ��������� � ����� �������� �������
	$("#exam_ntask").html("������<BR>�������:<BR><SPAN>&nbsp;</SPAN> �� <SPAN>&nbsp;</SPAN>");

	exam.numTrueDropI = 0; // ����� ���������� ������� ��� ������� ������ 

	exam.numTrueDropForI = 0; // ����� ������ ������� ��� ������� ������ 
	for (var j=0; j<exam.tasks[exam.ntask].answers.length; j++)
		if (exam.tasks[exam.ntask].answers[j].correct) exam.numTrueDropForI++; 

	// ������ �������:
	exam.numOfSolve();

	// ������� ���������������� �������������� 
	$("#exam_question DIV").droppable('destroy');
	$('#exam_answers DIV').draggable('destroy');

	// ����� ������� ����������� �������
	$("#exam_question").empty();  
	// ����� ������� ��� �������� �������
	exam.showQuestion();


	// ����� ������� ����������� �������
	$("#exam_answers").empty();  
	// ����� ������� �� ���� ��� �������� �������
	exam.showAnswers();

}

// ������ �������:  
// ---------------
exam.numOfSolve = function ()
{
	$("#exam_ntask SPAN:first").html(exam.ntask);
	$("#exam_ntask SPAN:last").html(exam.totaltask);
}

// ����� ������� �� ����
// ----------------------
exam.showAnswers = function ()
{
	for (var i=0; i<exam.tasks[exam.ntask].answers.length; i++)
	{ 
		$('<DIV class="one_answer">'+exam.tasks[exam.ntask].answers[i].content+'</DIV>') // ������ ������
			.attr('aid', exam.tasks[exam.ntask].answers[i].aid) // ���� �������
			.attr('qid', exam.tasks[exam.ntask].id)
			.appendTo("#exam_answers");  // ��������� 
	}    

	// �������������� ���� ������� � ������� exam_answers
	$('#exam_answers DIV').draggable(
			{
				revert:true,  // ������� ������� � �������� �������
	scroll:false,      // ��������� ������ �������� ��� ��������������
	zIndex:50,         // ������� �������� ��� ������� ���������� 
	stop:exam.stop     // ������� ������� 
			});
}

// ������� ������� 
// ----------------------------
exam.stop = function(event, ui)
{
	exam.numAllDrop++; // �������� ������� ������� �� 1
	exam.raz++;
	//alert(exam.raz);
}

// ����� ������� ��� �������� 
// ---------------------------
exam.showQuestion = function ()
{

	$('<DIV class="one_question">'+exam.tasks[exam.ntask].question+'</DIV>') // ������ ������
		.appendTo("#exam_question");                    // ��������� 

	$('#exam_question DIV').droppable(
			{
				hoverClass: 'boxhover',  // ����� ��� ��������
		/*          accept: function (ob)   // �������, �������� "����" �������
					{
					if ($(ob).attr('correct') == 1) return true;
					else                            return false;
					}, */
		drop:   exam.drop        // ������� ������� � ���� ���� 
			}
			);             

}


// ������� ����� �� ������ 
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
				
				// �� ������ ������� ���������� �����?
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
					//	 alert("����� ������� ����� = "+exam.all);

					// ������� ������
					$("#exam_z").html(exam.picStatus[exam.ball-1]);

					// ��������� ���������� ����� � �������
					// � ������� ��� �����������������
					$(ui.draggable)
						.css('position', 'static')
						.draggable('disable')
						.appendTo("#exam_question");

					// ����� ���������� ������� ������� ������
					exam.numTrueDropI++;   
					// ��������, ��� �� ���������� ������ ��������
					if(exam.numTrueDropI >= exam.numTrueDropForI) 
					{
						// ������� ��������� 
						exam.ntask++;

						// ������ ���������� ������
						$("#exam_mess").empty();  
						// �������� ������ ������ ��������
						$("#exam_answers").empty();  

						// ������ �������:
						exam.numOfSolve(); 
						// ��� ��������� � �����?
						if(exam.ntask >= exam.totaltask)
						{
							// ��, ��� ���������
							// ������� ���������, ������� ������ 
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

							// ������� ������ �����, ���� ��� ������������� 
							if(exam.tasks[exam.ntask-1].options.next) 
							{
								//         $("<BUTTON>������</BOTTON>")
								//           .click(exam.showFinPic)  
								//           .appendTo("#exam_answers"); 
								$('<IMG id=next src="pic/next.gif" alt="������">')
									.mouseup(function ()   // ������ ��������
											{
												exam.showFinPic();
												this.src='pic/next.gif';
											})
								.mousedown(function () // ������ ������
										{
											this.src='pic/next2.gif';
										})
								.mouseover(function () // ������ ����� �� ������
										{
											this.src='pic/next1.gif';
										})
								.mouseout(function ()  // ������ ���� � ������
										{
											this.src='pic/next.gif';  // ����� ��������
										})
								.appendTo("#exam_answers");

							} 
							else exam.showFinPic();
						}
						else 
						{
							// ���, ��� �� ���������, ������ ���������
							exam.ball = -1;
							exam.raz = -1;
							/*
							// ������� ��������� "������� ���������"
							$("<IMG id=examfin src='"+exam.pathPic+"zend.gif' alt=''>")
							.css('position','absolute')     
							.css('left',31)     
							.css('top',200)  
							.appendTo("#exam_answers"); 
							*/
							// ������� ������ �����, ���� ��� ������������� 
							if(exam.tasks[exam.ntask-1].options.next) 
							{
								//         $("#exam_mess").html("<BUTTON>������</BOTTON>");
								//         $("#exam_mess BUTTON").click(exam.begin);

								//         $("<BUTTON>������</BOTTON>")
								//           .click(exam.begin)  
								//           .appendTo("#exam_answers"); 

								$('<IMG id=next src="pic/next.gif" alt="������" style="margin-top:20px;margin-left:210px;">')
									.mouseup(function ()   // ������ ��������
											{
												exam.begin();
												this.src='pic/next.gif';
											})
								.mousedown(function () // ������ ������
										{
											this.src='pic/next2.gif';
										})
								.mouseover(function () // ������ ����� �� ������
										{
											this.src='pic/next1.gif';
										})
								.mouseout(function ()  // ������ ���� � ������
										{
											this.src='pic/next.gif';  // ����� ��������
										})
								.appendTo("#exam_answers");
							} 
							else // ����� ������� � ���������� ������� ��� ������ ������ �����
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
// �������� ����������� ��������� � ��������  
// ----------------------------------------
exam.showFinPic = function()
{
	// ������� ������� �������
	$("#exam_question").empty();  
	$("#exam_answers").empty();  

	// ������ ����������� ����� �������� � ��������
	$('#exam_answers').css('border-top','none')

		// ������� ������
/*		alert(exam.all);
	if (exam.bonus == 5) alert ("������� �������");
	if (exam.bonus == 4) alert ("�������� �������");
	if (exam.bonus == 3) alert ("������ �������");
	if (exam.bonus == 2) alert ("���� ������ ������");*/

	var userid = document.getElementById('form_uid').value;
	var xmlHttp = getXmlHttp();
	var params = 'get_score=1&uid=' + encodeURIComponent(userid);
	xmlHttp.open("GET", '/check.php?' + params, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				var res = xmlHttp.responseText;
				alert('���������: ' + res);
				var score = parseInt(res);
				$("#exam_z").html(exam.picStatus[exam.bonus-1]);

				// ������� ����������� ���������
				$("#exam_mess").html(exam.mess[1]);
				// ������� ����������� ��������
				$("<IMG border=1 id=examfin src='"+exam.pathPic+"finf.gif' alt=''>")
					.css('position','absolute')     
					.css('left',57)     
					.css('top',67)  
					.css('display','none') 
					.appendTo("#exam_answers")
					.fadeIn('slow'); 

				if (score >= 2) {					
					alert('����������!!');
					$("<IMG border=1 id=examfin src='" + exam.pathPic + "cert/c_"+ userid + ".png' alt=''>")
						.appendTo("#exam_answers")
						.fadeIn('slow'); 
				}
			}
		}
	}

}
