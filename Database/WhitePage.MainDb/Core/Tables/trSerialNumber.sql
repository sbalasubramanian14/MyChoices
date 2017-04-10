CREATE TABLE [Core].[trSerialNumber]
(
	SerialNumberId int primary key identity(1,1),
	SerailType VARCHAR(200) NOT NULL,
	Prefix varchar(200),
	Suffix varchar(200),
	StartNumber int not null default(0),
	IsActive BIT NOT NULL default(0),
)
