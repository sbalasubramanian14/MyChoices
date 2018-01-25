CREATE TABLE [Core].[IpDetails]
(
	[NGO name] [nvarchar](255) NULL,
	[IsFCRA] [nvarchar](255) NULL,
	[Primary contact] [nvarchar](255) NULL,
	[Primary email] [nvarchar](255) NULL,
	[IP Code] [nvarchar](255) NOT NULL PRIMARY KEY,
	[24-Hour availability] [nvarchar](255) NULL,
	[Phone] [float] NULL,
	[Website] [nvarchar](255) NULL,
	[State] [nvarchar](255) NULL,
	[H# No and address] [nvarchar](255) NULL,
	[City] [nvarchar](255) NULL,
	[District] [nvarchar](255) NULL,
	[Postal code] [float] NULL,
	[Countries of operation] [nvarchar](255) NULL,
	[Languages] [nvarchar](255) NULL,
	[Services Provided] [nvarchar](255) NULL,
	[Victim target group] [nvarchar](255) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[Active/Inactive] [nvarchar](255) NULL,
	[Complete address] [nvarchar](255) NULL
)
