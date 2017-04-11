export class Case {
    constructor() { }

    CaseId?: any;
    CaseNumber: string;
    CenterId?: number;
    CaseStausId?: any;
    CounselorId?: number;

    PeaceMakerId?: number;
    ClientFirstName?: string;
    ClientLastName?: string;
    Mi?: string;
    FatherName?: string;
    GenderLookupId?: any;

    RequireAssistanceLookupId?: any;
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
    RegisterDateString: string;
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
    CaseHeader: CaseHeader;

    Addresses: Array<CaseAddress>;

    SelectedAddress: CaseAddress;
}
