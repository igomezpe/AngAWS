import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{

  title:string = "ANWS";

  poducts : Producto[]=[]

  constructor(private usuarioService : UsuarioService,private productoService : ProductoService){

  }
  ngOnInit(): void {


    const sidebarToggle = document.querySelector('#sidebarToggle') as HTMLElement;
    if(sidebarToggle){
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
      });
    }

    this.productoService.getAllProducts().subscribe( data =>{
      this.poducts = data;
    });

  }

logOut(){
  this.usuarioService.logOut();
}



}
