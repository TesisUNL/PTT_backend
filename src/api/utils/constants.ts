export enum APP_ROLES {
  ADMIN = 'Admin',
  GUEST = 'Guest',
  USER = 'User',
  TOURIST_ADMIN = 'Tourist Admin',
}

// Todo: Review types with stakeholders
export enum AttractionServicesTypes {
  UniqueConstraintError = 'Gasolinera',
  HOTEL = 'Hotel',
  RESTAURANT = 'Restaurante',
  BANK = 'Banco',
  ATM = 'Cajero',
  OTHER = 'other',
}

export enum DatabaseTypeOrmError {
  UniqueConstraintError = 'ER_DUP_ENTRY',
}
