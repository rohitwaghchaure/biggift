frappe.ui.form.on('SAS', 'refresh', function(frm, cdt, cdn){
	var doc = frm.doc
	if (doc.workflow_state == 'QC Accepted' && in_list(user_roles, 'Sales User')){
    	cur_frm.add_custom_button(__('Email SAS to client'), frm.cscript.send_email_to_customer).addClass("btn-primary");
  	}

  	if(doc.docstatus ==1 && in_list(user_roles, 'Sales User')){
  		cur_frm.add_custom_button(__('Make Work Order'), frm.cscript.make_work_order).addClass('btn-primary')
  	}
})

cur_frm.cscript.send_email_to_customer = function(){
	var doc = cur_frm.doc;
	var client = doc.sas_to == 'Customer' ? doc.customer :doc.lead
	
	frappe.call({
		freeze: true,
		method:"biggift.biggift.send_email_to_customer.send_sas_link_to_customer",
		args: {sas_id: doc.name, 'customer': client, 'sas_to': doc.sas_to}
	})
}

frappe.ui.form.on('SAS Item', 'sas_image', function(frm, cdt, cdn){
	var d = locals[cdt][cdn]
	refresh_field('image_view', d.name, 'sas_item');
})

cur_frm.cscript.make_work_order = function(frm, cdt, cdn){
	frappe.model.open_mapped_doc({
		method: "biggift.biggift.doctype.sas.sas.make_work_order",
		frm: cur_frm
	})
}

cur_frm.add_fetch('customer', 'customer_name', 'customer_name');
cur_frm.add_fetch('lead', 'lead_name', 'customer_name');	