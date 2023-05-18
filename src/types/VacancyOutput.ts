export type VacancyOutput = {
    more: boolean,
    objects: Vacancy[],
    subscription_active: boolean,
    subscription_id: number,
    total: number,
}

export type Vacancy = {
    id: number,
    profession:	string,
    id_client?:	number,
    id_user?: number,
    code?: string,
    external_url?: string,
    refresh_vac?: boolean,
    extend_vac?: boolean,
    resumesubscription_status?: boolean,
    resumesubscription_keywords?: string,
    resumesubscription_kwc?: string,
    resumesubscription_rws?: number,
    date_pub_to: number,
    date_archived: number,
    date_published: number,
    work?: string,
    compensation?: string,
    address?: string,
    candidat?: string,
    town: {
        id: number,
        title: string,
        declension: string,
        genitive: string,
    },
    type_of_work: {
        id: number,
        title: string,
    },
    place_of_work: {
        id: number,
        title: string,
    },
    education:{
        id: number,
        title: string,
    },
    agency: {
        id: number,
        title: string,
    },	
    experience: {
        id: number,
        title: string,
    },
    maritalstatus: {
        id: number,
        title: string,
    },
    children: {
        id: number,
        title: string,
    },
    languages: [
        [{
            id: number,
            title: string,
        },
        {
            id: number,
            title: string,
        }]
    ],
    catalogues: [{
        id: number,
        title: string,
        positions: [{
            id: number,
            title: string,
        },]
    },]	
    is_archive: boolean,
    is_storage:	boolean,
    contact?: string,
    email?: string,
    url?: string,
    phone?: string,
    fax?: string,
    already_sent_on_vacancy?: boolean,
    favorite?: boolean,
    driving_licence?: string[],
    metro?:	[{
        id: number,
        title: string,
        id_metro_line: number,
    }]
    agreement?: boolean,
    payment_from?: number,
    payment_to?: number,
    currency: string,
    moveable?: boolean,
    gender: {
        id: number,
        title: string,
    },
    age_from?: number,
    age_to?: number,
    firm_name: string,
    firm_activity: string,
    client_logo?: string,
    link: string,
    views_count?: number,
    resumes_all?: number,
    resumes_new?: number,
    moderation_order: string,
    canEdit: boolean,
    extended_search_parameters: [{
        id: number,
        title: string,
    },{
        id: number,
        title: string,
    },]
    vacancyRichText: string | TrustedHTML,
}

export type VacancySingle = {
    canEdit: boolean,
    is_closed: boolean,
    id: number,
    id_client: number,
    payment_from?: number,
    payment_to?: number,
    date_pub_to: number,
    date_archived: number,
    date_published: number,
    address?: string,
    work?: string,
    compensation?: string,
    candidat?: string,
    metro?:	[{
        id: number,
        title: string,
        id_metro_line: number,
    }],
    currency: string,
    vacancyRichText: string | TrustedHTML,
    covid_vaccination_requirement:{
        id: number,
        title: string,
    },
    contact?: string,
    moveable?: boolean,
    agreement: false,
    anonymous: false,
    is_archive: false,
    is_storage: false,
    type_of_work: {
        id: number,
        title: string,
    },
    place_of_work:{
        id: number,
        title: string,
    },
    education: {
        id: number,
        title: string,
    },
    experience: {
        id: number,
        title: string,
    },
    maritalstatus:{
        id: number,
        title: string,
    },
    children: {
        id: number,
        title: string,
    },
    client:{
        id: number,
        title: string,
        link: string,
        industry:[],
        description:string,
        vacancy_count:number,
        staff_count: string,
        client_logo: string,
        address: null,
        addresses:[],
        url:string,
        short_reg: boolean, 
        is_blocked: boolean, 
        registered_date: number,
        town: {
            id:number,
            title:string, 
            declension: string,
            hasMetro:boolean,
            genitive:string
        }
    },
    languages: [
        [{
            id: number,
            title: string,
        },
        {
            id: number,
            title: string,
        }]
    ],
    driving_licence?: string[],
    catalogues:[{
        id:number,
        title:string,
        key:number,
        positions:[{
            id:number,
            title:string,
            key:number,
        }]
    }],
    agency:{
        id: number,
        title: string,
    },
    town: {
        id:number,
        title:string, 
        declension: string,
        hasMetro:boolean,
        genitive:string
    },
    already_sent_on_vacancy?: boolean,
    rejected: boolean,
    response_info: unknown,
    phone?: string,
    phones?: string[],
    fax?: string,
    faxes?: string[],
    favorite?: boolean,
    client_logo?: string,
    highlight: string,
    age_from?: number,
    age_to?: number,
    gender:{
        id: number,
        title: string,
    },
    firm_name: string,
    firm_activity: string,
    link: string,
    isBlacklisted: boolean,
    latitude: number,
    longitude: number,
    profession: string,
}