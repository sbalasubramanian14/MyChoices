CREATE TABLE [Core].[trSerialNumberTracker]
(
	SerialNumberTrackerId INT primary key identity(1,1),
	SerialNumberId int not null,
	SerialValue INT NOT NULL,
	GeneratedDate DateTime NOT NULL
)
