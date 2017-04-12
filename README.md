# MyChoices
                            <div class="form-group">
                                <label for="CenterId">Peace Maker *</label>
                                <ng-select [options]="peaceMakerOptionsList"
                                           placeholder="Select Peace Maker"
                                           [(ngModel)]="caseBook.Case.PeaceMakerId"
                                           formControlName="PeaceMakerId"
                                           [allowClear]="true">
                                </ng-select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['PeaceMakerId'].hasError('required') && casePrimaryForm.controls['PeaceMakerId'].touched" class="mat-text-warn">Peace Maker is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Counselor *</label>
                                <ng-select [options]="counselorOptionsList"
                                           placeholder="Select Peace Maker"
                                           [(ngModel)]="caseBook.Case.CounselorId"
                                           formControlName="CounselorId"
                                           [allowClear]="true">
                                </ng-select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['CounselorId'].hasError('required') && casePrimaryForm.controls['CounselorId'].touched" class="mat-text-warn">Peace Maker is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="PeacemakerId">First Name *</label>
                                <input placeholder="First Name" [formControl]="casePrimaryForm.controls['ClientFirstName']" [(ngModel)]="caseBook.Case.ClientFirstName" class="form-control" />
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['ClientFirstName'].hasError('required') && casePrimaryForm.controls['ClientFirstName'].touched" class="mat-text-warn">First Name is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="PeacemakerId">Last Name *</label>
                                <input placeholder="Last Name" [formControl]="casePrimaryForm.controls['ClientLastName']" [(ngModel)]="caseBook.Case.ClientLastName" class="form-control" />
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['ClientLastName'].hasError('required') && casePrimaryForm.controls['ClientLastName'].touched" class="mat-text-warn">Last Name is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="PeacemakerId">M.I.</label>
                                <textarea placeholder="Middle Initials" [formControl]="casePrimaryForm.controls['Mi']" [(ngModel)]="caseBook.Case.Mi" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="PeacemakerId">Father / Husband Name *</label>
                                <input placeholder="Father / Husband Name" [formControl]="casePrimaryForm.controls['FatherName']" [(ngModel)]="caseBook.Case.FatherName" class="form-control" />
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['FatherName'].hasError('required') && casePrimaryForm.controls['FatherName'].touched" class="mat-text-warn">Father / Husband Name is required.</small>
                                </div>
                            </div>


<div class="col-md-4 d-flex flex-column">
                    <div class="card flex-fill">
                        <div class="card-header">
                            Client Details
                        </div>
                        <div class="card-block" >

                            <div class="form-group">
                                <label for="PeacemakerId">Mobile *</label>
                                <input placeholder="Mobile" [formControl]="casePrimaryForm.controls['MobileNumber']" class="form-control"
                                       [(ngModel)]="caseBook.Case.MobileNumber" [min]="10" [max]="10" digits maxlength="10" />
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['MobileNumber'].hasError('required') && casePrimaryForm.controls['MobileNumber'].touched" class="mat-text-warn">Mobile is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Gender *</label>
                                <ng-select [options]="genderLookupOptionsList"
                                           placeholder="Select Gender"
                                           [(ngModel)]="caseBook.Case.GenderLookupId"
                                           formControlName="GenderLookupId"
                                           [allowClear]="true">
                                </ng-select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['GenderLookupId'].hasError('required') && casePrimaryForm.controls['GenderLookupId'].touched" class="mat-text-warn">Gender is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Marital Status *</label>
                                <ng-select [options]="maritalStatusLookupOptionsList"
                                           placeholder="Select Marital Status"
                                           [(ngModel)]="caseBook.Case.MaritalStatusLookupId"
                                           formControlName="MaritalStatusLookupId"
                                           [allowClear]="true">
                                </ng-select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['MaritalStatusLookupId'].hasError('required') && casePrimaryForm.controls['MaritalStatusLookupId'].touched" class="mat-text-warn">Marital Status is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Required Assistance *</label>
                                <ng-select [options]="requireAssistanceLookupOptionsList"
                                           placeholder="Required Assistance"
                                           [(ngModel)]="caseBook.Case.RequireAssistanceLookupId"
                                           formControlName="RequireAssistanceLookupId"
                                           [allowClear]="true">
                                </ng-select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['RequireAssistanceLookupId'].hasError('required') && casePrimaryForm.controls['RequireAssistanceLookupId'].touched" class="mat-text-warn">Require Assistance is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="PeacemakerId">Remarks</label>
                                <textarea placeholder="Remarks" [formControl]="casePrimaryForm.controls['Remarks']" [(ngModel)]="caseBook.Case.Remarks" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary" [disabled]="!casePrimaryForm.valid" (click)="onCaseSave()">Save</button>
                            </div>
                        </div>
                    </div>
                </div>


