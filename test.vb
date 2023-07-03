Private Sub separationProduct(Optional ByVal dw_name As String = "")
dw_detail.Reset()

For iRow As Integer = 1 To dw_list.RowCount
    If dw_list.GetItme(iRow, "cc_check") <> "Y" Then
        Continue For
    End if  
    Dim ds As DataSet
    Dim sQry As String
    Common.AddNewParam(v_sParams, "@pdcd", dw_list.GetItem(iRow, "cc_pdcd"), True)
    Common.AddNewParam(v_sParams, "@pjcd", dw_list.GetItem(iRow, "cc_pjcd"))
    Common.AddNewParam(v_sParams, "@poty", poty.Text)
    sQry = Classlib.GetSQL(Me.Name, "dw_list2", v_sParams)
    ds = Common.ExecCommand(sQry)
    If IsNothing(ds) Then Continue For
    If ds.Tables.Count < 1 Then Continue For
    If ds.Tables(0)Rows.Count < 1 Continue For 
    Dim stockQty As Double = 0 
    stockQty = ClassLibe.DBl(dw_list.GetItem(iRow, "cc_stqty"))
    ds = dw_list2.DataSet
    For Each dRow As DataRow In ds.Tables(0).Rows
        If stockQty > ClassLib.Dbl(ClassLib.Strn(dRow("cc_totqty"))) Then '필요량보다 재고량이 많을 경우
            stockQty  = stockQty - ClassLib.Dbl 


'-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



        '------------------Layout설정-----------------------------------------
        Dim sTemp As String

        sTemp = ClassLib.RegistryGet(Me.Name, "Splitter1Distance")
        If sTemp <> "" Then SplitContainer1.SplitterDistance = ClassLib.iNum(sTemp)
        '---------------------------------------------------------------------



    Protected Overrides Function ProcessCmdKey(ByRef msg As Message, ByVal keyData As Keys) As Boolean
        If msg.WParam.ToInt32() = CType(Keys.Escape, Integer) Then
            If bEditFg = True Then '수정된게 있으면
                If ClassLib.PutYesNo("XP102", , 1) <> Windows.Forms.DialogResult.Yes Then Return True
            End If

            Me.Close() 'Esc키를 누르면 종료
        ElseIf msg.WParam.ToInt32() = CType(Keys.F12, Integer) Then
            If LzxpParams.Login_GradeType <> "9" Then Return True
            If v_pFormNm = "" Then Return False
            If My.Computer.Keyboard.CtrlKeyDown Then 'form의 size저장
                Dim sQry As String = "IF EXISTS(SELECT 0 FROM LZXP470T WHERE WinFormName='" + Me.Name + "') BEGIN " + vbCrLf
                sQry += "	UPDATE LZXP470T SET  " + vbCrLf
                sQry += "		FormWidth = " + ClassLib.Strn(Me.Width) + ",   " + vbCrLf
                sQry += "		FormHeight = " + ClassLib.Strn(Me.Height) + ",   " + vbCrLf
                sQry += "		pformName = isNULL(pformName,'" + v_pFormNm + "'),   " + vbCrLf
                sQry += "		SplitterDistance =  " + ClassLib.Strn(SplitContainer1.SplitterDistance) + vbCrLf
                sQry += "	WHERE WinFormName='" + Me.Name + "'  " + vbCrLf
                sQry += "END " + vbCrLf
                sQry += "ELSE BEGIN " + vbCrLf
                sQry += "	INSERT INTO LZXP470T(WinFormName, pformName,  " + vbCrLf
                sQry += "			FormWidth, FormHeight,SplitterDistance) " + vbCrLf
                sQry += "	VALUES('" + Me.Name + "', '" + v_pFormNm + "',  " + vbCrLf
                sQry += "			" + ClassLib.Strn(Me.Width) + ", " + ClassLib.Strn(Me.Height) + ", " + ClassLib.Strn(SplitContainer1.SplitterDistance) + ") " + vbCrLf
                sQry += "END " + vbCrLf
                ClassLib.ExecuteNonQuery(sQry)

                sQry = "UPDATE LZXP450T SET FormWidth = " + ClassLib.Strn(Me.Width) + "," + vbCrLf
                sQry += "FormHeight = " + ClassLib.Strn(Me.Height) + vbCrLf
                sQry += "WHERE FormName='" + v_pFormNm + "' "
                ClassLib.ExecuteNonQuery(sQry)
                LzxpParams.sTempValue2 = "Resize"
                ClassLib.Bell(1)
            End If
        ElseIf msg.WParam.ToInt32() = CType(Keys.F1, Integer) Then 'F1키 버전관리
            ClassLib.Call_AppVersionInfo(Me.Name, v_sVersion)
        End If

    End Function


        Private Sub GetFormInfo() '폼에 관련된 정보 가져오기
        On Error GoTo Err
        Dim sQry As String = "SELECT Title = title<#Lang>,AddNewFg,EditFg,DeleteFg,PrintFg,SplitterDistance, " + vbCrLf
        sQry += "	MstPKColm,SlipFgColm,SlipFgValue,PKDateColm, FormWidth, FormHeight, " + vbCrLf
        sQry += "	PKTable,PKColm,PKInitial " + vbCrLf
        sQry += "FROM LZXP470T " + vbCrLf
        sQry += "WHERE WinFormName = '" + Me.Name + "' "

        Dim dSet As DataSet = DbInfo.ExecCommand(sQry)

        If IsNothing(dSet) Then Return
        If dSet.Tables.Count < 1 Then Return



        Dim sTemp As String = ClassLib.Strn(dSet.Tables(0).Rows(0)("Title"))
        If sTemp <> "" Then Me.Text = sTemp


        sTemp = ClassLib.Strn(dSet.Tables(0).Rows(0)("SplitterDistance")) '스플리터관련
        If ClassLib.iNum(sTemp) > 0 Then
            SplitContainer1.SplitterDistance = ClassLib.iNum(sTemp)
        End If

        Dim iPos As Integer = ClassLib.iNum(dSet.Tables(0).Rows(0)("FormWidth"))
        If iPos > Me.Width Then
            Me.Width = iPos
        End If
        iPos = ClassLib.iNum(dSet.Tables(0).Rows(0)("FormHeight"))
        If iPos > Me.Height Then
            Me.Height = iPos
        End If

        Me.Location = New System.Drawing.Point(Screen.PrimaryScreen.Bounds.Width / 2 - Me.Size.Width / 2, Screen.PrimaryScreen.Bounds.Height / 2 - Me.Size.Height / 2)

Err:
    End Sub

        Private Sub Panel1_Resize(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Panel1.Resize
        btn_close.Left = Panel1.Width - btn_close.Width - 10
        btn_save.Left = btn_close.Left - btn_save.Width - 5
        chk_close.Left = btn_save.Left - chk_close.Width - 5
    End Sub