--Roles
IF NOT EXISTS (SELECT 1 FROM Auth.dmnRole WHERE Title = 'Administrator')
BEGIN
	INSERT INTO Auth.dmnRole ([Title], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES('Administrator', 1, 0, GETDATE(), 0, GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM Auth.dmnRole WHERE Title = 'Manager')
BEGIN	
	INSERT INTO Auth.dmnRole ([Title], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES('Manager', 1, 0, GETDATE(), 0, GETDATE());

	INSERT INTO Auth.dmnRole ([Title], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES('Center Level User', 1, 0, GETDATE(), 0, GETDATE());
END

IF NOT EXISTS (SELECT 1 FROM Auth.dmnRole WHERE Title = 'Center Level User')
BEGIN		
	INSERT INTO Auth.dmnRole ([Title], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES('Center Level User', 1, 0, GETDATE(), 0, GETDATE());
END

--Users
IF NOT EXISTS (SELECT 1 FROM Auth.trUser WHERE [UserName] = 'admin')
BEGIN
	INSERT INTO Auth.trUser ([UserName], [Password] , [FirstName] , [LastName] , [DoB] , [MobileNumber] , [FailureAttempts] , [IsLocked] , [LockedDate] , [IsSuspended] ,[SuspendedDate] 
	, [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES('admin', 'GNzEwcOmCCDQttKGJTdxGg==', 'Admin', 'App', NULL, '9963644077', 0, 0, NULL, 0, NULL , 0, GETDATE(), 0, GETDATE());
END

--Map Roles And Users
DECLARE @userId INT 
DECLARE @roleId INT 

SELECT @roleId = RoleId FROM Auth.dmnRole WHERE Title = 'Administrator'
SELECT @userId = UserId FROM Auth.trUser WHERE [UserName] = 'admin'

IF NOT EXISTS (SELECT 1 FROM Auth.trMapUserRole WHERE UserId = @userId and RoleId = @roleId)
BEGIN
	INSERT INTO Auth.trMapUserRole(UserId, RoleId, [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES(@userId, @roleId , 0, GETDATE(), 0, GETDATE());
END

--Input Control Types
DECLARE @inputControlTypes TABLE
(
	[InputControlTypeId] INT NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL
);

INSERT INTO @inputControlTypes VALUES(1,'TextBox',1);
INSERT INTO @inputControlTypes VALUES(2,'DropDownList',1);
INSERT INTO @inputControlTypes VALUES(3,'Checkbox',1);
INSERT INTO @inputControlTypes VALUES(4,'RadioButton',1);
INSERT INTO @inputControlTypes VALUES(5,'FreeText',1);
INSERT INTO @inputControlTypes VALUES(6,'MultiSelect',1);
INSERT INTO @inputControlTypes VALUES(7,'DatePicker',1);
INSERT INTO @inputControlTypes VALUES(8,'AutoComplete',1);
INSERT INTO @inputControlTypes VALUES(9,'Serial',1);

MERGE [Ops].[dmnInputControlType] T
USING @inputControlTypes S ON T.InputControlTypeId = S.InputControlTypeId
WHEN MATCHED THEN UPDATE SET T.Name = S.Name, T.IsActive = S.IsActive
WHEN NOT MATCHED BY TARGET THEN INSERT VALUES (S.InputControlTypeId, S.Name, S.IsActive);

--Serial
IF NOT EXISTS (SELECT 1 FROM [Core].[trSerialNumber] WHERE SerailType='CASE')
BEGIN
	INSERT INTO [Core].[trSerialNumber](SerailType, Prefix, Suffix, StartNumber, IsActive) 
	VALUES('CASE', '$CEN$$YY$$MM$-', '', 0, 1);
END

--Case Primary Info
declare @dataSetSchema TABLE
(
	[DataSetSchemaId] [int] NOT NULL ,
	[Name] [varchar](250) NOT NULL,
	[DisplayTitle] [varchar](250) NOT NULL,
	[IsActive] [bit] NOT NULL
);

INSERT INTO @dataSetSchema VALUES(1,'CasePrimaryInfo', 'Primary Info', 1);
INSERT INTO @dataSetSchema VALUES(2,'Children', 'Children', 1);
INSERT INTO @dataSetSchema VALUES(3,'Spouse', 'Spouse', 1);
INSERT INTO @dataSetSchema VALUES(4,'PhysicalHealth', 'Physical Health', 1);
INSERT INTO @dataSetSchema VALUES(5,'Offender', 'Offender', 1);
INSERT INTO @dataSetSchema VALUES(6,'Sessions', 'Sessions', 1);
INSERT INTO @dataSetSchema VALUES(7,'CaseClosure', 'Case Closure', 1);

MERGE [Ops].[trDataSetSchema] T
USING @dataSetSchema S ON T.DataSetSchemaId = S.DataSetSchemaId
WHEN MATCHED THEN UPDATE SET T.Name = S.Name, T.[DisplayTitle] = S.[DisplayTitle]
WHEN NOT MATCHED BY TARGET THEN INSERT VALUES (S.Name, S.[DisplayTitle], S.[IsActive], 0, GETDATE(), 0, GETDATE());

--Center
IF NOT EXISTS (SELECT 1 FROM Core.dmnCenter)
BEGIN
	INSERT INTO Core.dmnCenter ([CenterId], Title, Code) VALUES(1, 'Lakdikapul', 'LKP')
	INSERT INTO Core.dmnCenter ([CenterId], Title, Code) VALUES(2, 'Falaknuma', 'FLK')
	INSERT INTO Core.dmnCenter ([CenterId], Title, Code) VALUES(3, 'Golconda', 'GOL')
	INSERT INTO Core.dmnCenter ([CenterId], Title, Code) VALUES(4, 'Secunderabad', 'SEC')
	INSERT INTO Core.dmnCenter ([CenterId], Title, Code) VALUES(5, 'Warangal', 'WGL')
END

--Case Status
IF NOT EXISTS (SELECT 1 FROM [Core].[dmnCaseStatus])
BEGIN
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(1, 'New', 1)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(2, 'Open', 2)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(3, 'Closed-Unresolved', 2)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(4, 'Referred', 3)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(5, 'Stagnant', 3)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(6, 'Duplicate', 3)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(7, 'Invalid', 3)
	INSERT INTO Core.[dmnCaseStatus] ([CaseStatusId], Title, [Level]) VALUES(8, 'Closed - Resolved', 4)
END

--Peacemaker
declare @peacemakerNames table
(
	FirstName VARCHAR(200) NULL,
	LastName VARCHAR(200) NULL,
	Center varchar(200)
);

insert into @peacemakerNames values('Nusrath', 'Jahan', 'Warangal')
insert into @peacemakerNames values('Akireddy', 'Hemalini', 'Warangal')
insert into @peacemakerNames values('Pogula', 'Shyamala', 'Warangal')
insert into @peacemakerNames values('Nazmunissa', 'Begum', 'Warangal')
insert into @peacemakerNames values('Kanchanapalli', 'Swathi', 'Warangal')
insert into @peacemakerNames values('MD', 'Parveen Banu', 'Warangal')
insert into @peacemakerNames values('Kallepu', 'Prashanti', 'Warangal')
insert into @peacemakerNames values('Yerra', 'Shanti Kiran', 'Warangal')
insert into @peacemakerNames values('Direct/Walk-In', '', 'Warangal')

insert into @peacemakerNames values('Zareena', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Anees', 'Fatima', 'Falaknuma')
insert into @peacemakerNames values('Sajida', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Akther', 'Sultana', 'Falaknuma')
insert into @peacemakerNames values('Kanees', 'Fatima', 'Falaknuma')
insert into @peacemakerNames values('Fouzia', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Shanaz', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Marepalli', 'Amrutha', 'Falaknuma')
insert into @peacemakerNames values('Shahzana', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Arshiya', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Shan', 'Begum', 'Falaknuma')
insert into @peacemakerNames values('Farruq', 'Sultana', 'Falaknuma')
insert into @peacemakerNames values('Parveen', 'Begum FLK', 'Falaknuma')
insert into @peacemakerNames values('Syeda', 'Nazima', 'Falaknuma')
insert into @peacemakerNames values('Shameem', 'Ahmed', 'Falaknuma')
insert into @peacemakerNames values('Durdana', 'Banu', 'Falaknuma')
insert into @peacemakerNames values('Direct/Walk-In', '', 'Falaknuma')

insert into @peacemakerNames values('Shahjanh', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Rayeesa', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Ruqiya', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Zahra', 'Fatima', 'Lakdikapul')
insert into @peacemakerNames values('Sara', 'Fatima', 'Lakdikapul')
insert into @peacemakerNames values('Parveen', 'Begum LKP', 'Lakdikapul')
insert into @peacemakerNames values('Nasreen', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Zareena', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Pushpa', 'Latha', 'Lakdikapul')
insert into @peacemakerNames values('Dasaratha', 'Lakshmi', 'Lakdikapul')
insert into @peacemakerNames values('Sayeda', 'Ayesha Fatima', 'Lakdikapul')
insert into @peacemakerNames values('Rizwana', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Humera', 'Ayesha', 'Lakdikapul')
insert into @peacemakerNames values('Bilqis', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Rasheeda', 'Begum', 'Lakdikapul')
insert into @peacemakerNames values('Direct/Walk-In', '', 'Lakdikapul')

insert into @peacemakerNames values('Fareeda', 'Khatoon', 'Golconda')
insert into @peacemakerNames values('Mamidolla', 'Maheshwari', 'Golconda')
insert into @peacemakerNames values('Asma', 'Sultana', 'Golconda')
insert into @peacemakerNames values('Maryam', 'Unissa', 'Golconda')
insert into @peacemakerNames values('Farzana', 'Begum', 'Golconda')
insert into @peacemakerNames values('Sana', 'Roshan', 'Golconda')
insert into @peacemakerNames values('Zehra', 'Bano', 'Golconda')
insert into @peacemakerNames values('Mukramma', 'Junaidid', 'Golconda')
insert into @peacemakerNames values('Direct/Walk-In', '', 'Golconda')

insert into @peacemakerNames values('Sreeram', 'Sridevi', 'Secunderabad')
insert into @peacemakerNames values('Shobha', 'B', 'Secunderabad')
insert into @peacemakerNames values('Pushpalatha', 'G', 'Secunderabad')
insert into @peacemakerNames values('Akula', 'Lavanya', 'Secunderabad')
insert into @peacemakerNames values('Jimkala', 'Santoshamma', 'Secunderabad')
insert into @peacemakerNames values('Parveen', 'MD', 'Secunderabad')
insert into @peacemakerNames values('Vemula', 'Bhagyalaxmi', 'Secunderabad')
insert into @peacemakerNames values('Direct/Walk-In', '', 'Secunderabad')

;WITH peaceMaker
as
(
	select PM.FirstName, PM.LastName, C.CenterId, C.Title from @peacemakerNames PM
	JOIN Core.dmnCenter C ON PM.Center = C.Title
)
merge [Ops].[trPeacemaker] T
using peaceMaker S ON T.FirstName = S.FirstName AND T.LastName = S.LastName
when not matched then 
	insert (FirstName, LastName, Email, CenterId, IsActive)
	values(S.FirstName, S.LastName, '', S.CenterId, 1);

--Counselor
declare @counselorNames table
(
	FirstName VARCHAR(200) NULL,
	LastName VARCHAR(200) NULL,
	Center varchar(200) NULL,
	IsGlobal BIT NOT NULL
);

insert into @counselorNames values('Noorjahan', 'Siddique', 'Falaknuma', 0)
insert into @counselorNames values('Tajwar', 'Lodhi', 'Lakdikapul', 0)
insert into @counselorNames values('Aparna', 'Ghose', 'Lakdikapul', 0)
insert into @counselorNames values('Kavitha', 'Krishnaraj', 'Secunderabad', 0)
insert into @counselorNames values('Madhuri', 'NNS', 'Secunderabad', 0)
insert into @counselorNames values('Reena', 'Doughabar', 'Warangal', 0)
insert into @counselorNames values('Ratna', 'Sri', 'Warangal', 0)
insert into @counselorNames values('Beena', 'Dorcas', 'Golconda', 0)
insert into @counselorNames values('Pearl', 'Choragudi', NULL, 1)

;WITH counselor
as
(
	select PM.FirstName, PM.LastName, IsGlobal, C.CenterId, C.Title from @counselorNames PM
	LEFT JOIN Core.dmnCenter C ON PM.Center = C.Title
)
merge [Ops].[trCounselor] T
using counselor S ON T.FirstName = S.FirstName AND T.LastName = S.LastName
when not matched then 
	insert (FirstName, LastName, CenterId, IsGlobal, IsActive)
	values(S.FirstName, S.LastName, S.CenterId, S.IsGlobal, 1);

--Lookup
declare @lookupDetails TABLE
(
	LookupId INT,
	Title varchar(200),
	LookupDetailId INT,
	[Value] varchar(200),
	[SortId] BIT,
	[IsAcitve] BIT
);

INSERT INTO @lookupDetails VALUES(1, 'Gender',					1, 'Male'			,	1,1)
INSERT INTO @lookupDetails VALUES(1, 'Gender',					2, 'Female'			,	2,1)
INSERT INTO @lookupDetails VALUES(1, 'Gender',					3, 'Other'			,	3,1)

INSERT INTO @lookupDetails VALUES(2, 'MaritalStatus',			4, 'Married'		,	1,1)
INSERT INTO @lookupDetails VALUES(2, 'MaritalStatus',			5, 'Unmarried'		,	2,1)
INSERT INTO @lookupDetails VALUES(2, 'MaritalStatus',			6, 'Divorced'		,	3,1)
INSERT INTO @lookupDetails VALUES(2, 'MaritalStatus',			7, 'Widowed'		,	4,1)
INSERT INTO @lookupDetails VALUES(2, 'MaritalStatus',			8, 'Separated'		,	5,1)

INSERT INTO @lookupDetails VALUES(3, 'RequiredAssistance',		9, 'Yes'			,	1,1)
INSERT INTO @lookupDetails VALUES(3, 'RequiredAssistance',		10, 'Maybe later'	,	2,1)
INSERT INTO @lookupDetails VALUES(3, 'RequiredAssistance',		11, 'No, never'		,	3,1)

INSERT INTO @lookupDetails VALUES(4, 'YesNo',					12, 'Yes'			,	1,1)
INSERT INTO @lookupDetails VALUES(4, 'YesNo',					13, 'No'			,	2,1)

INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		14, 'Neighbor'				,	1,1)
INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		15, 'Relative'				,	2,1)
INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		16, 'Friend'				,	3,1)
INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		17, 'Met in basti meeting'	,	4,1)
INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		18, 'Met at the OPM center'	,	5,1)
INSERT INTO @lookupDetails VALUES(5, 'RelationshipWithPM',		19, 'Other'					,	6,1)

INSERT INTO @lookupDetails VALUES(7, 'LevelOfEducation',		20, 'No schooling'			,	1,1)
INSERT INTO @lookupDetails VALUES(7, 'LevelOfEducation',		21, 'Primary school'		,	2,1)
INSERT INTO @lookupDetails VALUES(7, 'LevelOfEducation',		22, 'High School'			,	3,1)
INSERT INTO @lookupDetails VALUES(7, 'LevelOfEducation',		23, 'Under graduate'		,	4,1)
INSERT INTO @lookupDetails VALUES(7, 'LevelOfEducation',		24, 'Post graduate'			,	5,1)

INSERT INTO @lookupDetails VALUES(8, 'VocationalSkills',		25, 'Stitching skills'		,	1,1)
INSERT INTO @lookupDetails VALUES(8, 'VocationalSkills',		26, 'Cooking related'		,	2,1)
INSERT INTO @lookupDetails VALUES(8, 'VocationalSkills',		27, 'Office skills'			,	3,1)
INSERT INTO @lookupDetails VALUES(8, 'VocationalSkills',		28, 'Computer skills'		,	4,1)
INSERT INTO @lookupDetails VALUES(8, 'VocationalSkills',		29, 'Others (Please specify)',	5,1)

INSERT INTO @lookupDetails VALUES(9, 'Occupation',				30, 'Unemployed'		,	1,1)
INSERT INTO @lookupDetails VALUES(9, 'Occupation',				31, 'Self-employed'		,	2,1)
INSERT INTO @lookupDetails VALUES(9, 'Occupation',				32, 'Employed'			,	3,1)

INSERT INTO @lookupDetails VALUES(10, 'Income',			33, 'Below 5000'		,	1,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			34, '5,000 - 10,000'	,	2,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			35, '11,000 - 20,000'	,	3,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			36, '21,000 - 30,000'	,	4,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			37, '31,000 - 40,000'	,	5,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			38, '41,000 - 50,000'	,	6,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			39, '51,000 - 60,000'	,	7,1)
INSERT INTO @lookupDetails VALUES(10, 'Income',			40, 'Above 60,000'		,	8,1)

INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		41, 'Husband'		,	1,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		42, 'Children'		,	2,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		43, 'Mother in Law'	,	3,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		44, 'Father in Law'	,	4,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		45, 'Brother in Law',	5,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		46, 'Sister in Law'	,	6,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		47, 'Cousin brother',	7,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		48, 'Cousin sister',	8,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		49, 'Grandfather'	,	9,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		50, 'Grandmother'	,	10,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		51, 'Aunt'			,	11,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		52, 'Uncle'			,	12,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		53, 'Nieces/Nephews',	13,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		54, 'Brother'		,	14,1)
INSERT INTO @lookupDetails VALUES(11, 'HouseholdMembers',		55, 'Sister'		,	15,1)

INSERT INTO @lookupDetails VALUES(12, 'RelationshipWithAbuser',	56, 'Favourable'	,	1,1)
INSERT INTO @lookupDetails VALUES(12, 'RelationshipWithAbuser',	57, 'Strained'		,	2,1)
INSERT INTO @lookupDetails VALUES(12, 'RelationshipWithAbuser',	58, 'Estranged'		,	3,1)

INSERT INTO @lookupDetails VALUES(13, 'ChildrenDeceased'	,	59, 'Children Deceased'		,	1,1)
INSERT INTO @lookupDetails VALUES(13, 'ChildrenDeceased'	,	60, 'Children Miscarried'	,	2,1)
INSERT INTO @lookupDetails VALUES(13, 'ChildrenDeceased'	,	61, 'Children Aborted'		,	3,1)
INSERT INTO @lookupDetails VALUES(13, 'ChildrenDeceased'	,	63, 'None of the above'		,	4,1)

INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	64, 'Counselling (self)'			,	1,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	65, 'Family counselling'			,	2,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	66, 'Legal advice'					,	3,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	67, 'File application under PWDV Act 2005 to get relief'		,	4,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	68, 'Lodge police complaint'		,	5,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	69, 'Relocate to shelter or safe home',	6,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	70, 'Medical help'					,	7,1)
INSERT INTO @lookupDetails VALUES(14, 'PeacemakerAssistance',	71, 'Other'							,	8,1)

INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		72, 'Mother'		,	1,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		73, 'Father'		,	2,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		74, 'Mother in Law'	,	3,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		75, 'Father in Law'	,	4,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		76, 'Brother',	5,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		77, 'Sister'	,	6,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		78, 'Neighbour',	7,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		79, 'Friend',	8,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		80, 'Cousin'	,	9,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		81, 'Child'	,	10,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		82, 'Uncle'			,	11,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		83, 'Aunt'			,	12,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		84, 'Grand Parent',	13,1)
INSERT INTO @lookupDetails VALUES(15, 'RelationshipWithClient',		85, 'Other'		,	14,1)

INSERT INTO @lookupDetails VALUES(16, 'SleepPerNight',		86, '6-8 Hours'		,	1,1)
INSERT INTO @lookupDetails VALUES(16, 'SleepPerNight',		87, '8 Hours and above'		,	2,1)
INSERT INTO @lookupDetails VALUES(16, 'SleepPerNight',		88, 'Less than 6 hours'	,	3,1)

INSERT INTO @lookupDetails VALUES(17, 'Appetite',		89, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(17, 'Appetite',		90, 'Poor'		,	2,1)
INSERT INTO @lookupDetails VALUES(17, 'Appetite',		91, 'Over eating'	,	3,1)

INSERT INTO @lookupDetails VALUES(18, 'Exercise',		92, 'Regularly'		,	1,1)
INSERT INTO @lookupDetails VALUES(18, 'Exercise',		93, 'Occasionally'		,	2,1)
INSERT INTO @lookupDetails VALUES(18, 'Exercise',		94, 'Never'	,	3,1)

INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		99, 'Husband'		,	1,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		100, 'Sister'		,	2,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		101, 'Mother in Law'	,	3,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		102, 'Father in Law'	,	4,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		103, 'Stepmother',	5,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		104, 'Stepfather'	,	6,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		105, 'Mother',	7,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		106, 'Father',	8,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		107, 'Brother-in-law'	,	9,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		108, 'Sister-in-law'	,	10,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		109, 'Son'			,	11,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		110, 'Son-in-law'			,	12,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		98, 'Daughter',	13,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		111, 'Brother'		,	14,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		112, 'Maternal Uncle'		,	15,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		113, 'Paternal Uncle'		,	16,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		114, 'Guardian'		,	17,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		115, 'Neighbor'	,	18,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		116, 'Grandmother'	,	19,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		117, 'Grandfather',	20,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		118, 'Wife'	,	21,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		119, 'Daughter-in-law',	22,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		120, 'Other wife',	23,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		121, 'Boyfriend'	,	24,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		122, 'Step-sister'	,	25,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		123, 'Step-brother'			,	26,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		124, 'Girlfriend'			,	27,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		125, 'Partner',	28,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		126, 'Cousin brother'		,	29,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		127, 'Cousin sister'		,	30,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		128, 'Boss'		,	31,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		129, 'Colleague'		,	32,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		130, 'Paternal Aunt'	,	33,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		131, 'Maternal Aunt'	,	34,1)
INSERT INTO @lookupDetails VALUES(21, 'AbusingPerson',		132, 'Others - please specify',	35,1)

INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		133, 'I don’t care'		,	1,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		134, 'It’s my fault'		,	2,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		135, 'It’s his right'	,	3,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		136, 'Everyone does it'	,	4,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		137, 'It’s wrong',	5,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		138, 'I’m afraid'	,	6,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		139, 'I don’t know what to do',	7,1)
INSERT INTO @lookupDetails VALUES(22, 'AbusingFeel',		140, 'I would like to get help',	8,1)

INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		141, 'Don’t care'		,	1,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		142, 'Think It’s my fault'		,	2,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		143, 'Think It’s his right'	,	3,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		144, 'They say everyone does it'	,	4,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		145, 'Think it’s wrong',	5,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		146, 'Don’t know what to do'	,	6,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		147, 'They would like to get help for me',	7,1)
INSERT INTO @lookupDetails VALUES(23, 'AbusingParentsFeel',		148, 'They don’t know about it',	8,1)

INSERT INTO @lookupDetails VALUES(24, 'AbusingWeapons',		149, 'None'		,	1,1)
INSERT INTO @lookupDetails VALUES(24, 'AbusingWeapons',		150, 'Knife'		,	2,1)
INSERT INTO @lookupDetails VALUES(24, 'AbusingWeapons',		151, 'Gun'	,	3,1)
INSERT INTO @lookupDetails VALUES(24, 'AbusingWeapons',		152, 'Heavy objects'	,	4,1)
INSERT INTO @lookupDetails VALUES(24, 'AbusingWeapons',		153, 'Sharp objects',	5,1)

INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		154, 'Bruising and pinching, slapping, beating'		,	1,1)
INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		155, 'Kicking and pushing'		,	2,1)
INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		156, 'Starvation'	,	3,1)
INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		157, 'Restrained/locked in a room'	,	4,1)
INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		158, 'Other',	5,1)
INSERT INTO @lookupDetails VALUES(46, 'TypesOfPhysicalAbuse',		159, 'None',	6,1)

