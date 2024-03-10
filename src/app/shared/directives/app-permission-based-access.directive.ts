import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appAppPermissionBasedAccess]'
})
export class PermissionBasedAccessDirective {
  @Input() appAppPermissionBasedAccess!: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }

  ngOnChanges() {
    const userPermissions = this.userService.getPermissions();
    let hasPermission = false;

    if (this.appAppPermissionBasedAccess) {
      hasPermission = userPermissions.some(permission => this.appAppPermissionBasedAccess
        .includes(permission));
    }

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
