        If LCase(colName) = "btn_matuse" Then
            Dim obj As Object, frm As Object
            obj = LzxpParams.ParentControl.LoadModalForm("SL_ASMasterNewB", "SL_ASMasterNewB")
            If IsNothing(obj) Then Return
            frm = obj.GetCallMatUseEdit()
            If IsNothing(frm) Then Return
            frm.Call_Init(v_pdcd, v_SNo, v_custcd, dw_list)
            If frm.ShowDialog <> DialogResult.OK Then Return





        ElseIf LCase(colName) = "btn_matcd" Then
            Dim obj As Object = LzxpParams.ParentControl.LoadModalForm("PO_PrjBomBreqNote", "PO_PrjBomBreqNote")
            If IsNothing(obj) Then Return
            Dim frm As New frmModalForm
            frm.WindowState = FormWindowState.Maximized
            obj.Call_Init(v_pdcd, dw_list, "DE")
            frm.SetForm(obj)
            frm.ShowDialog()


       
       '조건에 따른 datawindow control 분리
       Dim #formName As String = Me.Name
       If v_sCallFg = "TypeA" Then
            dw_List.Init_Form(#formName, #datawindowNameA)
       Else IF v_sCallFg = "TypeB" Then
            dw_BadList.Init_Form(#formName, #datawindowNameB)
       Else 
              dw_list.Init_Form()
       End If



              v_DwGrid.SetItem(nRow, "bl_pdcd", dw_list.GetItem(iRow, "cc_pdcd"))
                v_DwGrid.SetItem(nRow, "pd_pdnm", dw_list.GetItem(iRow, "cc_pdnm"))
                v_DwGrid.SetItem(nRow, "pd_std", dw_list.GetItem(iRow, "cc_pdstd"))
                v_DwGrid.SetItem(nRow, "bl_sno", dw_list.GetItem(iRow, "cc_SNo"))

                'std, sno 추가 예정