INSERT INTO @lookupDetails VALUES(25, 'FrequencyOfAbuse',		160, 'Daily'		,	1,1)
INSERT INTO @lookupDetails VALUES(25, 'FrequencyOfAbuse',		161, 'Weekly '		,	2,1)
INSERT INTO @lookupDetails VALUES(25, 'FrequencyOfAbuse',		162, 'Monthly'	,	3,1)
INSERT INTO @lookupDetails VALUES(25, 'FrequencyOfAbuse',		163, 'Situational'	,	4,1)
INSERT INTO @lookupDetails VALUES(25, 'FrequencyOfAbuse',		164, 'Never',	5,1)

INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		165, 'Threatens to commit suicide if you leave'		,	1,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		166, 'Over possesive'		,	2,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		167, 'Controlling'	,	3,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		168, 'Uses your religious beliefs to manipulate you'	,	4,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		169, 'Insults/puts you down constantly',	5,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		170, 'Isolation from own family/friends'		,	6,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		171, 'Falsely accuses you of having an affair'		,	7,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		172, 'Keeps a tab on your time'	,	8,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		173, 'Appreciation is absent or little, followed by an insult'	,	9,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		174, 'None',	10,1)
INSERT INTO @lookupDetails VALUES(26, 'TypesOfEmotionalAbuse',		97, 'Other',	11,1)

INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		175, 'Forced to have sex with abuser'		,	1,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		176, 'Forced to do sexual favors for abuser'		,	2,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		177, 'Forced to watch pornography'	,	3,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		178, 'Forced to have sex or perform sexual favors for others'	,	4,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		179, 'Abuser sexually abusing the victim’s children',	5,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		180, 'Avoiding/not interested in intimate relationship'		,	6,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		181, 'None'		,	7,1)
INSERT INTO @lookupDetails VALUES(27, 'TypesOfSexualAbuse',		182, 'Other'	,	8,1)

INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		183, 'Dowry harassment'		,	1,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		184, 'Stealing your money & valuables'		,	2,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		185, 'Not supporting living expenses'	,	3,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		186, 'Not supporting basic needs'	,	4,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		187, 'Not providing medical aid',	5,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		188, 'Withholding your own salary'		,	6,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		189, 'None'		,	7,1)
INSERT INTO @lookupDetails VALUES(28, 'TypesOfEconomicalAbuse',		190, 'Other'	,	8,1)

INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		191, 'Alcohol/Substance abuse'		,	1,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		192, 'Financial issues/pressures'		,	2,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		193, 'Having a girl child'	,	3,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		194, 'Doubting victim’s character'	,	4,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		195, 'Not doing household chores to abuser’s satisfaction',	5,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		196, 'Work related stress'		,	6,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		197, 'Making visits or phone calls without his permission'		,	7,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		198, 'Not obeying the in-laws or not serving them well enough'	,	8,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		199, 'None'	,	9,1)
INSERT INTO @lookupDetails VALUES(29, 'ReasonForAbuse',		200, 'Other'	,	10,1)

INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		201, 'Meticulous'		,	1,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		202, 'Appropriate'		,	2,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		203, 'Neat'	,	3,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		204, 'Dishevelled'	,	4,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		205, 'Eccentric',	5,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		206, 'Seductive'		,	6,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		207, 'Casual'		,	7,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		208, 'Overly dressed'	,	8,1)
INSERT INTO @lookupDetails VALUES(30, 'MentalDress',		209, 'Careless'	,	9,1)

INSERT INTO @lookupDetails VALUES(31, 'MentalHygiene',		210, 'Good'		,	1,1)
INSERT INTO @lookupDetails VALUES(31, 'MentalHygiene',		211, 'Fair'		,	2,1)
INSERT INTO @lookupDetails VALUES(31, 'MentalHygiene',		212, 'Poor'	,	3,1)
INSERT INTO @lookupDetails VALUES(31, 'MentalHygiene',		213, 'Neglected'	,	4,1)

INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		214, 'Average (Normal/Good)'		,	1,1)
INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		215, 'Slight built'		,	2,1)
INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		216, 'Heavy built'	,	3,1)
INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		217, 'Over weight'	,	4,1)
INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		218, 'Obese'	,	5,1)
INSERT INTO @lookupDetails VALUES(32, 'MentalBodyType',		219, 'Under weight'	,	6,1)

INSERT INTO @lookupDetails VALUES(33, 'MentalExpression',		220, 'Appropriate'		,	1,1)
INSERT INTO @lookupDetails VALUES(33, 'MentalExpression',		221, 'Sad'		,	2,1)
INSERT INTO @lookupDetails VALUES(33, 'MentalExpression',		222, 'Angry'	,	3,1)
INSERT INTO @lookupDetails VALUES(33, 'MentalExpression',		223, 'Hostile'	,	4,1)
INSERT INTO @lookupDetails VALUES(33, 'MentalExpression',		224, 'Warmed'	,	5,1)

INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		225, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		226, 'Restless'		,	2,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		227, 'Agitated'	,	3,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		228, 'Slow movements'	,	4,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		229, 'Tics'	,	5,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		230, 'Tremors'		,	6,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		231, 'Demur'	,	7,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		232, 'Repetitive tics'	,	8,1)
INSERT INTO @lookupDetails VALUES(34, 'MentalMotorActivity',		233, 'Unusual gait'	,	9,1)

INSERT INTO @lookupDetails VALUES(35, 'MentalVocabulary',		234, 'Above average'		,	1,1)
INSERT INTO @lookupDetails VALUES(35, 'MentalVocabulary',		235, 'Adequate'		,	2,1)
INSERT INTO @lookupDetails VALUES(35, 'MentalVocabulary',		236, 'Fair'	,	3,1)
INSERT INTO @lookupDetails VALUES(35, 'MentalVocabulary',		237, 'Poor'	,	4,1)

INSERT INTO @lookupDetails VALUES(36, 'MentalImpulseControl',		238, 'Good'		,	1,1)
INSERT INTO @lookupDetails VALUES(36, 'MentalImpulseControl',		239, 'Fair'		,	2,1)
INSERT INTO @lookupDetails VALUES(36, 'MentalImpulseControl',		240, 'Poor'	,	3,1)
INSERT INTO @lookupDetails VALUES(36, 'MentalImpulseControl',		241, 'Rigid'	,	4,1)

INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		242, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		243, 'Pressured'		,	2,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		244, 'Excessive'	,	3,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		245, 'Reduced'	,	4,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		246, 'Soft',	5,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		247, 'Loud'		,	6,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		248, 'Mute'		,	7,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		249, 'Slurred'	,	8,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		250, 'Stuttering'	,	9,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		251, 'Monosyllable'	,	10,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		252, 'Monotonous'		,	11,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		253, 'Rapid'		,	12,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		254, 'Hesitant'	,	13,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		255, 'Mumbled'	,	14,1)
INSERT INTO @lookupDetails VALUES(37, 'MentalSpeech',		256, 'Other'	,	15,1)

INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		257, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		258, 'Angry'		,	2,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		259, 'Irritable'	,	3,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		260, 'Impulsive'	,	4,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		261, 'Hostile',	5,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		262, 'Silly'		,	6,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		263, 'Sensitive'		,	7,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		264, 'Apathetic'	,	8,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		265, 'Withdrawn'	,	9,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		266, 'Evasive'	,	10,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		267, 'Passive'		,	11,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		268, 'Naive'		,	12,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		269, 'Aggressive'	,	13,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		270, 'Avoids gaze'	,	14,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		271, 'Anxious'	,	15,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		272, 'Bizarre'	,	16,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		273, 'Cooperative'	,	17,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		274, 'Uncooperative'		,	18,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		275, 'Demanding'		,	19,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		276, 'Negativistic'	,	20,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		277, 'Callous'	,	21,1)
INSERT INTO @lookupDetails VALUES(38, 'MentalBehaviour',		278, 'Eager'	,	22,1)

INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		279, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		280, 'Suicidal - wish'		,	2,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		281, 'Suicidal - plan'	,	3,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		282, 'Suicidal - lethality'	,	4,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		283, 'Homicidal - wish',	5,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		284, 'Homicidal - plan'		,	6,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		285, 'Homicidal - lethality'		,	7,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		286, 'Assaultive thought'	,	8,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		287, 'Antisocial thought'	,	9,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		288, 'Suspiciousness'	,	10,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		289, 'Poverty of content'		,	11,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		290, 'Phobias'		,	12,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		291, 'Obsessions'	,	13,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		292, 'Compulsions'	,	14,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		293, 'Feelings of unreality'	,	15,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		294, 'Feelings of persecution'	,	16,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		295, 'Thoughts of running away'	,	17,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		296, 'Somatic complaints'		,	18,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		297, 'Ideas of guilt'		,	19,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		298, 'Feeling hopeless'	,	20,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		299, 'Feeling worthless'	,	21,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		301, 'Confused'	,	22,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		302, 'Feeling frightened'		,	23,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		303, 'Excessive religiosity'		,	24,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		304, 'Sexual preoccupation'	,	25,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		305, 'Blames others'	,	26,1)
INSERT INTO @lookupDetails VALUES(39, 'MentalContent',		306, 'Others'	,	27,1)

INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		307, 'Logical and coherent'		,	1,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		308, 'Blocking'		,	2,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		309, 'Circumstantial'	,	3,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		310, 'Tangential'	,	4,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		311, 'Flight of ideas',	5,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		312, 'Loose associations'		,	6,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		313, 'Indecisive'		,	7,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		314, 'Incoherent'	,	8,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		315, 'Distracted'	,	9,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		316, 'Delusion'	,	10,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		317, 'Hallucination'		,	11,1)
INSERT INTO @lookupDetails VALUES(40, 'MentalFlowOfThought',		318, 'Other'		,	12,1)

INSERT INTO @lookupDetails VALUES(41, 'MentalOrientation',		319, 'Oriented x 3'		,	1,1)
INSERT INTO @lookupDetails VALUES(41, 'MentalOrientation',		320, 'Not oriented to time'		,	2,1)
INSERT INTO @lookupDetails VALUES(41, 'MentalOrientation',		321, 'Not oriented to place'	,	3,1)
INSERT INTO @lookupDetails VALUES(41, 'MentalOrientation',		322, 'Not oriented to person'	,	4,1)

INSERT INTO @lookupDetails VALUES(42, 'MentalEstimatedIntellect',		323, 'Average'		,	1,1)
INSERT INTO @lookupDetails VALUES(42, 'MentalEstimatedIntellect',		324, 'Above average'		,	2,1)
INSERT INTO @lookupDetails VALUES(42, 'MentalEstimatedIntellect',		325, 'Below average'	,	3,1)

INSERT INTO @lookupDetails VALUES(43, 'MentalAttention',		326, 'Normal'		,	1,1)
INSERT INTO @lookupDetails VALUES(43, 'MentalAttention',		327, 'Moderately impaired'		,	2,1)
INSERT INTO @lookupDetails VALUES(43, 'MentalAttention',		328, 'Mildly impaired'	,	3,1)
INSERT INTO @lookupDetails VALUES(43, 'MentalAttention',		96, 'Severely impaired'	,	4,1)

INSERT INTO @lookupDetails VALUES(51, 'MentalInsight',		501, 'Good'		,	1,1)
INSERT INTO @lookupDetails VALUES(51, 'MentalInsight',		502, 'Fair'		,	2,1)
INSERT INTO @lookupDetails VALUES(51, 'MentalInsight',		503, 'Limited'	,	3,1)
INSERT INTO @lookupDetails VALUES(51, 'MentalInsight',		504, 'Unmotivated'	,	4,1)

INSERT INTO @lookupDetails VALUES(52, 'MentalJudgement',		505, 'Good'		,	1,1)
INSERT INTO @lookupDetails VALUES(52, 'MentalJudgement',		506, 'Fair'		,	2,1)
INSERT INTO @lookupDetails VALUES(52, 'MentalJudgement',		507, 'Impaired'	,	3,1)

INSERT INTO @lookupDetails VALUES(53, 'MentalMemory',		508, 'Intact'		,	1,1)
INSERT INTO @lookupDetails VALUES(53, 'MentalMemory',		509, 'Poor remote memory'		,	2,1)
INSERT INTO @lookupDetails VALUES(53, 'MentalMemory',		510, 'Poor recent memory'	,	3,1)
INSERT INTO @lookupDetails VALUES(53, 'MentalMemory',		511, 'Poor immediate recovery'	,	4,1)

INSERT INTO @lookupDetails VALUES(54, 'MentalInformation',		512, 'Paucity of knowledge'		,	1,1)
INSERT INTO @lookupDetails VALUES(54, 'MentalInformation',		513, 'Adequate knowledge'		,	2,1)
INSERT INTO @lookupDetails VALUES(54, 'MentalInformation',		514, 'Very knowledgeable'	,	3,1)

INSERT INTO @lookupDetails VALUES(55, 'MentalAbstraction',		515, 'Average'		,	1,1)
INSERT INTO @lookupDetails VALUES(55, 'MentalAbstraction',		516, 'Poor'		,	2,1)

INSERT INTO @lookupDetails VALUES(56, 'RespectedDuringYourVisit',		517, 'Yes, very respected'		,	1,1)
INSERT INTO @lookupDetails VALUES(56, 'RespectedDuringYourVisit',		518, 'Somewhat respected'		,	2,1)
INSERT INTO @lookupDetails VALUES(56, 'RespectedDuringYourVisit',		519, 'Not very respected'		,	3,1)
INSERT INTO @lookupDetails VALUES(56, 'RespectedDuringYourVisit',		520, 'Not at all respected'		,	4,1)

INSERT INTO @lookupDetails VALUES(57, 'FeelThatCounselling',		521, 'Helped a lot'		,	1,1)
INSERT INTO @lookupDetails VALUES(57, 'FeelThatCounselling',		522, 'Helpful'		,	2,1)
INSERT INTO @lookupDetails VALUES(57, 'FeelThatCounselling',		523, 'To some extent'		,	3,1)
INSERT INTO @lookupDetails VALUES(57, 'FeelThatCounselling',		524, 'Not at all helpful'		,	4,1)

INSERT INTO @lookupDetails VALUES(58, 'AssistanceOfPeacemaker',		525, 'Helped a lot'		,	1,1)
INSERT INTO @lookupDetails VALUES(58, 'AssistanceOfPeacemaker',		526, 'Helpful'		,	2,1)
INSERT INTO @lookupDetails VALUES(58, 'AssistanceOfPeacemaker',		527, 'To some extent'		,	3,1)
INSERT INTO @lookupDetails VALUES(58, 'AssistanceOfPeacemaker',		528, 'Not at all helpful'		,	4,1)

INSERT INTO @lookupDetails VALUES(59, 'RecommendFreeCounselling',		529, 'Yes definitely'		,	1,1)
INSERT INTO @lookupDetails VALUES(59, 'RecommendFreeCounselling',		530, 'Yes, depending on the situation'		,	2,1)
INSERT INTO @lookupDetails VALUES(59, 'RecommendFreeCounselling',		531, 'Maybe'		,	3,1)
INSERT INTO @lookupDetails VALUES(59, 'RecommendFreeCounselling',		532, 'No'		,	4,1)

INSERT INTO @lookupDetails VALUES(60, 'AbleToImprove',		533, 'Yes, able to improve it a lot'		,	1,1)
INSERT INTO @lookupDetails VALUES(60, 'AbleToImprove',		534, 'Able to improve some aspects, not all'		,	2,1)
INSERT INTO @lookupDetails VALUES(60, 'AbleToImprove',		535, 'Only able to improve a little'		,	3,1)
INSERT INTO @lookupDetails VALUES(60, 'AbleToImprove',		536, 'Not able to improve at all'		,	4,1)

INSERT INTO @lookupDetails VALUES(61, 'Outcome',		537, 'Maintenance granted'		,	1,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		538, 'Residence order granted'		,	2,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		539, 'Compensation granted'		,	3,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		540, 'Protection order granted'		,	4,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		541, 'Divorce granted'		,	5,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		542, 'Legal efforts unsuccessful'		,	6,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		543, 'Case went to appeal'		,	7,1)
INSERT INTO @lookupDetails VALUES(61, 'Outcome',		544, 'Settlement outside of court'		,	8,1)

