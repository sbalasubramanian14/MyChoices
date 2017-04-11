
class Center
{
    constructor() { }

    CenterId: any;
    Title: string;
    Code: string;
    IsActive: boolean;
}

class PeaceMaker {
    constructor() { }

    PeaceMakerId: any;
    FirstName: string;
    LastName: string;
    Email: string;
    CenterId?: number;
    IsActive: boolean;
}

class Counselor {
    constructor() { }

    CounselorId: number;
    FirstName: string;
    LastName: string;
    CenterId?: number;
    IsGlobal: boolean;
    IsActive: boolean;
}

class State {
    constructor() { }

    StateId: number;
    Title: string;  

    Cities: Array<City>;
}

class City {
    constructor() { }

    CityId: number;
    Title: string;
    StateId: number;
}

class CaseStatus {
    constructor() { }

    CaseStatusId: number;
    Title: string;
    Level: number;
}

class Lookup {
    constructor() { }

    LookupId: number;
    Title: string;

    LookupDetails: Array<LookupDetail>;
}

class LookupDetail {
    constructor() { }

    LookupDetailId: number;
    Value: string;
    LookupId: number;
}

