import { Component } from '@angular/core';
import { Moment } from '../../../Moment';
import { Router } from '@angular/router';
import { MomentService } from '../../../services/moment.service'; 
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrl: './new-moments.component.css'
})
export class NewMomentsComponent {
  btnText = 'compartilhar!'

  constructor(
    private momentService:MomentService,
    private messagesService:MessagesService,
    private router: Router
  ){

  }

  async createHandler(moment:Moment){
    const formData = new FormData()

    formData.append("title",moment.title)
    formData.append("description",moment.description)

    if(moment.image){
      formData.append('image',moment.image)
    }
    
    await this.momentService.createMoment(formData).subscribe()


    this.messagesService.add('Momento adicionado com sucesso!')

    this.router.navigate(['/'])
  }








}
