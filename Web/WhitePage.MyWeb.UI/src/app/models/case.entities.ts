export class Case {
    constructor() { }

    CaseId?: number;
    CaseNumber: string;
    CenterId?: number;
    CaseStausId?: number;
    CounselorId?: number;

    PeaceMakerId?: number;
    ClientFirstName?: string;
    ClientLastName?: string;
    Mi?: string;
    FatherName?: string;
    GenderLookupId?: number;

    RequireAssistanceLookupId?: number;
    MaritalStatusLookupId?: any;
    Remarks?: string;

    RegisterDate?: Date;
    MobileNumber?: Date;

    CreatedBy?: number;
    CreatedDateTime?: Date;
    ModifiedBy?: number;
    ModifiedDatetime?: Date;
}

export class CaseHeader {
    constructor() { }

    CaseId: number;
    CaseNumber: string;
    ClientName: string;
    CaseStatusId: number;
    CaseStatus: string;
    RegisterDate: Date;
    CenterTitle: string;
    PeaceMaker: string;
    MobileNumber: string;
}


export class CaseAddress {
    constructor() { }

    CaseAddressId?: number;
    CaseId?: number;
    Address?: string;
    Area?: string;
    CityId?: number;
    StateId?: number;
    PIN?: string;

    CreatedBy?: number;
    CreatedDateTime?: Date;
    ModifiedBy?: number;
    ModifiedDatetime?: Date;
}

export class CaseBook {
    constructor() { }

    Case: Case;
    Addresses: Array<CaseAddress>;

    SelectedAddress: CaseAddress;
}