import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { subscribeOn } from 'rxjs';
import { Categoria } from '../categoria.model';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit{

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''

  }
  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }


  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
     // this.categoria = resposta      -------- dessa jeito apareceu os dados após clicae deletar
     this.categoria.nome = resposta.nome
     this.categoria.descricao = resposta.descricao
      console.log(this.categoria)

    })
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem('Categoriadeletada com sucesso!!')
      return
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void{
    this.router.navigate(['categorias'])
  }
}
