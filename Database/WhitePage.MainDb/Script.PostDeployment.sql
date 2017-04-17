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
insert into @peacemakerNames values('Fareeda', 'Khatoon', 'Golconda')
insert into @peacemakerNames values('Mamidolla', 'Maheshwari', 'Golconda')
insert into @peacemakerNames values('Asma', 'Sultana', 'Golconda')
insert into @peacemakerNames values('Maryam', 'Unissa', 'Golconda')
insert into @peacemakerNames values('Farzana', 'Begum', 'Golconda')
insert into @peacemakerNames values('Sana', 'Roshan', 'Golconda')
insert into @peacemakerNames values('Zehra', 'Bano', 'Golconda')
insert into @peacemakerNames values('Mukramma', 'Junaidid', 'Golconda')
insert into @peacemakerNames values('Sreeram', 'Sridevi', 'Secunderabad')
insert into @peacemakerNames values('Shobha', 'B', 'Secunderabad')
insert into @peacemakerNames values('Pushpalatha', 'G', 'Secunderabad')
insert into @peacemakerNames values('Akula', 'Lavanya', 'Secunderabad')
insert into @peacemakerNames values('Jimkala', 'Santoshamma', 'Secunderabad')
insert into @peacemakerNames values('Parveen', 'MD', 'Secunderabad')
insert into @peacemakerNames values('Vemula', 'Bhagyalaxmi', 'Secunderabad')

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
INSERT INTO @lookupDetails VALUES(6, 'Religion',				350, 'Atheist'				,	9,1)

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
	INSERT INTO [Core].[dmnState] VALUES(1, 'Telangana');	
END

--City
IF NOT EXISTS (SELECT 1 FROM [Core].[dmnCity])
BEGIN		
	INSERT INTO [Core].[dmnCity] VALUES(1, 'Hyderabad', 1);	
	INSERT INTO [Core].[dmnCity] VALUES(2, 'Secunderabad', 1);	
	INSERT INTO [Core].[dmnCity] VALUES(3, 'Warangal', 1);	
END
