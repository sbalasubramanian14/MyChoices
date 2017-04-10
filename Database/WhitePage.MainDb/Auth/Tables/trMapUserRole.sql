CREATE TABLE [Auth].[trMapUserRole]
(
	[MapUserRoleId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UserId] INT NOT NULL,
	[RoleId] INT NOT NULL,

	[CreatedBy] INT NOT NULL,
	[CreatedDate] DATETIME NOT NULL,
	[ModifiedBy] INT NOT NULL,
	[ModifiedDate] DATETIME NOT NULL,

	CONSTRAINT FK_trMapUserRole_trUser FOREIGN KEY([UserId]) REFERENCES Auth.trUser([UserId]),
	CONSTRAINT FK_trMapUserRole_dmnRole FOREIGN KEY([RoleId]) REFERENCES Auth.dmnRole([RoleId])
)
