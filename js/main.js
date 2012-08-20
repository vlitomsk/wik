/// ���������� ���������� DOM
$(function () {
    test.totaltask = test.tasks.length; // ����� �������
    test.ntask = 0; // ����� �������� ������� 
    $("#test_big_picture_div").hide();
//    $("#but").click(test.check);

    $("#but_check").mouseup(function () {      // ������ ���������
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

    $("#inp").focus().keypress( function (event)  // ���� �� Enter
    {
      if (event.which == 13) test.check();
    })

    $("#test_clear").mouseup(function () {
        test.totaltask = test.tasks.length; // ����� �������
        test.ntask = 0; // ����� �������� ������� 
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
// ���������
// ===================================================================
test.mess = [
"<SPAN>����:<BR>�����������<BR><BR>�������:<BR>������� �����<BR> � ���� �����</SPAN>",
"<SPAN>�������<BR>���������!</SPAN>",
"<SPAN>����<BR>���������!</SPAN>"
            ];

// �������
// ===================================================================
// ����� �������
test.tasks = [
  {
    answer: "����������� �������",
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
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�������� ������ ���������<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������� ����<BR><DFN>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(������� ������ ����� ��������).<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�������� ����� ����������� ������� �����.</DFN>"
  }, 
  {
    answer: "���������� ������ ������",
    picturePrefix: "pic/z������",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��� ������ � 13&nbsp;���������� �<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�������� �������� ��������?<BR> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(������� �������, ���, �������� �����)</DFN>"
  }, 
  {
    answer: "����������, ���������, ������������",
    picturePrefix: "pic/premia",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����� ������ �������� ���<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;� 2007 ����?<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(������� ����������� �����)</DFN> "
  },
  {
    answer: "���������",
    picturePrefix : "pic/rebus",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��������� �����<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(������� ������� ����������� ���� <BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���������� ���������)</DFN>"
  },
  { 
    answer:"���������������",
    picturePrefix : "pic/ctranst",
    pictureExt: ".png",
    pictureCount: 1,
    question: "<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���������, ��� ������� <BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��������� ���������<BR> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<DFN>(������� �����)</DFN>"
  }
];

// ===================================================================
// ������ ������
//---------------
test.begin = function () {
    // ����������� �������� �������� �� ����� ������ ������
  //  $("#test_z").html("<IMG src='pic/fon-ocenka.png' alt=''>");
  $("#test_z").html("");

  // ����������� �������� ���������
  $("#test_mess").html(test.mess[0]);

  // ����� �������� ����������� �������
    $("#test_area_�bjects").html("");   //----------------------
    $("#inp").val("");                        //-----------------------
    $("#inp").show();
    $("#but_check").show();

    $("#test_ntask").html("������<BR>�������:<BR><SPAN>&nbsp;</SPAN> �� <SPAN>&nbsp;</SPAN>");
    test.numOfSolve();
    test.showPictures();
}

test.numOfSolve = function () {
    $("#test_ntask SPAN:first").html(test.ntask);
    $("#test_ntask SPAN:last").html(test.totaltask);
}

test.showPictures = function () {

    var task = test.tasks[test.taskNumber];
    $('<p class="test_area_msg">' + task.question + '</p>').appendTo("#test_area_�bjects");
    if (task.groups) {
        for (var g = 0; g < task.groups.length; g++) {
            var group = task.groups[g]
            var dv = $('<div class="pict_group"></div>')
                     .appendTo("#test_area_�bjects")
                     .css({
                            left: group.position.x,
                            top: group.position.y
                          });
            for (var i = group.begin; i <= group.end; i++) {
                $('<img idx="' + i + '"  src="' + task.picturePrefix + i + task.pictureExt + '">').appendTo(dv);
            }
        }

    } else {
            $("#test_area_�bjects").css({"text-align":"center"});   
            var dv = $('<div class="pict_single"></div>').appendTo("#test_area_�bjects");
            $('<img idx="0"  src="' + task.picturePrefix + 0 + task.pictureExt + '">').appendTo(dv).css({width:"auto",height:"auto"});

        
    }
    $("img", "#test_area_�bjects").mousedown(function () {
        var task = test.tasks[test.taskNumber];
        var s = task.picturePrefix + $(this).attr("idx") + "_" + task.pictureExt;
        $("#test_big_picture_div").html('<img src="' + s + '">').show();
        $("img", "#test_big_picture_div").bind("load", function () {
            var b1 = $("#test_area_�bjects").get(0).getBoundingClientRect();
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
       $("#inp").val("������ �� �������"); 
    }
    if (s1 == s2) 
    {
        $("#test_z").html("<IMG id=good src='pic/prav30.gif'>");
           var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_z #good").hide('slow', test.begin);
            }, 3500);
        test.ntask++;

        // ������ �������:
        test.numOfSolve();
        if (test.ntask >= test.totaltask) 
        {
            // ������� ����������� ��������� -- ����� ����
            $("#test_mess").html(test.mess[2]);
            // ������� ����������� �������� �� ���� ��������

            $("#test_area_�bjects").html("");   //----------------------
            $("<IMG id=testfin src='pic/end1.png' width=420 height=400 alt=''>") 
            .css('position', 'absolute')
            .css('left', 140)
            .css('top', 130)
            .css('width', 420) // � �������    
            .css('height', 400) // � �� ������ ����,  
            .appendTo("#test_area_�bjects")
            .fadeIn('slow');
            

            // �������� ������ �� ��� ����: 
            // ���������, ���� ����� ��������� ��� �������
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

// �� �������� ���� �������
//            $("<IMG id=sortfin src='pic/end1.png' alt=''>")
//            .css('position', 'absolute')
//            .css('left', 0)
//            .css('top', 0)
//            .css('width', 550)
//            .css('height', 474)
//            .wrap("<A></A>")
//            .attr('href','end.htm')
//            .appendTo("#test_area_�bjects")
//            .fadeIn('slow');

        } else {
            test.taskNumber++;
            // ���, ��� �� ���������, ������ ���������
            $("#test_area_�bjects").html("");   //----------------------
            $("<IMG id=testfin src='pic/endzad.png' width=382 height=387 alt=''>") // ���������� IMG 
            .css('position', 'absolute') // ������������� ��������   
            .css('left', 160) // � �������  
            .css('top', 110) // � �� ������ ����,  
            .css('width', 382) // � �������   
            .css('height', 387) // � �� ������ ����,   
            .appendTo("#test_area_�bjects"); // �� ������� ���� ������� 
            // ����� 500 (��� 2500) ����������� ����� �������� � ������
            // � �������� ����� test.begin, ������� �������� ����� �������:
            var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_area_�bjects #testfin").hide('slow', test.begin);
            }, 3500);

        }
    } 
    else    // �������� ����� � ���� �����
    {
        $("#test_z").html("<IMG id=bad src='pic/prav10.gif'>");
            var t = setTimeout(function () {
                clearTimeout(t);
                $("#test_z #bad").hide('slow', test.begin);
            }, 3500);
        test.bad++;
    }


}