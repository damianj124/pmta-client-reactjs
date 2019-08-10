import * as moment from "moment";

export const coiCreator = (values,certificateHolder) => {
    return [
        {
            cois_id: values.cois_id,
            property_id: values.property_id.value,
            vendor_category_id: values.vendor_category_id.value,
            insured: values.insured,
            certificate_holder: certificateHolder,
            general_liability_exp_date: values.exp_date,
            each_occurence: values.each_occurence ? +values.each_occurence.replace('$', '').replace(/,/g, '') : 0,
            damage_to_rented_premises: values.damage_to_rented_premises ? +values.damage_to_rented_premises.replace('$', '').replace(/,/g, '') : 0,
            med_exp: values.med_exp ? +values.med_exp.replace('$', '').replace(/,/g, '') : 0,
            personal_adv_injury: values.personal_adv_injury ? +values.personal_adv_injury.replace('$', '').replace(/,/g, '') : 0,
            products_comp: values.products_comp ? +values.products_comp.replace('$', '').replace(/,/g, '') : 0,
            combined_single_limit: values.combined_single_limit ? +values.combined_single_limit.replace('$', '').replace(/,/g, '') : 0,
            general_aggregate: values.general_aggregate ? +values.general_aggregate.replace('$', '').replace(/,/g, '') : 0,
            bodily_injury_per_person: values.bodily_injury_per_person ? +values.bodily_injury_per_person.replace('$', '').replace(/,/g, '') : 0,
            bodily_injury_per_accident: values.bodily_injury_per_accident ? +values.bodily_injury_per_accident.replace('$', '').replace(/,/g, '') : 0,
            property_damage_per_accident: values.property_damage_per_accident ? +values.property_damage_per_accident.replace('$', '').replace(/,/g, '') : 0,
            each_occourrence_umbrella: values.each_occourrence_umbrella ? +values.each_occourrence_umbrella.replace('$', '').replace(/,/g, '') : 0,
            aggregate: values.aggregate ? +values.aggregate.replace('$', '').replace(/,/g, '') : 0,
            each_accident: values.each_accident ? +values.each_accident.replace('$', '').replace(/,/g, '') : 0,
            disease_ea_employee: values.disease_ea_employee ? +values.disease_ea_employee.replace('$', '').replace(/,/g, '') : 0,
            disease_policy_limit: values.disease_policy_limit ? +values.disease_policy_limit.replace('$', '').replace(/,/g, '') : 0,
            authorized_representative: +values.authorized_representative,
            image_path: values.image_path
        }
    ];
};

const valueSetter = (value) => {
    return value ? value : 0;
};

export const coiValuesCreator = (d,prop,vendor) => {
    return  {
        cois_id: d[0].id,
        property_id: prop && {
            value: prop[0].property,
            label: prop[0].property_name
        } || {value: 0, label: ''},
        vendor_category_id: vendor && {
            value: vendor[0].id,
            label: vendor[0].name
        } || {value: 0, label: ''},
        insured: d[0].data[0].insured,
        image_path: d[0].data[7].image,
        // certificate_holder: d[0].data[1].certificate_holder,
        each_occurence: valueSetter(d[0].data[2].commercial_general_liability.each_occurance),
        damage_to_rented_premises: valueSetter(d[0].data[2].commercial_general_liability.damage_to_rented),
        med_exp: (d[0].data[2].commercial_general_liability.med_exp === 'EXCLUDED' ||  !d[0].data[2].commercial_general_liability.med_exp) ? '0' : d[0].data[2].commercial_general_liability.med_exp,
        personal_adv_injury: valueSetter(d[0].data[2].commercial_general_liability.personal_adv),
        general_aggregate: valueSetter(d[0].data[2].commercial_general_liability.general_aggregate),
        products_comp: valueSetter(d[0].data[2].commercial_general_liability.products_comp),
        combined_single_limit: valueSetter(d[0].data[3].automobile_liability.combined_single_limit),
        bodily_injury_per_person: valueSetter(d[0].data[3].automobile_liability.bodily_injury_per_person),
        bodily_injury_per_accident: valueSetter(d[0].data[3].automobile_liability.bodily_injury_per_accident),
        property_damage_per_accident:valueSetter(d[0].data[3].automobile_liability.property_damage),
        each_accident: valueSetter(d[0].data[5].workers_compensation.el_each_accident),
        disease_ea_employee: valueSetter(d[0].data[5].workers_compensation.el_disease_ea_employee),
        disease_policy_limit: valueSetter(d[0].data[5].workers_compensation.el_disease_policy_limit),
        exp_date: (d[0].data[6].exp_date && moment(d[0].data[6].exp_date).format('YYYY-MM-D')) || '',
        each_occourrence_umbrella: valueSetter(d[0].data[4].umbrella_liability.each_occurance),
        aggregate: valueSetter(d[0].data[4].umbrella_liability.aggregate),
        submitted: false,
        next_invoice: false,
        prev_invoice: false,
        authorized_representative: false,
    };
};

