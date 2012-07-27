class MaterialsController < ApplicationController
  # GET /materials
  # GET /materials.json
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json { 
          @order = params[:order].blank? ? "" : params[:order]

          @materials = case
                       when !params[:link].blank? then Material.link(params[:link]) \
                                                    .paginate(:page => params[:page].to_i, :limit => params[:limit].to_i, :order => @order)
                       when !params[:conditions].blank? then Material.where(ActiveSupport::JSON.decode(params[:conditions])) \
                                                    .paginate(:page => params[:page].to_i, :limit => params[:limit].to_i, :order => @order)
                       when !params[:any].blank? then Material.any(params[:any]) \
                                                    .paginate(:page => params[:page].to_i, :limit => params[:limit].to_i, :order => @order)
                       else Material.paginate(:page => params[:page].to_i, :limit => params[:limit].to_i, :order => @order)
                       end
          render json: { :materials => @materials, :totalRecord => @materials.count } 
      }
    end
  end

  # POST /materials
  # POST /materials.json
  def create
    @material = Material.new(params[:material])
    respond_to do |format|
      if @material.save
        format.html { redirect_to @material, notice: 'Material was successfully created.' }
        format.json { render json: @material, status: :created, location: @material }
      else
        format.html { render action: "new" }
        format.json { render json: @material.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /materials/1
  # PUT /materials/1.json
  def update
    @material = Material.find(params[:id])

    respond_to do |format|
      if @material.update_attributes(params[:material])
        format.html { redirect_to @material, notice: 'Material was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @material.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /materials/1
  # DELETE /materials/1.json
  def destroy
    @material = Material.find(params[:id])
    @material.destroy

    respond_to do |format|
      format.html { redirect_to materials_url }
      format.json { head :no_content }
    end
  end
end