INSERT INTO @lookupDetails VALUES(62, 'Documents',		545, 'Residence Proof'		,	1,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		546, 'Bank statements'		,	2,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		547, 'Additional proofs'		,	3,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		548, 'Marriage certificate'		,	4,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		549, 'Nikahnama'		,	5,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		550, 'Marriage photographs and CD.'		,	6,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		551, 'Marriage invitation card'		,	7,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		553, 'Passport size photograph'		,	8,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		554, 'Rental Agreement Original electricity bill'		,	9,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		555, 'Aadhar Card'		,	10,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		556, 'PAN Card'		,	11,1)
INSERT INTO @lookupDetails VALUES(62, 'Documents',		557, 'Passport'		,	12,1)


INSERT INTO @lookupDetails VALUES(44, 'TypesOfCounselling',		329, 'Individual'		,	1,1)
INSERT INTO @lookupDetails VALUES(44, 'TypesOfCounselling',		330, 'Family'		,	2,1)
INSERT INTO @lookupDetails VALUES(44, 'TypesOfCounselling',		331, 'Couple (Husband-Wife)'	,	3,1)

INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		332, 'Peacemaker'		,	1,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		333, 'Direct/Walk-in'		,	2,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		334, 'Police Station'	,	3,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		335, 'Bharosa'	,	4,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		336, 'OPM Client referral'	,	5,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		337, 'Zariya'	,	6,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		338, 'SMS keyword'	,	7,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		339, 'Email/Internet/Website'	,	8,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		340, 'Awareness campaign'	,	9,1)
INSERT INTO @lookupDetails VALUES(45, 'SourceOfCase',		341, 'Other'	,	10,1)

INSERT INTO @lookupDetails VALUES(6, 'Religion',				342, 'Other (Default)'		,	1,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				343, 'Muslim'				,	2,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				344, 'Christian'				,	3,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				345, 'Hindu'					,	4,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				346, 'Jain'					,	5,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				347, 'Buddhist'				,	6,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				348, 'Atheist'				,	7,1)
INSERT INTO @lookupDetails VALUES(6, 'Religion',				349, 'Agnostic'				,	8,1)
--INSERT INTO @lookupDetails VALUES(6, 'Religion',				350, 'Atheist'				,	9,1)

INSERT INTO @lookupDetails VALUES(19, 'Substance',		351, 'Drugs'		,	1,1)
INSERT INTO @lookupDetails VALUES(19, 'Substance',		352, 'Alchohol'		,	2,1)
INSERT INTO @lookupDetails VALUES(19, 'Substance',		353, 'Nicotine'	,	3,1)
INSERT INTO @lookupDetails VALUES(19, 'Substance',		354, 'None'	,	4,1)

INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		355, 'Concerned for safety of self'		,	1,1)
INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		356, 'Concerned for safety of children'		,	2,1)
INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		357, 'Suicidal thoughts'	,	3,1)
INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		358, 'Desire for a peaceful life'	,	4,1)
INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		359, 'Need to talk to someone'	,	5,1)
INSERT INTO @lookupDetails VALUES(20, 'ReasonForSeekingHelp',		360, 'Other'	,	6,1)

;merge Core.dmnLookup T
using (select distinct LookupId, Title from @lookupDetails) as S ON T.LookupId = S.LookupId
when Matched then 
	update set T.Title = S.Title
when not matched then
	insert (LookupId, Title, IsActive, IsReadOnly, CreatedBy, CreatedDateTime, ModifiedBy, ModifiedDatetime)
	values(LookupId, Title, 1, 1, 0, Getdate(), 1, getdate());

;merge Core.dmnLookupDetail T
using @lookupDetails as S ON T.LookupId = S.LookupId AND T.Value = S.Value
when not matched then
	insert (LookupDetailId, LookupId, Value, SortId, IsAcitve)
	values(LookupDetailId, LookupId, Value, SortId, IsAcitve);

--State														  
IF NOT EXISTS (SELECT 1 FROM [Core].[dmnState])				  
BEGIN		
	INSERT INTO [Core].[dmnState] VALUES( 1, 'Telangana');
	INSERT INTO [Core].[dmnState] VALUES( 2, 'Andhra Pradesh');
	INSERT INTO [Core].[dmnState] VALUES( 3, 'Andaman & Nicobar Islands');
	INSERT INTO [Core].[dmnState] VALUES( 4, 'Arunachal Pradesh');
	INSERT INTO [Core].[dmnState] VALUES( 5, 'Assam');
	INSERT INTO [Core].[dmnState] VALUES( 6, 'Bihar');
	INSERT INTO [Core].[dmnState] VALUES( 7, 'Chandigarh');
	INSERT INTO [Core].[dmnState] VALUES( 8, 'Chhattisgarh');
	INSERT INTO [Core].[dmnState] VALUES( 9, 'Dadra & Nagar Haveli');
	INSERT INTO [Core].[dmnState] VALUES(10, 'Daman & Diu');
	INSERT INTO [Core].[dmnState] VALUES(11, 'Goa');
	INSERT INTO [Core].[dmnState] VALUES(12, 'Gujarat');
	INSERT INTO [Core].[dmnState] VALUES(13, 'Haryana');
	INSERT INTO [Core].[dmnState] VALUES(14, 'Himachal Pradesh');
	INSERT INTO [Core].[dmnState] VALUES(15, 'Jammu & Kashmir');
	INSERT INTO [Core].[dmnState] VALUES(16, 'Jharkhand');
	INSERT INTO [Core].[dmnState] VALUES(17, 'Karnataka');
	INSERT INTO [Core].[dmnState] VALUES(18, 'Kerala');
	INSERT INTO [Core].[dmnState] VALUES(19, 'Lakshadweep');
	INSERT INTO [Core].[dmnState] VALUES(20, 'Madhya Pradesh');
	INSERT INTO [Core].[dmnState] VALUES(21, 'Maharashtra');
	INSERT INTO [Core].[dmnState] VALUES(22, 'Manipur');
	INSERT INTO [Core].[dmnState] VALUES(23, 'Meghalaya');
	INSERT INTO [Core].[dmnState] VALUES(24, 'Mizoram');
	INSERT INTO [Core].[dmnState] VALUES(25, 'Nagaland');
	INSERT INTO [Core].[dmnState] VALUES(26, 'Nct Of Delhi');
	INSERT INTO [Core].[dmnState] VALUES(27, 'Odisha');
	INSERT INTO [Core].[dmnState] VALUES(28, 'Puducherry');
	INSERT INTO [Core].[dmnState] VALUES(29, 'Punjab');
	INSERT INTO [Core].[dmnState] VALUES(30, 'Rajasthan');
	INSERT INTO [Core].[dmnState] VALUES(31, 'Sikkim');
	INSERT INTO [Core].[dmnState] VALUES(32, 'Tamil Nadu');
	INSERT INTO [Core].[dmnState] VALUES(33, 'Tripura');
	INSERT INTO [Core].[dmnState] VALUES(34, 'Uttar Pradesh');
	INSERT INTO [Core].[dmnState] VALUES(35, 'Uttarakhand');
	INSERT INTO [Core].[dmnState] VALUES(36, 'West Bengal');
										  
END										  
										  
