import { TPerson } from "@definitions/person";
import { TRoster } from "@definitions/roster";

class Person {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly bio: string;
  readonly status: string;
  readonly profileImage: string;
  readonly roster?: TRoster;

  constructor(person: TPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.email = person.email;
    this.bio = person.bio;
    this.status = person.status;
    this.profileImage = person.profileImage;
    this.roster = person.roster;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getId(): string {
    return this.id;
  }

  isSameAs(otherId: string): boolean {
    return this.id === otherId;
  }

  isNotTheSameAs(otherId: string): boolean {
    return this.id !== otherId;
  }

  hasRoster(): boolean {
    return !!this.roster;
  }
}

export default Person;
