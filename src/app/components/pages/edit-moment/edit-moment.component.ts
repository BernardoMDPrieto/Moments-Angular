import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Moment } from '../../../Moment';

import { MomentService } from '../../../services/moment.service';

import { MessagesService } from '../../../services/messages.service';


@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent implements OnInit{
  moment!:Moment
  btnText:string = 'Editar'

  constructor(
    private momentService:MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe((item) =>{
      this.moment = item.data
    })
  }

  async editHandler(momentData: Moment){
    const id = this.moment.id

    const fomrData = new FormData()

    fomrData.append('title',momentData.title)
    fomrData.append('description',momentData.description)
    
    if(momentData.image){
      fomrData.append('image',momentData.image)

    }

    await this.momentService.updateMoment(id!,fomrData).subscribe()
  
    this.messagesService.add(`Momento ${id} foi atualizado com sucesso!`)
  

    this.router.navigate(['/'])
  }



}