<tab title="Addresses">
            <div class="card">
                <div class="card-header">
                    Addresses
                </div>
                <div class="card-block">
                    <button type="button" class="btn btn-info">Add New</button>

                    <table class="table">
                        <thead class="thead-inverse">
                            <tr>
                                <th>Address</th>
                                <th>Area</th>
                                <th>City</th>
                                <th>State</th>
                                <th>PIN</th>
                                <th>Mobile</th>
                                <th class="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--<tr *ngFor="let case of results; let i = index">
                                <td>{{case.CaseNumber}}</td>
                                <td>{{case.FirstName}}</td>
                                <td>{{case.LastName}}</td>
                                <td>{{case.FatherName}}</td>
                                <td>{{case.Mobile}}</td>
                                <td>{{case.Area}}</td>
                                <td class="text-right">
                                    <button class="btn btn-link" (click)="viewCase(case)">Delete</button>
                                </td>
                            </tr>-->
                        </tbody>
                    </table>
                </div>
            </div>
        </tab>

        <tab title="Children">

            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Children
                        </div>
                        <div class="card-block">
                            <button type="button" class="btn btn-info">Add New</button>
                            <table class="table">
                                <thead class="thead-inverse">
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Relationship</th>
                                        <th class="text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!--<tr *ngFor="let case of results; let i = index">
                                        <td>{{case.CaseNumber}}</td>
                                        <td>{{case.FirstName}}</td>
                                        <td>{{case.LastName}}</td>
                                        <td>{{case.FatherName}}</td>
                                        <td>{{case.Mobile}}</td>
                                        <td>{{case.Area}}</td>
                                        <td class="text-right">
                                            <button class="btn btn-link" (click)="viewCase(case)">Delete</button>
                                        </td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            
        </tab>

        <tab title="Family">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Family
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Any children deceased/miscarried/aborted?</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Household income</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Have you sought help for your issues before coming to My Choices?</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">yes, specify</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, what was the outcome of that help?</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If you would like Operation Peacemaker to assist you with your current domestic violence situation, please select the services you would make use of</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If other, please specify</label>
                                <input type="text" class="form-control">
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Family (2)
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Would you like a Peacemaker to do follow up with you?</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Did the client sign the registration form?</label>
                                <select type="text" class="form-control"></select>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </tab>

        <tab title="Spouse Info">
            <div class="row">

                <div class="col">

                    <div class="card">
                        <div class="card-header">
                            Spouse
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Spouse Name</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Spouse DOB</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Spouse Home phone</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Spouse Mobile phone</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Spouse Occupation</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Spouse Education</label>
                                <select type="text" class="form-control"></select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Spouse Address
                        </div>
                        <div class="card-block">
                            <div class="form-group">
                                <label for="CenterId">Spouse's full address</label>
                                <textarea type="text" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Area</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">City</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">State</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">PIN</label>
                                <input type="text" class="form-control">
                            </div>

                        </div>

                    </div>


                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Emergency
                        </div>
                        <div class="card-block">
                            <div class="form-group">
                                <label for="CenterId">Primary Emergency Contact Name</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Relationship to client</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Phone number</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Adress</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Secondary Emergency Contact Name</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Relationship to client</label>
                                <select type="text" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Phone number</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Adress</label>
                                <input type="text" class="form-control">
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </tab>

        <tab title="Physical Health">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Health
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Are you suffering from any major illness?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, please specify:?</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Do you have any diagnosed psychiatric illness?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, please specify:?</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">How much do you sleep per night?</label>
                                <select class="form-control"></select>
                            </div>


                            <div class="form-group">
                                <label for="CenterId">How is your appetite?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Do you exercise?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Are you on any medication?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, what medication:?</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Health (1)
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Are you on any substance?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Please specify:</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Are you currently pregnant?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, give details:</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">What is the reason for seeking help?</label>
                                <select class="form-control"></select>
                            </div>


                            <div class="form-group">
                                <label for="CenterId">Who is abusing you?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If others, please specify </label>
                                <textarea type="text" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </tab>

        <tab title="Offender">
            <div class="row">

                <div class="card-block">
                    <button type="button" class="btn btn-info">Add New</button>
                    <table class="table">
                        <thead class="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Relationship</th>
                                <th class="text-right"></th>
                            </tr>
                        </thead>                        
                        <tbody>
                            <!--<tr *ngFor="let case of results; let i = index">
                                <td>{{case.CaseNumber}}</td>
                                <td>{{case.FirstName}}</td>
                                <td>{{case.LastName}}</td>
                                <td>{{case.FatherName}}</td>
                                <td>{{case.Mobile}}</td>
                                <td>{{case.Area}}</td>
                                <td class="text-right">
                                    <button class="btn btn-link" (click)="viewCase(case)">Delete</button>
                                </td>
                            </tr>-->

                        </tbody>
                    </table>


                </div>

            </div>

            
        </tab>

        <tab title="Abuse">
            <div class="row">

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Others
                        </div>

                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Do you think you are suffering from abuse?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If no, please specify</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">If yes, how do you feel about the abuse?</label>
                                <select class="form-control"></select>
                            </div>

                            <hr />

                            <div class="form-group">
                                <label for="CenterId">How do your parents feel about the abuse?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">How do your in laws feel about the abuse?</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Are there any signs of physical abuse? </label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Please specify</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Weapons used by abuser on victim</label>
                                <select class="form-control"></select>
                            </div>
                            <div class="form-group">
                                <label for="CenterId">Please specify</label>
                                <input type="text" class="form-control">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Others (2)
                        </div>
                        <div class="card-block">
                            <div class="form-group">
                                <label for="CenterId">Types of physical abuse - tick all applicable situations</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Frequency of physical abuse</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Number of years physical abuse has been occuring</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Types of emotional abuse - tick all applicable situations</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Frequency of emotional abuse</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Number of years emotional abuse has been occurring</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Types of sexual abuse - tick all applicable situations</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Frequency of sexual abuse</label>
                                <select class="form-control"></select>
                            </div>



                            <div class="form-group">
                                <label for="CenterId">Number of years sexual abuse has been occurring</label>
                                <input type="text" class="form-control">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Others (3)
                        </div>

                        <div class="card-block">
                            <div class="form-group">
                                <label for="CenterId">Types of sexual abuse - tick all applicable situations</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Frequency of economic abuse</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Number of years economic abuse has been occurring</label>
                                <input type="text" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Reasons for abuse from abuser’s side</label>
                                <select class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Case resolution log</label>
                                <textarea class="form-control"></textarea>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </tab>

        <tab title="Sessions">
            <div class="card">
                <div class="card-header">
                    Session logs
                </div>
                <div class="card-block">
                    <button type="button" class="btn btn-info">Add New</button>
                    <table class="table">
                        <thead class="thead-inverse">
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Duration</th>
                                <th>Next Session</th>
                                <th>Notes</th>
                                <th class="text-right"></th>
                                -r
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

        </tab>

        <tab title="Manage Case">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Case Data
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="CenterId">Status</label>
                                <select [formControl]="casePrimaryForm.controls['CaseStatusId']" class="form-control" placeholder="Center">
                                    <option *ngFor="let c of caseStatusesList" value={{c.Value}}>
                                        {{c.Text}}
                                    </option>
                                </select>
                                <div>
                                    <small *ngIf="casePrimaryForm.controls['CaseStatusId'].hasError('required') && casePrimaryForm.controls['CaseStatusId'].touched" class="mat-text-warn">Center is required.</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Source of case</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">If other, please specify</label>
                                <input mdInput class="form-control" />
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Type of counseling</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Total no of sessions</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Total hours spent</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Reason for selected Closure status</label>
                                <textarea mdInput placeholder="Description" class="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">

                    <div class="card">
                        <div class="card-header">
                            Other Info (1)
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="PeaceMakerId">Subject</label>
                                <input mdInput placeholder="Subject" class="form-control" />
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Description</label>
                                <textarea mdInput placeholder="Description" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="CenterId">Relationship with PM</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Client's Email</label>
                                <input mdInput placeholder="email" class="form-control" />
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Religion</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Level of education</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Vocational skills</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>


                        </div>
                    </div>

                </div>

                <div class="col">

                    <div class="card">
                        <div class="card-header">
                            Other Info (2)
                        </div>
                        <div class="card-block">

                            <div class="form-group">
                                <label for="PeaceMakerId">Occupation</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">If self-employed or employed, please specify:</label>
                                <input class="form-control" />
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Client Income</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Household members living in same house</label>
                                <select class="form-control" placeholder="Center"></select>
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">Year of marriage</label>
                                <input class="form-control" />
                            </div>

                            <div class="form-group">
                                <label for="PeaceMakerId">At what age did client have her first child?</label>
                                <input class="form-control" />
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary">Update</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </tab>
