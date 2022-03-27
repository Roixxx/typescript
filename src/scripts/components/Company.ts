import faker from '@faker-js/faker';

export default class Company {
	companyName: string;

	catchPhrase: string;

	location: {
		lat: number,
		lng: number,
	};

	constructor() {
		this.companyName = faker.name.firstName();
		this.catchPhrase = faker.company.catchPhrase();
		this.location = {
			lat: parseFloat(faker.address.latitude()),
			lng: parseFloat(faker.address.longitude()),
		};
	}
}
