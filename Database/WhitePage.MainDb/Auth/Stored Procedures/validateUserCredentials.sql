CREATE PROCEDURE [Auth].[validateUserCredentials]
	@userName VARCHAR(2000),
	@password VARCHAR(2000),
	@ipAddress VARCHAR(70)
AS
BEGIN
	DECLARE @claims TABLE
	(
		ClaimType VARCHAR(200),
		ClaimValue VARCHAR(200)
	);	
	DECLARE @userId INT;
	DECLARE @remarks VARCHAR(50) = '';

	SELECT @userId = UserId FROM Auth.trUser WHERE UserName = @userName;

	IF (@userId IS NULL)
	BEGIN
		SET @userId = 0;
		SET @remarks = @userName;
	END

	IF EXISTS (SELECT * FROM Auth.trUser WHERE UserName = @userName AND Password = @password AND IsLocked = 0 AND IsSuspended=0)
	BEGIN
		INSERT INTO @claims (ClaimType, ClaimValue) VALUES('Status', 'Success');
		INSERT INTO @claims (ClaimType, ClaimValue) VALUES('AuthenticationMethod', 'myChoices');		

		INSERT INTO @claims (ClaimType, ClaimValue)
		SELECT 'RoleId', RoleId FROM Auth.trMapUserRole WHERE UserId = @userId;

		INSERT INTO [Auth].[trUserLoginLog] ([UserId] ,[IpAddress] ,[Status] ,[LoggedInDate] ,[Remarks])
		VALUES(@userId, @ipAddress, 'Success', [dbo].[getAppDate](), @remarks);
	END
	ELSE IF EXISTS (SELECT * FROM Auth.trUser WHERE UserName = @userName AND IsSuspended = 1)
	BEGIN
		INSERT INTO @claims (ClaimType, ClaimValue) VALUES('Status', 'Supended');

		INSERT INTO [Auth].[trUserLoginLog] ([UserId] ,[IpAddress] ,[Status] ,[LoggedInDate] ,[Remarks])
		VALUES(@userId, @ipAddress, 'Supended', [dbo].[getAppDate](), @remarks);
	END
	ELSE IF EXISTS (SELECT * FROM Auth.trUser WHERE UserName = @userName AND IsLocked = 1)
	BEGIN
		INSERT INTO @claims (ClaimType, ClaimValue) VALUES('Status', 'Locked');

		INSERT INTO [Auth].[trUserLoginLog] ([UserId] ,[IpAddress] ,[Status] ,[LoggedInDate] ,[Remarks])
		VALUES(@userId, @ipAddress, 'Locked', [dbo].[getAppDate](), @remarks);
	END
	ELSE
	BEGIN
		INSERT INTO @claims (ClaimType, ClaimValue) VALUES('Status', 'Invalid');

		INSERT INTO [Auth].[trUserLoginLog] ([UserId] ,[IpAddress] ,[Status] ,[LoggedInDate] ,[Remarks])
		VALUES(@userId, @ipAddress, 'Invalid', [dbo].[getAppDate](), @remarks);
	END
	
	SELECT * FROM @claims;
END
