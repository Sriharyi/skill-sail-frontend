import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appRoleBasedAccess]'
})
export class RoleBasedAccessDirective {

  @Input() appRoleBasedAccess!: string[];

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }

  ngOnChanges() {
    const userRoles = this.userService.getRoles();
    let hasRole = false;
    if (this.appRoleBasedAccess
    ) {
      hasRole = userRoles.some(role => this.appRoleBasedAccess
        .includes(role));
    }

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