--City
IF NOT EXISTS (SELECT 1 FROM [Core].[dmnCity])
BEGIN		
	INSERT INTO [Core].[dmnCity] VALUES(1, 'Hyderabad', 1);	
	INSERT INTO [Core].[dmnCity] VALUES(2, 'Secunderabad', 1);	
	INSERT INTO [Core].[dmnCity] VALUES(3, 'Warangal', 1);	
	INSERT INTO [Core].[dmnCity] VALUES(4 , 'Adilabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(5 , 'Asifabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(6 , 'Bhadradri', 1);
	INSERT INTO [Core].[dmnCity] VALUES(7 , 'Bhongir', 1);
	INSERT INTO [Core].[dmnCity] VALUES(8 , 'Bhupalpalle', 1);
	INSERT INTO [Core].[dmnCity] VALUES(9 , 'Gadwal', 1);
	INSERT INTO [Core].[dmnCity] VALUES(10 , 'Jagtial', 1);
	INSERT INTO [Core].[dmnCity] VALUES(11 , 'Jangaon', 1);
	INSERT INTO [Core].[dmnCity] VALUES(12 , 'Jayashankar', 1);
	INSERT INTO [Core].[dmnCity] VALUES(13 , 'Jogulamba', 1);
	INSERT INTO [Core].[dmnCity] VALUES(14 , 'Kamareddy', 1);
	INSERT INTO [Core].[dmnCity] VALUES(15 , 'Karimnagar', 1);
	INSERT INTO [Core].[dmnCity] VALUES(16 , 'Khammam', 1);
	INSERT INTO [Core].[dmnCity] VALUES(17 , 'Komaram Bheem', 1);
	INSERT INTO [Core].[dmnCity] VALUES(18 , 'Kothagudem', 1);
	INSERT INTO [Core].[dmnCity] VALUES(19 , 'Mahabubabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(20 , 'Mahabubnagar', 1);
	INSERT INTO [Core].[dmnCity] VALUES(21 , 'Mancherial', 1);
	INSERT INTO [Core].[dmnCity] VALUES(22 , 'Medak', 1);
	INSERT INTO [Core].[dmnCity] VALUES(23 , 'Medchal', 1);
	INSERT INTO [Core].[dmnCity] VALUES(24 , 'Nagarkurnool', 1);
	INSERT INTO [Core].[dmnCity] VALUES(25 , 'Nalgonda', 1);
	INSERT INTO [Core].[dmnCity] VALUES(26 , 'Nirmal', 1);
	INSERT INTO [Core].[dmnCity] VALUES(27 , 'Nizamabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(28 , 'Peddapalli', 1);
	INSERT INTO [Core].[dmnCity] VALUES(29 , 'Rajanna Sircilla', 1);
	INSERT INTO [Core].[dmnCity] VALUES(30 , 'Ranga Reddy', 1);
	INSERT INTO [Core].[dmnCity] VALUES(31 , 'Sangareddi', 1);
	INSERT INTO [Core].[dmnCity] VALUES(32 , 'Sangareddy', 1);
	INSERT INTO [Core].[dmnCity] VALUES(33 , 'Shamshabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(34 , 'Siddipet', 1);
	INSERT INTO [Core].[dmnCity] VALUES(35 , 'Sircilla', 1);
	INSERT INTO [Core].[dmnCity] VALUES(36 , 'Suryapet', 1);
	INSERT INTO [Core].[dmnCity] VALUES(37 , 'Vikarabad', 1);
	INSERT INTO [Core].[dmnCity] VALUES(38 , 'Wanaparthy', 1);
	INSERT INTO [Core].[dmnCity] VALUES(39 , 'Warangal Rural', 1);
	INSERT INTO [Core].[dmnCity] VALUES(40 , 'Warangal Urban', 1);
	INSERT INTO [Core].[dmnCity] VALUES(41 , 'Yadadri Bhuvanagiri', 1);

	INSERT INTO [Core].[dmnCity] VALUES(41 , 'Anantapur', 2);
	INSERT INTO [Core].[dmnCity] VALUES(42 , 'Chittoor', 2);
	INSERT INTO [Core].[dmnCity] VALUES(43 , 'East Godavari', 2);
	INSERT INTO [Core].[dmnCity] VALUES(44 , 'Guntur', 2);
	INSERT INTO [Core].[dmnCity] VALUES(45 , 'Krishna', 2);
	INSERT INTO [Core].[dmnCity] VALUES(46 , 'Kurnool', 2);
	INSERT INTO [Core].[dmnCity] VALUES(47 , 'Prakasam', 2);
	INSERT INTO [Core].[dmnCity] VALUES(48 , 'Sri Potti Sriramulu Nellore', 2);
	INSERT INTO [Core].[dmnCity] VALUES(49 , 'Srikakulam', 2);
	INSERT INTO [Core].[dmnCity] VALUES(50 , 'Visakhapatnam', 2);
	INSERT INTO [Core].[dmnCity] VALUES(51 , 'Vizianagaram', 2);
	INSERT INTO [Core].[dmnCity] VALUES(52 , 'West Godavari', 2);
	INSERT INTO [Core].[dmnCity] VALUES(53 , 'Y.s.r.', 2);
	INSERT INTO [Core].[dmnCity] VALUES(54 , 'Nicobars', 3);
	INSERT INTO [Core].[dmnCity] VALUES(55 , 'North  & Middle Andaman', 3);
	INSERT INTO [Core].[dmnCity] VALUES(56 , 'South Andaman', 3);
	INSERT INTO [Core].[dmnCity] VALUES(57 , 'Anjaw', 4);
	INSERT INTO [Core].[dmnCity] VALUES(58 , 'Changlang', 4);
	INSERT INTO [Core].[dmnCity] VALUES(59 , 'Dibang Valley', 4);
	INSERT INTO [Core].[dmnCity] VALUES(60 , 'East Kameng', 4);
	INSERT INTO [Core].[dmnCity] VALUES(61 , 'East Siang', 4);
	INSERT INTO [Core].[dmnCity] VALUES(62 , 'Kurung Kumey', 4);
	INSERT INTO [Core].[dmnCity] VALUES(63 , 'Lohit', 4);
	INSERT INTO [Core].[dmnCity] VALUES(64 , 'Lower Dibang Valley', 4);
	INSERT INTO [Core].[dmnCity] VALUES(65 , 'Lower Subansiri', 4);
	INSERT INTO [Core].[dmnCity] VALUES(66 , 'Papum Pare', 4);
	INSERT INTO [Core].[dmnCity] VALUES(67 , 'Tawang', 4);
	INSERT INTO [Core].[dmnCity] VALUES(68 , 'Tirap', 4);
	INSERT INTO [Core].[dmnCity] VALUES(69 , 'Upper Siang', 4);
	INSERT INTO [Core].[dmnCity] VALUES(70 , 'Upper Subansiri', 4);
	INSERT INTO [Core].[dmnCity] VALUES(71 , 'West Kameng', 4);
	INSERT INTO [Core].[dmnCity] VALUES(72 , 'West Siang', 4);
	INSERT INTO [Core].[dmnCity] VALUES(73 , 'Baksa', 5);
	INSERT INTO [Core].[dmnCity] VALUES(74 , 'Barpeta', 5);
	INSERT INTO [Core].[dmnCity] VALUES(75 , 'Bongaigaon', 5);
	INSERT INTO [Core].[dmnCity] VALUES(76 , 'Cachar', 5);
	INSERT INTO [Core].[dmnCity] VALUES(77 , 'Chirang', 5);
	INSERT INTO [Core].[dmnCity] VALUES(78 , 'Darrang', 5);
	INSERT INTO [Core].[dmnCity] VALUES(79 , 'Dhemaji', 5);
	INSERT INTO [Core].[dmnCity] VALUES(80 , 'Dhubri', 5);
	INSERT INTO [Core].[dmnCity] VALUES(81 , 'Dibrugarh', 5);
	INSERT INTO [Core].[dmnCity] VALUES(82 , 'Dima Hasao', 5);
	INSERT INTO [Core].[dmnCity] VALUES(83 , 'Goalpara', 5);
	INSERT INTO [Core].[dmnCity] VALUES(84 , 'Golaghat', 5);
	INSERT INTO [Core].[dmnCity] VALUES(85 , 'Hailakandi', 5);
	INSERT INTO [Core].[dmnCity] VALUES(86 , 'Jorhat', 5);
	INSERT INTO [Core].[dmnCity] VALUES(87 , 'Kamrup', 5);
	INSERT INTO [Core].[dmnCity] VALUES(88 , 'Kamrup Metropolitan', 5);
	INSERT INTO [Core].[dmnCity] VALUES(89 , 'Karbi Anglong', 5);
	INSERT INTO [Core].[dmnCity] VALUES(90 , 'Karimganj', 5);
	INSERT INTO [Core].[dmnCity] VALUES(91 , 'Kokrajhar', 5);
	INSERT INTO [Core].[dmnCity] VALUES(92 , 'Lakhimpur', 5);
	INSERT INTO [Core].[dmnCity] VALUES(93 , 'Morigaon', 5);
	INSERT INTO [Core].[dmnCity] VALUES(94 , 'Nagaon', 5);
	INSERT INTO [Core].[dmnCity] VALUES(95 , 'Nalbari', 5);
	INSERT INTO [Core].[dmnCity] VALUES(96 , 'Sivasagar', 5);
	INSERT INTO [Core].[dmnCity] VALUES(97 , 'Sonitpur', 5);
	INSERT INTO [Core].[dmnCity] VALUES(98 , 'Tinsukia', 5);
	INSERT INTO [Core].[dmnCity] VALUES(99 , 'Udalguri', 5);
	INSERT INTO [Core].[dmnCity] VALUES(100 , 'Araria', 6);
	INSERT INTO [Core].[dmnCity] VALUES(101 , 'Arwal', 6);
	INSERT INTO [Core].[dmnCity] VALUES(102 , 'Aurangabad', 6);
	INSERT INTO [Core].[dmnCity] VALUES(103 , 'Banka', 6);
	INSERT INTO [Core].[dmnCity] VALUES(104 , 'Begusarai', 6);
	INSERT INTO [Core].[dmnCity] VALUES(105 , 'Bhagalpur', 6);
	INSERT INTO [Core].[dmnCity] VALUES(106 , 'Bhojpur', 6);
	INSERT INTO [Core].[dmnCity] VALUES(107 , 'Buxar', 6);
	INSERT INTO [Core].[dmnCity] VALUES(108 , 'Darbhanga', 6);
	INSERT INTO [Core].[dmnCity] VALUES(109 , 'Gaya', 6);
	INSERT INTO [Core].[dmnCity] VALUES(110 , 'Gopalganj', 6);
	INSERT INTO [Core].[dmnCity] VALUES(111 , 'Jamui', 6);
	INSERT INTO [Core].[dmnCity] VALUES(112 , 'Jehanabad', 6);
	INSERT INTO [Core].[dmnCity] VALUES(113 , 'Kaimur (bhabua)', 6);
	INSERT INTO [Core].[dmnCity] VALUES(114 , 'Katihar', 6);
	INSERT INTO [Core].[dmnCity] VALUES(115 , 'Khagaria', 6);
	INSERT INTO [Core].[dmnCity] VALUES(116 , 'Kishanganj', 6);
	INSERT INTO [Core].[dmnCity] VALUES(117 , 'Lakhisarai', 6);
	INSERT INTO [Core].[dmnCity] VALUES(118 , 'Madhepura', 6);
	INSERT INTO [Core].[dmnCity] VALUES(119 , 'Madhubani', 6);
	INSERT INTO [Core].[dmnCity] VALUES(120 , 'Munger', 6);
	INSERT INTO [Core].[dmnCity] VALUES(121 , 'Muzaffarpur', 6);
	INSERT INTO [Core].[dmnCity] VALUES(122 , 'Nalanda', 6);
	INSERT INTO [Core].[dmnCity] VALUES(123 , 'Nawada', 6);
	INSERT INTO [Core].[dmnCity] VALUES(124 , 'Pashchim Champaran', 6);
	INSERT INTO [Core].[dmnCity] VALUES(125 , 'Patna', 6);
	INSERT INTO [Core].[dmnCity] VALUES(126 , 'Purba Champaran', 6);
	INSERT INTO [Core].[dmnCity] VALUES(127 , 'Purnia', 6);
	INSERT INTO [Core].[dmnCity] VALUES(128 , 'Rohtas', 6);
	INSERT INTO [Core].[dmnCity] VALUES(129 , 'Saharsa', 6);
	INSERT INTO [Core].[dmnCity] VALUES(130 , 'Samastipur', 6);
	INSERT INTO [Core].[dmnCity] VALUES(131 , 'Saran', 6);
	INSERT INTO [Core].[dmnCity] VALUES(132 , 'Sheikhpura', 6);
	INSERT INTO [Core].[dmnCity] VALUES(133 , 'Sheohar', 6);
	INSERT INTO [Core].[dmnCity] VALUES(134 , 'Sitamarhi', 6);
	INSERT INTO [Core].[dmnCity] VALUES(135 , 'Siwan', 6);
	INSERT INTO [Core].[dmnCity] VALUES(136 , 'Supaul', 6);
	INSERT INTO [Core].[dmnCity] VALUES(137 , 'Vaishali', 6);
	INSERT INTO [Core].[dmnCity] VALUES(138 , 'Chandigarh', 7);
	INSERT INTO [Core].[dmnCity] VALUES(139 , 'Bastar', 8);
	INSERT INTO [Core].[dmnCity] VALUES(140 , 'Bijapur', 8);
	INSERT INTO [Core].[dmnCity] VALUES(141 , 'Bilaspur', 8);
	INSERT INTO [Core].[dmnCity] VALUES(142 , 'Dakshin Bastar Dantewada', 8);
	INSERT INTO [Core].[dmnCity] VALUES(143 , 'Dhamtari', 8);
	INSERT INTO [Core].[dmnCity] VALUES(144 , 'Durg', 8);
	INSERT INTO [Core].[dmnCity] VALUES(145 , 'Janjgir - Champa', 8);
	INSERT INTO [Core].[dmnCity] VALUES(146 , 'Jashpur', 8);
	INSERT INTO [Core].[dmnCity] VALUES(147 , 'Kabeerdham', 8);
	INSERT INTO [Core].[dmnCity] VALUES(148 , 'Korba', 8);
	INSERT INTO [Core].[dmnCity] VALUES(149 , 'Koriya', 8);
	INSERT INTO [Core].[dmnCity] VALUES(150 , 'Mahasamund', 8);
	INSERT INTO [Core].[dmnCity] VALUES(151 , 'Narayanpur', 8);
	INSERT INTO [Core].[dmnCity] VALUES(152 , 'Raigarh', 8);
	INSERT INTO [Core].[dmnCity] VALUES(153 , 'Raipur', 8);
	INSERT INTO [Core].[dmnCity] VALUES(154 , 'Rajnandgaon', 8);
	INSERT INTO [Core].[dmnCity] VALUES(155 , 'Surguja', 8);
	INSERT INTO [Core].[dmnCity] VALUES(156 , 'Uttar Bastar Kanker', 8);
	INSERT INTO [Core].[dmnCity] VALUES(157 , 'Dadra & Nagar Haveli', 9);
	INSERT INTO [Core].[dmnCity] VALUES(158 , 'Daman', 10);
	INSERT INTO [Core].[dmnCity] VALUES(159 , 'Diu', 10);
	INSERT INTO [Core].[dmnCity] VALUES(160 , 'North Goa', 11);
	INSERT INTO [Core].[dmnCity] VALUES(161 , 'South Goa', 11);
	INSERT INTO [Core].[dmnCity] VALUES(162 , 'Ahmadabad', 12);
	INSERT INTO [Core].[dmnCity] VALUES(163 , 'Amreli', 12);
	INSERT INTO [Core].[dmnCity] VALUES(164 , 'Anand', 12);
	INSERT INTO [Core].[dmnCity] VALUES(165 , 'Banas Kantha', 12);
	INSERT INTO [Core].[dmnCity] VALUES(166 , 'Bharuch', 12);
	INSERT INTO [Core].[dmnCity] VALUES(167 , 'Bhavnagar', 12);
	INSERT INTO [Core].[dmnCity] VALUES(168 , 'Dohad', 12);
	INSERT INTO [Core].[dmnCity] VALUES(169 , 'Gandhinagar', 12);
	INSERT INTO [Core].[dmnCity] VALUES(170 , 'Jamnagar', 12);
	INSERT INTO [Core].[dmnCity] VALUES(171 , 'Junagadh', 12);
	INSERT INTO [Core].[dmnCity] VALUES(172 , 'Kachchh', 12);
	INSERT INTO [Core].[dmnCity] VALUES(173 , 'Kheda', 12);
	INSERT INTO [Core].[dmnCity] VALUES(174 , 'Mahesana', 12);
	INSERT INTO [Core].[dmnCity] VALUES(175 , 'Narmada', 12);
	INSERT INTO [Core].[dmnCity] VALUES(176 , 'Navsari', 12);
	INSERT INTO [Core].[dmnCity] VALUES(177 , 'Panch Mahals', 12);
	INSERT INTO [Core].[dmnCity] VALUES(178 , 'Patan', 12);
	INSERT INTO [Core].[dmnCity] VALUES(179 , 'Porbandar', 12);
	INSERT INTO [Core].[dmnCity] VALUES(180 , 'Rajkot', 12);
	INSERT INTO [Core].[dmnCity] VALUES(181 , 'Sabar Kantha', 12);
	INSERT INTO [Core].[dmnCity] VALUES(182 , 'Surat', 12);
	INSERT INTO [Core].[dmnCity] VALUES(183 , 'Surendranagar', 12);
	INSERT INTO [Core].[dmnCity] VALUES(184 , 'Tapi', 12);
	INSERT INTO [Core].[dmnCity] VALUES(185 , 'The Dangs', 12);
	INSERT INTO [Core].[dmnCity] VALUES(186 , 'Vadodara', 12);
	INSERT INTO [Core].[dmnCity] VALUES(187 , 'Valsad', 12);
	INSERT INTO [Core].[dmnCity] VALUES(188 , 'Ambala', 13);
	INSERT INTO [Core].[dmnCity] VALUES(189 , 'Bhiwani', 13);
	INSERT INTO [Core].[dmnCity] VALUES(190 , 'Faridabad', 13);
	INSERT INTO [Core].[dmnCity] VALUES(191 , 'Fatehabad', 13);
	INSERT INTO [Core].[dmnCity] VALUES(192 , 'Gurgaon', 13);
	INSERT INTO [Core].[dmnCity] VALUES(193 , 'Hisar', 13);
	INSERT INTO [Core].[dmnCity] VALUES(194 , 'Jhajjar', 13);
	INSERT INTO [Core].[dmnCity] VALUES(195 , 'Jind', 13);
	INSERT INTO [Core].[dmnCity] VALUES(196 , 'Kaithal', 13);
	INSERT INTO [Core].[dmnCity] VALUES(197 , 'Karnal', 13);
	INSERT INTO [Core].[dmnCity] VALUES(198 , 'Kurukshetra', 13);
	INSERT INTO [Core].[dmnCity] VALUES(199 , 'Mahendragarh', 13);
	INSERT INTO [Core].[dmnCity] VALUES(200 , 'Mewat', 13);
	INSERT INTO [Core].[dmnCity] VALUES(201 , 'Palwal', 13);
	INSERT INTO [Core].[dmnCity] VALUES(202 , 'Panchkula', 13);
	INSERT INTO [Core].[dmnCity] VALUES(203 , 'Panipat', 13);
	INSERT INTO [Core].[dmnCity] VALUES(204 , 'Rewari', 13);
	INSERT INTO [Core].[dmnCity] VALUES(205 , 'Rohtak', 13);
	INSERT INTO [Core].[dmnCity] VALUES(206 , 'Sirsa', 13);
	INSERT INTO [Core].[dmnCity] VALUES(207 , 'Sonipat', 13);
	INSERT INTO [Core].[dmnCity] VALUES(208 , 'Yamunanagar', 13);
	INSERT INTO [Core].[dmnCity] VALUES(209 , 'Bilaspur', 14);
	INSERT INTO [Core].[dmnCity] VALUES(210 , 'Chamba', 14);
	INSERT INTO [Core].[dmnCity] VALUES(211 , 'Hamirpur', 14);
	INSERT INTO [Core].[dmnCity] VALUES(212 , 'Kangra', 14);
	INSERT INTO [Core].[dmnCity] VALUES(213 , 'Kinnaur', 14);
	INSERT INTO [Core].[dmnCity] VALUES(214 , 'Kullu', 14);
	INSERT INTO [Core].[dmnCity] VALUES(215 , 'Lahul & Spiti', 14);
	INSERT INTO [Core].[dmnCity] VALUES(216 , 'Mandi', 14);
	INSERT INTO [Core].[dmnCity] VALUES(217 , 'Shimla', 14);
	INSERT INTO [Core].[dmnCity] VALUES(218 , 'Sirmaur', 14);
	INSERT INTO [Core].[dmnCity] VALUES(219 , 'Solan', 14);
	INSERT INTO [Core].[dmnCity] VALUES(220 , 'Una', 14);
	INSERT INTO [Core].[dmnCity] VALUES(221 , 'Anantnag', 15);
	INSERT INTO [Core].[dmnCity] VALUES(222 , 'Badgam', 15);
	INSERT INTO [Core].[dmnCity] VALUES(223 , 'Bandipore', 15);
	INSERT INTO [Core].[dmnCity] VALUES(224 , 'Baramula', 15);
	INSERT INTO [Core].[dmnCity] VALUES(225 , 'Doda', 15);
	INSERT INTO [Core].[dmnCity] VALUES(226 , 'Ganderbal', 15);
	INSERT INTO [Core].[dmnCity] VALUES(227 , 'Jammu', 15);
	INSERT INTO [Core].[dmnCity] VALUES(228 , 'Kargil', 15);
	INSERT INTO [Core].[dmnCity] VALUES(229 , 'Kathua', 15);
	INSERT INTO [Core].[dmnCity] VALUES(230 , 'Kishtwar', 15);
	INSERT INTO [Core].[dmnCity] VALUES(231 , 'Kulgam', 15);
	INSERT INTO [Core].[dmnCity] VALUES(232 , 'Kupwara', 15);
	INSERT INTO [Core].[dmnCity] VALUES(233 , 'Leh(ladakh)', 15);
	INSERT INTO [Core].[dmnCity] VALUES(234 , 'Pulwama', 15);
	INSERT INTO [Core].[dmnCity] VALUES(235 , 'Punch', 15);
	INSERT INTO [Core].[dmnCity] VALUES(236 , 'Rajouri', 15);
	INSERT INTO [Core].[dmnCity] VALUES(237 , 'Ramban', 15);
	INSERT INTO [Core].[dmnCity] VALUES(238 , 'Reasi', 15);
	INSERT INTO [Core].[dmnCity] VALUES(239 , 'Samba', 15);
	INSERT INTO [Core].[dmnCity] VALUES(240 , 'Shupiyan', 15);
	INSERT INTO [Core].[dmnCity] VALUES(241 , 'Srinagar', 15);
	INSERT INTO [Core].[dmnCity] VALUES(242 , 'Udhampur', 15);
	INSERT INTO [Core].[dmnCity] VALUES(243 , 'Bokaro', 16);
	INSERT INTO [Core].[dmnCity] VALUES(244 , 'Chatra', 16);
	INSERT INTO [Core].[dmnCity] VALUES(245 , 'Deoghar', 16);
	INSERT INTO [Core].[dmnCity] VALUES(246 , 'Dhanbad', 16);
	INSERT INTO [Core].[dmnCity] VALUES(247 , 'Dumka', 16);
	INSERT INTO [Core].[dmnCity] VALUES(248 , 'Garhwa', 16);
	INSERT INTO [Core].[dmnCity] VALUES(249 , 'Giridih', 16);
	INSERT INTO [Core].[dmnCity] VALUES(250 , 'Godda', 16);
	INSERT INTO [Core].[dmnCity] VALUES(251 , 'Gumla', 16);
	INSERT INTO [Core].[dmnCity] VALUES(252 , 'Hazaribagh', 16);
	INSERT INTO [Core].[dmnCity] VALUES(253 , 'Jamtara', 16);
	INSERT INTO [Core].[dmnCity] VALUES(254 , 'Khunti', 16);
	INSERT INTO [Core].[dmnCity] VALUES(255 , 'Kodarma', 16);
	INSERT INTO [Core].[dmnCity] VALUES(256 , 'Latehar', 16);
	INSERT INTO [Core].[dmnCity] VALUES(257 , 'Lohardaga', 16);
	INSERT INTO [Core].[dmnCity] VALUES(258 , 'Pakur', 16);
	INSERT INTO [Core].[dmnCity] VALUES(259 , 'Palamu', 16);
	INSERT INTO [Core].[dmnCity] VALUES(260 , 'Pashchimi Singhbhum', 16);
	INSERT INTO [Core].[dmnCity] VALUES(261 , 'Purbi Singhbhum', 16);
	INSERT INTO [Core].[dmnCity] VALUES(262 , 'Ramgarh', 16);
	INSERT INTO [Core].[dmnCity] VALUES(263 , 'Ranchi', 16);
	INSERT INTO [Core].[dmnCity] VALUES(264 , 'Sahibganj', 16);
	INSERT INTO [Core].[dmnCity] VALUES(265 , 'Saraikela-kharsawan', 16);
	INSERT INTO [Core].[dmnCity] VALUES(266 , 'Simdega', 16);
	INSERT INTO [Core].[dmnCity] VALUES(267 , 'Bagalkot', 17);
	INSERT INTO [Core].[dmnCity] VALUES(268 , 'Bangalore', 17);
	INSERT INTO [Core].[dmnCity] VALUES(269 , 'Bangalore Rural', 17);
	INSERT INTO [Core].[dmnCity] VALUES(270 , 'Belgaum', 17);
	INSERT INTO [Core].[dmnCity] VALUES(271 , 'Bellary', 17);
	INSERT INTO [Core].[dmnCity] VALUES(272 , 'Bidar', 17);
	INSERT INTO [Core].[dmnCity] VALUES(273 , 'Bijapur', 17);
	INSERT INTO [Core].[dmnCity] VALUES(274 , 'Chamarajanagar', 17);
	INSERT INTO [Core].[dmnCity] VALUES(275 , 'Chikkaballapura', 17);
	INSERT INTO [Core].[dmnCity] VALUES(276 , 'Chikmagalur', 17);
	INSERT INTO [Core].[dmnCity] VALUES(277 , 'Chitradurga', 17);
	INSERT INTO [Core].[dmnCity] VALUES(278 , 'Dakshina Kannada', 17);
	INSERT INTO [Core].[dmnCity] VALUES(279 , 'Davanagere', 17);
	INSERT INTO [Core].[dmnCity] VALUES(280 , 'Dharwad', 17);
	INSERT INTO [Core].[dmnCity] VALUES(281 , 'Gadag', 17);
	INSERT INTO [Core].[dmnCity] VALUES(282 , 'Gulbarga', 17);
	INSERT INTO [Core].[dmnCity] VALUES(283 , 'Hassan', 17);
	INSERT INTO [Core].[dmnCity] VALUES(284 , 'Haveri', 17);
	INSERT INTO [Core].[dmnCity] VALUES(285 , 'Kodagu', 17);
	INSERT INTO [Core].[dmnCity] VALUES(286 , 'Kolar', 17);
	INSERT INTO [Core].[dmnCity] VALUES(287 , 'Koppal', 17);
	INSERT INTO [Core].[dmnCity] VALUES(288 , 'Mandya', 17);
	INSERT INTO [Core].[dmnCity] VALUES(289 , 'Mysore', 17);
	INSERT INTO [Core].[dmnCity] VALUES(290 , 'Raichur', 17);
	INSERT INTO [Core].[dmnCity] VALUES(291 , 'Ramanagara', 17);
	INSERT INTO [Core].[dmnCity] VALUES(292 , 'Shimoga', 17);
	INSERT INTO [Core].[dmnCity] VALUES(293 , 'Tumkur', 17);
	INSERT INTO [Core].[dmnCity] VALUES(294 , 'Udupi', 17);
	INSERT INTO [Core].[dmnCity] VALUES(295 , 'Uttara Kannada', 17);
	INSERT INTO [Core].[dmnCity] VALUES(296 , 'Yadgir', 17);
	INSERT INTO [Core].[dmnCity] VALUES(297 , 'Alappuzha', 18);
	INSERT INTO [Core].[dmnCity] VALUES(298 , 'Ernakulam', 18);
	INSERT INTO [Core].[dmnCity] VALUES(299 , 'Idukki', 18);
	INSERT INTO [Core].[dmnCity] VALUES(300 , 'Kannur', 18);
	INSERT INTO [Core].[dmnCity] VALUES(301 , 'Kasaragod', 18);
	INSERT INTO [Core].[dmnCity] VALUES(302 , 'Kollam', 18);
	INSERT INTO [Core].[dmnCity] VALUES(303 , 'Kottayam', 18);
	INSERT INTO [Core].[dmnCity] VALUES(304 , 'Kozhikode', 18);
	INSERT INTO [Core].[dmnCity] VALUES(305 , 'Malappuram', 18);
	INSERT INTO [Core].[dmnCity] VALUES(306 , 'Palakkad', 18);
	INSERT INTO [Core].[dmnCity] VALUES(307 , 'Pathanamthitta', 18);
	INSERT INTO [Core].[dmnCity] VALUES(308 , 'Thiruvananthapuram', 18);
	INSERT INTO [Core].[dmnCity] VALUES(309 , 'Thrissur', 18);
	INSERT INTO [Core].[dmnCity] VALUES(310 , 'Wayanad', 18);
	INSERT INTO [Core].[dmnCity] VALUES(311 , 'Lakshadweep', 19);
	INSERT INTO [Core].[dmnCity] VALUES(312 , 'Alirajpur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(313 , 'Anuppur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(314 , 'Ashoknagar', 20);
	INSERT INTO [Core].[dmnCity] VALUES(315 , 'Balaghat', 20);
	INSERT INTO [Core].[dmnCity] VALUES(316 , 'Barwani', 20);
	INSERT INTO [Core].[dmnCity] VALUES(317 , 'Betul', 20);
	INSERT INTO [Core].[dmnCity] VALUES(318 , 'Bhind', 20);
	INSERT INTO [Core].[dmnCity] VALUES(319 , 'Bhopal', 20);
	INSERT INTO [Core].[dmnCity] VALUES(320 , 'Burhanpur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(321 , 'Chhatarpur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(322 , 'Chhindwara', 20);
	INSERT INTO [Core].[dmnCity] VALUES(323 , 'Damoh', 20);
	INSERT INTO [Core].[dmnCity] VALUES(324 , 'Datia', 20);
	INSERT INTO [Core].[dmnCity] VALUES(325 , 'Dewas', 20);
	INSERT INTO [Core].[dmnCity] VALUES(326 , 'Dhar', 20);
	INSERT INTO [Core].[dmnCity] VALUES(327 , 'Dindori', 20);
	INSERT INTO [Core].[dmnCity] VALUES(328 , 'Guna', 20);
	INSERT INTO [Core].[dmnCity] VALUES(329 , 'Gwalior', 20);
	INSERT INTO [Core].[dmnCity] VALUES(330 , 'Harda', 20);
	INSERT INTO [Core].[dmnCity] VALUES(331 , 'Hoshangabad', 20);
	INSERT INTO [Core].[dmnCity] VALUES(332 , 'Indore', 20);
	INSERT INTO [Core].[dmnCity] VALUES(333 , 'Jabalpur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(334 , 'Jhabua', 20);
	INSERT INTO [Core].[dmnCity] VALUES(335 , 'Katni', 20);
	INSERT INTO [Core].[dmnCity] VALUES(336 , 'Khandwa (east Nimar)', 20);
	INSERT INTO [Core].[dmnCity] VALUES(337 , 'Khargone (west Nimar)', 20);
	INSERT INTO [Core].[dmnCity] VALUES(338 , 'Mandla', 20);
	INSERT INTO [Core].[dmnCity] VALUES(339 , 'Mandsaur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(340 , 'Morena', 20);
	INSERT INTO [Core].[dmnCity] VALUES(341 , 'Narsimhapur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(342 , 'Neemuch', 20);
	INSERT INTO [Core].[dmnCity] VALUES(343 , 'Panna', 20);
	INSERT INTO [Core].[dmnCity] VALUES(344 , 'Raisen', 20);
	INSERT INTO [Core].[dmnCity] VALUES(345 , 'Rajgarh', 20);
	INSERT INTO [Core].[dmnCity] VALUES(346 , 'Ratlam', 20);
	INSERT INTO [Core].[dmnCity] VALUES(347 , 'Rewa', 20);
	INSERT INTO [Core].[dmnCity] VALUES(348 , 'Sagar', 20);
	INSERT INTO [Core].[dmnCity] VALUES(349 , 'Satna', 20);
	INSERT INTO [Core].[dmnCity] VALUES(350 , 'Sehore', 20);
	INSERT INTO [Core].[dmnCity] VALUES(351 , 'Seoni', 20);
	INSERT INTO [Core].[dmnCity] VALUES(352 , 'Shahdol', 20);
	INSERT INTO [Core].[dmnCity] VALUES(353 , 'Shajapur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(354 , 'Sheopur', 20);
	INSERT INTO [Core].[dmnCity] VALUES(355 , 'Shivpuri', 20);
	INSERT INTO [Core].[dmnCity] VALUES(356 , 'Sidhi', 20);
	INSERT INTO [Core].[dmnCity] VALUES(357 , 'Singrauli', 20);
	INSERT INTO [Core].[dmnCity] VALUES(358 , 'Tikamgarh', 20);
	INSERT INTO [Core].[dmnCity] VALUES(359 , 'Ujjain', 20);
	INSERT INTO [Core].[dmnCity] VALUES(360 , 'Umaria', 20);
	INSERT INTO [Core].[dmnCity] VALUES(361 , 'Vidisha', 20);
	INSERT INTO [Core].[dmnCity] VALUES(362 , 'Ahmadnagar', 21);
	INSERT INTO [Core].[dmnCity] VALUES(363 , 'Akola', 21);
	INSERT INTO [Core].[dmnCity] VALUES(364 , 'Amravati', 21);
	INSERT INTO [Core].[dmnCity] VALUES(365 , 'Aurangabad', 21);
	INSERT INTO [Core].[dmnCity] VALUES(366 , 'Bhandara', 21);
	INSERT INTO [Core].[dmnCity] VALUES(367 , 'Bid', 21);
	INSERT INTO [Core].[dmnCity] VALUES(368 , 'Buldana', 21);
	INSERT INTO [Core].[dmnCity] VALUES(369 , 'Chandrapur', 21);
	INSERT INTO [Core].[dmnCity] VALUES(370 , 'Dhule', 21);
	INSERT INTO [Core].[dmnCity] VALUES(371 , 'Gadchiroli', 21);
	INSERT INTO [Core].[dmnCity] VALUES(372 , 'Gondiya', 21);
	INSERT INTO [Core].[dmnCity] VALUES(373 , 'Hingoli', 21);
	INSERT INTO [Core].[dmnCity] VALUES(374 , 'Jalgaon', 21);
	INSERT INTO [Core].[dmnCity] VALUES(375 , 'Jalna', 21);
	INSERT INTO [Core].[dmnCity] VALUES(376 , 'Kolhapur', 21);
	INSERT INTO [Core].[dmnCity] VALUES(377 , 'Latur', 21);
	INSERT INTO [Core].[dmnCity] VALUES(378 , 'Mumbai', 21);
	INSERT INTO [Core].[dmnCity] VALUES(379 , 'Mumbai Suburban', 21);
	INSERT INTO [Core].[dmnCity] VALUES(380 , 'Nagpur', 21);
	INSERT INTO [Core].[dmnCity] VALUES(381 , 'Nanded', 21);
	INSERT INTO [Core].[dmnCity] VALUES(382 , 'Nandurbar', 21);
	INSERT INTO [Core].[dmnCity] VALUES(383 , 'Nashik', 21);
	INSERT INTO [Core].[dmnCity] VALUES(384 , 'Osmanabad', 21);
	INSERT INTO [Core].[dmnCity] VALUES(385 , 'Parbhani', 21);
	INSERT INTO [Core].[dmnCity] VALUES(386 , 'Pune', 21);
	INSERT INTO [Core].[dmnCity] VALUES(387 , 'Raigarh', 21);
	INSERT INTO [Core].[dmnCity] VALUES(388 , 'Ratnagiri', 21);
	INSERT INTO [Core].[dmnCity] VALUES(389 , 'Sangli', 21);
	INSERT INTO [Core].[dmnCity] VALUES(390 , 'Satara', 21);
	INSERT INTO [Core].[dmnCity] VALUES(391 , 'Sindhudurg', 21);
	INSERT INTO [Core].[dmnCity] VALUES(392 , 'Solapur', 21);
	INSERT INTO [Core].[dmnCity] VALUES(393 , 'Thane', 21);
	INSERT INTO [Core].[dmnCity] VALUES(394 , 'Wardha', 21);
	INSERT INTO [Core].[dmnCity] VALUES(395 , 'Washim', 21);
	INSERT INTO [Core].[dmnCity] VALUES(396 , 'Yavatmal', 21);
	INSERT INTO [Core].[dmnCity] VALUES(397 , 'Bishnupur', 22);
	INSERT INTO [Core].[dmnCity] VALUES(398 , 'Chandel', 22);
	INSERT INTO [Core].[dmnCity] VALUES(399 , 'Churachandpur', 22);
	INSERT INTO [Core].[dmnCity] VALUES(400 , 'Imphal East', 22);
	INSERT INTO [Core].[dmnCity] VALUES(401 , 'Imphal West', 22);
	INSERT INTO [Core].[dmnCity] VALUES(402 , 'Senapati', 22);
	INSERT INTO [Core].[dmnCity] VALUES(403 , 'Tamenglong', 22);
	INSERT INTO [Core].[dmnCity] VALUES(404 , 'Thoubal', 22);
	INSERT INTO [Core].[dmnCity] VALUES(405 , 'Ukhrul', 22);
	INSERT INTO [Core].[dmnCity] VALUES(406 , 'East Garo Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(407 , 'East Khasi Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(408 , 'Jaintia Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(409 , 'Ribhoi', 23);
	INSERT INTO [Core].[dmnCity] VALUES(410 , 'South Garo Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(411 , 'West Garo Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(412 , 'West Khasi Hills', 23);
	INSERT INTO [Core].[dmnCity] VALUES(413 , 'Aizawl', 24);
	INSERT INTO [Core].[dmnCity] VALUES(414 , 'Champhai', 24);
	INSERT INTO [Core].[dmnCity] VALUES(415 , 'Kolasib', 24);
	INSERT INTO [Core].[dmnCity] VALUES(416 , 'Lawngtlai', 24);
	INSERT INTO [Core].[dmnCity] VALUES(417 , 'Lunglei', 24);
	INSERT INTO [Core].[dmnCity] VALUES(418 , 'Mamit', 24);
	INSERT INTO [Core].[dmnCity] VALUES(419 , 'Saiha', 24);
	INSERT INTO [Core].[dmnCity] VALUES(420 , 'Serchhip', 24);
	INSERT INTO [Core].[dmnCity] VALUES(421 , 'Dimapur', 25);
	INSERT INTO [Core].[dmnCity] VALUES(422 , 'Kiphire', 25);
	INSERT INTO [Core].[dmnCity] VALUES(423 , 'Kohima', 25);
	INSERT INTO [Core].[dmnCity] VALUES(424 , 'Longleng', 25);
	INSERT INTO [Core].[dmnCity] VALUES(425 , 'Mokokchung', 25);
	INSERT INTO [Core].[dmnCity] VALUES(426 , 'Mon', 25);
	INSERT INTO [Core].[dmnCity] VALUES(427 , 'Peren', 25);
	INSERT INTO [Core].[dmnCity] VALUES(428 , 'Phek', 25);
	INSERT INTO [Core].[dmnCity] VALUES(429 , 'Tuensang', 25);
	INSERT INTO [Core].[dmnCity] VALUES(430 , 'Wokha', 25);
	INSERT INTO [Core].[dmnCity] VALUES(431 , 'Zunheboto', 25);
	INSERT INTO [Core].[dmnCity] VALUES(432 , 'Central', 26);
	INSERT INTO [Core].[dmnCity] VALUES(433 , 'East', 26);
	INSERT INTO [Core].[dmnCity] VALUES(434 , 'New Delhi', 26);
	INSERT INTO [Core].[dmnCity] VALUES(435 , 'North', 26);
	INSERT INTO [Core].[dmnCity] VALUES(436 , 'North East', 26);
	INSERT INTO [Core].[dmnCity] VALUES(437 , 'North West', 26);
	INSERT INTO [Core].[dmnCity] VALUES(438 , 'South', 26);
	INSERT INTO [Core].[dmnCity] VALUES(439 , 'South West', 26);
	INSERT INTO [Core].[dmnCity] VALUES(440 , 'West', 26);
	INSERT INTO [Core].[dmnCity] VALUES(441 , 'Anugul', 27);
	INSERT INTO [Core].[dmnCity] VALUES(442 , 'Balangir', 27);
	INSERT INTO [Core].[dmnCity] VALUES(443 , 'Baleshwar', 27);
	INSERT INTO [Core].[dmnCity] VALUES(444 , 'Bargarh', 27);
	INSERT INTO [Core].[dmnCity] VALUES(445 , 'Baudh', 27);
	INSERT INTO [Core].[dmnCity] VALUES(446 , 'Bhadrak', 27);
	INSERT INTO [Core].[dmnCity] VALUES(447 , 'Cuttack', 27);
	INSERT INTO [Core].[dmnCity] VALUES(448 , 'Debagarh', 27);
	INSERT INTO [Core].[dmnCity] VALUES(449 , 'Dhenkanal', 27);
	INSERT INTO [Core].[dmnCity] VALUES(450 , 'Gajapati', 27);
	INSERT INTO [Core].[dmnCity] VALUES(451 , 'Ganjam', 27);
	INSERT INTO [Core].[dmnCity] VALUES(452 , 'Jagatsinghapur', 27);
	INSERT INTO [Core].[dmnCity] VALUES(453 , 'Jajapur', 27);
	INSERT INTO [Core].[dmnCity] VALUES(454 , 'Jharsuguda', 27);
	INSERT INTO [Core].[dmnCity] VALUES(455 , 'Kalahandi', 27);
	INSERT INTO [Core].[dmnCity] VALUES(456 , 'Kandhamal', 27);
	INSERT INTO [Core].[dmnCity] VALUES(457 , 'Kendrapara', 27);
	INSERT INTO [Core].[dmnCity] VALUES(458 , 'Kendujhar', 27);
	INSERT INTO [Core].[dmnCity] VALUES(459 , 'Khordha', 27);
	INSERT INTO [Core].[dmnCity] VALUES(460 , 'Koraput', 27);
	INSERT INTO [Core].[dmnCity] VALUES(461 , 'Malkangiri', 27);
	INSERT INTO [Core].[dmnCity] VALUES(462 , 'Mayurbhanj', 27);
	INSERT INTO [Core].[dmnCity] VALUES(463 , 'Nabarangapur', 27);
	INSERT INTO [Core].[dmnCity] VALUES(464 , 'Nayagarh', 27);
	INSERT INTO [Core].[dmnCity] VALUES(465 , 'Nuapada', 27);
	INSERT INTO [Core].[dmnCity] VALUES(466 , 'Puri', 27);
	INSERT INTO [Core].[dmnCity] VALUES(467 , 'Rayagada', 27);
	INSERT INTO [Core].[dmnCity] VALUES(468 , 'Sambalpur', 27);
	INSERT INTO [Core].[dmnCity] VALUES(469 , 'Subarnapur', 27);
	INSERT INTO [Core].[dmnCity] VALUES(470 , 'Sundargarh', 27);
	INSERT INTO [Core].[dmnCity] VALUES(471 , 'Karaikal', 28);
	INSERT INTO [Core].[dmnCity] VALUES(472 , 'Mahe', 28);
	INSERT INTO [Core].[dmnCity] VALUES(473 , 'Puducherry', 28);
	INSERT INTO [Core].[dmnCity] VALUES(474 , 'Yanam', 28);
	INSERT INTO [Core].[dmnCity] VALUES(475 , 'Amritsar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(476 , 'Barnala', 29);
	INSERT INTO [Core].[dmnCity] VALUES(477 , 'Bathinda', 29);
	INSERT INTO [Core].[dmnCity] VALUES(478 , 'Faridkot', 29);
	INSERT INTO [Core].[dmnCity] VALUES(479 , 'Fatehgarh Sahib', 29);
	INSERT INTO [Core].[dmnCity] VALUES(480 , 'Firozpur', 29);
	INSERT INTO [Core].[dmnCity] VALUES(481 , 'Gurdaspur', 29);
	INSERT INTO [Core].[dmnCity] VALUES(482 , 'Hoshiarpur', 29);
	INSERT INTO [Core].[dmnCity] VALUES(483 , 'Jalandhar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(484 , 'Kapurthala', 29);
	INSERT INTO [Core].[dmnCity] VALUES(485 , 'Ludhiana', 29);
	INSERT INTO [Core].[dmnCity] VALUES(486 , 'Mansa', 29);
	INSERT INTO [Core].[dmnCity] VALUES(487 , 'Moga', 29);
	INSERT INTO [Core].[dmnCity] VALUES(488 , 'Muktsar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(489 , 'Patiala', 29);
	INSERT INTO [Core].[dmnCity] VALUES(490 , 'Rupnagar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(491 , 'Sahibzada Ajit Singh Nagar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(492 , 'Sangrur', 29);
	INSERT INTO [Core].[dmnCity] VALUES(493 , 'Shahid Bhagat Singh Nagar', 29);
	INSERT INTO [Core].[dmnCity] VALUES(494 , 'Tarn Taran', 29);
	INSERT INTO [Core].[dmnCity] VALUES(495 , 'Ajmer', 30);
	INSERT INTO [Core].[dmnCity] VALUES(496 , 'Alwar', 30);
	INSERT INTO [Core].[dmnCity] VALUES(497 , 'Banswara', 30);
	INSERT INTO [Core].[dmnCity] VALUES(498 , 'Baran', 30);
	INSERT INTO [Core].[dmnCity] VALUES(499 , 'Barmer', 30);
	INSERT INTO [Core].[dmnCity] VALUES(500 , 'Bharatpur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(501 , 'Bhilwara', 30);
	INSERT INTO [Core].[dmnCity] VALUES(502 , 'Bikaner', 30);
	INSERT INTO [Core].[dmnCity] VALUES(503 , 'Bundi', 30);
	INSERT INTO [Core].[dmnCity] VALUES(504 , 'Chittaurgarh', 30);
	INSERT INTO [Core].[dmnCity] VALUES(505 , 'Churu', 30);
	INSERT INTO [Core].[dmnCity] VALUES(506 , 'Dausa', 30);
	INSERT INTO [Core].[dmnCity] VALUES(507 , 'Dhaulpur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(508 , 'Dungarpur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(509 , 'Ganganagar', 30);
	INSERT INTO [Core].[dmnCity] VALUES(510 , 'Hanumangarh', 30);
	INSERT INTO [Core].[dmnCity] VALUES(511 , 'Jaipur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(512 , 'Jaisalmer', 30);
	INSERT INTO [Core].[dmnCity] VALUES(513 , 'Jalor', 30);
	INSERT INTO [Core].[dmnCity] VALUES(514 , 'Jhalawar', 30);
	INSERT INTO [Core].[dmnCity] VALUES(515 , 'Jhunjhunun', 30);
	INSERT INTO [Core].[dmnCity] VALUES(516 , 'Jodhpur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(517 , 'Karauli', 30);
	INSERT INTO [Core].[dmnCity] VALUES(518 , 'Kota', 30);
	INSERT INTO [Core].[dmnCity] VALUES(519 , 'Nagaur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(520 , 'Pali', 30);
	INSERT INTO [Core].[dmnCity] VALUES(521 , 'Pratapgarh', 30);
	INSERT INTO [Core].[dmnCity] VALUES(522 , 'Rajsamand', 30);
	INSERT INTO [Core].[dmnCity] VALUES(523 , 'Sawai Madhopur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(524 , 'Sikar', 30);
	INSERT INTO [Core].[dmnCity] VALUES(525 , 'Sirohi', 30);
	INSERT INTO [Core].[dmnCity] VALUES(526 , 'Tonk', 30);
	INSERT INTO [Core].[dmnCity] VALUES(527 , 'Udaipur', 30);
	INSERT INTO [Core].[dmnCity] VALUES(528 , 'East District', 31);
	INSERT INTO [Core].[dmnCity] VALUES(529 , 'North  District', 31);
	INSERT INTO [Core].[dmnCity] VALUES(530 , 'South District', 31);
	INSERT INTO [Core].[dmnCity] VALUES(531 , 'West District', 31);
	INSERT INTO [Core].[dmnCity] VALUES(532 , 'Ariyalur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(533 , 'Chennai', 32);
	INSERT INTO [Core].[dmnCity] VALUES(534 , 'Coimbatore', 32);
	INSERT INTO [Core].[dmnCity] VALUES(535 , 'Cuddalore', 32);
	INSERT INTO [Core].[dmnCity] VALUES(536 , 'Dharmapuri', 32);
	INSERT INTO [Core].[dmnCity] VALUES(537 , 'Dindigul', 32);
	INSERT INTO [Core].[dmnCity] VALUES(538 , 'Erode', 32);
	INSERT INTO [Core].[dmnCity] VALUES(539 , 'Kancheepuram', 32);
	INSERT INTO [Core].[dmnCity] VALUES(540 , 'Kanniyakumari', 32);
	INSERT INTO [Core].[dmnCity] VALUES(541 , 'Karur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(542 , 'Krishnagiri', 32);
	INSERT INTO [Core].[dmnCity] VALUES(543 , 'Madurai', 32);
	INSERT INTO [Core].[dmnCity] VALUES(544 , 'Nagapattinam', 32);
	INSERT INTO [Core].[dmnCity] VALUES(545 , 'Namakkal', 32);
	INSERT INTO [Core].[dmnCity] VALUES(546 , 'Perambalur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(547 , 'Pudukkottai', 32);
	INSERT INTO [Core].[dmnCity] VALUES(548 , 'Ramanathapuram', 32);
	INSERT INTO [Core].[dmnCity] VALUES(549 , 'Salem', 32);
	INSERT INTO [Core].[dmnCity] VALUES(550 , 'Sivaganga', 32);
	INSERT INTO [Core].[dmnCity] VALUES(551 , 'Thanjavur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(552 , 'The Nilgiris', 32);
	INSERT INTO [Core].[dmnCity] VALUES(553 , 'Theni', 32);
	INSERT INTO [Core].[dmnCity] VALUES(554 , 'Thiruvallur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(555 , 'Thiruvarur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(556 , 'Thoothukkudi', 32);
	INSERT INTO [Core].[dmnCity] VALUES(557 , 'Tiruchirappalli', 32);
	INSERT INTO [Core].[dmnCity] VALUES(558 , 'Tirunelveli', 32);
	INSERT INTO [Core].[dmnCity] VALUES(559 , 'Tiruppur', 32);
	INSERT INTO [Core].[dmnCity] VALUES(560 , 'Tiruvannamalai', 32);
	INSERT INTO [Core].[dmnCity] VALUES(561 , 'Vellore', 32);
	INSERT INTO [Core].[dmnCity] VALUES(562 , 'Viluppuram', 32);
	INSERT INTO [Core].[dmnCity] VALUES(563 , 'Virudhunagar', 32);
	INSERT INTO [Core].[dmnCity] VALUES(564 , 'Dhalai', 33);
	INSERT INTO [Core].[dmnCity] VALUES(565 , 'North Tripura', 33);
	INSERT INTO [Core].[dmnCity] VALUES(566 , 'South Tripura', 33);
	INSERT INTO [Core].[dmnCity] VALUES(567 , 'West Tripura', 33);
	INSERT INTO [Core].[dmnCity] VALUES(568 , 'Agra', 34);
	INSERT INTO [Core].[dmnCity] VALUES(569 , 'Aligarh', 34);
	INSERT INTO [Core].[dmnCity] VALUES(570 , 'Allahabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(571 , 'Ambedkar Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(572 , 'Auraiya', 34);
	INSERT INTO [Core].[dmnCity] VALUES(573 , 'Azamgarh', 34);
	INSERT INTO [Core].[dmnCity] VALUES(574 , 'Baghpat', 34);
	INSERT INTO [Core].[dmnCity] VALUES(575 , 'Bahraich', 34);
	INSERT INTO [Core].[dmnCity] VALUES(576 , 'Ballia', 34);
	INSERT INTO [Core].[dmnCity] VALUES(577 , 'Balrampur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(578 , 'Banda', 34);
	INSERT INTO [Core].[dmnCity] VALUES(579 , 'Bara Banki', 34);
	INSERT INTO [Core].[dmnCity] VALUES(580 , 'Bareilly', 34);
	INSERT INTO [Core].[dmnCity] VALUES(581 , 'Basti', 34);
	INSERT INTO [Core].[dmnCity] VALUES(582 , 'Bijnor', 34);
	INSERT INTO [Core].[dmnCity] VALUES(583 , 'Budaun', 34);
	INSERT INTO [Core].[dmnCity] VALUES(584 , 'Bulandshahr', 34);
	INSERT INTO [Core].[dmnCity] VALUES(585 , 'Chandauli', 34);
	INSERT INTO [Core].[dmnCity] VALUES(586 , 'Chitrakoot', 34);
	INSERT INTO [Core].[dmnCity] VALUES(587 , 'Deoria', 34);
	INSERT INTO [Core].[dmnCity] VALUES(588 , 'Etah', 34);
	INSERT INTO [Core].[dmnCity] VALUES(589 , 'Etawah', 34);
	INSERT INTO [Core].[dmnCity] VALUES(590 , 'Faizabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(591 , 'Farrukhabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(592 , 'Fatehpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(593 , 'Firozabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(594 , 'Gautam Buddha Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(595 , 'Ghaziabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(596 , 'Ghazipur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(597 , 'Gonda', 34);
	INSERT INTO [Core].[dmnCity] VALUES(598 , 'Gorakhpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(599 , 'Hamirpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(600 , 'Hardoi', 34);
	INSERT INTO [Core].[dmnCity] VALUES(601 , 'Jalaun', 34);
	INSERT INTO [Core].[dmnCity] VALUES(602 , 'Jaunpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(603 , 'Jhansi', 34);
	INSERT INTO [Core].[dmnCity] VALUES(604 , 'Jyotiba Phule Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(605 , 'Kannauj', 34);
	INSERT INTO [Core].[dmnCity] VALUES(606 , 'Kanpur Dehat', 34);
	INSERT INTO [Core].[dmnCity] VALUES(607 , 'Kanpur Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(608 , 'Kanshiram Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(609 , 'Kaushambi', 34);
	INSERT INTO [Core].[dmnCity] VALUES(610 , 'Kheri', 34);
	INSERT INTO [Core].[dmnCity] VALUES(611 , 'Kushinagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(612 , 'Lalitpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(613 , 'Lucknow', 34);
	INSERT INTO [Core].[dmnCity] VALUES(614 , 'Mahamaya Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(615 , 'Mahoba', 34);
	INSERT INTO [Core].[dmnCity] VALUES(616 , 'Mahrajganj', 34);
	INSERT INTO [Core].[dmnCity] VALUES(617 , 'Mainpuri', 34);
	INSERT INTO [Core].[dmnCity] VALUES(618 , 'Mathura', 34);
	INSERT INTO [Core].[dmnCity] VALUES(619 , 'Mau', 34);
	INSERT INTO [Core].[dmnCity] VALUES(620 , 'Meerut', 34);
	INSERT INTO [Core].[dmnCity] VALUES(621 , 'Mirzapur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(622 , 'Moradabad', 34);
	INSERT INTO [Core].[dmnCity] VALUES(623 , 'Muzaffarnagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(624 , 'Pilibhit', 34);
	INSERT INTO [Core].[dmnCity] VALUES(625 , 'Pratapgarh', 34);
	INSERT INTO [Core].[dmnCity] VALUES(626 , 'Rae Bareli', 34);
	INSERT INTO [Core].[dmnCity] VALUES(627 , 'Rampur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(628 , 'Saharanpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(629 , 'Sant Kabir Nagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(630 , 'Sant Ravidas Nagar (bhadohi)', 34);
	INSERT INTO [Core].[dmnCity] VALUES(631 , 'Shahjahanpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(632 , 'Shrawasti', 34);
	INSERT INTO [Core].[dmnCity] VALUES(633 , 'Siddharthnagar', 34);
	INSERT INTO [Core].[dmnCity] VALUES(634 , 'Sitapur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(635 , 'Sonbhadra', 34);
	INSERT INTO [Core].[dmnCity] VALUES(636 , 'Sultanpur', 34);
	INSERT INTO [Core].[dmnCity] VALUES(637 , 'Unnao', 34);
	INSERT INTO [Core].[dmnCity] VALUES(638 , 'Varanasi', 34);
	INSERT INTO [Core].[dmnCity] VALUES(639 , 'Almora', 35);
	INSERT INTO [Core].[dmnCity] VALUES(640 , 'Bageshwar', 35);
	INSERT INTO [Core].[dmnCity] VALUES(641 , 'Chamoli', 35);
	INSERT INTO [Core].[dmnCity] VALUES(642 , 'Champawat', 35);
	INSERT INTO [Core].[dmnCity] VALUES(643 , 'Dehradun', 35);
	INSERT INTO [Core].[dmnCity] VALUES(644 , 'Garhwal', 35);
	INSERT INTO [Core].[dmnCity] VALUES(645 , 'Hardwar', 35);
	INSERT INTO [Core].[dmnCity] VALUES(646 , 'Nainital', 35);
	INSERT INTO [Core].[dmnCity] VALUES(647 , 'Pithoragarh', 35);
	INSERT INTO [Core].[dmnCity] VALUES(648 , 'Rudraprayag', 35);
	INSERT INTO [Core].[dmnCity] VALUES(649 , 'Tehri Garhwal', 35);
	INSERT INTO [Core].[dmnCity] VALUES(650 , 'Udham Singh Nagar', 35);
	INSERT INTO [Core].[dmnCity] VALUES(651 , 'Uttarkashi', 35);
	INSERT INTO [Core].[dmnCity] VALUES(652 , 'Bankura', 36);
	INSERT INTO [Core].[dmnCity] VALUES(653 , 'Barddhaman', 36);
	INSERT INTO [Core].[dmnCity] VALUES(654 , 'Birbhum', 36);
	INSERT INTO [Core].[dmnCity] VALUES(655 , 'Dakshin Dinajpur', 36);
	INSERT INTO [Core].[dmnCity] VALUES(656 , 'Darjiling', 36);
	INSERT INTO [Core].[dmnCity] VALUES(657 , 'Haora', 36);
	INSERT INTO [Core].[dmnCity] VALUES(658 , 'Hugli', 36);
	INSERT INTO [Core].[dmnCity] VALUES(659 , 'Jalpaiguri', 36);
	INSERT INTO [Core].[dmnCity] VALUES(660 , 'Koch Bihar', 36);
	INSERT INTO [Core].[dmnCity] VALUES(661 , 'Kolkata', 36);
	INSERT INTO [Core].[dmnCity] VALUES(662 , 'Maldah', 36);
	INSERT INTO [Core].[dmnCity] VALUES(663 , 'Murshidabad', 36);
	INSERT INTO [Core].[dmnCity] VALUES(664 , 'Nadia', 36);
	INSERT INTO [Core].[dmnCity] VALUES(665 , 'North Twenty Four Parganas', 36);
	INSERT INTO [Core].[dmnCity] VALUES(666 , 'Paschim Medinipur', 36);
	INSERT INTO [Core].[dmnCity] VALUES(667 , 'Purba Medinipur', 36);
	INSERT INTO [Core].[dmnCity] VALUES(668 , 'Puruliya', 36);
	INSERT INTO [Core].[dmnCity] VALUES(669 , 'South Twenty Four Parganas', 36);
	INSERT INTO [Core].[dmnCity] VALUES(670 , 'Uttar Dinajpur', 36);
END
