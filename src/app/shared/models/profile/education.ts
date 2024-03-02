export class Education {
  location: string;
  collegeName: string;
  degree: string;
  major: string;
  graduationYear: number;
  constructor(location: string, collegeName: string,degree:string, major: string, graduationYear: number){
    this.location = location;
    this.collegeName = collegeName;
    this.degree = degree;
    this.major = major;
    this.graduationYear = graduationYear;
  }
}
