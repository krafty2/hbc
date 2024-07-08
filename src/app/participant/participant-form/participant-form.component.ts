import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HbcService } from '../../_service/hbc.service';

@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './participant-form.component.html',
  styleUrl: './participant-form.component.css'
})
export class ParticipantFormComponent {

  participantForm!:FormGroup;

  constructor(private hbcService:HbcService,private fb:FormBuilder){}

  ngOnInit(){
    this.participantForm = this.fb.group({
      nom: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      type: new FormControl('Visiteur'),
      civilite : new FormControl('Mr'),
      profession: new FormControl(''),
      telephone : new FormControl(''),
      ville : new FormControl('')
    })
  }

  handleSubmit(){
    this.hbcService.createParticipant(this.participantForm.value).subscribe({
      next:()=>{

      },
      error:()=>{

      }
    })
  }
}
