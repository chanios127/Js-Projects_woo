Imports System.Windows.Forms
Imports Lzxp.FrameWork, Lzxp.UserClass, Lzxp.Common
Imports System.Reflection

'######################################################################################
'## 내  용 : 아이탑스 불량내역 등록 (SNT 작업장 전용)                                  ##
'## 작성일 : 2023-06-29(목)                                                          ##
'## 작성자 : 박정우                                                                  ##
'## 수정일 : 2023-06-29(목)                                                          ##
'## 수정자 : 박정우                                                                  ##
'## 내 용  : FRM_BadCodeEdit_iPOP 으로부터 복사함.                                    ##
'######################################################################################
Public Class FRM_BadCodeEdit_iPOP_SMT
    Private v_sVersion As String = "Last Update 2023-06-29,   Version 1.00"
    Private v_sParams As Object = Nothing
    Private v_sPoID As String = ""
    Private v_sPnID As String = ""
    Private v_sWorkTy As String = "C6" 'SMT 작업장이기 때문에 C6으로 고정함. 
    Private v_sFromFg As String = "1" '1=제품불량,2=자재불량
    Private v_smpdCd As String = ""
    Private v_smpdNm As String = ""
    Private v_sEquipCd As String
    Private v_sWorkDt As String
    Private v_sWorkTm As String
    Private v_DWGrid As DWGrid = Nothing
    Private v_sFontexpfg As String = "" '2017-03-16. 양재호추가.
    'Private v_sCallFg As String = "" '2017-11-08. 양재호추가. 23-06-29, PJW SMT 전용폼이므로 비활성화함. 
    'Private v_sLeftChar As String = "bl_" 23-06-29, PJW 전용폼이므로 컬럼 동적 할당 비활성화함. 
    Private v_PoTy As String = "C6" 'SMT 작업장이기 때문에 C6으로 고정함. 
    Private v_Qty As String = "" '2019-04-25 이남주 추가
    Private Sub frmNewForm_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        Instance.LoadForm(Me)

        dw_BadCd.Init_Form()
        For Each sColNm As String In dw_BadCd.GetColumns()
            'dw_badCd.Modify(sColNm + ".Height = 116 " + sColNm + ".y=32")
            dw_BadCd.Modify(sColNm + ".font.height='-11'")
        Next

        v_DWGrid = Me.Tag
        Common.AddNewParam(v_sParams, "@FromFg", v_sFromFg, True)
        Common.AddNewParam(v_sParams, "@WorkTy", v_sWorkTy)
        Common.AddNewParam(v_sParams, "@GroupTy", v_sEquipCd)
        'Common.AddNewParam(v_sParams, "@GroupTy", IIf(v_sCallFg = "PNMatBad", "", v_sEquipCd)) '23-06-29, PJW SMT 전용폼이므로 호출 구분 비활성화함. 
        dw_BadCd.DWOpen(v_sParams)

        ''---------------------------------------비활성화------------------------------------------------------------------------------------------------------------------------------------------------------
        'If v_sCallFg = "PNMatBad" Then '23-06-29, PJW SMT 전용폼이므로 호출 구분 비활성화함. 
        '    dw_BadList.Init_Form(Me.Name, "dw_BadList_PNMatBad")
        '    'v_sLeftChar = "pb_" 23-06-29, PJW 전용폼이므로 컬럼 동적 할당 비활성화함. 
        '    v_sEquipCd = ""
        'Else
        '    dw_BadList.Init_Form()
        '    'v_sLeftChar = "bl_" 23-06-29, PJW 전용폼이므로 컬럼 동적 할당 비활성화함. 
        'End If
        ''---------------------------------------비활성화------------------------------------------------------------------------------------------------------------------------------------------------------
        dw_BadList.Init_Form()



        dw_BadList.Modify("DataWindow.header.height=192")
        dw_BadList.Modify("DataWindow.Detail.height=164")
        dw_BadList.Modify("cf_hdbar.Height = 188")

        v_sFontexpfg = ClassLib.ExecuteNonQuery("Select Max(ke_fontexpfg) FROM TPM_KioskEnv") '2017-03-16. 양재호추가.
        Dim sColumns As String = (",,").ToLower

        For Each sColNm As String In dw_BadList.GetColumns()
            If v_sFontexpfg = "Y" Then
                If Strings.InStr(sColumns, ("," + sColNm + ",").ToLower) < 1 Then Continue For
            End If
            dw_BadList.Modify(sColNm + ".Height = 116 " + sColNm + ".y=32")
            dw_BadList.Modify(sColNm + ".font.height='-16'")

            dw_BadList.Modify(sColNm + "_t.Height = 112 " + sColNm + "_t.y=48")
            dw_BadList.Modify(sColNm + "_t.font.height='-16'")
        Next
        Common.AddNewParam(v_sParams, "@poID", v_sPoID, True)
        Common.AddNewParam(v_sParams, "@SlipFg", v_sFromFg)
        Common.AddNewParam(v_sParams, "@equipCd", IIf(v_sCallFg = "PNMatBad", "", v_sEquipCd))

        'Common.AddNewParam(v_sParams, "@equipCd", IIf(v_sCallFg = "PNMatBad", "", v_sEquipCd))
        dw_BadList.DWOpen(v_sParams)


        ''---------------------------------------비활성화------------------------------------------------------------------------------------------------------------------------------------------------------
        '2019-04-25 LNJ 이재형 차장님 요청으로 SMT일 경우 품목현품라벨수량 감안하여 불량 계산하기 위해 추가. (SMT 전용폼으로 해당 로직 판단 없이 타도록 수정. 23-06-29, PJW
        'v_Qty = ClassLib.ExecuteNonQuery("SELECT pd_lableQty FROM TCD_Product WHERE pd_pdcd = '" + v_smpdCd + "'")
        'v_PoTy = ClassLib.ExecuteNonQuery("SELECT pd_poTy FROM TCD_Product WHERE pd_pdcd = '" + v_smpdCd + "'")
        'If v_PoTy = "C6" Then
        'Qty.Text = v_Qty
        'Else
        '    label_title.Visible = False
        '    Qty.Visible = False
        'End If
        ''---------------------------------------비활성화------------------------------------------------------------------------------------------------------------------------------------------------------

        Qty.Text = v_Qty




        If v_sFromFg = "2" Then '1=제품불량,2=자재불량
            lb_Title.Font = New System.Drawing.Font(lb_Title.Font.Name, 16, Drawing.FontStyle.Underline)
            lb_Title.Cursor = Cursors.Hand
            Me.Text = "자재불량 등록"


            Dim sQry As String = "SELECT top 1 bs_cpdCd +'/' + 	dbo.GetProductNm(bs_cpdCd) FROM TCd_BOMSub WHERE bs_pdCd = '" + v_smpdCd + "'"


            '2017-02-17. 양재호수정. 요청사항에 의해서 자재풀리는 방식 바꿈.
            Dim sTemp As String = ClassLib.ExecuteNonQuery(sQry)
            If sTemp = "" Then sTemp = "/"
            lb_MatCd.Text = sTemp.Split("/")(0)
            lb_MatNm.Text = sTemp.Split("/")(1)


            ''---------------------------------------비활성화------------------------------------------------------------------------------------------------------------------------------------------------------
            ''------------2017-02--15. 양재호수정. 자재불량 넣을때 맘대로 내용 넣고 싶다고 요청하여서 추가함. 23-06-29, PJW 무의미한 로직이므로 주석처리함.(컨트롤 내부 쿼리에도 주석처리 되어 있어 비사용로직으로 여겨짐) 
            'Common.AddNewParam(v_sParams, "@pdcd", sTemp.Split("/")(0), True)
            'sQry = ClassLib.GetSQL(Me.Name, "GetProductInfo", v_sParams)

            'If sQry = "" Then Return
            'Dim ds As DataSet = Common.ExecCommand(sQry)

            'If IsNothing(ds) OrElse ds.Tables.Count < 1 OrElse ds.Tables(0).Rows.Count < 1 Then Return

            'For Each sControl As Control In Me.Panel1.Controls
            '    If TypeName(sControl).ToLower <> "label" Then Continue For '라벨이 아닐경우 패스

            '    If Not IsNothing(ds.Tables(0).Columns(sControl.Name)) Then '데이터셋에 컬럼이름과 Panel1의 컬럼이 동일한게 있다면
            '        sControl.Text = ClassLib.Strn(ds.Tables(0).Rows(0).Item(sControl.Name))
            '    End If


            'Next
            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------





        Else
            lb_Title.Text = "품목코드"
            Me.Text = "품목불량 등록"
            lb_info.Text = "품목 불량현황"
            lb_MatCd.Text = v_smpdCd
            lb_MatNm.Text = v_smpdNm
        End If


    End Sub
    Protected Overrides Function ProcessCmdKey(ByRef msg As Message, ByVal keyData As Keys) As Boolean
        If msg.WParam.ToInt32() = CType(Keys.Escape, Integer) Then Me.Close()
        If msg.WParam.ToInt32() = CType(Keys.F1, Integer) Then
            ClassLib.Call_AppVersionInfo(Me.Name, v_sVersion)
        End If
    End Function
    Public Sub Call_Init(ByVal sPoID As String, ByVal sEquipCd As String, ByVal sFromFg As String, ByVal sPdCd As String, ByVal sWorkDt As String, ByVal sWorkTm As String, Optional ByVal sCallFg As String = "")
        v_sPoID = sPoID
        v_sEquipCd = sEquipCd
        v_sFromFg = sFromFg '1=제품불량,2=자재불량
        v_smpdCd = sPdCd
        v_sWorkDt = sWorkDt
        v_sWorkTm = sWorkTm.Split("/")(1)
        'v_sCallFg = sCallFg '23-06-29, PJW SMT 전용폼이므로 호출 구분 비활성화함. 
        v_smpdNm = ClassLib.ExecuteNonQuery("SELECT dbo.GetProductNm('" + sPdCd + "')")
    End Sub
    Private Sub btn_close_Click(ByVal sender As System.Object, ByVal e As System.EventArgs)
        Me.Close()
    End Sub

    Private Sub dw_badCd_MouseClick(ByVal sender As System.Object, ByVal RowNumber As System.Int32, ByVal colName As System.String, ByVal BandType As Sybase.DataWindow.BandType, ByVal e As System.Windows.Forms.MouseEventArgs) Handles dw_BadCd.MouseClick
        'If Strings.Right(colName, 4) <> "_btn" Then Return

        If RowNumber < 1 Then Return
        Dim sBadCd As String = dw_BadCd.GetItem(RowNumber, "bt_BadCd")
        If sBadCd = "" Then Return
        Dim sBadNm As String = dw_BadCd.GetItem(RowNumber, "bt_BadNm")
        Dim sBadFg As String = dw_BadCd.GetItem(RowNumber, "bt_BadFg") '2018-01-05(HCP):불량처리구분 구해오기

        ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
        ''23-06-29, PJW 동적 컬럼할당 비활성화. 
        ''Dim iRow As Integer = dw_BadList.FindRow(v_sLeftChar + "badCd = '" + sBadCd + "' AND " + v_sLeftChar + "pdcd = '" + lb_MatCd.Text + "' AND if(isnull(" + v_sLeftChar + "equipCd),''," + v_sLeftChar + "equipCd) = '" + v_sEquipCd + "'")
        ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------


        Dim iRow As Integer = dw_BadList.FindRow("pbbadCd = '" + sBadCd + "' AND " + "pb_pdcd = '" + lb_MatCd.Text + "' AND if(isnull(" + "pb_equipCd),''," + "pb_equipCd) = '" + v_sEquipCd + "'")


        '2019-04-25 LNJ 현품수량이 기존값과 다르면 변경해줌
        If v_Qty <> Qty.Text Then
            v_Qty = Qty.Text
        End If

        '2019-04-25 LNJ 제조유형이 SMT일 경우 현품수량 감안하여 계산
        If iRow < 1 Then
            If rBtn2.Checked = True Then Return '감소면
            iRow = dw_BadList.InsertRow()

            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
            ''23-06-29, PJW 동적 컬럼할당 비활성화. 
            'If v_PoTy = "C6" Then 'SMT일경우 
            '    If v_Qty <> "" Then '현품수량이 있을 경우
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "pdcd", lb_MatCd.Text)
            '        dw_BadList.SetItem(iRow, "pd_pdNm", lb_MatNm.Text) '2021-11-22 LNJ 품목명 추가
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "equipCd", v_sEquipCd)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badCd", sBadCd)
            '        dw_BadList.SetItem(iRow, "cc_badNm", sBadNm)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badFg", sBadFg)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", 1 * v_Qty)
            '        Return
            '    Else '없을경우
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "pdcd", lb_MatCd.Text)
            '        dw_BadList.SetItem(iRow, "pd_pdNm", lb_MatNm.Text) '2021-11-22 LNJ 품목명 추가
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "equipCd", v_sEquipCd)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badCd", sBadCd)
            '        dw_BadList.SetItem(iRow, "cc_badNm", sBadNm)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badFg", sBadFg)
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", "1")
            '        Return
            '    End If
            'Else '나머지 유형
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "pdcd", lb_MatCd.Text)
            '    dw_BadList.SetItem(iRow, "pd_pdNm", lb_MatNm.Text) '2021-11-22 LNJ 품목명 추가
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "equipCd", v_sEquipCd)
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badCd", sBadCd)
            '    dw_BadList.SetItem(iRow, "cc_badNm", sBadNm)
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badFg", sBadFg)
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", "1")
            '    Return
            'End If
            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------



            If v_Qty <> "" Then '현품수량이 있을 경우
                dw_BadList.SetItem(iRow, "pb_pdcd", lb_MatCd.Text)
                dw_BadList.SetItem(iRow, "pd_pdNm", lb_MatNm.Text) '2021-11-22 LNJ 품목명 추가
                dw_BadList.SetItem(iRow, "pb_equipCd", v_sEquipCd)
                dw_BadList.SetItem(iRow, "pb_badCd", sBadCd)
                dw_BadList.SetItem(iRow, "cc_badNm", sBadNm)
                dw_BadList.SetItem(iRow, "pb_badFg", sBadFg)
                dw_BadList.SetItem(iRow, "pb_badQty", 1 * v_Qty)
                Return
            Else '없을경우
                dw_BadList.SetItem(iRow, "pb_pdcd", lb_MatCd.Text)
                dw_BadList.SetItem(iRow, "pd_pdNm", lb_MatNm.Text) '2021-11-22 LNJ 품목명 추가
                dw_BadList.SetItem(iRow, "pb_equipCd", v_sEquipCd)
                dw_BadList.SetItem(iRow, "pb_badCd", sBadCd)
                dw_BadList.SetItem(iRow, "cc_badNm", sBadNm)
                dw_BadList.SetItem(iRow, "pb_badFg", sBadFg)
                dw_BadList.SetItem(iRow, "pb_badQty", "1")
                Return
            End If

        End If
        If rBtn1.Checked = True Then '불량수 증가 라디오버튼이 체크되어 있으면
            'If v_PoTy = "C6" Then
            '    If v_Qty <> "" Then
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) + v_Qty) '불량수 누적 증가
            '    Else
            '        dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) + 1) '불량수 누적 증가
            '    End If
            'Else
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) + 1) '불량수 누적 증가
            'End If



            If v_Qty <> "" Then
                dw_BadList.SetItem(iRow, "pb_badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, "pb_badQty")) + v_Qty) '불량수 누적 증가
            Else
                dw_BadList.SetItem(iRow, "pb_badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, "pb_badQty")) + 1) '불량수 누적 증가
            End If

            '-----------------------------------------------------------------------
            '2016-07-11 장명식 추가
            '제품 또는 자재 불량이 발생한 경우 발생 시점의 발생일시 등록.
            'dw_BadList.SetItem(iRow, v_sLeftChar + "rmk", Now().ToString("yyMMdd hh:mm:ss"))
            '-----------------------------------------------------------------------


        Else '불량수 감소 라디오버튼 체크 시
            'If dw_BadList.GetItem(iRow, "lb_badQty") = "" Then
            '    MsgBox("전표가 올바르지 않습니다. 확인하시기 바랍니다.", MsgBoxStyle.Critical, "경고")
            '    Me.Close()
            '    Return
            'End If

            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
            'If ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) < 1 Then '불량수 감소 시 0보다 작아지면 안되므로 추가함.
            '    'ClassLib.MsgError("불량수는 0보다 작을 수 없습니다.")
            '    'dw_BadList.SetItem(iRow, "lb_badQty", 1)
            '    dw_BadList.DeleteRow(iRow)
            '    Return
            'End If
            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------


            If ClassLib.iNum(dw_BadList.GetItem(iRow, "pb_badQty")) < 1 Then '불량수 감소 시 0보다 작아지면 안되므로 추가함.
                'ClassLib.MsgError("불량수는 0보다 작을 수 없습니다.")
                'dw_BadList.SetItem(iRow, "lb_badQty", 1)
                dw_BadList.DeleteRow(iRow)
                Return
            End If


            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
            'If v_PoTy = "C6" Then '23-06-29, PJW 제조유형 고정 및 동적컬럼 할당 비활성화 함.. 
            'If v_Qty <> "" Then
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) - v_Qty) '불량수 감소
            'Else
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) - 1) '불량수 감소
            'End If
            'Else
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, v_sLeftChar + "badQty")) - 1) '불량수 감소

            'End If
            ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------


            If v_Qty <> "" Then
                dw_BadList.SetItem(iRow, "pb_badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, "pb_badQty")) - v_Qty) '불량수 감소
            Else
                dw_BadList.SetItem(iRow, "pb_badQty", ClassLib.iNum(dw_BadList.GetItem(iRow, "pb_badQty")) - 1) '불량수 감소
            End If
            '-----------------------------------------------------------------------
            '2016-07-11 장명식 추가
            '제품 또는 자재 불량이 발생한 경우 발생 시점의 발생일시 등록.
            'dw_BadList.SetItem(iRow, v_sLeftChar + "rmk", Now().ToString("yyMMdd hh:mm:ss"))
            '-----------------------------------------------------------------------
        End If
    End Sub
    Private Sub lb_Title_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles lb_Title.Click
        If v_sFromFg = "1" Then Return
        Dim frm As New frmTouchBomSub_Select_IPOP_SMT
        frm.Call_Init(v_smpdCd, lb_MatCd.Text, v_sPoID)
        frm.Tag = ""
        If frm.ShowDialog() <> Windows.Forms.DialogResult.OK Then Return
        lb_MatCd.Text = frm.Tag.Split(vbTab)(0)
        lb_MatNm.Text = frm.Tag.Split(vbTab)(1)
    End Sub

    Private Sub btn_save_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btn_save.Click
        If ClassLib.SaveQuestion(1) <> Windows.Forms.DialogResult.Yes Then Return
        If lb_MatCd.Text = "" Then
            ClassLib.MsgMerge("AA002", lb_Title.Text)
            Return
        End If
        Dim sMarkChr As String = ""
        If v_sFromFg = "1" Then '1=제품불량
            sMarkChr = "P"
        Else
            sMarkChr = "M" '2=자재불량
        End If
        Dim sblID As String = ""
        Dim sPrikey As String = ""
        Dim sWorkDt As String = ""

        ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
        'If v_sCallFg = "PNMatBad" Then
        '    sblID = ClassLib.ExecuteNonQuery("SELECT max(pb_pbID) FROM TPM_PNMatBadList WHERE pb_pbID LIKE '" + v_sPoID + sMarkChr + "%' ")
        '    sWorkDt = ClassLib.ExecuteNonQuery("SELECT max(pn_workDt) FROM TPM_PrdNote WHERE pn_pnID = '" + v_sPoID + "' ")
        '    sPrikey = "pb_pbID"
        'Else
        '    sblID = ClassLib.ExecuteNonQuery("SELECT max(bl_blID) FROM SMD_itops.DBO.TPM_BadList_MES_ITS WHERE bl_blID LIKE '" + v_sPoID + sMarkChr + v_sEquipCd + "%' ")
        '    sPrikey = "bl_blID"
        'End If
        ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------


            sblID = ClassLib.ExecuteNonQuery("SELECT max(pb_pbID) FROM TPM_PNMatBadList WHERE pb_pbID LIKE '" + v_sPoID + sMarkChr + "%' ")
            sWorkDt = ClassLib.ExecuteNonQuery("SELECT max(pn_workDt) FROM TPM_PrdNote WHERE pn_pnID = '" + v_sPoID + "' ")
            sPrikey = "pb_pbID"





        Dim iseqNo As Integer = 0 ', sRow As Integer
        If sblID = "" Then
            iseqNo = 1
        Else
            iseqNo = ClassLib.iNum(Strings.Right(sblID, 3)) + 1
        End If

        For iRow As Integer = 1 To dw_BadList.RowCount
            'Dim sBadQty = ClassLib.Dbl(dw_BadList.GetItem(iRow, v_sLeftChar + "BadQty"))
            Dim sBadQty = ClassLib.Dbl(dw_BadList.GetItem(iRow, "pb_BadQty"))
            If dw_BadList.GetItem(iRow, sPrikey) = "" Then


                ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------
                'If v_sCallFg = "PNMatBad" Then
                '    sblID = v_sPoID + sMarkChr + iseqNo.ToString("000") : iseqNo += 1
                'Else
                '    sblID = v_sPoID + sMarkChr + v_sEquipCd + iseqNo.ToString("000") : iseqNo += 1
                'End If
                ''---------------------------------------비활성화----------------------------------------------------------------------------------------------------------------------------------------------------------

                sblID = v_sPoID + sMarkChr + iseqNo.ToString("000") : iseqNo += 1
                dw_BadList.SetItem(iRow, sPrikey, sblID)
            End If

            dw_BadList.SetItem(iRow, v_sLeftChar + "SlipFg", v_sFromFg)
            dw_BadList.SetItem(iRow, v_sLeftChar + "poTy", v_sWorkTy)
            dw_BadList.SetItem(iRow, v_sLeftChar + "reqDt", sWorkDt)
            '---------------------------------------------------------------------------------
            '2018-01-05(HCP) : 불량처리구분 강제로 박지 않도록 주석처리(구해오도록 변경함)
            'If v_sFromFg = "1" Then '1=제품불량,2=자재불량
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badFg", "D") 'D=해체가공,R=반품,S=선별
            'Else
            '    dw_BadList.SetItem(iRow, v_sLeftChar + "badFg", "S")
            'End If
            '---------------------------------------------------------------------------------
            If sBadQty = 0 Or sBadQty <= 0 Then
                dw_BadList.DeleteRow(iRow)
                iRow -= 1
            Else
                If v_sCallFg = "PNMatBad" Then
                    dw_BadList.SetItem(iRow, "pb_pnID", v_sPoID)
                Else
                    dw_BadList.SetItem(iRow, "bl_poID", v_sPoID)
                End If


                'dw_BadList.SetItem(iRow, "lb_pdCd", lb_MatCd.Text) '2016-12-07. 양재호 수정. 품목코드를 무조건 다 박아버리면 안됨. 불량유형 클릭할때 해당품목코드가 들어가도록 수정함.
                dw_BadList.SetItem(iRow, v_sLeftChar + "mpdCd", v_smpdCd)
            End If
            If iRow = dw_BadList.RowCount Then Exit For
        Next

        If dw_BadList.SaveData() = False Then Return




        If v_sFromFg = "1" And v_sCallFg = "PNMatBad" Then '제품불량일 경우에는 저장후 생산전표 불량수량에 업데이트 해준다.2017-11-24. 요청사항에 의해서 양재호 추가.
            Dim sQry As String = ""

            sQry = "Select Sum(pb_badQty) FROM TPM_PNMatBadList WHERE pb_pnID = '" + v_sPoID + "' AND pb_slipFg = '1'"

            Dim bQty As Double = ClassLib.Dbl(ClassLib.ExecuteNonQuery(sQry))

            sQry = "Update TPM_PrdNote SET" + vbCrLf
            sQry += "pn_badQty = " + bQty.ToString + vbCrLf
            sQry += "WHERE pn_pnID = '" + v_sPoID + "'" + vbCrLf + vbCrLf
            sQry += "Update TPM_PrdLineNote SET" + vbCrLf
            sQry += "pl_Qty = pl_Qty," + vbCrLf
            sQry += "pl_BadQty = " + bQty.ToString + vbCrLf
            sQry += "WHERE pl_pnID = '" + v_sPoID + "'"
            sQry += "AND pl_seq = '1'"

            ClassLib.ExecuteNonQuery(sQry)

            v_DWGrid.SetItem("pn_badqty", bQty)
        End If

        If dw_BadList.RowCount < 1 Then Return

        Me.DialogResult = Windows.Forms.DialogResult.OK
    End Su
    







            Dim spnID As String = ClassLib.ExecuteNonQuery("SELECT pn_pnID FROM TPM_PrdNote WHERE pn_poID = '" + v_spoID + "' AND pn_WorkDt = '" + v_sWorkDt + "' AND pn_wtCd = '" + v_sWorkTm + "' ")
        If spnID = "" Then
            Me.New_Form()
            '2022-06-30 LNJ 생산실적 Data와 투입이력 Data 꼬임현상으로 인해 최초 등록시에만 
            '저장버튼 활성화 하고 그 외 생산라벨(수량 누적)으로만 저장 될 수 있도록 하였으나...
            '비고 같은 간단 컬럼만 저장하고 싶다 하여.. 다시 원복 하였음.
            'btn_save.Enabled = True
        Else
            v_sPnID = spnID
            Common.AddNewParam(v_sParams, "@pn_pnID", v_sPnID, True)
            dw_edit.DWOpen(v_sParams)
            dw_MatUse.DWOpen(v_sParams)
            '2022-06-30 LNJ 생산실적 Data와 투입이력 Data 꼬임현상으로 인해 최초 등록시에만 
            '저장버튼 활성화 하고 그 외 생산라벨(수량 누적)으로만 저장 될 수 있도록 하였으나...
            '비고 같은 간단 컬럼만 저장하고 싶다 하여.. 다시 원복 하였음.
            'btn_save.Enabled = False






            

End Class