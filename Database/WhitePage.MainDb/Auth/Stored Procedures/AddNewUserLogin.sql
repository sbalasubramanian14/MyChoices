CREATE PROCEDURE [Auth].[AddNewUserLogin]
	@userEmail varchar(250),
	@roleId int,
	@firstName varchar(250),
	@lastName varchar(250)
AS
DECLARE @insertedId int;

BEGIN
	INSERT INTO Auth.trUser ([UserName], [Password] , [FirstName] , [LastName] , [DoB] , [MobileNumber] , [FailureAttempts] , [IsLocked] , [LockedDate] , [IsSuspended] ,[SuspendedDate] 
	, [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	VALUES(@userEmail,'dKPADax8LSyF2XuJaAMt6Q==', @firstName, @lastName, NULL, '0000000000', 0, 0, NULL, 0, NULL , 0, GETDATE(), 0, GETDATE());

	SELECT @insertedId = SCOPE_IDENTITY();  

	INSERT INTO [Auth].[trMapUserRole] VALUES(@insertedId, @roleId, 0, GETDATE(), 0, GETDATE());
END
