export class Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  skills: string[];
  budget: number;
  deadline: Date;


  constructor(id: number, title: string, description: string, thumbnail: string, skills: string[], budget: number, deadline: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.skills = skills;
    this.budget = budget;
    this.deadline = deadline;
  }

  public static createInstance() {
    return new Project(1, "Project 1", "Description 1", "thumbnail", ["Skill 1", "Skill 2"], 1000, new Date());
  }

  public static fromJson(json: any): Project {
    return new Project(json.id, json.title, json.description, json.thumbnail, json.skills, json.budget, json.deadline);
  }
}


export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  fileUrl: string;
  category: string;
  skills: string[];
  bidAmount: number;
  status: string;
  deadline: Date;
}
