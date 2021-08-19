-- CreateTable
CREATE TABLE `Insurance` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `policyNumber` VARCHAR(191) NOT NULL,
    `coverageStartDate` DATETIME(3) NOT NULL,
    `coverageEndDate` DATETIME(3) NOT NULL,
    `coverageType` ENUM('COMPREHENSIVE_COVERAGE', 'LIABILITY_DAMAGE', 'COLLISION_COVERAGE', 'PERSONAL_INJURY_COVERAGE') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Insurance.policyNumber_unique`(`policyNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `authId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191),
    `lastName` VARCHAR(191),
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'DRIVER') NOT NULL,
    `birthdate` DATETIME(3),
    `contactNumber` VARCHAR(191) NOT NULL,
    `emailAddress` VARCHAR(191),
    `licenseNumber` VARCHAR(191),
    `licenseExpiry` DATETIME(3),
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User.contactNumber_unique`(`contactNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taxi` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `bodyNumber` VARCHAR(191) NOT NULL,
    `plateNumber` VARCHAR(191),
    `conductionSticker` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `variant` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `engineNumber` VARCHAR(191) NOT NULL,
    `chassisNumber` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `insuranceId` VARCHAR(191),

    UNIQUE INDEX `Taxi.bodyNumber_unique`(`bodyNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaxiDriverMap` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `taxiId` VARCHAR(191) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `releaseOfficerId` VARCHAR(191),
    `endAt` DATETIME(3),
    `validatingOfficerId` VARCHAR(191),
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `remarks` VARCHAR(256),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Taxi` ADD FOREIGN KEY (`insuranceId`) REFERENCES `Insurance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxiDriverMap` ADD FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxiDriverMap` ADD FOREIGN KEY (`taxiId`) REFERENCES `Taxi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxiDriverMap` ADD FOREIGN KEY (`releaseOfficerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaxiDriverMap` ADD FOREIGN KEY (`validatingOfficerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
