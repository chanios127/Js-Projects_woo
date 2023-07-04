
Public Class Temp
    Private Sub btn_matuse_Click(sender As System.Object, e As System.EventArgs) Handles btn_matuse.Click
           Dim Pdcd As String = dw_edit.GetItem(1, "am_pdcd")
           Dim Sno As String = dw_edit.GetItem(1, "am_sno")
           Dim custCd As String = dw_edit.GetItem(1, "am_custcd")
           Dim obj As Object, frm As Object

           obj = LzxpParams.ParentControl.LoadModalForm("SL_ASMasterNewB", "SL_ASMasterNewB")
           If IsNothing(obj) Then Return
           frm = obj.GetCallMatUseEdit()
           If IsNothing(frm) Then Return
           frm.Call_Init(Pdcd, Sno, custCd, dw_pdlist)

           If frm.ShowDialog <> DialogResult.OK Then Return

           'Dim frm As New frmCallMatUse
           'frm.Call_Init(Pdcd, Sno, custCd, dw_pdlist)
           'frm.ShowDialog()
    End Sub

            v_DwGrid.SetItem(nRow, "an_pdcd", dw_list.GetItem(iRow, "pd_pdcd"))
            v_DwGrid.SetItem(nRow, "cc_pdnm", dw_list.GetItem(iRow, "pd_pdnm"))
            v_DwGrid.SetItem(nRow, "an_pdfg", dw_list.GetItem(iRow, "pd_pdfg"))
            v_DwGrid.SetItem(nRow, "an_expqty", dw_list.GetItem(iRow, "cc_Qty"))



    Private Sub btn_MatCD_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Btn_MatCd.Click
           Dim obj As Object = LzxpParams.ParentControl.LoadModalForm("PO_PrjBomBreqNote", "PO_PrjBomBreqNote")
           If IsNothing(obj) Then Return
           Dim frm As New frmModalForm
           frm.WindowState = FormWindowState.Maximized
           obj.Call_Init(dw_edit.GetItem("am_pdcd"), dw_pdlist, "DE")
           frm.SetForm(obj)
           frm.ShowDialog()
    End Sub

                v_DwGrid.SetItem(jRow, "an_pdcd", dw_list2.GetItem(iRow, "bs_cpdcd"))
                v_DwGrid.SetItem(jRow, "cc_pdnm", dw_list2.GetItem(iRow, "cc_pdnm"))
                v_DwGrid.SetItem(jRow, "pd_std", dw_list2.GetItem(iRow, "cc_std"))
                v_DwGrid.SetItem(jRow, "pd_spec1", dw_list2.GetItem(iRow, "cc_spec1"))
                v_DwGrid.SetItem(jRow, "pd_spec2", dw_list2.GetItem(iRow, "cc_spec2"))
                v_DwGrid.SetItem(jRow, "pd_spec3", dw_list2.GetItem(iRow, "cc_spec3"))
End Class