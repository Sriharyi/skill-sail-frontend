export class Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  budget: number;
  deadline: Date;


  constructor(id: number, title: string, description: string, skills: string[], budget: number, deadline: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.budget = budget;
    this.deadline = deadline;
  }

  public static createInstance(){
    return new Project(1, "Project 1", "Description 1", ["Skill 1", "Skill 2"], 1000, new Date());
  }

  public static fromJson(json: any): Project {
    return new Project(json.id, json.title, json.description, json.skills, json.budget, json.deadline);
  }
}
