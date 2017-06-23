
export class Center
{
    constructor() { }

    CenterId: any;
    Title: string;
    Code: string;
    IsActive: boolean;
}

export class PeaceMaker {
    constructor() { }

    PeaceMakerId: any;
    FirstName: string;
    LastName: string;
    Email: string;
    CenterId?: number;
    IsActive: boolean;
}

export class Counselor {
    constructor() { }

    CounselorId: number;
    FirstName: string;
    LastName: string;
    CenterId?: number;
    IsGlobal: boolean;
    IsActive: boolean;
}

export class State {
    constructor() { }

    StateId: number;
    Title: string;  

    Cities: Array<City>;
}

export class City {
    constructor() { }

    CityId: number;
    Title: string;
    StateId: number;
}

export class CaseStatus {
    constructor() { }

    CaseStatusId: number;
    Title: string;
    Level: number;
}

export class Lookup {
    constructor() { }

    LookupId: number;
    Title: string;

    LookupDetails: Array<LookupDetail>;
}

export class LookupDetail {
    constructor() { }

    LookupDetailId: number;
    Value: string;
    LookupId: number;
}

export class ChartObject {
    constructor() { }
    Key: string;
    Value: any;
}

export class UserRole {
    constructor() { }
    RoleId: number;
    Title: string;
}
