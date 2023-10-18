﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using AnimalCaretakers.Data.Configurations;
using AnimalCaretakers.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
#nullable disable

namespace AnimalCaretakers.Data;

public partial class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
            modelBuilder.ApplyConfiguration(new Configurations.UserConfiguration());

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
