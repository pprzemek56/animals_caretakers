﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using AnimalCaretakers.Data;
using AnimalCaretakers.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;

namespace AnimalCaretakers.Data.Configurations
{
    public partial class MeetingInvitationConfiguration : IEntityTypeConfiguration<MeetingInvitation>
    {
        public void Configure(EntityTypeBuilder<MeetingInvitation> entity)
        {
            entity.HasOne(d => d.Employee).WithMany(p => p.MeetingInvitationEmployees)
            .HasForeignKey(d => d.EmployeeId)
            .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Recruiter).WithMany(p => p.MeetingInvitationRecruiters)
            .HasForeignKey(d => d.RecruiterId)
            .OnDelete(DeleteBehavior.ClientSetNull);

            OnConfigurePartial(entity);
        }

        partial void OnConfigurePartial(EntityTypeBuilder<MeetingInvitation> entity);
    }
}
